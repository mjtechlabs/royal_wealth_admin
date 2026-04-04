import {useEffect, useMemo, useRef, useState} from 'react'

import {DashboardCard} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English, Utility} from '@/services'
import {UserInfoDashboard} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import DashboardApi from './api/DashboardApi'

const Dashboard = () => {
  const [cardsDetails, setCardsDetails] = useState<UserInfoDashboard | null>(null)

  const loaderRef = useRef<AppLoaderRef>(null)

  useEffect(() => {
    loaderRef.current?.showLoader(true)
    DashboardApi.getDashboardDetails()
      .then((response) => {
        if (!response) return
        setCardsDetails(response?.getdaashbaorddata)
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  const dashboardCardData = useMemo(
    () => [
      {
        content1: English.E64,
        content2: cardsDetails?.activeuser ?? '0'
      },
      {
        content1: English.E74,
        content2: cardsDetails?.totaluser ?? '0'
      },
      {
        content1: English.E70,
        content2: cardsDetails?.inactiveuser ?? ' 0'
      },
      {
        content1: English.E73,
        content2: cardsDetails?.totalbusiness ?? '0'
      },
      {
        content1: English.E67,
        content2: cardsDetails?.totalincomewallet ?? '0'
      },
      {
        content1: English.E68,
        content2: cardsDetails?.totaltopup ?? '0'
      },
      {
        content1: English.E71,
        content2: cardsDetails?.daily_trading_profit ?? '0'
      },

      {
        content1: English.E166,
        content2: cardsDetails?.direct_referral_income ?? '0'
      },
      {
        content1: English.E165,
        content2: cardsDetails?.royalty_bonuss ?? '0'
      },
      {
        content1: English.E167,
        content2: cardsDetails?.level_income ?? '0'
      },
      {
        content1: English.E168,
        content2: cardsDetails?.rank_bonus ?? '0'
      }
    ],
    [cardsDetails]
  )

  return (
    <Layout2 singleLineContent={English.E11}>
      <Loader ref={loaderRef} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5 pb-5 ">
        {dashboardCardData?.map((items) => {
          const {content1, content2} = items
          const spanContent =
            content1 !== 'Active Users' &&
            content1 !== 'Total User' &&
            content1 !== 'InActive User' &&
            content1 !== 'Total Business' &&
            content1 !== 'Total Income Wallet Balance' &&
            content1 !== 'Total Topup'
              ? `$${Utility.numberConversion(Number(content2 ?? 0))}`
              : content2
          return (
            <DashboardCard
              key={content1}
              imageUrl=""
              spanContent={spanContent?.toString()}
              title={content1}
            />
          )
        })}
      </div>
    </Layout2>
  )
}

export default Dashboard
