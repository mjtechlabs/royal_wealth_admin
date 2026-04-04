const EndPoints = {
  login: 'login/login.php',

  dashboard: 'dashboard/dashboard.php',
  getUserInfo: 'dashboard/get_namecity_code.php',
  deletePopup: 'dashboard/popu_delete.php',
  uploadPopup: 'dashboard/image_upload.php',
  getPopupImage: 'dashboard/get_popup_images.php',

  withdraw: 'withdrawal/withdrawal_request.php ',
  usdtwithdrawreq: 'withdrawal/withdrawal_history.php ',
  InrwithdrawRep: 'withdrawal/withdrawal_history_inr.php',
  withdrawaction: 'withdrawal/withdraw_status_change.php',
  withdrawactionWithoutGateWay: 'withdrawal/withdraw_status_change_without_gateway.php',

  topupList: 'orders/get_orders.php',

  incomeReport: 'income/income_list.php',

  walletAction: 'wallet/wallet_action.php',
  adminWalletReport: 'wallet/admin_wallet_report.php',
  adminIncomeWalletReport: 'wallet/admin_income_wallet_report.php',
  userWalletReport: 'wallet/user_balance_report.php',
  depositWalletReport: 'wallet/user_deposit_wallet_report.php',
  incomeWalletReport: 'wallet/user_income_wallet_report.php',

  userList: 'users/get_users.php',
  updateUserPassword: 'users/change_password.php',
  updateTransPassword: 'users/trans_change_password.php',
  userUpdate: 'users/update_profile.php',
  updateUserStatus: 'users/status_update_profile.php',
  getCountryList: 'users/get_country.php',

  getTreeView: 'genealogy/tree_view.php',
  getTreeTableView: 'genealogy/filter_team_registration.php',

  getSelectSupport: 'support_ticket/get_select_ticket.php',
  openTicket: 'support_ticket/open_ticket_list.php',
  statusTicket: 'support_ticket/status_change_close.php',
  closeTicket: 'support_ticket/close_ticket_list.php',
  addAdminRemark: 'support_ticket/add_admin_remark.php',
  ticketDetails: 'support_ticket/details_ticket_list.php'
}

export default EndPoints
