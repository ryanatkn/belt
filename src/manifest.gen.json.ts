import type {Gen} from '@feltcoop/gro';
import ts from 'typescript';

import {exports} from '$lib/exports';

export interface Manifest {
	exports: ManifestExport[];
}
// TODO name? Export?
interface ManifestExport {
	file: string;
	identifiers: ManifestExportIdentifier[];
}
interface ManifestExportIdentifier {
	name?: string;
	type?: string;
}

export const gen: Gen = async ({fs}) => {
	console.log(`exports`, exports);

	const json: Manifest = {exports: []};

	for (const file of exports) {
		const manifestExport: ManifestExport = {file, identifiers: []};
		json.exports.push(manifestExport);
		// if ('lib/json.ts' !== file) continue;
		const importPath = 'src/' + file;
		const contents = await fs.readFile(importPath, 'utf8'); // eslint-disable-line no-await-in-loop
		console.log(file, contents.length);

		const node = ts.createSourceFile(importPath, contents, ts.ScriptTarget.Latest);
		// console.log(`node`, node.statements);
		for (const s of node.statements) {
			const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed});
			const identifier: ManifestExportIdentifier = {};
			if (s.name) {
				identifier.name = printer.printNode(ts.EmitHint.Unspecified, s.name, node);
			} else if (s.declarationList) {
				identifier.name = printer.printNode(
					ts.EmitHint.Unspecified,
					s.declarationList.declarations[0].name,
					node,
				);
			}
			if (s.type) {
				identifier.type = printer.printNode(ts.EmitHint.Unspecified, s.type, node);
			}

			manifestExport.identifiers.push(identifier);
		}
		// await fs.writeFile(importPath + '.ts', printed, 'utf8');
	}

	return JSON.stringify(json);
};
