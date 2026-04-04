// /* eslint-disable react/no-unstable-nested-components */
// import {useCallback, useEffect, useRef, useState} from 'react'

// import {TableComponent} from '@/components'
// import Loader from '@/components/InputComponent/Loader/Loader'
// import {Layout2} from '@/layout'
// import {English} from '@/services'
// import {AppLoaderRef} from '@/types/ComponentTypes'

// import WalletReportApi from './api/WalletReportApi'

// const WalletReport = () => {
//   const [reportData, setReportData] = useState<any[] | null>([])
//   const loaderRef = useRef<AppLoaderRef>(null)
//   const dataWithIndex = reportData?.map((item, index) => ({
//     id: index + 1,
//     ...item
//   }))

//   const IncomeListTableHeading = [
//     {
//       name: English.E84,

//       selector: (row: any) => row.id
//     },
//     {
//       name: English.E83,
//       selector: (row: any) => row.usercode,
//       sortable: true
//     },
//     {
//       name: English.E98,
//       cell: (value: any) => <span>$ {value?.amount}</span>,
//       sortable: true
//     },
//     {
//       name: English.E109,
//       selector: (row: any) => row.details,
//       sortable: true
//     },
//     {
//       name: English.E97,
//       selector: (row: any) => row.date,
//       sortable: true
//     }
//   ]
//   const handleFetchIncomeReportLists = useCallback(() => {
//     loaderRef?.current?.showLoader(true)

//     WalletReportApi.WalletReport()
//       .then((res) => {
//         // console.log('res', res)
//         if (res) {
//           setReportData(res?.data)
//         }
//       })
//       .finally(() => {
//         loaderRef?.current?.showLoader(false)
//       })
//   }, [])

//   useEffect(() => {
//     handleFetchIncomeReportLists()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
//   return (
//     <Layout2 singleLineContent={English.E225}>
//       <Loader ref={loaderRef} />

//       <TableComponent
//         columns={IncomeListTableHeading as unknown as any}
//         data={dataWithIndex ?? []}
//       />
//     </Layout2>
//   )
// }

// export default WalletReport
