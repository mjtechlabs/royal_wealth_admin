import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom'

import {Constant, Images} from '@/services'
import CommonFunction from '@/services/CommonFunction'
import {PersistStorage} from '@/store'

import ImageComponent from '../ImageComponent/ImageComponent'
import LogoComponent from '../LogoComponent/LogoComponent'

const Sidebar = (props: {
  onClickClose: () => void
  openMenu: string | null
  setOpenMenu: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const {onClickClose, openMenu, setOpenMenu} = props
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="z-50 h-full w-full border-r border-solid border-primary-gray bg-primary-black px-3.5">
      <div className="space-y-2.5 pb-5 ">
        <LogoComponent
          className="pt-2! w-20 "
          closeIconClassName="block sm:hidden"
          layoutClassName={`sticky top-0 flex-row-reverse justify-between sm:justify-center    rounded-xl! `}
          onCloseClick={onClickClose}
        />
      </div>
      <div className="flex h-[calc(100vh-100px)] flex-col justify-between gap-10 text-lg">
        <ul className="no-scrollbar h-[calc(100%-108px)] overflow-y-auto pr-1 space-y-2">
          {Constant.NavArray?.map((sidebaritems: any) => {
            const {icon, link, content, subMenu} = sidebaritems
            const currentPath = location.pathname
            const currentPathName = currentPath.startsWith('/topup')
              ? 'Topup List'
              : currentPath.startsWith('/users')
                ? 'users'
                : currentPath.startsWith('/deposit') ||
                    currentPath.startsWith('/deposit-accepted') ||
                    currentPath.startsWith('/deposit-rejected')
                  ? 'Deposit Req List'
                  : currentPath.startsWith('/tree-view') ||
                      currentPath.startsWith('/geneology-table')
                    ? 'Genealogy'
                    : currentPath.startsWith('/daily-trading') ||
                        currentPath.startsWith('/direct-referral') ||
                        currentPath.startsWith('/royalty-bonus') ||
                        currentPath.startsWith('/level-bonus') ||
                        currentPath.startsWith('/rank-bonus')
                      ? 'Earning'
                      : currentPath.startsWith('/usdt-req') ||
                          currentPath.startsWith('/usdt-report') ||
                          currentPath.startsWith('/inr-report')
                        ? 'Withdrawal'
                        : currentPath.startsWith('/wallet') ||
                            currentPath.startsWith('/user-deposit-details') ||
                            currentPath.startsWith('/user-wallet-details')
                          ? 'Wallet Report'
                          : currentPath.startsWith('/send-balance') ||
                              currentPath.startsWith('/admin-trans-his') ||
                              currentPath.startsWith('/user-balance')
                            ? 'Wallet Manage'
                            : currentPath.startsWith('/without-gateway-req')
                              ? 'Without GateWay Withdraw'
                              : currentPath.startsWith('/logout')
                                ? 'logout'
                                : currentPath.startsWith('/popup')
                                  ? 'PopUp-Dasboard'
                                  : currentPath.startsWith('/support')
                                    ? 'Support Ticket'
                                    : 'dashboard'
            const isActive = currentPathName.toLowerCase().includes(content.toLowerCase())

            return content !== 'Logout' ? (
              <div key={content} className="group outline-none">
                <NavLink
                  to={link}
                  className={`flex items-center rounded-xl text-wrap! border px-3 py-2.5 transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? 'border-transparent bg-primary-blue/15 text-primary-blue font-semibold'
                      : 'border-primary-cyan/30 text-primary-cyan hover:bg-primary-blue/5 hover:border-primary-blue/50 '
                  }`}
                  onClick={(e) => {
                    setOpenMenu((prev) => (prev === content ? null : content))
                    if (subMenu?.length === 0) {
                      navigate(link)
                      e.preventDefault()
                      e.stopPropagation()
                      onClickClose()
                    }
                  }}
                >
                  <ImageComponent
                    imageUrl={icon}
                    className={`size-6 shrink-0 transition-transform duration-300 group-hover:scale-110 
                  ${isActive ? 'blue__filter2' : 'blue__filter'}`}
                  />

                  <div className="flex w-full items-center justify-between pl-3">
                    <span className="text-[16px] tracking-wide text-wrap!">{content}</span>
                    {subMenu && subMenu.length > 0 ? (
                      <ImageComponent
                        imageUrl={Images.downArrowIcon}
                        className={`size-4 transition-transform duration-300 blue__filter2 
                       
                      ${subMenu && openMenu === content ? 'rotate-180' : 'rotate-0'}`}
                      />
                    ) : null}
                  </div>
                </NavLink>

                {subMenu && subMenu?.length > 0 ? (
                  <div
                    className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out    
                    ${openMenu === content ? 'max-h-96  group-focus-within:grid-rows-[1fr] ' : 'max-h-0 '}`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-1 flex flex-col gap-1 ml-9 border-l border-primary-cyan/20">
                        {subMenu?.map((item: any) => (
                          // eslint-disable-next-line react/button-has-type
                          <button
                            key={item.subContent}
                            className="py-2 pl-4 text-left text-[15px] text-primary-cyan/80 transition-colors hover:text-primary-blue cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              navigate(item.subLink)
                              setOpenMenu((prev) => (prev === content ? null : content))
                              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                              item.subLink !== '#' && onClickClose()
                            }}
                          >
                            {item.subContent}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key="logout"
                to={link}
                className={`flex items-center rounded-xl border px-3 py-2.5 transition-all gap-2.5 duration-300 ease-in-out
                  ${
                    isActive
                      ? 'border-transparent bg-primary-blue/15 text-primary-blue font-semibold'
                      : 'border-primary-cyan/30 text-primary-cyan hover:bg-primary-blue/5 hover:border-primary-blue/50 '
                  }`}
                onClick={() => {
                  PersistStorage.purge()
                  CommonFunction.addSliceData('logout', {})
                }}
              >
                <ImageComponent
                  imageUrl={icon}
                  className={`size-6 shrink-0 transition-transform duration-300 group-hover:scale-110 
                  ${isActive ? 'blue__filter2' : 'blue__filter'}`}
                />
                <span className="font-medium capitalize">{content}</span>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
