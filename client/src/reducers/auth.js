export default (state = {
  user: null,
  authorized: false,
  err: {
    message: ""
  }
}, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        user: action.payload || null,
        authorized: action.payload ? true : false
      }
    case "LOGIN_USER":
      if (action.payload._id) {
        return {
          ...state,
          user: action.payload
        };
      } else if (action.payload.err) {
        return {
          ...state,
          err: action.payload.err
        };
      }
    case "LOGOUT_USER":
      return action.payload;
    default:
      return state;
  }
};
