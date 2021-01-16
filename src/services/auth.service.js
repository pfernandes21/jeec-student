import axios from "axios";

class AuthService {
  login([user, accessToken]) {
    return axios
      .get(process.env.VUE_APP_JEEC_BRAIN_URL + '/student/info', { headers: { Authorization: accessToken } })
      .then(response => {
        if (response.data) {
          user = response.data.data;
          user.accessToken = accessToken;
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  userUpdate(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default new AuthService();