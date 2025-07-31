import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTaskCheckbox from "markdown-it-task-checkbox";
import markdownItFootnote from "markdown-it-footnote";
import markdownItKbd from "markdown-it-kbd-better";
import markdownItShiki from '@shikijs/markdown-it';
import { wikilinksModule } from "./../modules/wikilinks/index.js";
import { notesModule } from "./../modules/notes/index.js";
import { calloutsModule } from "./../modules/callouts/index.js";

/**
 * Creates a markdown-it instance.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The configured markdown library.
 */
export const markdownLibrary = async (eleventyConfig) => {
  const lib = markdownIt({
    html: true,
    linkify: true,
  })
    .use(markdownItTaskCheckbox)
    .use(markdownItFootnote)
    .use(notesModule.copyCodeMarkdownPlugin)
    .use(calloutsModule.markdownPlugin)
    .use(wikilinksModule.markdownPlugin, {
      collections: "_notes",
      slugify: eleventyConfig.getFilter("slugifyPath"),
      slugifyAnchor: eleventyConfig.getFilter("slugify"),
    })
    .use(markdownItAnchor, {
      slugify: eleventyConfig.getFilter("slugify"),
      level: [1, 2, 3, 4],
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "anchor-link",
        symbol: `<svg><use xlink:href="#icon-anchor-link"></use></svg>`,
      }),
    })
    .use(markdownItKbd, {
      presets: [{ name: 'icons', prefix: 'icon:' }],
      transform: (content) => {
        return content[0].toUpperCase() + content.slice(1);
      },
    })
    .use(
      await markdownItShiki({
        langs: ['md', 'json', 'yaml', 'toml', 'sh', 'bash', 'html', 'xml', 'jinja',  'diff', 'scss'],
        themes: {
          light: 'catppuccin-latte',
          dark: 'catppuccin-macchiato',
        },
        defaultColor: false,
        langAlias: {
          njk: 'jinja-html',
        },
      }),
  );

  return lib;
};
