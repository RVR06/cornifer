import * as fs from 'fs';
import * as assert from 'assert';
import {
	Uri,
	workspace
} from 'vscode';

import { getDocUri } from './helper';
import {
	morph,
	shrink,
	speller
} from '../../transpilerProvider';

suite('Transpiler provider', () => {

	[
		["xxx", "xxx"],
		["xxx-yyy", "xxx_yyy"],
		["xxx-yyy-zzz", "xxx_yyy_zzz"],
		["xxx.yyy", "xxx_yyy"],
		["xxx.yyy.zzz", "xxx_yyy_zzz"]
	].forEach(function (sut) {
		test(`should spell ${sut}`, async () => {
			await testSpeller(sut[0], sut[1]);
		});
	});

	test(`should not shrink valid source`,
		() => testShrink("foo\nbar", "foo\nbar"));
	test(`should shrink invalid source`,
		() => testShrink("foo\n\n\nbar", "foo\nbar"));

	[
		"compose",
		"compose-depends_on",
		"compose-volumes",
		"compose-dash",
		"compose-depends_on_verbose"
	].forEach(function (sut) {
		test(`should transpile ${sut} file`, async () => {
			await testTranspile(
				getDocUri(`compose/${sut}.yaml`),
				getDocUri(`compose/${sut}.dsl`));
		});
	});
});

async function testTranspile(
	source: Uri,
	expected: Uri) {

	let result = morph(await workspace.openTextDocument(source));
	let yaml = fs.readFileSync(expected.fsPath, 'utf8');

	assert.strictEqual(result.replace(/\s/g, ""), yaml.replace(/\s/g, ""));
}

function testShrink(source: string, expected: string) {
	assert.strictEqual(shrink(source), expected);
}

function testSpeller(source: string, expected: string) {
	assert.strictEqual(speller(source), expected);
}