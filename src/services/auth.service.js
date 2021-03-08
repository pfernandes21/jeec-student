import axios from "axios";

class AuthService {
  login([user, jwt]) {
    return axios
      .get(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/info", {
        headers: { Authorization: jwt }
      })
      .then(response => {
        if (response.data) {
          user = response.data.data;
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("user", JSON.stringify(user));
          return user;
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
  }

  userUpdate(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export default new AuthService();
