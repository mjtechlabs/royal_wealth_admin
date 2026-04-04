/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useRef, useState} from 'react'

import {CommonButton, TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {WithDrawApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import WithDrawalApi from '../Withdrawal/api/WithDrawalApi'
import WithoutGatewayApi from './api/WithoutGatewayApi'

const WithoutGateway = () => {
  const [withdrawData, setWithdrawData] = useState<WithDrawApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)

  const dataWithIndex = withdrawData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))

  const handleFetchWithDrawHistory = useCallback(() => {
    loaderRef.current?.showLoader(true)
    WithDrawalApi.WithDrawData()
      .then((res) => {
        if (res?.data) {
          setWithdrawData(res?.data)
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  const handleReqAction = useCallback(
    (withdrawid: string, status: string) => {
      loaderRef.current?.showLoader(true)

      WithoutGatewayApi.WithdrawReqAction({status, withdrawid})
        .then((res) => {
          if (res) {
            handleFetchWithDrawHistory()
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [handleFetchWithDrawHistory]
  )
  const WithDrawTableHeading = [
    {
      name: English.E84,
      selector: (row: any) => row.id
    },
    {
      name: English.E97,
      selector: (row: WithDrawApiData) => row.date,
      minWidth: '150px',
      sortable: true
    },
    {
      name: English.E160,
      selector: (row: WithDrawApiData) => row.user_name,
      sortable: true
    },
    {
      name: English.E83,
      selector: (row: WithDrawApiData) => row.user_reg_code,
      sortable: true
    },
    {
      name: English.E99,
      selector: (row: WithDrawApiData) => row.wallet_address,
      minWidth: '350px',
      sortable: true
    },
    {
      name: English.E223,
      selector: (row: WithDrawApiData) => <span>${row.totalamount}</span>,
      sortable: true
    },
    {
      name: English.E117,
      selector: (row: WithDrawApiData) => <span>${row.admin_charge}</span>,
      sortable: true
    },
    {
      name: English.E116,
      selector: (row: WithDrawApiData) => <span>${row.remain}</span>,
      sortable: true
    },

    {
      name: English.E120,
      minWidth: '150px',

      cell: (row: WithDrawApiData) => (
        <div className="flex gap-0.5">
          <CommonButton
            className="bg-primary-green! text-black! text-nowrap!"
            singleLineContent="Accept"
            onClick={() => {
              handleReqAction(row?.withdraw_id, '1')
            }}
          />
          <CommonButton
            className="bg-primary-red! text-black! text-nowrap!"
            singleLineContent="Reject"
            onClick={() => {
              handleReqAction(row?.withdraw_id, '2')
            }}
          />
        </div>
      ),
      sortable: true
    }
  ]

  useEffect(() => {
    handleFetchWithDrawHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 singleLineContent={English.E234}>
      <Loader ref={loaderRef} />

      <TableComponent columns={WithDrawTableHeading as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}

export default WithoutGateway
