/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useRef, useState} from 'react'

import {TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {IncomeListApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import IncomeReportApi from './api/IncomeReportApi'

const CashbackBonus = () => {
  const [levelBonusData, setLevelBonusData] = useState<IncomeListApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)
  const dataWithIndex = levelBonusData?.map((item, index) => ({
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
      name: English.E220,
      selector: (row: any) => <span className="text-wrap">{row.details}</span>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: English.E97,
      selector: (row: any) => <span className="text-wrap">{row.date}</span>,
      sortable: true,
      minWidth: '150px'
    }
  ]
  const handleFetchIncomeReportLists = useCallback(() => {
    loaderRef?.current?.showLoader(true)
    const payload = {
      income_type: 'direct'
    }

    IncomeReportApi.IncomeReportsLists(payload)
      .then((res) => {
        if (res) {
          setLevelBonusData(res?.data)
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
    <Layout2 singleLineContent={English.E239}>
      <Loader ref={loaderRef} />

      <TableComponent
        columns={IncomeListTableHeading as unknown as any}
        data={dataWithIndex ?? []}
      />
    </Layout2>
  )
}

export default CashbackBonus
