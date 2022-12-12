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
      }
    } catch (err) {
      console.error(err);
    }
  }

  async verifyToken(token) {
    try {
      const { data: user } = await axios.get("api/auth/login", {
        headers: {
          authorization: `${token}`,
        },
      });
      user.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register({ email, password, firstName, lastName, address }) {
    try {
      const { data: user } = await axios.post("api/users", {
        email,
        password,
        firstName,
        lastName,
        address,
      });
      const cart = await axios.post("api/orders", {
        userId: user.id,
        isCart: true,
        address,
      });
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
