/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {HeadingComponent, TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {UserBalanceReportApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import UserBalanceReportApi from './api/UserBalanceReportApi'

const IncomeHistory = () => {
  const [userBalanceData, setUserBalanceData] = useState<UserBalanceReportApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)

  const dataWithIndex = userBalanceData?.map((item, index) => ({
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
        selector: (row: UserBalanceReportApiData) => row.user_reg_code,
        sortable: true
      },
      {
        name: English.E150,
        selector: (row: UserBalanceReportApiData) => (
          <span>{row.user_name !== '' ? row.user_name : '--'}</span>
        ),
        sortable: true
      },

      {
        name: English.E137,
        selector: (row: UserBalanceReportApiData) => <span>${row.w_current}</span>,
        sortable: true
      },

      {
        name: English.E130,
        selector: (row: UserBalanceReportApiData) => <span>${row.w_credit}</span>,
        sortable: true
      },
      {
        name: English.E220,
        selector: (row: UserBalanceReportApiData) => row.w_details,
        sortable: true
      }
    ],
    []
  )

  const handleUserBalanceReport = useCallback(() => {
    loaderRef?.current?.showLoader(true)

    UserBalanceReportApi.UserBalanceReport()
      .then((res) => {
        if (res?.data) {
          setUserBalanceData(res?.data)
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [])

  useEffect(() => {
    handleUserBalanceReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2>
      <Loader ref={loaderRef} />
      <HeadingComponent
isUnderline className="text-left mt-5"
singleLineContent={English.E124} />
      <TableComponent columns={columns as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}
export default IncomeHistory
