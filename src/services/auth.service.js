import axios from "axios";

class AuthService {
  login([user, accessToken]) {
    return axios
      .get(process.env.VUE_APP_JEEC_BRAIN_URL + 'student/info', { headers: { Authorization: 'Bearer ' + accessToken } })
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(accessToken));

          user = response.data;
          return user;
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  //   register(user) {
  //     return axios.post(API_URL + 'signup', {
  //       username: user.username,
  //       email: user.email,
  //       password: user.password
  //     });
  //   }
}

export default new AuthService();