import {useCallback, useMemo, useState} from 'react'
import DataTable from 'react-data-table-component'
import {utils, writeFileXLSX} from 'xlsx'

import {English} from '@/services'
import {TableComponentProps} from '@/types/ComponentTypes'

import CommonButton from '../CommonButton/CommonButton'
import InputComponent from '../InputComponent/InputComponent'

const TableComponent = (props: TableComponentProps) => {
  const {columns, data, setRowClickValue} = props
  const [filterText, setFilterText] = useState('')

  const filteredItems = useMemo(() => {
    if (!filterText) return data

    return data?.filter((item: any) =>
      Object.keys(item).some((key) => {
        const value = String(item[key]).toLowerCase()
        return value.includes(filterText.toLowerCase())
      })
    )
  }, [data, filterText])

  const convertArrayOfObjectsToCSV = useCallback(
    (array: any[]) => {
      let result: string

      const columnDelimiter = ','
      const lineDelimiter = '\n'
      const keys = Object.keys(data?.[0] as any)

      result = ''
      result += keys.join(columnDelimiter)
      result += lineDelimiter

      array.forEach((item) => {
        let ctr = 0
        keys.forEach((key) => {
          if (ctr > 0) result += columnDelimiter

          result += item[key]

          // eslint-disable-next-line no-plusplus
          ctr++
        })
        result += lineDelimiter
      })

      return result
    },
    [data]
  )

  const downloadCSV = useCallback((array: any[]) => {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv == null) return

    const filename = 'Data.csv'

    if (!/^data:text\/csv/i.exec(csv)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDownloadExcel = useCallback((dataExcel: unknown[]) => {
    const ws = utils.json_to_sheet(dataExcel)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Royal Wealth')
    writeFileXLSX(wb, `Data.xlsx`)
  }, [])

  return (
    <div className="padded__container__utility space-y-8 shadow-2xl">
      <div className="flex flex-col gap-2.5 md:flex-row justify-between md:items-center">
        <div className="flex gap-2">
          <CommonButton
            className={`small__transparent__button w-fit! `}
            onClick={() => downloadCSV(data)}
            singleLineContent="CSV"
          />
          <CommonButton
            className={`small__transparent__button w-fit! `}
            onClick={() => handleDownloadExcel(data)}
            singleLineContent="EXCEL"
          />
        </div>
        <div>
          <InputComponent
            labelText={English.E89}
            wrapperClassName="flex-row text-nowrap  items-center gap-2.5"
            onChange={(e) => {
              setFilterText(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="overflow-x-auto max-w-full">
        <DataTable
          defaultSortAsc
          fixedHeader
          highlightOnHover
          pagination
          responsive
          className="w-full!"
          columns={columns}
          data={filteredItems ?? []}
          fixedHeaderScrollHeight="500"
          onRowClicked={(row) => {
            setRowClickValue?.(row)
          }}
        />
      </div>
    </div>
  )
}

export default TableComponent
