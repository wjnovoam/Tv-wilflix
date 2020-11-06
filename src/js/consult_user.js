import {dateToday} from './index.js';

const d = document;
const $modal = d.getElementById('modal');
const $body = d.getElementsByTagName('body')[0];
const $imgUserPerfil = d.querySelector('.img-user-perfil');

export function consultarUser(dataUser) {
	$modal.style.display = 'block';
	$body.style.position = 'static';
	$body.style.height = '100%';
	$body.style.overflow = 'hidden';

	dataUser.dateLogin = dateToday;
	localStorage.setItem('userData', JSON.stringify(dataUser));

	$modal.innerHTML = `<div class="content-modal-user">
      <h1>Hola, <span>${dataUser.name}</span></h1>
      <div class="content-users">
        <div class="image">
          <img src="${dataUser.avatar}" alt="">
        </div>
        <button class="next">Continue <i class="fa fa-fast-forward"></i></button>
      </div>
    </div>`;

	const $btnSiguiente = d.querySelector('.next');
	$btnSiguiente.addEventListener('click', (e) => {
		$imgUserPerfil.src = dataUser.avatar;
		$modal.style.display = 'none';
		$body.style.position = 'inherit';
		$body.style.height = 'auto';
		$body.style.overflow = 'visible';
	});
}
