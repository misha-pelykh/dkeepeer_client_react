import Actions from '../constants/actions';

const {
  ROUTER_STATE_CHANGE,

  FETCHING_USER,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,

  SIGNUP_FAILURE,

  EMAIL_CONFIRMATION_FULFILLED,
  EMAIL_CONFIRMATION_REJECTED
} = Actions;

const initialState = {
  token: null,
  fetching: false,
  fetched: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE: {
      return {
        ...state
      };
    }

    case FETCHING_USER: {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null,
      };
    }

    case LOGIN_SUCCESS: {
      const { token } = action.payload;

      return {
        ...state,
        token: token,
        error: null,
        fetching: true,
        fetched: false
      };
    } 

    case EMAIL_CONFIRMATION_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true
      };
    }

    case LOGOUT: {
      return { ...initialState };
    }

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case EMAIL_CONFIRMATION_REJECTED: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
