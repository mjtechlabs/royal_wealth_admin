/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {HeadingComponent, TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {AdminTransHistoryApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import AdminTransHistoryApi from './api/AdminTransHistoryApi'

const DepositHistory = () => {
  const [adminTransData, setAdminTransData] = useState<AdminTransHistoryApiData[] | null>([])

  const loaderRef = useRef<AppLoaderRef>(null)
  const dataWithIndex = adminTransData?.map((item, index) => ({
    id: index + 1,

    ...item
  }))

  const columns = useMemo(
    () => [
      {
        name: English.E84,
        selector: (row: any) => row.id,
        grow: 0
      },
      {
        name: English.E83,
        selector: (row: AdminTransHistoryApiData) => row.usercode,
        sortable: true
      },
      {
        name: English.E150,
        selector: (row: AdminTransHistoryApiData) => (
          <span>{row.username !== '' ? row.username : '--'}</span>
        ),
        sortable: true
      },
      {
        name: English.E97,
        selector: (row: AdminTransHistoryApiData) => row.date,
        minWidth: '160px',
        sortable: true
      },

      {
        name: English.E129,
        selector: (row: AdminTransHistoryApiData) => <span>${row.w_debit}</span>,
        sortable: true
      },

      {
        name: English.E130,
        selector: (row: AdminTransHistoryApiData) => <span>${row.w_credit}</span>,
        sortable: true
      },
      {
        name: English.E131,
        selector: (row: AdminTransHistoryApiData) => row.w_details,
        sortable: true
      }
    ],
    []
  )

  const handleAdminTransHistoryReport = useCallback(() => {
    loaderRef?.current?.showLoader(true)

    AdminTransHistoryApi.AdminTransHistory()
      .then((res) => {
        // console.log('res', res)
        if (res?.data) {
          setAdminTransData(res?.data)
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [])

  useEffect(() => {
    handleAdminTransHistoryReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2>
      <Loader ref={loaderRef} />
      <HeadingComponent
isUnderline className="text-left mt-5"
singleLineContent={English.E123} />
      <TableComponent columns={columns as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}
export default DepositHistory
