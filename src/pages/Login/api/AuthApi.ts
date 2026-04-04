import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {LoginApiData, LoginApiProps} from '@/types/apiTypes/AuthApiPayloadType'

const LoginAdminApi = async (props: LoginApiProps) => {
  const payload = {
    email: props?.email,
    password: props?.password
  }
  return new Promise<LoginApiData | null>((resolve) => {
    ApiCall('post', EndPoints.login, payload)
      .then((res: any) => {
        // console.log('res', res)
        if (res?.status === 200) {
          resolve({
            token: res?.data?.token
          })
        } else {
          toast.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
      })
  })
}

const AuthApi = {LoginAdminApi}
export default AuthApi
