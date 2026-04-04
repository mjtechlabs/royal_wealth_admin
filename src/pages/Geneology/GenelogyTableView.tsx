/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs'
import {useCallback, useState} from 'react'

import {TableComponent} from '@/components'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {GeneologyApiData} from '@/types/ApiTypes'

import GeneologyAPI from './api/GenelogyAPI'

const GeneologyTableView = () => {
  const [geneologyData, setGeneologyData] = useState<GeneologyApiData[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const dataWithIndex = geneologyData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))

  const GeneologyTableHeading = [
    {
      name: English.E84,
      selector: (row: any) => row.id
    },
    {
      name: English.E83,
      selector: (row: GeneologyApiData) => row.user_reg_code,
      sortable: true
    },

    {
      name: English.E127,
      cell: (value: GeneologyApiData) => <span>${value?.totalbv ? value?.totalbv : '0'}</span>
    },

    {
      name: English.E77,
      selector: (row: GeneologyApiData) => row.user_active_date,
      sortable: true
    },

    {
      name: English.E78,
      selector: (row: GeneologyApiData) => row.user_reg_date,
      sortable: true
    }
  ]

  const getTreeTableData = useCallback((regStart: string, regEnd: string) => {
    setIsLoading(true)
    const payload = {
      regsdate: regStart !== '' ? dayjs(regStart).format('YYYY-MM-DD') : '',
      regedate: regEnd !== '' ? dayjs(regEnd).format('YYYY-MM-DD') : ''
    }
    GeneologyAPI.getGenologyTableView(payload)
      .then((res) => {
        if (res) {
          setGeneologyData(res?.data)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Layout2 singleLineContent={English.E128}>
      <Loader ref={(ref) => ref?.showLoader(isLoading)} />

      <FilterComponent
        isDateFilterType1
        onPressSearch={(data) => {
          if (!data.date1 && !data.date2) {
            setGeneologyData([])
            return
          }
          getTreeTableData(data.date1, data.date2)
        }}
      />
      <TableComponent
        columns={GeneologyTableHeading as unknown as any}
        data={dataWithIndex ?? []}
      />
    </Layout2>
  )
}

export default GeneologyTableView
