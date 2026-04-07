/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useRef, useState} from 'react'

import {TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {WithDrawApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import WithdrawalReqApi from './api/WithdrawalReqApi'

const UsdtWithdrawalReport = () => {
  const [withdrawData, setWithdrawData] = useState<WithDrawApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)

  const dataWithIndex = withdrawData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))

  const handleFetchWithDrawReq = useCallback(() => {
    loaderRef.current?.showLoader(true)

    // WithdrawalReqApi.WithdrawReqData()

    WithdrawalReqApi.UsdtWithdrawReqData()
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
      name: English.E98,
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
      name: English.E107,
      selector: (row: WithDrawApiData) => <span>{row.status}</span>,
      sortable: true
    }
  ]

  useEffect(() => {
    handleFetchWithDrawReq()
    // handleReqAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 singleLineContent={English.E38}>
      <Loader ref={loaderRef} />
      <TableComponent columns={WithDrawTableHeading as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}
export default UsdtWithdrawalReport
