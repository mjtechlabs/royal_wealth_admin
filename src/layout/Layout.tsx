// import dayjs from 'dayjs'
import {useCallback, useEffect, useRef, useState} from 'react'
// import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'

// import { AuthApi } from '@/api'
import {ImageComponent, LogoComponent, Sidebar} from '@/components'
import {useClickOutside} from '@/hooks'
import {English, Images} from '@/services'
// import { StorageProps } from '@/types/CommonTypes'
// import { AppLoaderRef } from '@/types/ComponentTypes'

const Layout = () => {
  // const UserData = useSelector((state: StorageProps) => state.userData?.user)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  // const loaderRef = useRef<AppLoaderRef>(null)

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen((data) => !data)
  }, [])

  useClickOutside({
    refs: [menuRef],
    onClickOutside: () => {
      handleCloseMenu()
      setOpenMenu(null)
    }
  })

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 1024) {
        setIsSmallScreen(true)
      } else {
        setIsMenuOpen(false)
        setIsSmallScreen(false)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full flex flex-col lg:flex-row">
        <div className="w-full transition-all duration-300 ease-in lg:w-62.5 shrink-0 bg-primary-black lg:h-full">
          {isSmallScreen ? (
            <div className="flex items-center justify-between w-full h-full p-4 relative">
              <ImageComponent
                className="h-block lg:hidden h-8 w-8 cursor-pointer"
                imageUrl={Images.menuIcon}
                onPressImage={handleCloseMenu}
              />
              <LogoComponent
                className=""
                closeIconClassName="hidden"
                layoutClassName="absolute! left-1/2! -translatex-x-1/2! top-1/2! -translate-y-1/2!"
              />
            </div>
          ) : null}
          {isMenuOpen || !isSmallScreen ? (
            <div
              ref={menuRef}
              className={
                isSmallScreen && isMenuOpen
                  ? 'fixed h-full w-62.5 top-0 left-0 z-999 bg-dark-color1'
                  : 'h-full'
              }
            >
              <Sidebar
                onClickClose={handleCloseMenu}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            </div>
          ) : null}
        </div>
        <div className="flex-1 relative overflow-x-scroll p-0 no-scrollbar">
          <Outlet />
          <div className=" ">
            <p className="bg-primary-black bottom-0 p-3 text-center text-primary-white">
              {English.E1}
              <b className="text-primary-golden"> {English.E2}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
