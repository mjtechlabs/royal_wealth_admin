import { Route } from 'react-router-dom'

import { Layout } from '@/layout'
import LazyLoader from '@/LazyLoader'
import {
  Dashboard,
  DepositUserWalletDetails,
  LevelBonus,
  TopUp,
  TreeView,
  Users,
  UserWalletDetails,
  Withdrawal
} from '@/pages'
import AutopoolDetails from '@/pages/AutopoolDetails/AutopoolDetails'
import PopupImage from '@/pages/DashboardPopup/PopupImage'
import CashbackBonus from '@/pages/Earning/CashbackBonus'
import DailyTradingBonus from '@/pages/Earning/DailyTradingBonus'
import PoolBonus from '@/pages/Earning/PoolBonus'
import GeneologyTableView from '@/pages/Geneology/GenelogyTableView'
import StackingList from '@/pages/Stacking/StackingList'
import CloseTicketPage from '@/pages/SupportTicket/CloseTicket'
import DetailsSupportTicket from '@/pages/SupportTicket/DetailsSupportTicket'
import OpenTicketPage from '@/pages/SupportTicket/OpenTicket'
import UpdateUser from '@/pages/Users/UpdateUser'
import DepositHistory from '@/pages/WalletManage/DepositHistory'
import IncomeHistory from '@/pages/WalletManage/IncomeHistory'
import SendBalance from '@/pages/WalletManage/SendBalance'
import UserWalletReport from '@/pages/WalletReport/UserWalletReport'
// import InrWithdrawal from '@/pages/Withdrawal/InrWithdrawal'
import UsdtWithdrawal from '@/pages/Withdrawal/UsdtWithdrawal'
import UsdtWithdrawalReport from '@/pages/Withdrawal/UsdtWithdrawalReport'
import WithoutGateway from '@/pages/WithoutGateWayWithdraw/WithoutGateway'
import { UserWrapper } from '@/Wrapper'
import GiftIdTopup from '@/pages/GiftIdTopup/GiftIdTopup'
import GitIdListReport from '@/pages/GiftIdTopup/GitIdListReport'
import StackTopup from '@/pages/Stack Topup/StackTopup'
import StackListReport from '@/pages/Stack Topup/StackListReport'

const DashboardRoutes = [
  <Route
    key="main"
    path="/"
    element={
      <UserWrapper>
        <Layout />
      </UserWrapper>
    }
  >
    <Route
      key="dashboard"
      path="/"
      element={
        <UserWrapper>
          <LazyLoader>
            <Dashboard />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="tree-view"
      path="/tree-view"
      element={
        <LazyLoader>
          <TreeView />
        </LazyLoader>
      }
    />
    <Route
      key="geneology-view"
      path="/geneology-table"
      element={
        <LazyLoader>
          <GeneologyTableView />
        </LazyLoader>
      }
    />
    <Route
      key="gift-topup"
      path="/gift/topup"
      element={
        <UserWrapper>
          <LazyLoader>
            <GiftIdTopup />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="gift-id-list-report"
      path="/gift/list-report"
      element={
        <UserWrapper>
          <LazyLoader>
            <GitIdListReport />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="stack-topup"
      path="/admin-stack/topup"
      element={
        <UserWrapper>
          <LazyLoader>
            <StackTopup />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="stack-id-list-report"
      path="/admin-stack/topup-list-report"
      element={
        <UserWrapper>
          <LazyLoader>
            <StackListReport />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="users"
      path="/users"
      element={
        <UserWrapper>
          <LazyLoader>
            <Users />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="update-user"
      path="/users/update"
      element={
        <UserWrapper>
          <LazyLoader>
            <UpdateUser />
          </LazyLoader>
        </UserWrapper>
      }
    />

    <Route
      key="topup-list"
      path="/topup-list"
      element={
        <UserWrapper>
          <LazyLoader>
            <TopUp />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="stacking-list"
      path="/stacking-list"
      element={
        <UserWrapper>
          <LazyLoader>
            <StackingList />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="level-bonus"
      path="/level-bonus"
      element={
        <UserWrapper>
          <LazyLoader>
            <LevelBonus />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="pool-bonus"
      path="/pool-bonus"
      element={
        <UserWrapper>
          <LazyLoader>
            <PoolBonus />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="daily-trading-bonus"
      path="/daily-trading-bonus"
      element={
        <UserWrapper>
          <LazyLoader>
            <DailyTradingBonus />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="cashback-bonus"
      path="/cashback-bonus"
      element={
        <UserWrapper>
          <LazyLoader>
            <CashbackBonus />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="popup-image"
      path="/popup/image"
      element={
        <UserWrapper>
          <LazyLoader>
            <PopupImage />
          </LazyLoader>
        </UserWrapper>
      }
    />

    <Route
      key="send-balance"
      path="/send-balance"
      element={
        <UserWrapper>
          <LazyLoader>
            <SendBalance />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="autopool-details"
      path="/autopool-details"
      element={
        <UserWrapper>
          <LazyLoader>
            <AutopoolDetails />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="admin-trans-his"
      path="/admin-trans-his"
      element={
        <UserWrapper>
          <LazyLoader>
            <DepositHistory />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="user-balance"
      path="/user-balance"
      element={
        <UserWrapper>
          <LazyLoader>
            <IncomeHistory />
          </LazyLoader>
        </UserWrapper>
      }
    />

    <Route
      key="withdraw"
      path="/withdraw"
      element={
        <UserWrapper>
          <LazyLoader>
            <Withdrawal />
          </LazyLoader>
        </UserWrapper>
      }
    />

    <Route
      key="support-open-ticket"
      path="/support/open-ticket"
      element={
        <LazyLoader>
          <OpenTicketPage />
        </LazyLoader>
      }
    />
    <Route
      key="support-close-ticket"
      path="/support/close-ticket"
      element={
        <LazyLoader>
          <CloseTicketPage />
        </LazyLoader>
      }
    />
    <Route
      key="support-details-ticket"
      path="/support/details-ticket"
      element={
        <LazyLoader>
          <DetailsSupportTicket />
        </LazyLoader>
      }
    />
    <Route
      key="usdt-req"
      path="/usdt-report"
      element={
        <UserWrapper>
          <LazyLoader>
            <UsdtWithdrawalReport />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="usdt-report"
      path="/usdt-req"
      element={
        <UserWrapper>
          <LazyLoader>
            <UsdtWithdrawal />
          </LazyLoader>
        </UserWrapper>
      }
    />
    {/* <Route
      key="inr-report"
      path="/inr-report"
      element={
        <UserWrapper>
          <LazyLoader>
            <InrWithdrawal />
          </LazyLoader>
        </UserWrapper>
      }
    /> */}
    {/* <Route
      key="wallet-report"
      path="/wallet-report"
      element={
        <UserWrapper>
          <LazyLoader>
            <WalletReport />
          </LazyLoader>
        </UserWrapper>
      }
    /> */}
    <Route
      key="user-wallet-report"
      path="/wallet-user-report"
      element={
        <UserWrapper>
          <LazyLoader>
            <UserWalletReport />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="user-wallet-details"
      path="/user-wallet-details"
      element={
        <UserWrapper>
          <LazyLoader>
            <UserWalletDetails />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="user-Deposit-wallet-details"
      path="/user-deposit-details"
      element={
        <UserWrapper>
          <LazyLoader>
            <DepositUserWalletDetails />
          </LazyLoader>
        </UserWrapper>
      }
    />
    <Route
      key="without-gateway-Withdraw"
      path="/without-gateway-req"
      element={
        <UserWrapper>
          <LazyLoader>
            <WithoutGateway />
          </LazyLoader>
        </UserWrapper>
      }
    />
  </Route>
]

export default DashboardRoutes
