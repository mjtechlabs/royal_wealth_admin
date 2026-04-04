/* eslint-disable react/no-unstable-nested-components */
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'

import {HeadingComponent, TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {UserIncomeWalletReportDetails} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import WalletReportApi from './api/WalletReportApi'

const UserWalletIncomeDetails = () => {
  const [userWalletDetailsData, setUserWalletDetailsData] = useState<
    UserIncomeWalletReportDetails[] | null
  >([])

  const loaderRef = useRef<AppLoaderRef>(null)
  const location = useLocation()
  const locationData = useMemo(
    () => ({userCode: location.state?.userCode, type: location?.state?.type}),
    [location.state]
  )
  const dataWithIndex = userWalletDetailsData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))

  const userWalletList = [
    {
      name: English.E84,
      selector: (row: any) => row.id,
      grow: 0
    },
    {
      name: English.E97,
      selector: (row: any) => row.date,
      minWidth: '160px',
      sortable: true
    },

    {
      name: English.E129,
      selector: (row: any) => <span>${row.debit}</span>,
      sortable: true
    },

    {
      name: English.E130,

      selector: (row: any) => <span>${row.credit}</span>,
      sortable: true
    },
    {
      name: English.E137,

      selector: (row: any) => <span>${row.w_current}</span>,
      sortable: true
    }
  ]
  const handleUserWalletDetailsReport = useCallback(() => {
    loaderRef?.current?.showLoader(true)

    WalletReportApi.IncomeUserWalletDetails({
      usercode: locationData?.userCode
    })
      .then((res) => {
        if (res) {
          setUserWalletDetailsData(res?.data)
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [locationData?.userCode])

  useEffect(() => {
    if (locationData) {
      handleUserWalletDetailsReport()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2>
      <Loader ref={loaderRef} />
      <HeadingComponent
isUnderline className="text-left mt-5"
singleLineContent={English.E230} />
      <TableComponent columns={userWalletList as any} data={dataWithIndex ?? []} />
    </Layout2>
  )
}
export default UserWalletIncomeDetails
