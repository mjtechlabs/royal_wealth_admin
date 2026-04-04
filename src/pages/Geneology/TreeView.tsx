import {useCallback, useEffect, useState} from 'react'

import {HeadingComponent, ImageComponent} from '@/components'
import FilterComponent from '@/components/FilterComponent/FilterComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {useModalContext} from '@/components/ModalComponent/context/ModalProvider'
import {Layout2} from '@/layout'
import {Images} from '@/services'
import {TreeDataObject, TreeDataResponse} from '@/types/ApiTypes'

import GeneologyAPI from './api/GenelogyAPI'
import GenUserModel from './components/GenUserModel'

const TreeView = () => {
  const [selectedId, setSelectedId] = useState('')
  const [treeViewData, setTreeViewData] = useState<TreeDataResponse | null>(null)
  const {setModalProps, setChildContent} = useModalContext()
  const [isLoading, setIsLoading] = useState(false)

  const getTreeData = useCallback((id: string) => {
    setIsLoading(true)
    GeneologyAPI.getTreeView({userid: id})
      .then((res) => {
        if (res) {
          setTreeViewData(res)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const onPressShowDetails = useCallback(
    (item: TreeDataObject) => {
      setChildContent(
        <GenUserModel
          data={item}
          onPressShowDropDown={() => {
            setChildContent(null)
            setModalProps(null)
            setSelectedId(item?.usercode)
            getTreeData(item?.usercode)
          }}
        />
      )
      setModalProps({
        className: 'w-[calc(100%-20px)] sm:w-fit',
        onPressClose() {
          setChildContent(null)
          setModalProps(null)
        }
      })
    },
    [getTreeData, setChildContent, setModalProps]
  )

  useEffect(() => {
    getTreeData(selectedId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 singleLineContent="Genealogy Tree">
      <Loader ref={(ref) => ref?.showLoader(isLoading)} />
      <HeadingComponent
className="" singleLineContent="Tree View of (Main ID)"
type="h2" />
      <FilterComponent
        isSearchType
        onPressSearch={(payload) => {
          setSelectedId(payload?.searchValue === '' ? '' : payload?.searchValue)
          getTreeData(payload?.searchValue === '' ? '' : payload?.searchValue)
        }}
      />
      <div className="bg-primary-purple/20 p-5">
        <div className="relative overflow-x-auto shadow-xs rounded-md">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <tbody>
              <tr
                className={`text-center font-semibold text-lg ${treeViewData?.mainuser?.status === '1' ? 'text-primary-green' : treeViewData?.mainuser?.status === '0' ? 'text-primary-red' : 'text-primary-blue'}`}
              >
                <td colSpan={treeViewData?.otheruser?.length ?? 12}>
                  <div className="flex flex-col w-full justify-center">
                    <div className="flex justify-center">
                      <ImageComponent
                        className="w-10 "
                        imageUrl={
                          treeViewData?.mainuser?.status === 'Active'
                            ? Images.activeUser
                            : treeViewData?.mainuser?.status === 'Inactive'
                              ? Images.inActiveUser
                              : Images.blockUser
                        }
                      />
                    </div>

                    <span>{treeViewData?.mainuser?.usercode}</span>
                  </div>
                </td>
              </tr>
              <tr>
                {treeViewData?.otheruser?.map((tree) => {
                  const {usercode, status} = tree
                  return (
                    <td
                      key={usercode}
                      align="center"
                      className={` font-semibold text-lg border border-primary-blue  ${status === 'Active' ? 'text-primary-green cursor-pointer' : status === 'Inactive' ? 'text-primary-red cursor-pointer' : 'text-primary-blue pointer-events-none'}`}
                      colSpan={Math.floor(12 / (treeViewData?.otheruser?.length ?? 1))}
                      onClick={(e) => {
                        e?.stopPropagation()
                        e?.preventDefault()
                        onPressShowDetails(tree)
                      }}
                    >
                      <div className="flex flex-col w-full justify-center">
                        <div className="flex justify-center">
                          <ImageComponent
                            className="w-10 "
                            imageUrl={
                              status === 'Active'
                                ? Images.activeUser
                                : status === 'Inactive'
                                  ? Images.inActiveUser
                                  : Images.blockUser
                            }
                          />
                        </div>
                        <span className="text-primary-black">{usercode}</span>
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout2>
  )
}

export default TreeView
