// import {toast} from 'react-toastify'

// import {ApiCall, EndPoints} from '@/services'
// import {CityData, GetCityApiProps, StateData} from '@/types/ApiTypes'

// const getState = async () =>
//   new Promise<StateData[]>((resolve) => {
//     ApiCall('post', EndPoints.getState)
//       .then((res: any) => {
//         if (res?.status === 200) {
//           resolve(res?.data)
//         } else {
//           toast.error(res?.result)
//           resolve([])
//         }
//       })
//       .catch((e) => {
//         toast.error(e?.result)
//         resolve([])
//       })
//   })

// const getCity = async (props: GetCityApiProps) => {
//   const payload = {
//     state_id: props?.state_id
//   }
//   return new Promise<CityData[]>((resolve) => {
//     ApiCall('post', EndPoints.getCity, payload)
//       .then((res: any) => {
//         if (res?.status === 200) {
//           resolve(res?.data)
//         } else {
//           toast.error(res?.result)
//           resolve([])
//         }
//       })
//       .catch((e) => {
//         toast.error(e?.result)
//         resolve([])
//       })
//   })
// }

const StateCityApi = {}
export default StateCityApi
