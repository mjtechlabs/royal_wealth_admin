/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {CommonButton, TableComponent} from '@/components'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {English} from '@/services'
import {UserListApiData} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import UserList from './api/UsersApi'

const Users = () => {
  const [totalUsers, setTotalUsers] = useState<UserListApiData[]>([])

  const navigate = useNavigate()
  const dataWithIndex = useMemo(
    () => totalUsers?.map((item, index) => ({id: index + 1, ...item})),
    [totalUsers]
  )
  const loaderRef = useRef<AppLoaderRef>(null)

  const getUserList = useCallback(
    (
      date1: string,
      date2: string,
      date3: string,
      date4: string,
      email: string,
      userStatus: string
    ) => {
      loaderRef.current?.showLoader(true)
      const payload = {
        activesdate: date3 !== '' ? dayjs(date3).format('YYYY-MM-DD') : '',
        actineedate: date4 !== '' ? dayjs(date4).format('YYYY-MM-DD') : '',
        regsdate: date1 !== '' ? dayjs(date1).format('YYYY-MM-DD') : '',
        regedate: date1 !== '' ? dayjs(date2).format('YYYY-MM-DD') : '',
        email: email ?? '',
        userstatus: userStatus ?? ''
      }
      UserList.getUserList(payload)
        .then((res) => {
          setTotalUsers(res)
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    []
  )

  const handlesUserStatus = useCallback(
    (usercode: string) => {
      const payload = {
        usercode: usercode ?? ''
      }
      UserList.UpdateUserStatus(payload)
        .then((res) => {
          if (res) {
            loaderRef.current?.showLoader(true)
            getUserList('', '', '', '', '', '-1')
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    [getUserList]
  )

  const GeneologyTableHeading: any = useMemo(
    () => [
      {
        name: English.E84,
        selector: (row: any) => row.id
      },
      {
        name: English.E83,
        selector: (row: UserListApiData) => row.user_reg_code,
        sortable: true
      },
      {
        name: English.E80,
        selector: (row: UserListApiData) => row.user_name,
        sortable: true
      },
      {
        name: English.E79,
        selector: (row: UserListApiData) => row.user_mobile,
        sortable: true
      },
      {
        name: English.E82,
        selector: (row: UserListApiData) => <span className="text-wrap">{row.user_email}</span>,
        sortable: true
      },
      // {
      //   name: English.E163,
      //   selector: (row: UserListApiData) => <span>{row.city_name === '' ? '--' : row.city_name}</span>,
      //   sortable: true
      // },
      // {
      //   name: English.E164,
      //   selector: (row: UserListApiData) => <span>{row.state_name === '' ? '--' : row.state_name}</span>,
      //   sortable: true
      // },
      {
        name: English.E140,
        selector: (row: UserListApiData) => row.user_password,
        sortable: true
      },
      {
        name: English.E236,
        selector: (row: UserListApiData) => row.user_trans_pass,
        sortable: true
      },
      {
        name: English.E78,
        selector: (row: UserListApiData) => <span className="text-wrap">{row.user_reg_date}</span>,
        sortable: true
      },
      {
        name: English.E219,
        selector: (row: UserListApiData) => (
          <span className="text-wrap!">{row.user_sponser_name}</span>
        ),
        sortable: true
      },

      {
        name: English.E81,
        selector: (row: UserListApiData) => row.user_ref_code,
        sortable: true
      },
      {
        name: English.E107,
        cell: (value: UserListApiData) => (
          <span>
            {Number(value.user_is_active) === 0
              ? 'InActive'
              : Number(value.user_is_active) === 1
                ? 'Active'
                : 'Block'}
          </span>
        )
      },
      {
        name: English.E250,
        cell: (value: UserListApiData) => (
          <span className="text-wrap">
            {value.stack_amount !== '' ? `$${value?.stack_amount}` : '--'}
          </span>
        ),
        sortable: true
      },
      {
        name: English.E77,
        cell: (value: UserListApiData) => (
          <span className="text-wrap">
            {value.user_active_date !== '' ? value?.user_active_date : '--'}
          </span>
        ),
        sortable: true
      },
      {
        name: 'Autopool 1',
        cell: (value: UserListApiData) => (
          <span>
            {Number(value.user_autpool_1) === 0 ? 'InActive Autopool' : 'Active Autopool'}
          </span>
        )
      },
      {
        name: 'Autopool 2',
        cell: (value: UserListApiData) => (
          <span>
            {Number(value.user_autpool_2) === 0 ? 'InActive Autopool' : 'Active Autopool'}
          </span>
        )
      },
      {
        name: 'Autopool 3',
        cell: (value: UserListApiData) => (
          <span>
            {Number(value.user_autpool_3) === 0 ? 'InActive Autopool' : 'Active Autopool'}
          </span>
        )
      },
      {
        name: 'Autopool 4',
        cell: (value: UserListApiData) => (
          <span>
            {Number(value.user_autpool_4) === 0 ? 'InActive Autopool' : 'Active Autopool'}
          </span>
        )
      },
      {
        name: 'Autopool 5',
        cell: (value: UserListApiData) => (
          <span>
            {Number(value.user_autpool_5) === 0 ? 'InActive Autopool' : 'Active Autopool'}
          </span>
        )
      },

      {
        name: English.E90,
        minWidth: '180px',
        cell: (value: UserListApiData) => (
          <div className="flex  my-2 gap-0.5 w-fit ">
            {/* <Link target="_blank" to={`${import.meta.env.VITE_REDIRECT_URl}/${value?.userstring}`}>
              <CommonButton
                singleLineContent="Login"
                className="text-nowrap! bg-green-color4! text-primary-red small__transparent__button
          font-normal! text-sm! py-1! px-1.5"
              />
            </Link> */}
            <CommonButton
              className="text-nowrap!"
              onClick={async () => navigate('/users/update', {state: value})}
              singleLineContent={English.E93}
            />
            <CommonButton
              className="bg-primary-red! text-nowrap!"
              onClick={() => handlesUserStatus(value.user_reg_code)}
              singleLineContent={
                Number(value.user_is_active) === 1 || Number(value.user_is_active) === 0
                  ? English.E91
                  : English.E92
              }
            />
          </div>
        )
      }
    ],
    [handlesUserStatus, navigate]
  )

  useEffect(() => {
    loaderRef.current?.showLoader(true)
    getUserList('', '', '', '', '', '-1')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 singleLineContent={English.E42}>
      <Loader ref={loaderRef} />
      <FilterComponent
        isDateFilterType1
        isDateFilterType2
        isStatus1Type
        isUserEmailType
        onPressSearch={(data) => {
          const {date1, date2, date3, date4, email, userStatus} = data
          getUserList(date1, date2, date3, date4, email, userStatus)
        }}
      />

      <TableComponent columns={GeneologyTableHeading} data={dataWithIndex} />
    </Layout2>
  )
}

export default Users
