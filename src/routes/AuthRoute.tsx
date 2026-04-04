import {Route} from 'react-router-dom'

import LazyLoader from '@/LazyLoader'
import {Login} from '@/pages'
import {AuthWrapper} from '@/Wrapper'

const AuthRoute = [
  <Route
    key="login"
    path="/login"
    element={
      <AuthWrapper>
        <LazyLoader>
          <Login />
        </LazyLoader>
      </AuthWrapper>
    }
  />
]

export default AuthRoute
