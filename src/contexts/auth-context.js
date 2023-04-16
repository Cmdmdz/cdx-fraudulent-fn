import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { httpClient } from "../utils/HttpClient";
import { server } from "../constant/Constants";
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({ undefined });

const storeUserInSession = (user) => {
  try {
    window.sessionStorage.setItem('authenticated', 'true');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    console.error(err);
  }
};

const getUserFromSession = () => {
  try {
    const isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    return isAuthenticated && user ? user : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const user = getUserFromSession();

    if (user) {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const signIn = async (username, password) => {
    const result = await httpClient.post(server.LOGIN_URL, { username, password });
    if (result.status === 200 && result.data.token != null) {
      storeUserInSession(result.data);

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: result.data,
      });
    } else {
      throw new Error('Please check your email and password');
    }
  };

  const signUp = async (username, name, password) => {
    // Create a user object with the received parameters
    const user = {
      username,
      name,
      password,
    };
  
    try {
      // Make a POST request to the registration endpoint with the user object
      const result = await httpClient.post(server.REGISTER_URL, user);
  
      if (result.status === 201) {
        // Registration successful
        // You can handle additional logic here, such as sending a welcome email
        // or redirecting the user to the login page to sign in
      } else {
        // Registration failed
        throw new Error('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error('Sign up failed. Please try again.');
    }
  };

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: null
    });
  };
  
  const signOut = () => {
    try {
      window.sessionStorage.removeItem('authenticated');
      window.sessionStorage.removeItem('user');
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        skip
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
