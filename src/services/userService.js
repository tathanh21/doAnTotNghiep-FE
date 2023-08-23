import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserServiceDelete = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
export default {
  handleLoginApi,
  getAllUser,
  createNewUserService,
  deleteUserServiceDelete,
  editUserService,
  getAllCodeService,
};