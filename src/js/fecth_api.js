const d = document;
const $main = d.querySelector('main');

export default async function getData(datos, buscar) {
	try {
		let {url, metho} = datos;
		let respuesta = await fetch(url);
		let json = await respuesta.json();

		if (!respuesta.ok)
			throw {status: respuesta.status, statusText: respuesta.statusText};

		if (json.length === 0) {
			$main.innerHTML = `<div class="resultado">
                              <h3>No se ha encontrado ningun <br> resultado para "<strong>${buscar}</strong>"</h3>
                          </div>`;
		} else {
			await metho(json);
		}
	} catch (err) {
		let message = err.statusText || 'Ocurrio un error';
		$main.innerHTML = `<div class="error">
      <h2>Ups !</h2>
      <h3>${message}</h3>
    </div>`;
	}
}
