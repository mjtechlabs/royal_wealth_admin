/* eslint-disable react/no-unstable-nested-components */
import {Image} from 'antd'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {CommonButton, HeadingComponent, ModalAntdComponent, TableComponent} from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {Store} from '@/store'
import {OpenSupportTicketData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import SupportApi from './api/SupportApi'

const OpenTicketPage = () => {
  const [openTicketHistory, setOpenTicketHistory] = useState<OpenSupportTicketData[] | null>()
  const [rowData, setRowData] = useState<OpenSupportTicketData | null>()
  const [inputValues, setInputValues] = useState({
    remark: ''
  })
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const loaderRef = useRef<AppLoaderRef>(null)
  const navigate = useNavigate()
  const dataWithIndex = openTicketHistory?.map((item, index) => ({
    id: index + 1,
    ...item
  }))

  const handleFetchHistory = useCallback(() => {
    loaderRef.current?.showLoader(true)
    const props = {
      token: Store?.getState()?.userData?.user?.token ?? ''
    }
    SupportApi.OpenSupportTicket(props)
      .then((res) => {
        if (res) {
          setOpenTicketHistory(res?.data)
        }

        if (!res) {
          setOpenTicketHistory([])
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])
  const handleTicketReqAction = useCallback(
    (r_id: string) => {
      loaderRef.current?.showLoader(true)
      SupportApi.TicketStatusChange({
        token: Store?.getState()?.userData?.user?.token ?? '',
        r_id: r_id ?? '',
        remark: inputValues?.remark ?? ''
      })
        .then((res) => {
          if (res) {
            handleFetchHistory()
            setModalOpen(false)
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [handleFetchHistory, inputValues?.remark]
  )

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

      cell: (row: OpenSupportTicketData) => <div>{row?.user_code}</div>
    },
    {
      name: English.E150,
      cell: (row: OpenSupportTicketData) => <div>{row?.user_name}</div>
    },
    {
      name: English.E151,
      cell: (row: OpenSupportTicketData) => <div>{row?.select_ticket_name}</div>
    },
    {
      name: English.E152,
      cell: (row: OpenSupportTicketData) => <div>{row?.question}</div>
    },
    {
      name: English.E153,
      cell: (row: OpenSupportTicketData) => <Image preview src={row?.image ?? ''} />
    },
    {
      name: English.E107,
      cell: (row: OpenSupportTicketData) => <div>{row?.status}</div>
    },
    {
      name: English.E120,
      cell: (row: OpenSupportTicketData) => (
        <div className="flex flex-1 gap-1 w-fit ">
          <CommonButton
            className="small__transparent__button text-nowrap font-normal! text-sm py-1! px-1 w-fit!"
            singleLineContent={English.E220}
            onClick={async () =>
              navigate('/support/details-ticket', {state: {id: row?.r_id, isShow: true}})
            }
          />
          <CommonButton
            className="small__transparent__button bg-primary-red! text-nowrap font-normal! text-sm py-1! px-1 w-fit!"
            singleLineContent="Close"
            onClick={() => {
              setModalOpen(true)
              setRowData(row)
            }}
          />
        </div>
      ),
      minWidth: '190px'
    }
  ]

  useEffect(() => {
    handleFetchHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout2>
      <Loader ref={loaderRef} />
      <ModalAntdComponent open={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col gap-3">
          <HeadingComponent
            isUnderline
            className="text-center mt-5"
            singleLineContent={English.E154}
          />
          <InputComponent
            labelText="Remark"
            name="remark"
            placeholder="Enter Remark :"
            onChange={(e) => {
              setInputValues({
                remark: e.target.value
              })
            }}
          />
          <CommonButton
            className="small__filled__button w-full! py-3.5"
            disabled={Object.values(inputValues).some((item) => item === '')}
            singleLineContent="Submit"
            onClick={() => {
              handleTicketReqAction(rowData?.r_id ?? '')
            }}
          />
        </div>
      </ModalAntdComponent>
      <div>
        <HeadingComponent className="flex justify-center pt-5" singleLineContent={English.E147} />
        {open ? (
          <Image
            src={rowData?.image ?? ''}
            style={{display: 'none'}}
            preview={{
              open,
              onVisibleChange: (vis) => setOpen(vis)
            }}
          />
        ) : null}
      </div>
      <TableComponent columns={columns as any} data={dataWithIndex as any[]} />
    </Layout2>
  )
}

export default OpenTicketPage
