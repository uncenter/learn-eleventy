// @ts-check
import { defineConfig, createNotesQuery } from './.app/app-config.js';
import { defineTranslations } from './.app/app-translations.js';

export default defineConfig({
	title: 'Learn Eleventy',
	description: 'The best way to learn Eleventy is to build something with it.',
	editThisNote: {
		url: 'https://github.com/uncenter/learn-eleventy/edit/{{branch}}/{{file}}',
	},
	staticAssets: {
		paths: { "static/": "/" },
	},
	ignores: ["README.md", "COPYING.md"],
	notes: {
		pathPrefix: '/lesson',
	},
	sidebar: {
		links: [
			{
				url: 'https://github.com/uncenter/learn-eleventy',
				label: 'Learn Eleventy GitHub',
				icon: 'github',
			},
			{
				url: 'https://discord.gg/GBkBy9u',
				label: 'Eleventy Discord',
				icon: 'message-circle-question',
			},
			{
				url: 'https://11ty.dev/docs',
				label: 'Eleventy Documentation',
				icon: 'book-text',
			},
		],
		sections: [
			{
				label: 'Lessons',
				groups: [
					{
						query: createNotesQuery({
							pattern: '^/[^/]+$',
						}),
					},
				],
			},
		],
	},
	panel: {
		incomingLinks: false,
		outgoingLinks: false,
		externalLinks: false,
	},
});

export const translations = defineTranslations({
	lang: 'en',
	partial: true,
	translations: {
		'search.popover.placeholder': 'Search for lessons by title and content.',
	},
});
