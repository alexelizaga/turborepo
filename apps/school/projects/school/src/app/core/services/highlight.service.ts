import { Injectable } from '@angular/core';

// declare var Prism: any;
declare var RevealHighlight: any;

@Injectable()
export class HighlightService {
	constructor() {}
	private _total_tries = 5;

	highlightAll(tries: number = 0) {
		let revealHighlight = RevealHighlight();
		let hljs = revealHighlight.hljs;
		const allCodeBlocks = document.querySelectorAll('markdown pre code');
		if (allCodeBlocks.length == 0 && tries < this._total_tries) {
			tries++;
			// retry is
			setTimeout(() => this.highlightAll(tries), 200);
		}
		allCodeBlocks.forEach((block) => {
			this.highlightBlock(hljs, block);
		});
	}

	highlightBlock = (hljs: any, block: Element) => {
		hljs.highlightBlock(block);
		// Don't generate line numbers for empty code blocks
		if (block.innerHTML.trim().length === 0) return;

		if (block.hasAttribute('data-line-numbers')) {
			hljs.lineNumbersBlock(block, { singleLine: true });
			this.highlightLines(block);
		}
	};

	highlightLines = (block: Element) => {
		var highlightSteps = this.deserializeHighlightSteps(
			block.getAttribute('data-line-numbers')
		);

		highlightSteps.forEach((highlight) => {
			let elementsToHighlight: Element[] = [];

			// Highlight a range
			if (typeof highlight.end === 'number') {
				const nodes = block.querySelectorAll(
					'table tr:nth-child(n+' +
						highlight.start +
						'):nth-child(-n+' +
						highlight.end +
						')'
				);
				nodes.forEach((node) => elementsToHighlight.push(node));
			}
			// Highlight a single line
			else if (typeof highlight.start === 'number') {
				const nodes = block.querySelectorAll(
					'table tr:nth-child(' + highlight.start + ')'
				);
				nodes.forEach((node) => elementsToHighlight.push(node));
			}

			elementsToHighlight.forEach((lineElement) => {
				lineElement.classList.add('highlight-line');
			});
			block.classList.add('has-highlights');
		});
	};

	/* Plugin.deserializeHighlightSteps( '1,2|3,5-10' )
	 * [
	 *   [ { start: 1 }, { start: 2 } ],
	 *   [ { start: 3 }, { start: 5, end: 10 } ]
	 * ]
	 *
	 */
	deserializeHighlightSteps = (
		attr: string | null
	): Array<HighlightedLine> => {
		const HIGHLIGHT_STEP_DELIMITER = '|';
		const HIGHLIGHT_LINE_DELIMITER = ',';
		const HIGHLIGHT_LINE_RANGE_DELIMITER = '-';

		const result = new Array<HighlightedLine>();

		// ' 1,2| 3,5-10' => ['1,2','3,5-10']
		const highlightSteps =
			attr?.replace(/\s/g, '')?.split(HIGHLIGHT_STEP_DELIMITER) ?? [];

		highlightSteps.forEach((highlights: string) => {
			highlights
				.split(HIGHLIGHT_LINE_DELIMITER)
				.map((highlightRange: string) => {
					let highlightedLines: HighlightedLine | undefined;
					// [1, 2] || [3, 5-10]
					// Parse valid line numbers
					if (/^[\d-]+$/.test(highlightRange)) {
						const highlight = highlightRange.split(
							HIGHLIGHT_LINE_RANGE_DELIMITER
						);

						var lineStart = parseInt(highlight[0], 10),
							lineEnd = parseInt(highlight[1], 10);

						if (isNaN(lineEnd)) {
							highlightedLines = {
								start: lineStart
							};
						} else {
							highlightedLines = {
								start: lineStart,
								end: lineEnd
							};
						}
						result.push(highlightedLines);
					}
				});
		});
		return result;
	};
}

interface HighlightedLine {
	start: number;
	end?: number;
}
