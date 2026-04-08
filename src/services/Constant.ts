import English from './English'
import Images from './Images'

const Constant = {
  LoginArray: [
    {
      lableText: 'Email Address',
      isImportant: true,
      name: 'email',
      placeHolder: 'Enter Email Address',
      type: 'email'
    },
    {
      lableText: 'Password',
      isImportant: true,
      name: 'password',
      placeHolder: 'Enter your Password',
      type: 'password'
    }
  ],
  LoginPasswrodArray: [
    {
      lableText: 'Password',
      isImportant: true,
      name: 'password',
      placeHolder: 'Enter your Password',
      type: 'password'
    },
    {
      lableText: 'Confirm Password',
      isImportant: true,
      name: 'confirmpassword',
      placeHolder: 'Enter Confirm Password',
      type: 'password'
    }
  ],
  AmountSelect: [
    {title: 'Select Package', content: ''},
    {title: '$ 100', content: '1'},
    {title: '$ 200', content: '2'},
    {title: '$ 300', content: '3'},
    {title: '$ 400', content: '4'},
    {title: '$ 500', content: '5'},
    {title: '$ 1000', content: '6'},
    {title: '$ 1500', content: '7'},
    {title: '$ 2000', content: '8'},
    {title: '$ 2500', content: '9'},
    {title: '$ 3000', content: '10'}
  ],
  Forgot: [
    {
      lableText: 'User ID',
      isImportant: true,
      name: 'id',
      placeHolder: 'Enter User ID',
      type: 'number'
    }
  ],
  Register: [
    {
      lableText: 'Email Address',
      isImportant: true,
      name: 'email',
      placeHolder: 'Enter Email',
      type: 'text'
    },
    {
      lableText: 'Password',
      isImportant: true,
      name: 'password',
      placeHolder: 'Enter Password',
      type: 'text'
    }
  ],
  NavArray: [
    {
      icon: Images.dashboardIcon,
      link: '/',
      content: English.E11,
      subMenu: []
    },

    {
      icon: Images.users,
      link: '/users',
      content: English.E41
    },

    {
      icon: Images.inviteIcon,
      link: '/popup/image',
      content: English.E138
    },

    {
      icon: Images.topUp,
      link: '/topup-list',
      content: English.E16,
      subMenu: []
    },
    {
      link: '/autopool-details',
      content: 'Autopool Details',
      icon: Images.bankIcon,
      subMenu: []
    },
    // {
    //   icon: Images.network,
    //   link: '#',
    //   content: English.E21,
    //   subMenu: [
    //     {
    //       subContent: English.E22,
    //       subLink: '/tree-view'
    //     },
    //     {
    //       subContent: English.E125,
    //       subLink: '/geneology-table'
    //     }
    //   ]
    // },

    {
      icon: Images.money,
      link: '#',
      content: English.E29,
      subMenu: [
        {
          subContent: English.E33,
          subLink: '/level-bonus'
        },
        {
          subContent: English.E239,
          subLink: '/cashback-bonus'
        }
      ]
    },

    {
      icon: Images.level,
      link: '#',
      content: English.E57,
      subMenu: [
        {
          subContent: English.E231,
          subLink: '/usdt-req'
        },
        {
          subContent: English.E232,
          subLink: '/usdt-report'
        }
        // {
        //   subContent: English.E233,
        //   subLink: '/inr-report'
        // }
      ]
    },
    // {
    //   icon: Images.business,
    //   link: '/without-gateway-req',
    //   content: English.E234,
    //   subMenu: []
    // },
    {
      icon: Images.level,
      link: '/wallet-user-report',
      content: English.E52,
      subMenu: []
    },
    {
      icon: Images.wallet,
      link: '#',
      content: English.E49,
      subMenu: [
        {
          subContent: English.E122,
          subLink: '/send-balance'
        },
        {
          subContent: English.E123,
          subLink: '/admin-trans-his'
        },
        {
          subContent: English.E124,
          subLink: '/user-balance'
        }
      ]
    },
    {
      icon: Images.inviteIcon,
      link: '#',
      content: English.E146,
      subMenu: [
        {
          subContent: English.E147,
          subLink: '/support/open-ticket'
        },
        {
          subContent: English.E148,
          subLink: '/support/close-ticket'
        }
      ]
    },

    {
      icon: Images.logoutIcon,
      link: '/login',
      content: English.E39,
      subMenu: []
    }
  ],
  UserStatus: [
    {title: 'All Users', content: '0'},
    {title: 'Active Users', content: '1'},
    {title: 'Block Users', content: '2'}
  ],
  UserTopupInputs: [{label: English.E45, inputName: 'usercode', type: 'text'}],
  buySellDropdown: ['On Going', 'History'],

  dashboardCardConstant: [
    {
      img: Images.usercheckIcon,
      key: English.E3
    },
    {
      img: Images.usercrossIcon,
      key: English.E4
    },
    {
      img: Images.users,
      key: English.E5
    },
    {
      img: Images.usercheckIcon,
      key: English.E6
    },
    {
      img: Images.wallet2,
      key: English.E7
    },
    {
      img: Images.wallet,
      key: English.E8
    },
    {
      img: Images.dollarIcon,
      key: English.E9
    },
    {
      img: Images.withdraw,
      key: English.E10
    }
  ],

  tableDemoHeading: [
    {content: 'INCOME', showArrow: false},
    {content: 'USDT ($)', showArrow: false}
  ],
  tableBody: [
    {content1: 'Trading Profit Bonus', content2: '$0'},
    {content1: 'Booster Bonus', content2: '$0'},
    {content1: 'Direct Sponsor Bonus', content2: '$0'}
  ],
  datatableHeading: [
    {content: 'Sr.No.', showArrow: false},
    {content: 'Date', showArrow: false},
    {content: 'Topup Amount', showArrow: false},
    {content: 'ROI Per', showArrow: false},
    {content: 'Total ROI', showArrow: false},
    {content: 'Booster', showArrow: false}
  ],
  datatableBody: [
    {srno: '1', date: '10-10-2026', amount: '$200', per: '5%', total: '$500', booster: '$100'}
  ],
  beptableHeading: [
    {content: 'Sr.No.', showArrow: false},
    {content: 'Transaction Details', showArrow: false},
    {content: 'Date', showArrow: false},
    {content: 'Amount', showArrow: false},
    {content: 'Status', showArrow: false}
  ],
  beptableBody: [
    {
      srno: '1',
      detail: 'successfull transfer',
      date: '10-10-2026',
      amount: '$200',
      status: 'Active'
    }
  ],
  dropDownData: [{title: 'Select Status'}, {title: 'Active'}, {title: 'Free'}, {title: 'Block'}],
  withdraData: [
    {title: 'Select Status'},
    {title: 'Pending'},
    {title: 'Accepted'},
    {title: 'Rejected'}
  ],
  countryData: [{title: 'Select Country'}, {title: 'India'}, {title: 'USA'}, {title: 'England'}],

  UserType: [
    {title: English.E107},
    {title: English.E64},
    {title: English.E70},
    {title: English.E76}
  ],
  UserUpdate: [
    {name: 'usercode', placeHolder: English.E83, label: English.E83},
    {name: 'name', placeHolder: English.E80, label: English.E80},
    {name: 'email', placeHolder: English.E82, label: English.E82},
    {name: 'mobile', placeHolder: English.E79, label: English.E79},
    {name: 'country', placeHolder: English.E94, label: English.E94}
  ],
  giftTopUpList: [
    {
      name: English.E84,
      selector: (row: any) => row.id,
      grow: 0
    },
    {
      name: English.E83,
      selector: (row: any) => row.usercode,
      sortable: true
    },
    {
      name: English.E98,
      selector: (row: any) => row.amount,
      sortable: true
    },

    {
      name: English.E97,
      selector: (row: any) => row.date,
      sortable: true
    }
  ],

  userBalanceList: [
    {
      name: English.E84,
      selector: (row: any) => row.id,
      grow: 0
    },
    {
      name: English.E83,
      selector: (row: any) => row.usercode,
      sortable: true
    },
    {
      name: English.E80,
      selector: (row: any) => row.user_name,
      sortable: true
    },

    {
      name: English.E79,
      selector: (row: any) => row.user_mobile,
      sortable: true
    },

    {
      name: English.E133,
      selector: (row: any) => row.income_wallet_balance,
      sortable: true
    },
    {
      name: English.E134,
      selector: (row: any) => row.deposit_wallet_balance,
      sortable: true
    }
  ],
  transDropdownData: [
    {title: 'Credit', content: '1'},
    {title: 'Debit', content: '2'}
  ],

  FieldBonusData: [
    {title: 'Sales 3 Plot Get INR 10,000 / 24 Month', content: '10000'},
    {title: 'Sales 7 Plot Get INR 25,000 / 24 Month', content: '25000'},
    {title: 'Sales 12 Plot Get INR 50,000 / 24 Month', content: '50000'},
    {title: 'Sales 21 Plot Get INR 80,000 / 24 Month', content: '80000'},
    {title: 'Sales 51 Plot Get INR 2,00,000 / 24 Month', content: '200000'}
  ],

  WalletTypeDropdownData: [
    {title: 'Income Wallet', content: 'income_wallet'},
    {title: 'Deposit Wallet', content: 'wallet_trans'}
  ],
  SendBalanceArray: [
    {
      lableText: 'UserCode',
      isImportant: true,
      name: 'usercode',
      placeHolder: 'Enter UserCode',
      type: 'text'
    },
    {
      lableText: 'User Name',
      isImportant: true,
      name: 'username',
      placeHolder: 'User Name',
      type: 'text'
    },
    {
      lableText: 'Amount',
      isImportant: true,
      name: 'amount',
      placeHolder: 'Enter Amount',
      type: 'amount'
    },
    {
      lableText: 'Remark',
      isImportant: true,
      name: 'remark',
      placeHolder: 'Enter Remark',
      type: 'remark'
    }
  ],
  AddFieldBonusArray: [
    {
      lableText: 'UserCode',
      isImportant: true,
      name: 'usercode',
      placeHolder: 'Enter UserCode',
      type: 'text'
    }
  ],
  UpdateUserArray: [
    {
      lableText: 'Email Address',
      isImportant: true,
      name: 'user_email',
      placeHolder: 'Enter Email Address',
      type: 'email',
      icon: false,
      readonly: false
    },
    {
      lableText: 'Name',
      isImportant: true,
      name: 'user_name',
      placeHolder: 'Enter Name',
      type: 'text',
      icon: false,
      readonly: false
    },
    {
      lableText: 'Mobile No.',
      isImportant: true,
      name: 'user_mobile',
      placeHolder: 'Enter Name',
      type: 'text',
      icon: false,
      readonly: false
    },
    {
      isImportant: true,
      name: 'state',
      type: 'statecountry'
    },
    {
      isImportant: true,
      name: 'city',
      type: 'cityDropdown',
      icon: true
    }
  ],
  AddPlotArray: [
    {
      lableText: 'Enter Plot Name',
      isImportant: true,
      name: 'plotname',
      placeHolder: 'Enter Plot Name',
      type: 'text',
      icon: false,
      readonly: false
    },
    {
      lableText: 'Enter Plot Number',
      isImportant: true,
      name: 'plotnumber',
      placeHolder: 'Enter Plot Number',
      type: 'number',
      icon: false,
      readonly: false
    },
    {
      lableText: 'Enter Plot Price',
      isImportant: true,
      name: 'plotprice',
      placeHolder: 'Enter Plot Price',
      type: 'number',
      icon: false,
      readonly: false
    },
    {
      lableText: 'Enter Plot Details',
      isImportant: true,
      name: 'plotdetails',
      placeHolder: '',
      type: 'textarea',
      icon: false,
      readonly: false
    }
  ]
}

export default Constant
