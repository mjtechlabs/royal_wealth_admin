import {toast} from 'react-toastify'

import ApiCall from '@/services/ApiCall'
import EndPoints from '@/services/EndPoints'
import {GetUserListApiProp, UserListApiData, UserUpdateApiProps} from '@/types/ApiTypes'
import {DropDownObjectType} from '@/types/CommonTypes'

const getUserList = async (props: GetUserListApiProp) => {
  const {actineedate, activesdate, email, regedate, regsdate, userstatus} = props
  const initialPayload = {
    actineedate,
    activesdate,
    email,
    regedate,
    regsdate,
    userstatus: userstatus.toString() === '-1' ? '' : userstatus
  }

  return new Promise<UserListApiData[]>((resolve) => {
    ApiCall('post', EndPoints.userList, initialPayload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(res?.data?.list_users)
        } else {
          resolve([])
          toast.error(res?.result)
        }
      })
      .catch((e) => {
        resolve([])
        toast.error(e?.data?.message)
      })
  })
}

const UpdateUser = async (props: UserUpdateApiProps) => {
  const payload = {
    userid: props?.usercode,
    email: props?.email,
    user_mobile: props?.user_mobile,
    name: props?.name,
    country_id: props?.country_id

    // state_id: props?.state_id,
    // city_id: props?.city_id
  }
  return new Promise<boolean>((resolve) => {
    ApiCall('post', EndPoints.userUpdate, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
        } else {
          toast.error(res?.result)
          resolve(false)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(false)
      })
  })
}
const getCountry = async () =>
  new Promise<DropDownObjectType[]>((resolve) => {
    ApiCall('post', EndPoints.getCountryList)
      .then((res: any) => {
        if (res?.status === 200) {
          const data: DropDownObjectType[] = res?.data?.map((item: any) => ({
            content: item.id,
            title: item.name
          }))
          resolve(data)
        } else {
          resolve([])
          toast.error(res?.result)
        }
      })
      .catch((e) => {
        resolve([])
        toast.error(e?.data?.message)
      })
  })

const getUserInfo = async (usercode: string) =>
  new Promise<any>((resolve) => {
    ApiCall('post', EndPoints.getUserInfo, {usercode})
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data?.[0]
          })
        } else {
          toast.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
        resolve(null)
      })
  })

const UpdateUserStatus = async (props: Pick<GetUserListApiProp, 'usercode'>) => {
  const payload = {usercode: props?.usercode}
  return new Promise<boolean>((resolve) => {
    ApiCall('post', EndPoints.updateUserStatus, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
        } else {
          toast.error(res?.result)
          resolve(false)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(false)
      })
  })
}

const updatePassword = async (props: {usercode: string; password: string}) =>
  new Promise<boolean>((resolve) => {
    ApiCall('post', EndPoints.updateUserPassword, {
      userid: props?.usercode,
      password: props?.password
    })
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
        } else {
          toast.error(res?.result)
          resolve(false)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(false)
      })
  })

const updateTransPassword = async (props: {usercode: string; password: string}) =>
  new Promise<boolean>((resolve) => {
    ApiCall('post', EndPoints.updateTransPassword, {
      userid: props?.usercode,
      password: props?.password
    })
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(true)
          toast.success(res?.result)
        } else {
          toast.error(res?.result)
          resolve(false)
        }
      })
      .catch((e) => {
        toast.error(e?.result)
        resolve(false)
      })
  })
const UserList = {
  getUserList,
  UpdateUserStatus,
  UpdateUser,
  getCountry,
  getUserInfo,
  updateTransPassword,
  updatePassword
}

export default UserList
