import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {UserInfoDashboard} from '@/types/ApiTypes'

const getDashboardDetails = async () =>
  new Promise<{getdaashbaorddata: UserInfoDashboard} | null>((resolve) => {
    ApiCall('post', EndPoints.dashboard)
      .then((res: any) => {
        if (res.status === 200) {
          resolve({
            getdaashbaorddata: res?.data?.getdaashbaorddata
          })
        } else {
          resolve(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
        resolve(null)
      })
  })

const DashboardApi = {getDashboardDetails}

export default DashboardApi
