import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import {
    ExtensionContext,
    TextDocument,
    ViewColumn,
    commands,
    window,
    workspace
} from 'vscode';

/**
 * Transpiles docker compose yaml into matching dsl 
 * 
 * @see {@link https://docs.docker.com/compose/compose-file/ }
 */
export function setupTranspilerProvider(context: ExtensionContext) {

    context.subscriptions.push(
        commands.registerCommand('cornifer.transpiler', async () => {

            if (!window.activeTextEditor) { return; }

            let { document } = window.activeTextEditor;

            const content = morph(document);

            await workspace
                .openTextDocument({ language: "c4", content: content })
                .then(d => window.showTextDocument(d, ViewColumn.Beside));
        }));
}


/**
 * @see {@link https://raw.githubusercontent.com/compose-spec/compose-spec/master/schema/compose-spec.json }
 */
export function morph(document: TextDocument): string {
    const compose = yaml.load(fs.readFileSync(document.uri.fsPath, 'utf8'));

    var systems = extractSystems(compose);
    var volumes = extractVolumes(compose);
    var relationships = createSystemRelationships(compose);
    var volRelationships = createVolumeRelationships(compose);
    var depSystems = createSystemDeployments(compose);
    var depVolumes = createVolumeDeployments(compose);

    const filename = path.parse(document.fileName);
    const header = filename.base;
    const name = speller(filename.name);

    const workspace = `workspace "${name}" "Auto-generated from ${header}" {
\t!identifiers hierarchical
\t!impliedRelationships false

\tmodel {
${systems}

${volumes}

${relationships}

${volRelationships}

\t\t${name}_ = deploymentEnvironment "${name}" {
\t\t\tdeploymentNode "Orchestration" "" "Docker Compose" "#docker" 1 {
${depSystems}
${depVolumes}
\t\t\t}
\t\t}
\t}

\tviews {
\t\ttheme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
\t\ttheme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/heraldry/theme.json

\t\tdeployment * ${name}_ "${name}" "" {
\t\t\tinclude *
\t\t\tautoLayout
\t\t}
\t}
}`;

    return shrink(workspace);
}

//#region Parsers

const extractSystems = (compose: any): string => {
    return objectEntries(compose.services)
        .map(([key, value]) => system(key, value.build === undefined))
        .join("\n");
};

const extractVolumes = (compose: any): string => {
    if (compose.volumes === undefined) { return ''; }

    return Object
        .entries(compose.volumes)
        .map(([key, _]) => volume(key))
        .join("\n");
};

const createSystemRelationships = (compose: any): string => {
    return Object
        .entries(compose.services)
        .map(([key, value]) => {
            //@ts-ignore
            const deps = value.depends_on;
            if (deps !== undefined) {

                if (Array.isArray(deps)) {
                    // depends_on:
                    // - bbb

                    return deps.map((dep: string) => relationship(key, dep)).join("\n");
                }
                else {
                    // depends_on:
                    // bbb:
                    //   condition: service_healthy

                    //@ts-ignore
                    return Object.entries(value.depends_on)
                        .map(([dep, _]) => relationship(key, dep)).join("\n");
                }
            }
        }).join("\n");
};

const createVolumeRelationships = (compose: any): string => {
    if (compose.volumes === undefined) { return ''; }

    return Object
        .entries(compose.services)
        .map(([key, value]) => {
            //@ts-ignore
            const vols = value.volumes;
            if (vols !== undefined) {
                return vols.map((vol: string) => {
                    const src = source(vol);
                    const keys = Object.entries(compose.volumes).map(([key, _]) => key);
                    if (keys.includes(src)) {
                        return relationship2(key, src);
                    }
                }).join("\n");
            }
        }).join("\n");
};

const createSystemDeployments = (compose: any): string => {
    return Object
        .entries(compose.services)
        .map(([key, value]) => {
            //@ts-ignore
            let [registry, name] = dockerfile(value.image);
            //@ts-ignore
            return deploymentNode(key, name, registry, value.build === undefined);
        }).join("\n");
};

const createVolumeDeployments = (compose: any): string => {
    if (compose.volumes === undefined) { return ''; }

    return Object
        .entries(compose.volumes)
        .map(([key, _]) => deploymentVolume(key))
        .join("\n");
};

//#endregion Parsers

//#region Structurizr DSL

const system = (service: string, isExternal: boolean): string =>
    `\t\t${speller(service)} = softwareSystem "${speller(service)}" "" "${tag(isExternal)}"`;

const volume = (key: string): string =>
    `\t\t${speller(key)} = softwareSystem "${speller(key)}" "" "${tag(true)}, #file"`;

const relationship = (from: string, to: string): string =>
    `\t\t${speller(from)} -> ${speller(to)} "depends on" "" ""`;

const relationship2 = (from: string, to: string): string =>
    `\t\t${speller(from)} -> ${speller(to)} "mounts" "" ""`;

const deploymentNode = (service: string, image: string, registry: string, isExternal: boolean): string => {
    const reg = registry ? `registry: ${registry}` : '';
    return `\t\t\t\tdeploymentNode "${image}" "${reg}" "Docker" "#docker" 1 {\n\t\t\t\t\t${speller(service)}_ = softwareSystemInstance ${speller(service)} "" "${tag(isExternal)}" \n\t\t\t\t}`;
};

const deploymentVolume = (volume: string): string => {
    return `\t\t\t\t${speller(volume)}_ = softwareSystemInstance ${speller(volume)} "" "${tag(true)}"`;
};

//#endregion

//#region Helpers

export function objectEntries<
    T extends Record<string, unknown>,
    K extends string,
    V extends T[K]>(o: T) {
    return Object.entries(o) as [K, V][];
}

export const speller = (name: string): string =>
    name.replace(/-/g, '_').replace(/\./g, '_');

const tag = (isExternal: boolean): string =>
    `${isExternal ? '#external' : ''}`;

const dockerfile = (dockerfile: string): [registry: string, image: string] => {
    const regex = /(?<registry>.*\.io)\/(?<image>.*)/;
    var match = regex.exec(dockerfile);

    return match
        ? [match!.groups!.registry, match!.groups!.image]
        : ['', dockerfile];
};

const source = (volume: string): string => {
    const regex = /(?<source>[^:]+)(:(?<destination>[^:]+)(:(?<ro>[^:]+))*)*/;
    var match = regex.exec(volume);
    return match!.groups!.source;
};

export const shrink = (source: string): string => {
    const regex = RegExp('(\\n){2,}', 'gm');
    var result = source.replace(regex, '\n');
    return result;
};

//#endregion