import axios from 'axios';

class UserService {
  getUserName() {
    return axios.get(process.env.VUE_APP_JEEC_BRAIN_URL + 'student/name');
  }
}

export default new UserService();