'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.default = kbdplugin;
const MARKER_OPEN = '[';
const MARKER_CLOSE = ']';
const ESCAPE_CHARACTER = '\\';
const TAG = 'kbd';
const KEY_MAP = {
	'cmd:mac': '⌘',
	'mac:cmd': '⌘',
	'command:mac': '⌘',
	'mac:command': '⌘',
	'opt:mac': '⌥',
	'mac:opt': '⌥',
	'option:mac': '⌥',
	'mac:option': '⌥',
	'ctrl:mac': '⌃',
	'mac:ctrl': '⌃',
	'control:mac': '⌃',
	'mac:control': '⌃',
};
const CAPITALIZE_CONTENT = true;

/*
 * Add delimiters for double occurrences of MARKER_SYMBOL.
 */
function tokenize(state, silent) {
	if (silent) {
		return false;
	}
	const start = state.pos;
	const max = state.posMax;
	let momChar = state.src.charAt(start);
	let nextChar = state.src.charAt(start + 1);

	// We are looking for two times the open symbol.
	if (momChar !== MARKER_OPEN || nextChar !== MARKER_OPEN) {
		return false;
	}

	// Find the end sequence
	let openTagCount = 1;
	let end = -1;
	let skipNext = false;
	for (let i = start + 1; i < max && end === -1; i++) {
		momChar = nextChar;
		nextChar = state.src.charAt(i + 1);
		if (skipNext) {
			skipNext = false;
			continue;
		}
		if (momChar === MARKER_CLOSE && nextChar === MARKER_CLOSE) {
			openTagCount -= 1;
			if (openTagCount == 0) {
				// Found the end!
				end = i;
			}
			// Skip second marker char, it is already counted.
			skipNext = true;
		} else if (momChar === MARKER_OPEN && nextChar === MARKER_OPEN) {
			openTagCount += 1;
			// Skip second marker char, it is already counted.
			skipNext = true;
		} else if (momChar === '\n') {
			// Found end of line before the end sequence. Thus, ignore our start sequence!
			return false;
		} else if (momChar === ESCAPE_CHARACTER) {
			skipNext = true;
		}
	}

	// Input ended before closing sequence.
	if (end === -1) {
		return false;
	}
	state.push('kbd_open', TAG, 1);
	state.pos += 2;
	state.posMax = end;
	state.md.inline.tokenize(state);
	const tokens = state.tokens;
	// replace text tokens with mapped content
	for (let i = tokens.length - 1; i >= 0; i--) {
		const token = tokens[i];
		const prevToken = tokens[i - 1] || {};
		if (token.type === 'text' && prevToken.type === 'kbd_open') {
			const content = token.content;
			if (content.toLowerCase() in KEY_MAP) {
				token.content = KEY_MAP[content];
			}
			if (CAPITALIZE_CONTENT) token.content = token.content.toUpperCase();
		}
	}

	// start tag
	// reset pos and posMax
	state.pos = end + 2;
	state.posMax = max;
	// end tag
	state.push('kbd_close', TAG, -1);
	return true;
}
function kbdplugin(markdownit) {
	markdownit.inline.ruler.before('link', 'kbd', tokenize);
}
module.exports = exports.default;
module.exports.default = exports.default;
