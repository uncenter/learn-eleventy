module.exports = () => (collectionApi) => {
	return collectionApi
		.getFilteredByGlob('../**/*.md')
		.sort((a, b) => {
			const nameA = a.data.title || a.fileSlug;
			const nameB = b.data.title || b.fileSlug;
			return nameA.localeCompare(nameB);
		})
		.sort((a, b) => {
			const nameA = a.data.sort;
			const nameB = b.data.sort;
			return nameA - nameB;
		});
};
