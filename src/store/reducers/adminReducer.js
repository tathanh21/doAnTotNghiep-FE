import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoading: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfo: [],
  allHandbooks: [],
  allClinics:[],
  allSpecialties:[],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILDED:
      state.isLoading = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILDED:
      state.isLoading = false;
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      state.isLoading = false;
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
      }
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state
      }
    case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
      // console.log('check action',action.data)
      state.allHandbooks = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_HANDBOOK_FAILDED:
      state.allHandbooks = [];
      return {
        ...state,
      };
    
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      state.allClinics = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAILDED:
      state.allClinics = [];
      return {
        ...state,
      };
    
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      state.allSpecialties = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAILDED:
      state.allSpecialties = [];
      return {
        ...state,
      };
    
    default:
      return state;
  }
};

export default adminReducer;
