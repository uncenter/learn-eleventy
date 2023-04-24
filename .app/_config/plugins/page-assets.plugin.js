module.exports = [
	require('eleventy-plugin-page-assets'),
	{
		mode: 'parse',
		postsMatching: '*.md',
		assetsMatching: '*.png|*.jpg|*.svg|*.gif',
	},
];
