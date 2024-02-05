import { createSlice } from '@reduxjs/toolkit'

//checking if there is an isAuth item in local storage
const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  } 
  return false;
};


const initialState = {
    isAuth: userAuthFromLocalStorage()
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
        state.isAuth = true
    },
    unauthenticateUser: (state) => {
        state.isAuth = false
    }
  },
})

export const { authenticateUser, unauthenticateUser, setFirstAndLastName} = authSlice.actions

export default authSlice.reducer