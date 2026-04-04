import { lazy } from 'react'

const Dashboard = lazy(async () => import('./Dashboard/Dashboard'))
const SalaryBonus = lazy(async () => import('./Earning/LevelBonus'))
const TreeView = lazy(async () => import('./Geneology/TreeView'))
const Login = lazy(async () => import('./Login/Login'))
const Users = lazy(async () => import('./Users/Users'))
const WalletCredit = lazy(async () => import('./WalletManage/SendBalance'))
const Withdrawal = lazy(async () => import('./Withdrawal/UsdtWithdrawal'))
const UpdateUser = lazy(async () => import('./Users/UpdateUser'))
const TopUp = lazy(async () => import('./Topup/Topup'))
const Withdraw = lazy(async () => import('./Withdrawal/UsdtWithdrawal'))
const GeneologyTable = lazy(async () => import('./Geneology/GenelogyTableView'))
const LevelBonus = lazy(async () => import('./Earning/LevelBonus'))
const UserWalletReport = lazy(async () => import('./WalletReport/UserWalletReport'))
const UserWalletDetails = lazy(async () => import('./WalletReport/UserWalletIncomeDetails'))
const DepositUserWalletDetails = lazy(async () => import('./WalletReport/UserWalletDepositDetails'))

export {
  Dashboard,
  DepositUserWalletDetails,
  GeneologyTable,
  LevelBonus,
  Login,
  SalaryBonus,
  TopUp,
  TreeView,
  UpdateUser,
  Users,
  UserWalletDetails,
  UserWalletReport,
  WalletCredit,
  Withdraw,
  Withdrawal
}
