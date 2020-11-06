import {agregarNameAvatarFechaLocalStorage} from './local_storage.js';
import {dateToday} from './index.js';

const d = document;
const $modal = d.getElementById('modal');
const $body = d.getElementsByTagName('body')[0];
const $inputUser = d.getElementById('user');
const $imgUser = d.querySelector('.img-user');
const $btnGuardar = d.querySelector('.guardar');
const $imgUserPerfil = d.querySelector('.img-user-perfil');

export function registerUser(params) {
	let nombre;
	let avatar;

	$modal.style.display = 'block';
	$body.style.position = 'static';
	$body.style.height = '100%';
	$body.style.overflow = 'hidden';

	$inputUser.addEventListener('keyup', (e) => {
		$imgUser.src = `https://avatars.dicebear.com/api/avataaars/${e.target.value}.svg`;
		nombre = e.target.value;
		avatar = $imgUser.src;
	});

	$btnGuardar.addEventListener('click', (e) => {
		if (e.target.matches('.guardar')) {
			if (nombre === '' || nombre === undefined) {
				$inputUser.style.borderBottomColor = 'red';
			} else {
				agregarNameAvatarFechaLocalStorage({nombre, avatar, dateToday});
				$imgUserPerfil.src = avatar;
				$modal.style.display = 'none';
				$body.style.position = 'inherit';
				$body.style.height = 'auto';
				$body.style.overflow = 'visible';
				console.log(nombre, avatar);
			}
		}
	});
}
