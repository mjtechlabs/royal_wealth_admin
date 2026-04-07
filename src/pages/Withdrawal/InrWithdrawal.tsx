/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useRef, useState} from 'react'

import {TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {InrWithdRawReport} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import WithdrawalReqApi from './api/WithdrawalReqApi'

const InrWithdrawal = () => {
  const [withdrawData, setWithdrawData] = useState<InrWithdRawReport[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)

  const dataWithIndex = withdrawData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))

  const handleFetchWithDrawReq = useCallback(() => {
    loaderRef.current?.showLoader(true)

    // WithdrawalReqApi.WithdrawReqData()

    WithdrawalReqApi.InrWithdrawReqData()
      .then((res) => {
        if (res?.data) {
          setWithdrawData(res?.data)
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  const WithDrawTableHeading = [
    {
      name: English.E84,
      selector: (row: any) => row.id
    },
    {
      name: English.E97,
      selector: (row: InrWithdRawReport) => row.date,
      minWidth: '150px',
      sortable: true
    },
    {
      name: English.E160,
      selector: (row: InrWithdRawReport) => row.user_name,
      sortable: true
    },
    {
      name: English.E83,
      selector: (row: InrWithdRawReport) => row.user_reg_code,
      sortable: true
    },
    {
      name: English.E217,
      selector: (row: InrWithdRawReport) => row.bank_details,
      sortable: true
    },
    {
      name: English.E98,
      selector: (row: InrWithdRawReport) => <span>${row.totalamount}</span>,
      sortable: true
    },
    {
      name: English.E117,
      selector: (row: InrWithdRawReport) => <span>${row.admin_charge}</span>,
      sortable: true
    },
    {
      name: English.E235,
      selector: (row: InrWithdRawReport) => <span>${row.remain}</span>,
      sortable: true
    }
  ]

  useEffect(() => {
    handleFetchWithDrawReq()
    // handleReqAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 singleLineContent={English.E37}>
      <Loader ref={loaderRef} />
      <TableComponent columns={WithDrawTableHeading as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}
export default InrWithdrawal
