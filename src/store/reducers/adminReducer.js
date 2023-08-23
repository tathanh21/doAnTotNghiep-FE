import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoading: false,
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
    default:
      return state;
  }
};

export default adminReducer;
