import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await userService.getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailded());
      }
    } catch (error) {
      dispatch(fetchGenderFailded());
      console.log("fetchGenderStart", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailded = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await userService.getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailded());
      }
    } catch (error) {
      dispatch(fetchPositionFailded());
      console.log("fetchPositionStart", error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailded = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await userService.getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailded());
      }
    } catch (error) {
      dispatch(fetchRoleFailded());
      console.log("fetchRoleStart", error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailded = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllUser("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFaild());
      }
    } catch (error) {
      dispatch(fetchAllUserFaild());
      console.log("User", error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUserFaild = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.createNewUserService(data);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFaild());
      }
    } catch (error) {
      dispatch(saveUserFaild());
      console.log("save User", error);
    }
  };
};

export const saveUserSuccess = (roleData) => ({
  type: actionTypes.SAVE_USER_SUCCESS,
  data: roleData,
});

export const saveUserFaild = () => ({
  type: actionTypes.SAVE_USER_FAILDED,
});

export const deleteUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.deleteUserService(data);
      // console.log("check res", res);
      // console.log("check user redux", res);
      if (res && res.errCode === 0) {
        toast.success("Delete user success");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete user error");
        dispatch(deleteUserFaild());
      }
    } catch (error) {
      dispatch(deleteUserFaild());
      console.log("save User", error);
    }
  };
};

export const deleteUserSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  users: data,
});

export const deleteUserFaild = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.editUserService(data);
      console.log("check edit", res);
      if (res && res.errCode === 0) {
        toast.success("Update user success");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Update user error");
        dispatch(editUserFaild());
      }
    } catch (error) {
      dispatch(editUserFaild());
      console.log("update User", error);
    }
  };
};

export const editUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  users: data,
});

export const editUserFaild = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getTopDoctorHomeService(10);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllDoctors();
      // console.log("check res", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
      });
    }
  };
};

export const saveDetailDoctors =(data) => {
  return async(dispatch, getState) => {
    try {
      let res = await userService.saveDetailInfoDoctor(data);
      console.log("check", res);
      if (res && res.errCode === 0) {
        toast.success("Save Infor detail doctor success");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save Infor detail doctor Err");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
      let resPrice = await userService.getAllCodeService("PRICE");
      let resPayment = await userService.getAllCodeService("PAYMENT");
      let resProvince = await userService.getAllCodeService("PROVINCE");

      if (resPrice && resPrice.errCode === 0
        && resPayment && resPayment.errCode === 0
        && resProvince && resProvince.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince:resProvince.data,
        }
        dispatch(getRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(getRequiredDoctorInfoFailded());
      }
    } catch (error) {
      dispatch(getRequiredDoctorInfoFailded());
      console.log("fetchGenderStart", error);
    }
  };
};

export const getRequiredDoctorInfoSuccess = (allRequiredDoctorData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredDoctorData,
});

export const getRequiredDoctorInfoFailded = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
