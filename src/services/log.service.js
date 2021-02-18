import axios from 'axios';
import authHeader from './auth-header';

const jeec_brain_url = process.env.VUE_APP_JEEC_BRAIN_URL;

class LogService {
  async postLog(ist_id, endpoint) {
    return axios.post(jeec_brain_url + '/log', { ist_id: ist_id, endpoint: endpoint }, { headers: authHeader() })
  }
}

export default new LogService();