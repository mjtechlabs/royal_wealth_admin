import {memo} from 'react'

import {DashboardCardsProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const DashboardCard = (props: DashboardCardsProps) => {
  const {spanContent, title, className = '', imageUrl = ''} = props
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#1a1a1a] to-[#111111] p-5 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(204,160,50,0.18)] hover:border-primary-golden/40 dashboard_card ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-golden to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary-golden/8 blur-2xl transition-all duration-500 group-hover:bg-primary-golden/16 group-hover:scale-125" />

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-colors duration-300 leading-snug">
          {title}
        </p>

        {imageUrl !== '' && (
          <div className="shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary-golden/10 border border-primary-golden/20 shadow-inner group-hover:bg-primary-golden/20 group-hover:scale-110 transition-all duration-500">
            <ImageComponent className="h-5 w-5 sm:h-6 sm:w-6 object-contain" imageUrl={imageUrl} />
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className="block text-2xl sm:text-3xl lg:text-3xl font-bold tracking-tight text-primary-golden drop-shadow-[0_0_10px_rgba(223,180,85,0.35)]">
          {spanContent}
        </span>

        <div className="mt-3 h-px w-0 bg-gradient-to-r from-primary-golden/70 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
      </div>
    </div>
  )
}

export default memo(DashboardCard)
