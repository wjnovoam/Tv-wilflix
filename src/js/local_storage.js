export function agregarNameAvatarFechaLocalStorage(props) {
	let {nombre, avatar, dateToday} = props;
	let dataUser;
	dataUser = obtenerLocalStorage();
	dataUser.name = nombre;
	dataUser.avatar = avatar;
	dataUser.dateLogin = dateToday;
	localStorage.setItem('userData', JSON.stringify(dataUser));
}

export function obtenerLocalStorage() {
	let dataUser;
	if (localStorage.getItem('userData') === null) {
		dataUser = {
			name: '',
			avatar: '',
			favorite: [],
			watches: [],
			dateLogin: '',
		};
	} else {
		dataUser = JSON.parse(localStorage.getItem('userData'));
	}

	return dataUser;
}
