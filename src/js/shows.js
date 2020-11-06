import getData from './fecth_api.js';

const date = new Date();
// prettier-ignore
const fechaHoy = `${date.getFullYear()}-${date.getMonth() + 1}-${
	date.getDate().length === 2 ? date.getDate() : `0${date.getDate()}`
}`;
const $inputText = document.getElementById('text-show');

const $main = document.querySelector('main');
const $divImgLoader = document.createElement('div');
$divImgLoader.classList.add('img-loader');
const $img = document.createElement('img');
$img.src = '/src/img/loader.svg';
$divImgLoader.appendChild($img);

export async function shows() {
	$main.appendChild($divImgLoader);
	let url = 'https://api.tvmaze.com/shows';
	await getData({url, metho: displayShows});
}

export async function showsHoy() {
	$main.appendChild($divImgLoader);
	let url = `https://api.tvmaze.com/schedule?date=${fechaHoy}`;
	await getData({url, metho: displayShowsHoy});
}

export async function showsFavorites() {
	let dataUser = await JSON.parse(localStorage.getItem('userData'));

	for (let i = 0; i < dataUser.favorite.length; i++) {
		let url = `https://api.tvmaze.com/shows/${dataUser.favorite[i]}`;
		await getData({url, metho: displayShowsFavorite});
	}
}

export async function showsWatches() {
	let dataUser = await JSON.parse(localStorage.getItem('userData'));

	for (let i = 0; i < dataUser.watches.length; i++) {
		let url = `https://api.tvmaze.com/shows/${dataUser.watches[i]}`;
		await getData({url, metho: displayShowsWatches});
	}
}

export function search() {
	if ($inputText.value === '') {
		shows();
	} else {
		$main.appendChild($divImgLoader);
		let url = `https://api.tvmaze.com/search/shows?q=${$inputText.value}`;
		getData({url, metho: displayShowsSearch}, $inputText.value);
		$inputText.value = '';
	}
}

function displayShowsWatches(el) {
	const $templateShowWatches = document.getElementById('template-show-watches')
		.content;
	const $fragmentShow = document.createDocumentFragment();

	$templateShowWatches.querySelector(
		'.show-cover'
	).style.backgroundImage = `url(${
		el.image ? el.image.original : './src/img/undefined.png'
	}`;
	$templateShowWatches.querySelector('.name-pelicula').textContent = el.name;
	$templateShowWatches.querySelector('.puntaje').textContent =
		el.rating.average;
	//prettier-ignore
	$templateShowWatches.querySelector('.estrellas').innerHTML = rating(el.rating.average);
	$templateShowWatches.querySelector('.show').dataset.id = el.id;
	$templateShowWatches.querySelector('.vista').classList.add('color-watches');
	$templateShowWatches.querySelector('.vista').dataset.localWatches = 'SI';

	let $clone = document.importNode($templateShowWatches, true);
	$fragmentShow.appendChild($clone);

	document.querySelector('.shows').appendChild($fragmentShow);
}

function displayShowsFavorite(el) {
	const $templateShowFavorite = document.getElementById(
		'template-show-favorite'
	).content;
	const $fragmentShow = document.createDocumentFragment();

	$templateShowFavorite.querySelector(
		'.show-cover'
	).style.backgroundImage = `url(${
		el.image ? el.image.original : './src/img/undefined.png'
	}`;
	$templateShowFavorite.querySelector('.name-pelicula').textContent = el.name;
	$templateShowFavorite.querySelector('.puntaje').textContent =
		el.rating.average;
	//prettier-ignore
	$templateShowFavorite.querySelector('.estrellas').innerHTML = rating(el.rating.average);
	$templateShowFavorite.querySelector('.show').dataset.id = el.id;
	$templateShowFavorite.querySelector('.favorite').classList.add('color');
	$templateShowFavorite.querySelector('.favorite').dataset.local = 'SI';

	let $clone = document.importNode($templateShowFavorite, true);
	$fragmentShow.appendChild($clone);

	document.querySelector('.shows').appendChild($fragmentShow);
}

export function displayShows(res) {
	const $templateShow = document.getElementById('template-show').content;
	const $fragmentShow = document.createDocumentFragment();
	let dataUser = JSON.parse(localStorage.getItem('userData'));

	res.forEach((el) => {
		// prettier-ignore
		$templateShow.querySelector('.show-cover').style.backgroundImage = `url(${
			el.image ? el.image.original : './src/img/undefined.png'
		}`;
		$templateShow.querySelector('.name-pelicula').textContent = el.name;
		$templateShow.querySelector('.puntaje').textContent = el.rating.average;
		//prettier-ignore
		$templateShow.querySelector('.estrellas').innerHTML = rating(el.rating.average);
		$templateShow.querySelector('.show').dataset.id = el.id;
		if (dataUser.favorite.indexOf(`${el.id}`) !== -1) {
			$templateShow.querySelector('.favorite').dataset.favorite = 'SI';
			$templateShow.querySelector('.favorite').classList.add('color');
		} else {
			$templateShow.querySelector('.favorite').dataset.favorite = 'NO';
			$templateShow.querySelector('.favorite').classList.remove('color');
		}

		if (dataUser.watches.indexOf(`${el.id}`) !== -1) {
			$templateShow.querySelector('.vista').dataset.watches = 'SI';
			$templateShow.querySelector('.vista').classList.add('color-watches');
		} else {
			$templateShow.querySelector('.vista').dataset.watches = 'NO';
			$templateShow.querySelector('.vista').classList.remove('color-watches');
		}

		let $clone = document.importNode($templateShow, true);
		$fragmentShow.appendChild($clone);
	});

	$main.removeChild($main.children[1]);
	document.querySelector('.shows').appendChild($fragmentShow);
}

// prettier-ignore
function displayShowsHoy(res) {
  const $templateShowHoy = document.getElementById('template-show-hoy').content;
  const $fragmentShow = document.createDocumentFragment();
	res.forEach((el) => {
		// prettier-ignore
		$templateShowHoy.querySelector('.show-cover').style.backgroundImage = `url(${el.show.image ? el.show.image.original : './src/img/undefined.png'}`;
		$templateShowHoy.querySelector('.name-pelicula').textContent = el.show.name;
		$templateShowHoy.querySelector('.airdate').textContent = el.airdate;
		$templateShowHoy.querySelector('.show').dataset.id = el.id;
		$templateShowHoy.querySelector('.airtime').textContent = el.airtime;

		let $clone = document.importNode($templateShowHoy, true);
		$fragmentShow.appendChild($clone);
  });
  
  $main.removeChild($main.children[1]);
	document.querySelector('.shows').appendChild($fragmentShow);
			
}

export function displayShowsSearch(res) {
	const $templateShow = document.getElementById('template-show').content;
	const $fragmentShow = document.createDocumentFragment();
	let dataUser = JSON.parse(localStorage.getItem('userData'));

	res.forEach((el) => {
		$templateShow.querySelector('.show-cover').style.backgroundImage = `url(${
			el.show.image ? el.show.image.original : './src/img/undefined.png'
		}`;
		$templateShow.querySelector('.name-pelicula').textContent = el.show.name;
		$templateShow.querySelector('.puntaje').textContent =
			el.show.rating.average;
		//prettier-ignore
		$templateShow.querySelector('.estrellas').innerHTML = rating(
			el.show.rating.average
		);
		$templateShow.querySelector('.show').dataset.id = el.show.id;
		if (dataUser.favorite.indexOf(`${el.id}`) !== -1) {
			$templateShow.querySelector('.favorite').dataset.favorite = 'SI';
			$templateShow.querySelector('.favorite').classList.add('color');
		} else {
			$templateShow.querySelector('.favorite').dataset.favorite = 'NO';
			$templateShow.querySelector('.favorite').classList.remove('color');
		}

		if (dataUser.watches.indexOf(`${el.id}`) !== -1) {
			$templateShow.querySelector('.vista').dataset.watches = 'SI';
			$templateShow.querySelector('.vista').classList.add('color-watches');
		} else {
			$templateShow.querySelector('.vista').dataset.watches = 'NO';
			$templateShow.querySelector('.vista').classList.remove('color-watches');
		}

		let $clone = document.importNode($templateShow, true);
		$fragmentShow.appendChild($clone);
	});

	$main.removeChild($main.children[1]);
	document.querySelector('.shows').appendChild($fragmentShow);
}

function rating(valor) {
	let result = (valor / 2).toFixed(1);
	if (result >= 2.5 && result <= 2.9) {
		return `
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star-half-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    `;
	} else if (result >= 3 && result <= 3.4) {
		return `
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    `;
	} else if (result >= 3.5 && result <= 3.9) {
		return `
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star-half-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    `;
	} else if (result >= 4 && result <= 4.4) {
		return `
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    `;
	} else if (result >= 4.5 && result <= 4.9) {
		return `
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star-half-o" style="color: yellow;"></i>
    `;
	} else if (result == 5) {
		return `
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    <i class="fa fa-star" style="color: yellow;"></i>
    `;
	} else {
		return `
    <i class="fa fa-star-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    <i class="fa fa-star-o" style="color: yellow;"></i>
    `;
	}
}
