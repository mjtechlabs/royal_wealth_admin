/* eslint-disable react/no-unstable-nested-components */
import {Image} from 'antd'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {CommonButton, HeadingComponent, TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English, Images} from '@/services'
import {Store} from '@/store'
import {CloseSupportTicketData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import SupportApi from './api/SupportApi'

const CloseTicketPage = () => {
  const [closeTicketHistory, setCloseTicketHistory] = useState<CloseSupportTicketData[] | null>()
  const loaderRef = useRef<AppLoaderRef>(null)
  const navigate = useNavigate()
  const dataWithIndex = closeTicketHistory?.map((item, index) => ({
    id: index + 1,
    ...item
  }))
  const columns = [
    {
      name: English.E84,
      selector: (row: any) => row.id
    },
    {
      name: English.E97,
      cell: (row: any) => <div>{row?.date}</div>
    },
    {
      name: English.E149,

      cell: (row: CloseSupportTicketData) => <div>{row?.user_code}</div>
    },
    {
      name: English.E150,
      cell: (row: CloseSupportTicketData) => <div>{row?.user_name}</div>
    },
    {
      name: English.E151,
      cell: (row: CloseSupportTicketData) => <div>{row?.select_ticket_name}</div>
    },
    {
      name: English.E152,
      cell: (row: CloseSupportTicketData) => <div>{row?.question}</div>
    },
    {
      name: English.E153,
      cell: (row: CloseSupportTicketData) => (
        <Image preview src={row?.image !== '' ? row.image : Images.no_images} />
      )
    },
    {
      name: English.E107,
      cell: (row: CloseSupportTicketData) => <div>{row?.status}</div>
    },
    {
      name: English.E120,
      cell: (row: CloseSupportTicketData) => (
        <div className="flex flex-1 gap-1 w-fit ">
          <CommonButton
            className="small__transparent__button text-nowrap font-normal! text-sm py-1! px-1 w-fit!"
            singleLineContent={English.E220}
            onClick={async () =>
              navigate('/support/details-ticket', {state: {id: row?.r_id, isShow: false}})
            }
          />
        </div>
      ),
      minWidth: '190px'
    }
  ]

  const handleFetchHistory = useCallback(() => {
    loaderRef.current?.showLoader(true)
    const props = {
      token: Store?.getState()?.userData?.user?.token ?? ''
    }
    SupportApi.CloseTicket(props)
      .then((res) => {
        if (res) {
          setCloseTicketHistory(res?.data)
        }
        if (!res) {
          setCloseTicketHistory([])
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  useEffect(() => {
    handleFetchHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout2>
      <Loader ref={loaderRef} />
      <HeadingComponent className="flex justify-center pt-5" singleLineContent={English.E148} />
      <TableComponent columns={columns as any} data={dataWithIndex as CloseSupportTicketData[]} />
    </Layout2>
  )
}

export default CloseTicketPage
