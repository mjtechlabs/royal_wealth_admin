import {useEffect, useMemo, useRef, useState} from 'react'

import {DashboardCard} from '@/components'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English, Images, Utility} from '@/services'
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
        content1: English.E74,
        content2: cardsDetails?.totaluser ?? '0',
        icon: Images.users
      },
      {
        content1: English.E64,
        content2: cardsDetails?.activeuser ?? '0',
        icon: Images.usercheckIcon
      },
      {
        content1: English.E70,
        content2: cardsDetails?.inactiveuser ?? '0',
        icon: Images.usercrossIcon
      },
      {
        content1: English.E251,
        content2: cardsDetails?.totaltodaybusiness ?? '0',
        icon: Images.business
      },
      {
        content1: English.E73,
        content2: cardsDetails?.totalbusiness ?? '0',
        icon: Images.business
      },
      {
        content1: English.E249,
        content2: cardsDetails?.totalstacking ?? '0',
        icon: Images.briefcaseIcon
      },
      {
        content1: English.E67,
        content2: cardsDetails?.totalincomewallet ?? '0',
        icon: Images.wallet
      },
      // {
      //   content1: English.E68,
      //   content2: cardsDetails?.totaltopup ?? '0',
      //   icon: Images.topUp
      // },
      {
        content1: English.E237,
        content2: cardsDetails?.autopool1 ?? '0',
        icon: Images.money
      },
      {
        content1: English.E238,
        content2: cardsDetails?.autopool2 ?? '0',
        icon: Images.inviteIcon
      },
      {
        content1: English.E240,
        content2: cardsDetails?.autopool3 ?? '0',
        icon: Images.inviteIcon
      },
      {
        content1: English.E241,
        content2: cardsDetails?.autopool4 ?? '0',
        icon: Images.inviteIcon
      },
      {
        content1: English.E242,
        content2: cardsDetails?.autopool5 ?? '0',
        icon: Images.inviteIcon
      },
      // {
      //   content1: English.E165,
      //   content2: cardsDetails?.royalty_bonuss ?? '0',
      //   icon: Images.rewardIcon
      // },
      {
        content1: English.E167,
        content2: cardsDetails?.level_income ?? '0',
        icon: Images.network
      },
      // {
      //   content1: English.E239,
      //   content2: cardsDetails?.cashback ?? '0',
      //   icon: Images.rocket
      // },
      {
        content1: English.E33,
        content2: cardsDetails?.poolincome ?? '0',
        icon: Images.briefcaseIcon
      },
      {
        content1: English.E30,
        content2: cardsDetails?.dailyincome ?? '0',
        icon: Images.business
      },
      {
        content1: English.E31,
        content2: cardsDetails?.directincome ?? '0',
        icon: Images.topUp
      }
    ],
    [cardsDetails]
  )

  return (
    <Layout2 singleLineContent={English.E11}>
      <Loader ref={loaderRef} />
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 pb-6">
        {dashboardCardData?.map((items) => {
          const {content1, content2, icon} = items
          const spanContent =
            content1 !== 'Active Users' &&
            content1 !== 'Total User' &&
            content1 !== 'InActive User' &&
            content1 !== 'Total Business' &&
            content1 !== 'Total Income Wallet Balance' &&
            content1 !== 'Total Topup' &&
            content1 !== 'Autopool 1' &&
            content1 !== 'Autopool 2' &&
            content1 !== 'Autopool 3' &&
            content1 !== 'Autopool 4' &&
            content1 !== 'Autopool 5'
              ? `$${Utility.numberConversion(Number(content2 ?? 0))}`
              : content2
          return (
            <DashboardCard
              key={content1}
              imageUrl={icon}
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
