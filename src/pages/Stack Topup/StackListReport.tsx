/* eslint-disable react/no-unstable-nested-components */

import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {HeadingComponent, TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {GiftListApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import StackTopupApi from './api/StackTopupApi'

const StackListReport = () => {
  const [giftListData, setGiftListData] = useState<GiftListApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)
  const dataWithIndex = useMemo(
    () => giftListData?.map((item, index) => ({id: index + 1, ...item})),
    [giftListData]
  )

  const handleFetchGiftListReport = useCallback(() => {
    loaderRef?.current?.showLoader(true)
    StackTopupApi.GiftListReport()
      .then((res) => {
        if (res?.data) {
          setGiftListData(res?.data)
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [])

  const GiftListHeading = [
    {
      name: English.E84,
      selector: (row: any) => row.id
    },
    {
      name: English.E149,
      selector: (row: any) => row.user_reg_code,
      sortable: true
    },
    {
      name: English.E98,
      selector: (row: any) => row.amount,
      cell: (row: any) => <span>${row.amount}</span>,
      sortable: true
    },

    {
      name: English.E97,
      selector: (row: any) => row.date,
      sortable: true
    }
  ]
  useEffect(() => {
    handleFetchGiftListReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2>
      <HeadingComponent
        isUnderline
        className="text-left mt-5"
        singleLineContent="Stack Topup List"
      />
      <Loader ref={loaderRef} />

      <TableComponent columns={GiftListHeading} data={dataWithIndex ?? []} />
    </Layout2>
  )
}

export default StackListReport
