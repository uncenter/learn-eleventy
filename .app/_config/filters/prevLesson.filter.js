module.exports = () => (url) => {
	return Number(url.replace('/lesson/', '').replace('/', '')) - 1;
};
