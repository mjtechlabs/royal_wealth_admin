import {useCallback, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {CommonButton, TableComponent} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {UserWalletReportData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import WalletReportApi from './api/WalletReportApi'

const UserWalletReport = () => {
  const [reportData, setReportData] = useState<UserWalletReportData[] | null>([])

  const loaderRef = useRef<AppLoaderRef>(null)
  const dataWithIndex = reportData?.map((item, index) => ({
    id: index + 1,
    ...item
  }))
  const navigate = useNavigate()

  const IncomeListTableHeading = [
    {
      name: English.E84,

      selector: (row: any) => row.id
    },
    {
      name: English.E83,
      selector: (row: UserWalletReportData) => row.usercode,
      sortable: true
    },
    {
      name: English.E80,
      selector: (row: UserWalletReportData) => row.name,
      sortable: true
    },
    {
      name: English.E227,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (value: UserWalletReportData) => (
        <div>
          <CommonButton
            className=" text-nowrap bg-green-500! hover:bg-green-600! font-normal! text-sm py-1! px-1.5"
            singleLineContent={`$${value?.deposit_wallet}`}
            onClick={async () =>
              navigate('/user-deposit-details', {
                state: {userCode: value.usercode, type: 'wallet_trans'}
              })
            }
          />
        </div>
      )
    },
    {
      name: English.E228,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (value: UserWalletReportData) => (
        <div>
          <CommonButton
            className=" text-nowrap bg-red-500! hover:bg-red-600! font-normal! text-sm py-1! px-1.5"
            singleLineContent={`$${value?.income_wallet}`}
            onClick={async () =>
              navigate('/user-wallet-details', {
                state: {userCode: value.usercode, type: 'income_wallet'}
              })
            }
          />
        </div>
      )
    }
  ]
  const handleFetchIncomeReportLists = useCallback(() => {
    loaderRef?.current?.showLoader(true)

    WalletReportApi.userWalletReport()
      .then((res) => {
        if (res) {
          setReportData(res?.data)
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
    <Layout2 singleLineContent={English.E226}>
      <Loader ref={loaderRef} />

      <TableComponent
        columns={IncomeListTableHeading as unknown as any}
        data={dataWithIndex ?? []}
      />
    </Layout2>
  )
}

export default UserWalletReport
