import getData from './fecth_api.js';
import {shows, displayShowsSearch} from './shows.js';

const $inputText = document.getElementById('text-show');

export default function search() {
	// console.log($inputText.value);

	if ($inputText.value === '') {
		shows();
	} else {
		let url = `http://api.tvmaze.com/search/shows?q=${$inputText.value}`;
		getData({url, metho: displayShowsSearch}, $inputText.value);
		// textBuscador = inputText.value;
		$inputText.value = '';
	}
}
