import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {Store} from '@/store'
import {
  GeneologyApiData,
  TreeDataResponse,
  TreeTableViewProps,
  TreeViewProps
} from '@/types/ApiTypes'

const getTreeView = async (props: TreeViewProps) => {
  const {userid} = props
  const payload = {token: Store.getState()?.userData?.user?.token, userid}
  return new Promise<TreeDataResponse | null>((resolve) => {
    ApiCall('post', EndPoints.getTreeView, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(res?.data)
        } else {
          resolve(null)
          toast.error(res?.result)
        }
      })
      .catch((e) => {
        resolve(null)
        toast.error(e?.data?.message)
      })
  })
}

const getGenologyTableView = async (props: TreeTableViewProps) => {
  const payload = {
    start_date: props?.regsdate,
    end_date: props?.regedate
  }
  return new Promise<{data: GeneologyApiData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.getTreeTableView, payload)
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

// const getGeneologyData = async (data: string) =>
//   new Promise<GeneologyModelData | null>((resolve) => {
//     ApiCall('post', EndPoints.getSpecificUser, {usercode: data})
//       .then((res: any) => {
//         if (res?.status === 200) {
//           resolve(res?.data)
//         } else {
//           resolve(null)
//           toast.error(res?.result)
//         }
//       })
//       .catch((e) => {
//         resolve(null)
//         toast.error(e?.data?.message)
//       })
//   })

const GeneologyAPI = {getTreeView, getGenologyTableView}
export default GeneologyAPI
