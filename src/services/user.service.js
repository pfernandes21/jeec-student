import axios from 'axios';
import authHeader from './auth-header';

const jeec_brain_url = process.env.VUE_APP_JEEC_BRAIN_URL;

class UserService {
  getUserName() {
    return axios.get(jeec_brain_url + 'student/name');
  }

  redeemCode(code) {
    return axios.post(jeec_brain_url + 'student/redeem-code', { code: code }, { headers: authHeader() })
  }

  addLinkedin(url) {
    return axios.post(jeec_brain_url + 'student/add-linkedin', { url: url }, { headers: authHeader() })
  }
}

export default new UserService();