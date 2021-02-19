import axios from "axios";

const jeec_log_url = process.env.VUE_APP_JEEC_LOG_URL;

class LogService {
  async postLog(entrypoint) {
    return axios.post(jeec_log_url + "/log", {
      jwt_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaXN0MTgxMzIzIn0.lSwkSQUTNxFgaqBdOFEDvEpGE_fE_F2cixgZkdJHARg",
      entrypoint: entrypoint
    });
  }
}

export default new LogService();
