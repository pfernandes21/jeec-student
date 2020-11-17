export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let accessToken = localStorage.getItem('accessToken');
  
    if (user) {
      return { Authorization: 'Bearer ' + accessToken };
    } else {
      return {};
    }
  }