import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {IncomeListApiData, IncomeListApiProps} from '@/types/ApiTypes'

const IncomeReportsLists = async (props: IncomeListApiProps) => {
  const payload = {
    income_type: props?.income_type
  }
  return new Promise<{data: IncomeListApiData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.incomeReport, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(null)
      })
  })
}

const IncomeReportApi = {IncomeReportsLists}
export default IncomeReportApi
