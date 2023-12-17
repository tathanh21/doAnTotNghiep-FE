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
const editSpecialtyService = (inputData) => {
  return axios.put("/api/edit-specialty", inputData);
};
const deleteSpecialtyService = (specialtyId) => {
  return axios.delete("/api/delete-specialty", { data: { id: specialtyId } });
};

const createNewHandbook = (data) => {
   return axios.post("/api/create-new-handbook", data);
}
const getAllHandbook= () => {
  return axios.get(`/api/get-all-handbook`);
};

const editHandbookService = (inputData) => {
  return axios.put("/api/edit-handbook", inputData);
};

const getAllDetailHandbookById = (data) => {
  return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
}

const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const deleteHandbookService = (handnbookId) => {
  return axios.delete("/api/delete-handbook", { data: { id: handnbookId } });
};

const createNewClinic = (data) => {
   return axios.post("/api/create-new-clinic", data);
}
const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
}
const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const editClinicService = (inputData) => {
  return axios.put("/api/edit-clinic", inputData);
};
const deleteClinicService = (clinicId) => {
  return axios.delete("/api/delete-clinic", { data: { id: clinicId } });
};

const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
   return axios.post("/api/send-remedy", data);
}
const handleEmailPatientApi = (email) => {
   return axios.post("/api/login-email", {email});
}

const handleCancelBookingPatientApi = (data) => {
   return axios.post("/api/patient-cancel-booking", {data});
}

const getAllBooking = () => {
  return axios.get(`/api/get-all-booking`);
}

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
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewHandbook,
  getAllHandbook,
  getAllDetailHandbookById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  deleteHandbookService,
  editHandbookService,
  editClinicService,
  deleteClinicService,
  editSpecialtyService,
  deleteSpecialtyService,
  handleEmailPatientApi,
  handleCancelBookingPatientApi,
  getAllBooking
};
