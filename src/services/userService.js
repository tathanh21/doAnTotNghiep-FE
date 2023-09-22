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
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctor`);
};
const saveDetailInfoDoctor = (data) => {
 return axios.post("/api/save-info-doctor", data);
};
const getDetailInfoDoctor=(inputId)=>{
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}
const saveBulkScheduleDoctor = (data) => {
   return axios.post("/api/bulk-create-schedule", data);
}
const getScheduleByDate=(doctorId,date)=>{
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}
const getExtraInfoById=(doctorId)=>{
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}
const getProfileDoctorById=(doctorId)=>{
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}
const postPatientBookingAppointment = (data) => {
   return axios.post("/api/patient-book-appointment", data);
}
const postVertifyBookingAppointment = (data) => {
   return axios.post("/api/verify-book-appointment", data);
}

const createNewSpecialty = (data) => {
   return axios.post("/api/create-new-specialty", data);
}
const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};
export default {
  handleLoginApi,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailInfoDoctor,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleByDate,
  getExtraInfoById,
  getProfileDoctorById,
  postPatientBookingAppointment,
  postVertifyBookingAppointment,
  createNewSpecialty,
  getAllSpecialty
};
