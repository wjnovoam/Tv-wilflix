const d = document;
const $main = d.querySelector('main');

export const getHTML = async (datos) => {
	try {
		let {url, metho} = datos;
		let res = await fetch(url);
		let html = await res.text();

		if (!res.ok) throw {status: res.status, statusText: res.statusText};
		$main.innerHTML = html;
		await metho();
	} catch (error) {
		let mensaje = error.statusText || 'Ocurrio un error';
		$main.innerHTML = `<h1>Error ${error.status}: ${mensaje}</h1>`;
	}
};

// d.addEventListener('DOMContentLoaded', () => {
// 	slider();
// });
