/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs'
import {useCallback, useEffect, useRef, useState} from 'react'

import {TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {TopUpApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import StackingApi from './api/StackingApi'

const StackingList = () => {
  const [stackingList, setStackingList] = useState<TopUpApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)
  const dataWithIndex = stackingList?.map((item, index) => ({
    id: index + 1,
    ...item
  }))
  const handleFetchStackingHistory = useCallback(
    (regsdate: string, regedate: string, userCode: string) => {
      loaderRef?.current?.showLoader(true)
      const payload = {
        regsdate: regsdate !== '' ? dayjs(regsdate).format('YYYY-MM-DD') : '',
        regedate: regedate !== '' ? dayjs(regedate).format('YYYY-MM-DD') : '',
        usercode: userCode ?? ''
      }

      StackingApi.StackingHistory(payload)
        .then((res) => {
          if (res?.data) {
            setStackingList(res?.data)
          }
        })
        .finally(() => {
          loaderRef?.current?.showLoader(false)
        })
    },
    []
  )
  const TopupTableHeading = [
    {
      name: English.E84,
      selector: (row: any) => row.id,
      grow: 0
    },
    {
      name: English.E83,
      selector: (row: TopUpApiData) => row.user_reg_code,
      sortable: true
    },
    {
      name: English.E80,
      selector: (row: TopUpApiData) => row.user_name,
      sortable: true
    },
    {
      name: English.E97,
      selector: (row: TopUpApiData) => row.date,
      sortable: true
    },
    {
      name: English.E223,
      selector: (row: TopUpApiData) => <span>{row?.totalamount}</span>,
      sortable: true
    },
    {
      name: English.E244,
      selector: (row: TopUpApiData) => <span>${row?.dailyamount}</span>,
      sortable: true
    },
    {
      name: English.E245,
      selector: (row: TopUpApiData) => <span>${row?.roigiven}</span>,
      sortable: true
    },
    {
      name: English.E246,
      selector: (row: TopUpApiData) => <span>${row?.totalroi}</span>,
      sortable: true
    }
  ]

  useEffect(() => {
    handleFetchStackingHistory('', '', '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 singleLineContent={English.E243}>
      <Loader ref={loaderRef} />

      <TableComponent columns={TopupTableHeading as unknown as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}

export default StackingList
