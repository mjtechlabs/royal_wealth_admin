import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {UserBalanceReportApiData} from '@/types/ApiTypes'

const UserBalanceReport = async () =>
  new Promise<{data: UserBalanceReportApiData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.adminIncomeWalletReport)
      .then((res: any) => {
        // console.log('res123', res)
        if (res?.status === 200) {
          resolve({
            data: res?.data?.income_walllet
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

const UserBalanceReportApi = {UserBalanceReport}
export default UserBalanceReportApi
