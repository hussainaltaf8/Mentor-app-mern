//Just after enetering the credentials to login
export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  //Take this action after login Success
  //payload= If Sucess then pass user data
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  //If Wrong Credentials OR Login failure
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });

  //if logging out
  export const Logout = () => ({
    type: "LOGOUT",
  });
  
  //Bcz we have to save our credentials after updating
  //if we don't take action after updating profile,
  // then profile picture become empty in local host
  //And changes will not reflect in our local host

  export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START",
  });
  
  export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,//for storing data after successful updation
  });
  
  export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",
  });