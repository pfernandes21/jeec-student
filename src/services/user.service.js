import axios from 'axios';
import authHeader from './auth-header';

const jeec_brain_url = process.env.VUE_APP_JEEC_BRAIN_URL;

class UserService {
  getUser() {
    return axios.get(jeec_brain_url + '/student/info', { headers: authHeader() });
  }

  redeemCode(code) {
    return axios.post(jeec_brain_url + '/student/redeem-code', { code: code }, { headers: authHeader() })
  }

  addLinkedin(url) {
    return axios.post(jeec_brain_url + '/student/add-linkedin', { url: url }, { headers: authHeader() })
  }

  addCV(formData) {
    return axios.post(jeec_brain_url + '/student/add-cv', formData, {
      headers: {
        ...{
          "Content-Type": "multipart/form-data",
        }, ...authHeader()
      },
    });
  }

  getUserSquad() {
    return axios.get(jeec_brain_url + '/student/squad', { headers: authHeader() });
  }

  createSquad(formData) {
    return axios.post(jeec_brain_url + '/student/squad', formData, {
      headers: {
        ...{
          "Content-Type": "multipart/form-data",
        }, ...authHeader()
      },
    });
  }
}

export default new UserService();