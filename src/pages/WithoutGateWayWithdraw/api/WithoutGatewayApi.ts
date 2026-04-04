import {toast} from 'react-toastify'

import {ApiCall, EndPoints} from '@/services'
import {WithdrawReqActionProps} from '@/types/ApiTypes'

const WithdrawReqAction = async (props: WithdrawReqActionProps) => {
  const payload = {
    status: Number(props?.status),
    withdrawid: Number(props?.withdrawid)
  }
  return new Promise<boolean>((resolve) => {
    ApiCall('post', EndPoints.withdrawactionWithoutGateWay, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          // console.log('action', res)
          toast.success(res?.result)
          resolve(true)
        } else {
          toast?.error(res?.result)
          resolve(false)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(false)
      })
  })
}

const WithoutGatewayApi = {WithdrawReqAction}
export default WithoutGatewayApi
