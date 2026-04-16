import {LoginApiData} from './apiTypes/AuthApiPayloadType'

export interface UserInfoDashboard {
  totaluser: string
  totalblock: {
    user_id: string
  }
  activeuser: string
  inactiveuser: number
  totalbusiness: string
  totaltopup: string
  totalincomewallet: string
  totaldepositwallet: string
  daily_trading_profit: string
  royalty_bonuss: number
  direct_referral_income: string
  level_income: string
  rank_bonus: string
  autopool1: string
  autopool2: string
  autopool3: string
  autopool4: string
  autopool5: string
  cashback: string
  poolincome: string
  directincome: string
  dailyincome: string
  totalstacking: string
}
export interface UserIncomeWalletReportDetails {
  date: string
  debit: string
  credit: string
  w_current: string
}
export interface PlotInfo {
  unsold: number
  sold: number
  totalplot: number
  soldamount: number
}

export interface GetCityApiProps {
  state_id: string
}
export interface TopUpApiData {
  sr_no: number
  date: string
  user_reg_code: string
  user_name: string
  totalamount: string
  roi_per: string
  roi_amount_daily: string
  roi_given: string
  ordewrby: string
  dailyamount: string
  roigiven: string
  totalroi: string
  totaldays: string
  given_days: string
}

export interface UserUpdateApiProps {
  name: string
  email: string
  user_mobile: string
  // city_id: string
  // state_id: string
  usercode: string
  country_id: string
}
export interface StateData {
  states_id: string
  states_name: string
}

export interface CityData {
  city_id: string
  city_name: string
}
export interface GiftListApiData
  extends Pick<TopUpApiData, 'amount' | 'usercode' | 'date'>,
    Pick<WithDrawApiData, 'walletaddress'> {}

export interface IncomeListApiData extends Pick<GiftListApiData, 'amount' | 'date' | 'usercode'> {
  details: string
}

export interface AdminTransHistoryApiData {
  usercode: string
  username: string
  useremail: string
  date: string
  w_debit: string
  w_credit: string
  w_details: string
}

export interface SendBalanceApiProps {
  usercode: string
  amount: string
  remark: string
  trans_type: string
  wallet_type: string
}

export interface AddFieldApiProps {
  usercode: string
  fields_bouns: string
}

export interface UserBalanceReportApiData {
  w_credit: string
  w_current: string
  w_details: string
  user_name: string
  user_reg_code: string
}

export interface WithDrawApiData {
  sr_no: number
  date: string
  user_name: string
  withdraw_id: string
  user_reg_code: string
  wallet_address: string
  totalamount: string
  admin_charge: string
  remain: string
  status: string
}
export interface InrWithdRawReport {
  sr_no: number
  date: string
  action_date: string
  user_name: string
  user_reg_code: string
  totalamount: string
  admin_charge: string
  remain: string
  status: string
  bank_details: string
}

export interface UserWalletReportData {
  usercode: string
  name: string
  deposit_wallet: string
  income_wallet: string
}
export interface WithdrawReqActionProps {
  status: string
  withdrawid: string
}

export interface DepositApiData {
  amount: string
  date: string
  name: string
  pay_image: string
  r_id: string
  transaction_hash: string
  usercode: string
}

export interface DepositReqAction {
  token: string
  id: string
  status: string
  remark: string
}

export interface DepositAcceptedData {
  amount: string
  date: string
  name: string
  pay_image: string
  status: string
  transaction_hash: string
  usercode: string
}

export interface TopupListApiProp extends Pick<GiftListApiData, 'usercode'> {
  regsdate: string
  regedate: string
  userwallet?: string
}
export interface BonanzaRewardUsersApiProp extends Pick<LoginApiData, 'token'> {
  date: string
  r_id: string
  rank: string
  usercode: string
  username: string
}

export interface GetUserListApiProp {
  regsdate: string
  regedate: string
  activesdate: string
  actineedate: string
  usercode?: string
  email: string
  userstatus: int
}

export interface UserListApiData {
  sr_no: number
  user_id: string
  user_reg_code: string
  user_name: string
  user_ref_code: string
  user_ref_name: string
  user_password: string
  user_trans_pass: string
  user_email: string
  user_sponser_name: string
  user_mobile: string
  user_id: string
  user_active_date: string
  user_reg_date: string
  user_is_active: string
  userstring: string
  stack_amount: string
  countryid: string
}
export interface UserWalletDetailsProps {
  usercode: string
}
export interface TreeViewProps {
  userid: string
}
export interface TreeDataObject {
  activedate: string
  address: string
  regdate: string
  totalstaking: string
  status: string
  usercode: string
  teambusiness?: string
  refcodecode?: string
  totaluser?: string
  email?: string
  name?: string
  mobile?: string
}
export interface TreeDataResponse {
  mainuser: TreeDataObject
  otheruser: TreeDataObject[]
}
export interface TreeTableViewProps {
  regsdate: string
  regedate: string
}

export interface GeneologyApiData {
  user_reg_date: string
  user_reg_code: string
  user_active_date: string
  totalbv: string
}

export interface DepositDataProps {
  amount: string
  date: string
  name: string
  usercode: string
  wallet: string
}
export type TopupApiProps = Pick<TopUpApiData, 'usercode'>

export interface UserInfo extends Pick<TopUpApiData, 'usercode'> {
  name: string
  email: string
  mobile: string
  password: string
  country: string
}

export interface IncomeListApiProps {
  income_type: string
}

export interface GeneologyModelData {
  activedate: string
  activeteam: string
  name: string
  regdate: string
  sponsor: string
  status: string
  team: string
  usercode: string
}

export interface SupportListApiData {
  r_id: string
  date: string
  select_ticket: string
  question: string
  image: string
  status: string
}

export interface SelectSupportTicketData {
  id: string
  category: string
}

export interface OpenSupportTicketData {
  date: string
  image: string
  question: string
  r_id: string
  select_ticket_name: string
  status: string
  user_code: string
  user_name: string
}

export interface CloseSupportTicketData {
  date: string
  image: string
  question: string
  r_id: string
  select_ticket_name: string
  status: string
  user_code: string
  user_name: string
}

export interface CreateTicketApiProps extends Pick<LoginApiData, 'token'> {
  select_support_ticket: number
  question: string
  select_img: string
}

export interface SupportListApiProps
  extends Pick<LoginApiData, 'token'>,
    Pick<CreateTicketApiProps, 'select_support_ticket'> {
  fromdate: string
  todate: string
  status: string
}

export interface TicketStatusProps extends Pick<LoginApiData, 'token'> {
  remark: string
  is_complate: string
  r_id: string
  select_img: string
}

export interface TicketMessageType {
  r_id: string
  user_name: string
  user_code: string
  date: string
  select_ticket_name: string
  question_name: string
  ticket_file_image: string
  status: string
}

export interface TicketChatData extends Pick<TicketMessageType, 'date' | 'r_id' | 'status'> {
  user_name: string
  user_code: string
  user_profile: string
  user_remark: string
  admin_name: string
  admin_profile: string
  admin_remark: string
  file_image: string
}
