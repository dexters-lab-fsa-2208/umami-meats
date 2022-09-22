import axios from "axios";

class AuthService {
  async login(credentials) {
    try {
      // creates token if user is valid
      const { data: token } = await axios.post("api/auth/login", credentials);
      // verifies if token is valid
      if (token) {
        const { data: user } = await axios.get("api/auth/login", {
          headers: {
            authorization: `${token}`,
          },
        });
        user.token = token;
        localStorage.setItem("user", JSON.stringify(user));
        console.log("successfully logged in");
      }
    } catch (err) {
      console.error(err);
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
