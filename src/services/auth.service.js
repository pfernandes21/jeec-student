import axios from "axios";

class AuthService {
  login([user, accessToken]) {
    return axios
      .get(process.env.VUE_APP_JEEC_BRAIN_URL + '/student/info', { headers: { Authorization: 'Bearer ' + accessToken } })
      .then(response => {
        if (response.data) {
          user = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }

  userUpdate(user) {
    localStorage.setItem('user', JSON.stringify(user));
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