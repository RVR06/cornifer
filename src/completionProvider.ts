import {
	CompletionItem,
	ExtensionContext,
	languages,
	Position,
	SnippetString,
	TextDocument
} from 'vscode';
import { IconManager } from './iconManager';

/*
 * Provides dsl snippets
 */
export function setupCompletionProvider(context: ExtensionContext) {
	// Model
	const provider = languages.registerCompletionItemProvider(['c4', 'c4u'],
		{
			provideCompletionItems(document: TextDocument, position: Position) {

				// Deactivation
				const text = document.lineAt(position).text;
				if (text.indexOf('.') !== -1) {
					return [];
				}

				const workspaceCompletion = new CompletionItem('workspace', IconManager.gimmeCompletionItemKind('workspace'));
				workspaceCompletion.commitCharacters = ['\t'];
				workspaceCompletion.insertText = new SnippetString('workspace "${1:name}" "${2:description}" {\n\t!identifiers hierarchical\n\t!impliedRelationships false\n\n\tmodel {\n\t\t${0}\n\t}\n\tviews {\n\t}\n}\n');
				workspaceCompletion.detail = 'workspace\n  "name"\n  "description" {}';

				const groupCompletion = new CompletionItem('group', IconManager.gimmeCompletionItemKind('group'));
				groupCompletion.commitCharacters = ['\t'];
				groupCompletion.insertText = new SnippetString('group "${1:name}" {\n\t${0}\n}');
				groupCompletion.detail = 'group\n  "name" {}';

				const personCompletion = new CompletionItem('person', IconManager.gimmeCompletionItemKind('person'));
				personCompletion.commitCharacters = ['\t'];
				personCompletion.insertText = new SnippetString('${1:identifier} = person "${2:name}" "${3:description}" "${4:tags}"');
				personCompletion.detail = 'identifier =\n  person\n  "name"\n  "description"\n  "tags"';

				const systemCompletion = new CompletionItem('softwareSystem', IconManager.gimmeCompletionItemKind('softwareSystem'));
				systemCompletion.commitCharacters = ['\t'];
				systemCompletion.insertText = new SnippetString('${1:identifier} = softwareSystem "${2:name}" "${3:description}" "${4:tags}" {\n\t${0}\n}');
				systemCompletion.detail = 'identifier =\n  softwareSystem\n  "name"\n  "description"\n  "tags" {}';

				const containerCompletion = new CompletionItem('container', IconManager.gimmeCompletionItemKind('container'));
				containerCompletion.commitCharacters = ['\t'];
				containerCompletion.insertText = new SnippetString('${1:identifier} = container "${2:name}" "${3:description}" "${4:technology}" "${5:tags}" {\n\t${0}\n}');
				containerCompletion.detail = 'identifier =\n  container\n  "name"\n  "description"\n  "technology"\n  "tags" {}';

				const componentCompletion = new CompletionItem('component', IconManager.gimmeCompletionItemKind('component'));
				componentCompletion.commitCharacters = ['\t'];
				componentCompletion.insertText = new SnippetString('${1:identifier} = component "${2:name}" "${3:description}" "${4:technology}" "${5:tags}" {}');
				componentCompletion.detail = 'identifier =\n  component\n  "name"\n  "description"\n  "technology"\n  "tags" {}';

				const relationshipCompletion = new CompletionItem('relationship', IconManager.gimmeCompletionItemKind('relationship'));
				relationshipCompletion.commitCharacters = ['\t'];
				relationshipCompletion.insertText = new SnippetString('${1:identifier} -> ${2:identifier} "${3:description}" "${4:technology}" "${5:tags}"');
				relationshipCompletion.detail = 'identifier -> identifier\n  "description"\n  "technology"\n  "tags"';

				return [
					workspaceCompletion,
					groupCompletion,
					personCompletion,
					systemCompletion,
					containerCompletion,
					componentCompletion,
					relationshipCompletion
				];
			}
		});

	// Deployment
	const providerD = languages.registerCompletionItemProvider(['c4', 'c4u'],
		{
			provideCompletionItems(document: TextDocument, position: Position) {

				// Deactivation
				const text = document.lineAt(position).text;
				if (text.indexOf('.') !== -1) {
					return [];
				}

				const deploymentEnvironment = new CompletionItem('deploymentEnvironment', IconManager.gimmeCompletionItemKind('deploymentEnvironment'));
				deploymentEnvironment.commitCharacters = ['\t'];
				deploymentEnvironment.insertText = new SnippetString('${1:identifier}_ = deploymentEnvironment "${2:name}" {\n\t${0} \n}');
				deploymentEnvironment.detail = 'identifier_ =\n  deploymentEnvironment\n  "name" {}';

				const deploymentGroup = new CompletionItem('deploymentGroup', IconManager.gimmeCompletionItemKind('deploymentGroup'));
				deploymentGroup.commitCharacters = ['\t'];
				deploymentGroup.insertText = new SnippetString('${1:identifier}_ = deploymentGroup "${2:name}"');
				deploymentGroup.detail = 'identifier_ =\n  deploymentGroup\n  "name"';

				const deploymentNode = new CompletionItem('deploymentNode', IconManager.gimmeCompletionItemKind('deploymentNode'));
				deploymentNode.commitCharacters = ['\t'];
				deploymentNode.insertText = new SnippetString('deploymentNode "${1:name}" "${2:description}" "${3:technology}" "${4:tags}" ${5:1} {\n\t${0}\n}');
				deploymentNode.detail = 'deploymentNode\n  "name"\n  "description"\n  "technology"\n  "tags"\n  #instances {}';

				const infrastructureNode = new CompletionItem('infrastructureNode', IconManager.gimmeCompletionItemKind('infrastructureNode'));
				infrastructureNode.commitCharacters = ['\t'];
				infrastructureNode.insertText = new SnippetString('${1:identifier}_ = infrastructureNode "${2:name}" "${3:description}" "${4:technology}" "${5:tags}"');
				infrastructureNode.detail = 'identifier_ =\n  infrastructureNode\n  "name"\n  "description"\n  "technology"\n  "tags"';

				const softwareSystemInstance = new CompletionItem('softwareSystemInstance', IconManager.gimmeCompletionItemKind('softwareSystemInstance'));
				softwareSystemInstance.commitCharacters = ['\t'];
				softwareSystemInstance.insertText = new SnippetString('${1:softwareSystem_identifier}_ = softwareSystemInstance ${1:softwareSystem_identifier} ${2:\"\"} "${3:tags}" {}');
				softwareSystemInstance.detail = 'softwareSystem_identifier_ =\n  softwareSystemInstance\n  softwareSystem_identifier\n  deploymentGroup_identifier\n  "tags" {}';

				const containerInstance = new CompletionItem('containerInstance', IconManager.gimmeCompletionItemKind('containerInstance'));
				containerInstance.commitCharacters = ['\t'];
				containerInstance.insertText = new SnippetString('${2:container_identifier}_ = containerInstance ${1:softwareSystem_identifier}.${2:container_identifier} ${3:\"\"} "${4:tags}" {}');
				containerInstance.detail = 'container_identifier_ =\n  containerInstance\n  softwareSystem_identifier.container_identifier\n  deploymentGroup_identifier\n  "tags" {}';

				const healthCheck = new CompletionItem('healthCheck', IconManager.gimmeCompletionItemKind('healthCheck'));
				healthCheck.commitCharacters = ['\t'];
				healthCheck.insertText = new SnippetString('healthCheck "${1:name}" ${2:url} ${3:60} ${4:0}');
				healthCheck.detail = 'healthCheck\n  "name"\n  url\n  interval_s\n  timeout_ms';

				return [
					deploymentEnvironment,
					deploymentGroup,
					deploymentNode,
					infrastructureNode,
					softwareSystemInstance,
					containerInstance,
					healthCheck
				];
			}
		});

	// View
	const providerV = languages.registerCompletionItemProvider(['c4', 'c4u'],
		{
			provideCompletionItems(document: TextDocument, position: Position) {

				// Deactivation
				const text = document.lineAt(position).text;
				if (text.indexOf('.') !== -1) {
					return [];
				}

				const systemLandscape = new CompletionItem('systemLandscape', IconManager.gimmeCompletionItemKind('view'));
				systemLandscape.commitCharacters = ['\t'];
				systemLandscape.insertText = new SnippetString('systemLandscape "${1:name}" "${2:description}" {\n\tinclude *\n}');
				systemLandscape.detail = 'systemLandscape\n  "name"\n  "description" {}';

				const systemContext = new CompletionItem('systemContext', IconManager.gimmeCompletionItemKind('view'));
				systemContext.commitCharacters = ['\t'];
				systemContext.insertText = new SnippetString('systemContext ${1:softwareSystem_identifier} "${2:name}" "${3:description}" {\n\tinclude *\n}');
				systemContext.detail = 'systemContext\n  softwareSystem_identifier\n  "name"\n  "description" {}';

				const container = new CompletionItem('container', IconManager.gimmeCompletionItemKind('view'));
				container.commitCharacters = ['\t'];
				container.insertText = new SnippetString('container ${1:container_identifier} "${2:name}" "${3:description}" {\n\tinclude *\n}');
				container.detail = 'container\n  container_identifier\n  "name"\n  "description" {}';

				const component = new CompletionItem('component', IconManager.gimmeCompletionItemKind('view'));
				component.commitCharacters = ['\t'];
				component.insertText = new SnippetString('component ${1:container_identifier}.${2:component_identifier} "${3:name}" "${4:description}" {\n\tinclude *\n}');
				component.detail = 'component\n  container_identifier.component_identifier\n  "name"\n  "description" {}';

				const deployment = new CompletionItem('deployment', IconManager.gimmeCompletionItemKind('view'));
				deployment.commitCharacters = ['\t'];
				deployment.insertText = new SnippetString('deployment * ${1:identifier} "${2:name}" "${3:description}" {\n\tinclude *\n}');
				deployment.detail = 'deployment\n  *\n  identifier\n  "name"\n  "description" {}';

				const dynamic = new CompletionItem('dynamic', IconManager.gimmeCompletionItemKind('view'));
				dynamic.commitCharacters = ['\t'];
				dynamic.insertText = new SnippetString('dynamic ${1:*|softwareSystem_identifier|softwareSystem_identifier.container_identifier} "${2:name}" "${3:description}" {\n\t${0}\n}');
				dynamic.detail = 'dynamic\n  *|softwareSystem_identifier|softwareSystem_identifier.container_identifier\n  "name"\n  "description" {}';

				const filtered = new CompletionItem('filtered', IconManager.gimmeCompletionItemKind('view'));
				filtered.commitCharacters = ['\t'];
				filtered.insertText = new SnippetString('filtered "${1:baseview_name}" ${2:include|exclude} "${3:tags}" "${4:name}" "${5:description}"');
				filtered.detail = 'filtered\n  "baseview_name"\n  include|exclude\n  "tags"\n  "name"\n  "description"';

				return [
					systemLandscape,
					systemContext,
					container,
					component,
					deployment,
					dynamic,
					filtered
				];
			}
		});

	// Theme
	const providerT = languages.registerCompletionItemProvider(['c4', 'c4u'],
		{
			provideCompletionItems(document: TextDocument, position: Position) {

				// Deactivation
				const text = document.lineAt(position).text;
				if (text.indexOf('.') !== -1) {
					return [];
				}

				const theme = new CompletionItem('theme', IconManager.gimmeCompletionItemKind('theme'));
				theme.commitCharacters = ['\t'];
				theme.insertText = new SnippetString('theme ${1:https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json}');
				theme.detail = 'theme\n  theme_url';

				const styles = new CompletionItem('styles', IconManager.gimmeCompletionItemKind('styles'));
				styles.commitCharacters = ['\t'];
				styles.insertText = new SnippetString('styles {\n\telement "${1:tag_name}" {\n\t\tcolour ${2:#color_code}\n\t}\n\trelationship "${3:tag_name}" {\n\t\tcolour ${4:#color_code}\n\t}\n}');
				styles.detail = 'styles {\n  element "tag_name" {\n    colour #color_code\n  }\n  relationship "tag_name" {\n    colour #color_code\n  }\n}';

				const properties = new CompletionItem('properties', IconManager.gimmeCompletionItemKind('properties'));
				properties.commitCharacters = ['\t'];
				properties.insertText = new SnippetString('properties {\n\t"structurizr.sort" "created"\n}');
				properties.detail = 'properties {\n\t"structurizr.sort" "created|key|type"\n}';

				const branding = new CompletionItem('branding', IconManager.gimmeCompletionItemKind('branding'));
				branding.commitCharacters = ['\t'];
				branding.insertText = new SnippetString('branding {\n\tlogo ${1:file|url}\n}');
				branding.detail = 'branding {\n  logo file|url\n}';

				return [
					theme,
					styles,
					properties,
					branding
				];
			}
		});

	context.subscriptions.push(provider, providerD, providerV, providerT);
}