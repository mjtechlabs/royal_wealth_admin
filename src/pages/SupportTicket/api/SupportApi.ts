import {toast} from 'react-toastify'

import {EndPoints} from '@/services'
import ApiCall from '@/services/ApiCall'
import {
  CloseSupportTicketData,
  OpenSupportTicketData,
  SelectSupportTicketData,
  TicketChatData,
  TicketMessageType,
  TicketStatusProps
} from '@/types/ApiTypes'
import {LoginApiData} from '@/types/apiTypes/AuthApiPayloadType'

const OpenSupportTicket = async (props: Pick<LoginApiData, 'token'>) => {
  const payload = {
    token: props?.token
  }
  return new Promise<{data: OpenSupportTicketData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.openTicket, payload)
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
        resolve(null)
        toast.error(e?.result)
      })
  })
}

const CloseTicket = async (props: Pick<LoginApiData, 'token'>) => {
  const payload = {
    token: props?.token
  }
  return new Promise<{data: CloseSupportTicketData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.closeTicket, payload)
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
        resolve(null)
        toast.error(e?.result)
      })
  })
}

const TicketStatusChange = async (props: Pick<TicketStatusProps, 'r_id' | 'remark' | 'token'>) => {
  const payload = {
    token: props?.token,
    id: props?.r_id,
    remark: props?.remark
  }
  return new Promise<any>((resolve) => {
    ApiCall('post', EndPoints.statusTicket, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data
          })
        } else {
          toast.error(res?.result)
          resolve(false)
        }
      })
      .catch((e) => {
        resolve(false)
        toast.error(e?.result)
      })
  })
}

const TicketDetails = async (props: Pick<TicketStatusProps, 'r_id' | 'token'>) => {
  const payload = {
    token: props?.token,
    id: props?.r_id
  }
  return new Promise<{ticket: TicketMessageType; data: TicketChatData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.ticketDetails, payload)
      .then((res: any) => {
        if (res?.status === 200) {
          resolve({
            data: res?.data?.chat_details,
            ticket: res?.data?.ticket_heading_details?.[0]
          })
        } else {
          toast.error(res?.result)
          resolve(null)
        }
      })
      .catch((e) => {
        resolve(null)
        toast.error(e?.result)
      })
  })
}

const AddAdminRemark = async (
  props: Pick<TicketStatusProps, 'r_id' | 'token' | 'is_complate' | 'remark' | 'select_img'>
) => {
  const payload = {
    is_complate: props?.is_complate,
    remark: props?.remark,
    id: props?.r_id,
    select_img: props?.select_img
  }
  return new Promise<any>((resolve) => {
    ApiCall('post', EndPoints.addAdminRemark, payload, {}, true, false, ['select_img'])
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
        resolve(false)
        toast.error(e?.result)
      })
  })
}
const SelectSupportTicket = async (props: Pick<LoginApiData, 'token'>) => {
  const payload = {
    token: props?.token
  }

  return new Promise<{data: SelectSupportTicketData[]} | null>((resolve) => {
    ApiCall('post', EndPoints.getSelectSupport, payload)
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
        resolve(null)
        toast.error(e?.result)
      })
  })
}

const SupportApi = {
  CloseTicket,
  OpenSupportTicket,
  TicketStatusChange,
  TicketDetails,
  AddAdminRemark,
  SelectSupportTicket
}

export default SupportApi
