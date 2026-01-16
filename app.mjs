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
		paths: { "static/": "/static/" },
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
				label: 'Module 1: Introduction and basics',
				groups: [
					{
						label: "Project setup and templating",
						query: {
							filter: [
								["data.sort", "isLessThanOrEqual", 6],
							],
							sort: [["data.sort", "asc"]]
						}
					},
					{
						label: "Data, collections, and helpers",
						query: {
							filter: [
								["data.sort", "isGreaterThanOrEqual", 7],
								["data.sort", "isLessThanOrEqual", 16]
							],
							sort: [["data.sort", "asc"]]
						}
					},
					{
						query: {
							filter: [
								["data.sort", "isEqual", 17],
							],
							sort: [["data.sort", "asc"]]
						}
					},
				]
			},
			{
				label: "Module 2: Asset pipeline and post-processing",
				groups: [
					{
						query: {
							filter: [
								["data.sort", "isGreaterThanOrEqual", 18],
								["data.sort", "isLessThanOrEqual", 21],
							],
						}
					},
				]
			},
			{
				label: "Module 3: Styling and finishing touches",
				groups: [
					{
						query: {
							filter: [
								["data.sort", "isGreaterThanOrEqual", 22],
							],
						}
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
