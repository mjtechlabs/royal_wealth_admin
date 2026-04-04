import {toast} from 'react-toastify'

import {ApiCall, EndPoints} from '@/services'
import {
  UserIncomeWalletReportDetails,
  UserWalletDetailsProps,
  UserWalletReportData
} from '@/types/ApiTypes'

const userWalletReport = async () =>
  new Promise<{data: UserWalletReportData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.userWalletReport)
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

const UserDepositWalletDetails = async (props: UserWalletDetailsProps) =>
  new Promise<{data: UserIncomeWalletReportDetails[] | []}>((resolve) => {
    ApiCall('post', EndPoints.depositWalletReport, props)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast?.error(res?.result)
          resolve({data: []})
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve({data: []})
      })
  })

const IncomeUserWalletDetails = async (props: UserWalletDetailsProps) =>
  new Promise<{data: UserIncomeWalletReportDetails[] | []}>((resolve) => {
    ApiCall('post', EndPoints.incomeWalletReport, props)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast?.error(res?.result)
          resolve({data: []})
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve({data: []})
      })
  })

// const WalletReport = async () =>
//   new Promise<{data: WithDrawApiData[]} | null>((resolve) => {
//     ApiCall('post', EndPoints.walletReport)
//       .then((res: any) => {
//         if (res?.status === 200) {
//           // console.log('res-with', res)
//           resolve({
//             data: res?.data
//           })
//         } else {
//           toast?.error(res?.result)
//           resolve(null)
//         }
//       })
//       .catch((e) => {
//         toast.error(e?.result)
//         resolve(null)
//       })
//   })
const WalletReportApi = {
  // WalletReport,
  userWalletReport,
  UserDepositWalletDetails,
  IncomeUserWalletDetails
}

export default WalletReportApi
