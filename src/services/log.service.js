import axios from "axios";

const jeec_log_url = process.env.VUE_APP_JEEC_LOG_URL;

class LogService {
  async postLog(jwt_token, entrypoint) {
    return axios.post(jeec_log_url + "/log", {
      jwt_token: jwt_token,
      entrypoint: entrypoint
    });
  }
}

export default new LogService();
