import {registerUser} from './register_user.js';
import {consultarUser} from './consult_user.js';
import {obtenerLocalStorage} from './local_storage.js';
import {getHTML} from './ajaxHTML.js';
import slider from './inicio.js';
import {
	shows,
	showsHoy,
	showsFavorites,
	showsWatches,
	search,
} from './shows.js';
// import search from './buscador.js';

const d = document;
const $btnMenuHamburguesa = d.querySelector('.btn-hamburguesa');
const $menu = d.querySelector('.menu');
const $btnMenu = d.querySelector('.content-menu');
const $btnSearch = d.querySelector('.icon');
const $inputSearch = d.getElementById('text-show');
const $contentLogo = d.querySelector('.content-logo');
export const date = new Date();
export const dateToday = date.toLocaleDateString();
let dataUser = obtenerLocalStorage();

d.addEventListener('DOMContentLoaded', () => {
	//Consultar si el usuario esta registrado
	user();
	//llamado de HTML
	getHTML({url: 'src/html/inicio.html', metho: slider});
});

$contentLogo.addEventListener('click', (e) => {
	if (
		e.target.parentElement.matches('.content-logo') ||
		e.target.matches('.content-logo')
	) {
		getHTML({url: 'src/html/inicio.html', metho: slider});
	}
});

$btnMenu.addEventListener('click', (e) => {
	if (e.target.matches('.content-menu #inicio')) {
		e.preventDefault();
		$menu.classList.remove('is-active');
		getHTML({url: e.target.href, metho: slider});
	}

	if (e.target.matches('.content-menu #shows')) {
		e.preventDefault();
		$menu.classList.remove('is-active');
		getHTML({
			url: e.target.href,
			metho: shows,
		});
	}

	if (e.target.matches('.content-menu #shows-hoy')) {
		e.preventDefault();
		$menu.classList.remove('is-active');
		getHTML({
			url: e.target.href,
			metho: showsHoy,
		});
	}

	if (e.target.matches('.content-menu #favorites')) {
		e.preventDefault();
		$menu.classList.remove('is-active');
		getHTML({
			url: e.target.href,
			metho: showsFavorites,
		});
	}

	if (e.target.matches('.content-menu #views')) {
		e.preventDefault();
		$menu.classList.remove('is-active');
		getHTML({
			url: e.target.href,
			metho: showsWatches,
		});
	}
});

$btnSearch.addEventListener('click', (e) => {
	getHTML({
		url: 'src/html/shows.html',
		metho: search,
	});
});

$inputSearch.addEventListener('keypress', (e) => {
	if (e.keyCode === 13) {
		getHTML({
			url: 'src/html/shows.html',
			metho: search,
		});
	}
});

$btnMenuHamburguesa.addEventListener('click', (e) => {
	$menu.classList.toggle('is-active');
});

document.addEventListener('click', async (e) => {
	if (e.target.matches('.favorite i')) {
		// prettier-ignore
		let showId =e.target.parentElement.parentElement.parentElement.parentElement.parentElement;

		if (e.target.parentElement.dataset.favorite === 'SI') {
			e.target.parentElement.classList.remove('color');
			e.target.parentElement.dataset.favorite = 'NO';
			dataUser.favorite.splice(dataUser.favorite.indexOf(showId.dataset.id), 1);
			localStorage.setItem('userData', JSON.stringify(dataUser));
		} else if (e.target.parentElement.dataset.favorite === 'NO') {
			e.target.parentElement.classList.add('color');
			e.target.parentElement.dataset.favorite = 'SI';
			dataUser.favorite.push(showId.dataset.id);
			localStorage.setItem('userData', JSON.stringify(dataUser));
		}

		if (e.target.parentElement.dataset.local === 'SI') {
			e.target.parentElement.removeAttribute('data-local');
			showId.parentElement.removeChild(showId);
			e.target.parentElement.classList.remove('color');
			e.target.parentElement.dataset.favorite = 'NO';
			dataUser.favorite.splice(dataUser.favorite.indexOf(showId.dataset.id), 1);
			await localStorage.setItem('userData', JSON.stringify(dataUser));
		} /*else if (e.target.parentElement.dataset.local === 'NO') {
			e.target.parentElement.dataset.local = 'SI';
			e.target.parentElement.classList.add('color');
			e.target.parentElement.dataset.favorite = 'SI';
			dataUser.favorite.splice(dataUser.favorite.indexOf(showId.dataset.id), 1);
			await localStorage.setItem('userData', JSON.stringify(dataUser));
			console.log(e.target);
		}*/
	}

	if (e.target.matches('.vista i')) {
		// prettier-ignore
		let showId =e.target.parentElement.parentElement.parentElement.parentElement.parentElement;

		if (e.target.parentElement.dataset.watches === 'SI') {
			e.target.parentElement.classList.remove('color-watches');
			e.target.parentElement.dataset.watches = 'NO';
			dataUser.watches.splice(dataUser.watches.indexOf(showId.dataset.id), 1);
			await localStorage.setItem('userData', JSON.stringify(dataUser));
		} else if (e.target.parentElement.dataset.watches === 'NO') {
			e.target.parentElement.classList.add('color-watches');
			e.target.parentElement.dataset.watches = 'SI';
			dataUser.watches.push(showId.dataset.id);
			await localStorage.setItem('userData', JSON.stringify(dataUser));
		}
		// console.log(e.target.parentElement);
		if (e.target.parentElement.dataset.localWatches === 'SI') {
			e.target.parentElement.removeAttribute('data-localWatches');
			showId.parentElement.removeChild(showId);
			e.target.parentElement.classList.remove('color-watches');
			e.target.parentElement.dataset.watches = 'NO';
			dataUser.watches.splice(dataUser.watches.indexOf(showId.dataset.id), 1);
			await localStorage.setItem('userData', JSON.stringify(dataUser));
		}
	}
});

function user() {
	if (localStorage.getItem('userData') === null) {
		registerUser();
	} else {
		if (dateToday > dataUser.dateLogin) {
			consultarUser(dataUser);
		} else {
			const $imgUserPerfil = d.querySelector('.img-user-perfil');
			$imgUserPerfil.src = dataUser.avatar;
		}
	}
}
