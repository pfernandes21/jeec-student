export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let jwt = localStorage.getItem('jwt');
  
    if (user && jwt) {
      return { Authorization: jwt };
    } else {
      return {};
    }
  }