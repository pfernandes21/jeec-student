import axios from "axios";
import authHeader from "./auth-header";

const jeec_brain_url = process.env.VUE_APP_JEEC_BRAIN_URL;

class UserService {
  getUser() {
    return axios.get(jeec_brain_url + "/student/info", {
      headers: authHeader()
    });
  }

  todayLogin() {
    return axios.get(jeec_brain_url + "/student/today-login", {
      headers: authHeader()
    });
  }

  redeemCode(code) {
    return axios.post(
      jeec_brain_url + "/student/redeem-code",
      { code: code },
      { headers: authHeader() }
    );
  }

  addLinkedin(url) {
    return axios.post(
      jeec_brain_url + "/student/add-linkedin",
      { url: url },
      { headers: authHeader() }
    );
  }

  addCV(cv) {
    var formData = new FormData();
    formData.append("cv", cv.files[0]);

    return axios.post(jeec_brain_url + "/student/add-cv", formData, {
      headers: {
        ...{
          "Content-Type": "multipart/form-data"
        },
        ...authHeader()
      }
    });
  }

  getCV() {
    return axios.get(jeec_brain_url + "/student/cv", { headers: authHeader() });
  }

  getUserSquad() {
    return axios.get(jeec_brain_url + "/student/squad", {
      headers: authHeader()
    });
  }

  createSquad(image, name, cry) {
    var formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("cry", cry);

    return axios.post(jeec_brain_url + "/student/squad", formData, {
      headers: {
        ...{
          "Content-Type": "multipart/form-data"
        },
        ...authHeader()
      }
    });
  }

  getStudents(search) {
    return axios.get(jeec_brain_url + "/student/students?search=" + search, {
      headers: authHeader()
    });
  }

  inviteSquad(members) {
    return axios.post(
      jeec_brain_url + "/student/invite-squad",
      { members: members },
      { headers: authHeader() }
    );
  }

  getSquadInvitations() {
    return axios.get(jeec_brain_url + "/student/squad-invitations", {
      headers: authHeader()
    });
  }

  leaveSquad() {
    return axios.post(jeec_brain_url + "/student/leave-squad", null, {
      headers: authHeader()
    });
  }

  acceptInvitation(invitation_id) {
    return axios.post(
      jeec_brain_url + "/student/accept-invitation",
      { invitation_id: invitation_id },
      { headers: authHeader() }
    );
  }

  rejectInvitation(invitation_id) {
    return axios.post(
      jeec_brain_url + "/student/reject-invitation",
      { invitation_id: invitation_id },
      { headers: authHeader() }
    );
  }

  kickMember(ist_id) {
    return axios.post(
      jeec_brain_url + "/student/kick-member",
      { ist_id: ist_id },
      { headers: authHeader() }
    );
  }

  getActivities() {
    return axios.get(jeec_brain_url + "/student/activities", {
      headers: authHeader()
    });
  }

  getQuests() {
    return axios.get(jeec_brain_url + "/student/quests", {
      headers: authHeader()
    });
  }

  getTags() {
    return axios.get(jeec_brain_url + "/student/tags", {
      headers: authHeader()
    });
  }

  addTags(tags) {
    return axios.post(
      jeec_brain_url + "/student/add-tags",
      { tags: tags },
      { headers: authHeader() }
    );
  }

  deleteTag(tag) {
    return axios.post(
      jeec_brain_url + "/student/delete-tag",
      { tag: tag },
      { headers: authHeader() }
    );
  }

  getCompanies() {
    return axios.get(jeec_brain_url + "/student/companies", {
      headers: authHeader()
    });
  }

  addCompanies(companies) {
    return axios.post(
      jeec_brain_url + "/student/add-companies",
      { companies: companies },
      { headers: authHeader() }
    );
  }

  deleteCompany(company) {
    return axios.post(
      jeec_brain_url + "/student/delete-company",
      { company: company },
      { headers: authHeader() }
    );
  }

  getStudentsRanking() {
    return axios.get(jeec_brain_url + "/student/students-ranking", {
      headers: authHeader()
    });
  }

  getSquadsRanking() {
    return axios.get(jeec_brain_url + "/student/squads-ranking", {
      headers: authHeader()
    });
  }

  getTodaySquadReward() {
    return axios.get(jeec_brain_url + "/student/today-squad-reward", {
      headers: authHeader()
    });
  }

  getLevels() {
    return axios.get(jeec_brain_url + "/student/levels", {
      headers: authHeader()
    });
  }

  getSquadsRewards() {
    return axios.get(jeec_brain_url + "/student/squads-rewards", {
      headers: authHeader()
    });
  }

  getJEECPOTRewards() {
    return axios.get(jeec_brain_url + "/student/jeecpot-rewards", {
      headers: authHeader()
    });
  }

  getChatToken() {
    return axios.get(jeec_brain_url + "/student/chat-token", {
      headers: authHeader()
    });
  }

  getPartners() {
    return axios.get(jeec_brain_url + "/student/partners", {
      headers: authHeader()
    });
  }

  getPartner(name) {
    return axios.get(jeec_brain_url + "/student/partner?name=" + name, {
      headers: authHeader()
    });
  }

  getChatRoom(partner = "", user_id = "") {
    return axios.get(
      jeec_brain_url +
      "/student/chat-room?company=" +
      partner +
      "&member=" +
      user_id,
      { headers: authHeader() }
    );
  }

  getNotifications() {
    return axios.get(jeec_brain_url + "/student/notifications", {
      headers: authHeader()
    });
  }

  getEventInfo() {
    return axios.get(jeec_brain_url + "/student/event-info", {
      headers: authHeader()
    });
  }
}

export default new UserService();
