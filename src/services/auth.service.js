import axios from 'axios';

class AuthService {
	async login(credentials) {
		console.log(credentials);
		const { data: token } = await axios.post('api/auth/login', credentials);
		console.log(token);
		if (token) {
			tokenNum = token.token
			try{
			const {data: user} = await axios.get('api/auth/login', {
				headers: {
					authorization: `${tokenNum}`,
				},
			});
			window.localStorage.setItem('user', user);
			console.log(user);
		} catch (err) {
			console.error(err);
		}
		}
		// .then((response) => {
		// 	if (response.data.accessToken) {
		// 		localStorage.setItem('user', JSON.stringify(response.data));
		// 	}

		// 	return response.data;
		// });
	}

	logout() {
		localStorage.removeItem('user');
	}

	register(username, email, password) {
		return axios.post(API_URL + 'signup', {
			username,
			email,
			password,
		});
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'));
	}
}

export default new AuthService();
