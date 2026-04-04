import {createSlice} from '@reduxjs/toolkit'

export interface UserSliceInitialType {
  user: {
    token: string | null
  }
}

const initialState: UserSliceInitialType = {
  user: {
    token: null
  }
}

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addToken: (state, action) => {
      const {token} = action.payload
      state.user = {token}
    },
    removeToken: (state) => {
      state.user = {token: null}
    }
  }
})

export const {addToken, removeToken} = UserSlice.actions
export default UserSlice.reducer
