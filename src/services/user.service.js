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

  addCV(cv) {
    var formData = new FormData();
    formData.append("cv", cv.files[0]);

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

  createSquad(image, name, cry) {
    var formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("cry", cry);

    return axios.post(jeec_brain_url + '/student/squad', formData, {
      headers: {
        ...{
          "Content-Type": "multipart/form-data",
        }, ...authHeader()
      },
    });
  }

  getStudents(search) {
    return axios.get(jeec_brain_url + '/student/students?search=' + search, { headers: authHeader() });
  }

  inviteSquad(members) {
    return axios.post(jeec_brain_url + '/student/invite-squad', { members: members }, { headers: authHeader() })
  }

  getSquadInvitations() {
    return axios.get(jeec_brain_url + '/student/squad-invitations', { headers: authHeader() });
  }

  leaveSquad() {
    return axios.post(jeec_brain_url + '/student/leave-squad', null, { headers: authHeader() })
  }

  acceptInvitation(invitation_id) {
    return axios.post(jeec_brain_url + '/student/accept-invitation', { invitation_id: invitation_id }, { headers: authHeader() })
  }

  rejectInvitation(invitation_id) {
    return axios.post(jeec_brain_url + '/student/reject-invitation', { invitation_id: invitation_id }, { headers: authHeader() })
  }

  kickMember(ist_id) {
    return axios.post(jeec_brain_url + '/student/kick-member', { ist_id: ist_id }, { headers: authHeader() })    
  }
}

export default new UserService();