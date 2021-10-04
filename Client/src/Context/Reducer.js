const Reducer = (state, action) => {
    switch (action.type) {
        //If fetching data to match login Credentials
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
        //If login Success, pass data in payload to user
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
        //If error then error will be true
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };

        case "UPDATE_START":
        return {
          //Nothing will be change in this state
          //user and error will be same
          ...state,
          isFetching:true
        };

      case "UPDATE_SUCCESS":
        return {
          //if successful, then update user
          user: action.payload,
          isFetching: false,
          error: false,
        };

      case "UPDATE_FAILURE":
        return {
          //user will be same if can't update
          user: state.user,
          isFetching: false,
          error: true,
        };

        //if logout,then no error
        case "LOGOUT":
          return {
            user: null,
            isFetching: false,
            error: false,
          };

          default:
            return state;
    }
};

        export default Reducer;