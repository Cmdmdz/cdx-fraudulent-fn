// Success Page
export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Register Page
export const REGISTER_FETCHING = "REGISTER_FETCHING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const ACCOUNT_FETCHING = "ACCOUNT_FETCHING";
export const ACCOUNT_SUCCESS = "ACCOUNT_SUCCESS";
export const ACCOUNT_FAILED = "ACCOUNT_FAILED";
export const ACCOUNT_CLEAR = 'ACCOUNT_CLEAR'

// ACCOUNT Edit Page
export const ACCOUNT_EDIT_FETCHING = "ACCOUNT_EDIT_FETCHING";
export const ACCOUNT_EDIT_SUCCESS = "ACCOUNT_EDIT_SUCCESS";
export const ACCOUNT_EDIT_FAILED = "ACCOUNT_EDIT_FAILED";

export const HISTORY_FETCHING = "HISTORY_FETCHING";
export const HISTORY_SUCCESS = "HISTORY_SUCCESS";
export const HISTORY_FAILED = "HISTORY_FAILED";
export const HISTORY_CLEAR = 'HISTORY_CLEAR'

export const CONTACT_FETCHING = "CONTACT_FETCHING";
export const CONTACT_SUCCESS = "CONTACT_SUCCESS";
export const CONTACT_FAILED = "CONTACT_FAILED";
export const CONTACT_CLEAR = 'CONTACT_CLEAR'

export const apiUrl = "http://localhost:8080";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";
export const TOKEN = "TOKEN";
export const USER_ID = "userId";

export const LOGIN_STATUS = "LOGIN_STATUS";

export const server = {
  LOGIN_URL: `login`,
  REGISTER_URL: `register`,
  USER_LIST: `users`,
  DELETE_LIST: `delete`,
  POST_LIST: `pos`,
  APPROVE_LIST: `approve`,
  CREATE_POS: `create`,

};

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
