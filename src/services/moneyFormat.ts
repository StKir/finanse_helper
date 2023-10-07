export function moneyFormat(n: number | string) {
	return parseFloat(String(n))
		.toFixed(2)
		.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
		.replace('.', ',');
}
