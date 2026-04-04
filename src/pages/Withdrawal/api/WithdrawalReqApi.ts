import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {InrWithdRawReport, WithdrawReqActionProps} from '@/types/ApiTypes'

const UsdtWithdrawReqData = async () =>
  new Promise<{data: any[]} | null>((resolve) => {
    ApiCall('post', EndPoints.usdtwithdrawreq)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast?.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(null)
      })
  })

const InrWithdrawReqData = async () =>
  new Promise<{data: InrWithdRawReport[]} | null>((resolve) => {
    ApiCall('post', EndPoints.InrwithdrawRep)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast?.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(null)
      })
  })

const WithdrawReqAction = async (props: WithdrawReqActionProps) => {
  const payload = {
    status: Number(props?.status),
    withdrawid: Number(props?.withdrawid)
  }
  return new Promise<boolean>((resolve) => {
    ApiCall('post', EndPoints.withdrawaction, payload)
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

const WithdrawalReqApi = {UsdtWithdrawReqData, InrWithdrawReqData, WithdrawReqAction}
export default WithdrawalReqApi
