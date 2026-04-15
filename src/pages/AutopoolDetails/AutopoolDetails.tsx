/* eslint-disable react/no-array-index-key */
import React, { useCallback, useRef, useState } from 'react'

import Loader from '@/components/InputComponent/Loader/Loader'
import { Layout2 } from '@/layout'
import { AppLoaderRef } from '@/types/ComponentTypes'

import AutopoolDetailsApi from './api/AutopoolDetailsApi'

const AutopoolDetails = () => {
  const [userRegCode, setUserRegCode] = useState('')
  const [data, setData] = useState<any>(null)

  const loaderRef = useRef<AppLoaderRef>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault()
      if (!userRegCode) return

      loaderRef?.current?.showLoader(true)
      setLoading(true)

      AutopoolDetailsApi.GetAutopoolData(userRegCode)
        .then((res) => {
          if (res?.data) {
            setData(res.data)
          } else {
            setData(null)
          }
        })
        .finally(() => {
          loaderRef?.current?.showLoader(false)
          setLoading(false)
        })
    },
    [userRegCode]
  )

  return (
    <Layout2 singleLineContent="Autopool Details">
      <Loader ref={loaderRef} />
      <div className="flex h-full w-full flex-col gap-8 p-4  md:p-8 lg:p-10">
        <form
          className="relative flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-[#121212]/90 p-8 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-yellow-500/10 border border-gray-200 dark:border-yellow-500/30 backdrop-blur-md transition-all"
          onSubmit={handleSubmit}
        >
          <div className="w-full sm:w-auto flex-1 relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200" />
            <input
              className="relative w-full border border-gray-300 dark:border-yellow-500/40 bg-gray-50 dark:bg-black/80 px-6 py-4 text-gray-800 dark:text-yellow-100 outline-none transition-all placeholder-gray-400 dark:placeholder-yellow-700/50 rounded-lg focus:border-yellow-500 focus:bg-white dark:focus:bg-[#0a0a0a]"
              onChange={(e) => setUserRegCode(e.target.value)}
              placeholder="Enter User Code"
              type="text"
              value={userRegCode}
            />
          </div>
          <button
            className="w-full sm:w-auto relative inline-flex items-center justify-center rounded-lg border border-transparent bg-linear-to-r from-yellow-500 to-yellow-600 px-10 py-4 text-center font-bold text-black shadow-lg hover:shadow-yellow-500/50 hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              'Fetch Details'
            )}
          </button>
        </form>

        {data && Object.keys(data).length > 0
          ? Object.entries(data).map(([groupName, poolGroup]) => (
            (
              <div key={groupName} className=" pb-4">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-yellow-600 mb-6 uppercase tracking-widest pl-2 border-l-4 border-yellow-500">
                  {groupName.replace('autopool', 'Autopool ')}
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative">
                  <div className="absolute inset-0 bg-yellow-500/5 blur-3xl -z-10 rounded-full" />
                  {Array.isArray(poolGroup) &&
                    poolGroup.map((pool: any, index: number) => (
                      <div
                        key={index}
                        className="group relative rounded-2xl border border-yellow-500/20 bg-[#1a1a1a]/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/20 hover:border-yellow-500/50 overflow-hidden"
                      >
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-linear-to-br from-yellow-400/20 to-yellow-600/5 rounded-full blur-2xl group-hover:from-yellow-400/40 transition-colors duration-500" />

                        <div className="border-b border-yellow-900/40 pb-4 mb-4 flex flex-wrap justify-between items-center gap-2 relative z-10">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="shrink-0 flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-500">
                              <svg
                                className="w-4 h-4 xl:w-5 xl:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                />
                              </svg>
                            </span>
                            <h4 className="text-base lg:text-lg xl:text-xl font-extrabold text-yellow-50 uppercase tracking-wider drop-shadow-sm  ">
                              {pool?.autopool?.replace('autopool', 'autopool ')}
                            </h4>
                          </div>
                          <span
                            className={`shrink-0 text-[10px] lg:text-xs font-bold px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full shadow-inner ${pool.status.toLowerCase() === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                              }`}
                          >
                            {pool.status === 'Padding' ? 'Pending' : pool.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-3 relative z-10">
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-[11px] sm:text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wider truncate">
                              Team Size
                            </span>
                            <span className="text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-yellow-200 to-yellow-500 drop-shadow-sm">
                              {pool.team}
                            </span>
                          </div>
                          <div className="flex space-x-1 shrink-0 pb-1">
                            {[...Array(Math.min(5, Math.ceil(Number(pool.team) / 10) || 1))].map(
                              (_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400/80 animate-pulse"
                                  style={{ animationDelay: `${i * 150}ms` }}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          ))
          : null}


      </div>
    </Layout2>
  )
}

export default AutopoolDetails
