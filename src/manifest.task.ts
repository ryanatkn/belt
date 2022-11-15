import type {Task} from '@feltcoop/gro';
import ts from 'typescript';

import {exports} from '$lib/exports';

export const task: Task = {
	run: async ({fs}) => {
		console.log(`exports`, exports);
		for (const exp of exports) {
			if ('lib/json.ts' !== exp) continue;
			const importPath = 'src/' + exp;
			const contents = await fs.readFile(importPath, 'utf8');
			console.log(exp, contents.length);

			const node = ts.createSourceFile(importPath, contents, ts.ScriptTarget.Latest);
			console.log(`node`, node.statements);
			for (const s of node.statements) {
				const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed});
				const printed = printer.printNode(ts.EmitHint.Unspecified, s, node);
				console.log(`printed`, printed);
			}
			// await fs.writeFile(importPath + '.ts', printed, 'utf8');
		}
	},
};
