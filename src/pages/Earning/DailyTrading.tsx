/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useRef, useState} from 'react'

import {TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {IncomeListApiData, IncomeListApiProps} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import IncomeReportApi from './api/IncomeReportApi'

const DailyTrading = () => {
  const [dailyTradingBonusData, setDailyTradingBonusData] = useState<IncomeListApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)
  const dataWithIndex = dailyTradingBonusData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))

  const IncomeListTableHeading = [
    {
      name: English.E84,
      selector: (row: any) => row.id
    },
    {
      name: English.E83,
      selector: (row: any) => row.usercode,
      sortable: true
    },
    {
      name: English.E98,
      cell: (value: any) => <span>$ {value?.amount}</span>,
      sortable: true
    },
    {
      name: English.E109,
      selector: (row: any) => row.details,
      sortable: true
    },
    {
      name: English.E97,
      selector: (row: any) => row.date,
      sortable: true
    }
  ]
  const handleFetchIncomeReportLists = useCallback(() => {
    loaderRef?.current?.showLoader(true)
    const payload: IncomeListApiProps = {
      income_type: 'daily'
    }

    IncomeReportApi.IncomeReportsLists(payload)
      .then((res) => {
        if (res) {
          setDailyTradingBonusData(res?.data)
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [])

  useEffect(() => {
    handleFetchIncomeReportLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout2 singleLineContent={English.E30}>
      <Loader ref={loaderRef} />

      <TableComponent
        columns={IncomeListTableHeading as unknown as any}
        data={dataWithIndex ?? []}
      />
    </Layout2>
  )
}

export default DailyTrading
