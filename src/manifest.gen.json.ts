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
		const importPath = 'src/' + file;
		const contents = await fs.readFile(importPath, 'utf8'); // eslint-disable-line no-await-in-loop
		console.log(file, contents.length);

		const node = ts.createSourceFile(importPath, contents, ts.ScriptTarget.Latest);
		// console.log(`node`, node.statements);
		for (const s of node.statements) {
			const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed});
			let identifier: ManifestExportIdentifier | undefined;
			if (s.name) {
				(identifier || (identifier = {})).name = printer.printNode(
					ts.EmitHint.Unspecified,
					s.name,
					node,
				);
			} else if (s.declarationList) {
				(identifier || (identifier = {})).name = printer.printNode(
					ts.EmitHint.Unspecified,
					s.declarationList.declarations[0].name,
					node,
				);
				console.log(`s.declarationList.declarations[0]`, s.declarationList.declarations[0]);
				if (
					s.declarationList.declarations[0].type ||
					s.declarationList.declarations[0].initializer.type
				) {
					(identifier || (identifier = {})).type = s.declarationList.declarations[0].type
						? printer.printNode(
								ts.EmitHint.Unspecified,
								s.declarationList.declarations[0].type,
								node,
						  )
						: '(' +
						  printer.printList(
								ts.EmitHint.Unspecified,
								s.declarationList.declarations[0].initializer.parameters,
								node,
						  ) +
						  ') => ' +
						  printer.printNode(
								ts.EmitHint.Unspecified,
								s.declarationList.declarations[0].initializer.type,
								node,
						  );
					console.log(`identifier.type`, identifier.type);
				}
			}
			if (s.type) {
				(identifier || (identifier = {})).type = printer.printNode(
					ts.EmitHint.Unspecified,
					s.type,
					node,
				);
			}
			console.log(`s`, s);
			console.log(`identifier`, identifier);
			if (identifier) manifestExport.identifiers.push(identifier);
		}
		// await fs.writeFile(importPath + '.ts', printed, 'utf8');
	}

	return JSON.stringify(json);
};
