/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs'
import {useCallback, useEffect, useRef, useState} from 'react'

import {TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {TopUpApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import TopupApi from './api/TopupApi'

const Topup = () => {
  const [topupData, setTopupData] = useState<TopUpApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)
  const dataWithIndex = topupData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))
  const handleFetchToptupHistory = useCallback(
    (regsdate: string, regedate: string, userCode: string) => {
      loaderRef?.current?.showLoader(true)
      const payload = {
        regsdate: regsdate !== '' ? dayjs(regsdate).format('YYYY-MM-DD') : '',
        regedate: regedate !== '' ? dayjs(regedate).format('YYYY-MM-DD') : '',
        usercode: userCode ?? ''
      }

      TopupApi.TopupHistory(payload)
        .then((res) => {
          if (res?.data) {
            // console.log('res', res)
            setTopupData(res?.data)
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
      name: English.E98,
      cell: (value: TopUpApiData) => <span>${value?.roi_amount_daily}</span>
    },
    {
      name: English.E222,
      selector: (row: TopUpApiData) => <span>{row?.roi_per}</span>,
      sortable: true
    },
    {
      name: English.E221,
      selector: (row: TopUpApiData) => <span>${row?.roi_given}</span>,
      sortable: true
    },
    {
      name: English.E223,
      selector: (row: TopUpApiData) => <span>{row?.totalamount}</span>,
      sortable: true
    },
    {
      name: English.E224,
      selector: (row: TopUpApiData) => <span>{row?.ordewrby}</span>,
      sortable: true
    }
  ]

  useEffect(() => {
    handleFetchToptupHistory('', '', '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 singleLineContent={English.E16}>
      <Loader ref={loaderRef} />

      <TableComponent columns={TopupTableHeading as unknown as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}

export default Topup
