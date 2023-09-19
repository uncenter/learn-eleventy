const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItTaskCheckbox = require('markdown-it-task-checkbox');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItContainer = require('markdown-it-container');
const markdownItKbd = require('markdown-it-kbd-better');

/**
 * Creates a markdown-it instance.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The configured markdown library.
 */
module.exports = (eleventyConfig) => {
	const lib = markdownIt({
		html: true,
		linkify: true,
	})
		.use(markdownItTaskCheckbox)
		.use(markdownItFootnote)
		.use(markdownItAnchor, {
			slugify: eleventyConfig.getFilter('slug'),
			level: [1, 2, 3, 4],
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: 'after',
				class: 'anchor-link',
				symbol: `<svg width="0.8em" height="0.8em"><use xlink:href="#icon-anchor-link"></use></svg>`,
			}),
		})
		.use(markdownItContainer, 'dynamic', {
			validate: function () {
				return true;
			},
			render: function (tokens, idx) {
				const token = tokens[idx];
				if (token.nesting === 1) {
					return '<div class="' + token.info.trim() + '">';
				} else {
					return '</div>';
				}
			},
		})
		.use(markdownItKbd, {
			presets: [{ name: 'icons', prefix: 'icon:' }],
			transform: (content) => {
				return content[0].toUpperCase() + content.slice(1);
			},
		});

	return lib;
};
