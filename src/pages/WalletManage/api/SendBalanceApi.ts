import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {SendBalanceApiProps} from '@/types/ApiTypes'

const SendWalletBalanceApi = async (props: SendBalanceApiProps) => {
  const payload = {
    usercode: props?.usercode,
    remark: props?.remark,
    amount: Number(props?.amount),
    trans_type: props?.trans_type,
    wallet_type: props?.wallet_type
  }

  return new Promise<any>((resolve) => {
    ApiCall('post', EndPoints.walletAction, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
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

const getUserInfo = async (props: {usercode: string}) =>
  new Promise<{data: string} | null>((resolve) => {
    ApiCall('post', EndPoints.getUserInfo, {user_reg_code: props?.usercode})
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data?.user_name_data
          })
        } else {
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
        resolve(null)
      })
  })

const SendBalanceApi = {SendWalletBalanceApi, getUserInfo}
export default SendBalanceApi
