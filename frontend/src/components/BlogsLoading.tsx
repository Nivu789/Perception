import React from 'react'

const BlogsLoading = () => {
  return (
    <div className='w-full flex justify-center mt-6 h-fit'>
    <div role="status" className="lg:w-1/2 w-[450px] animate-pulse flex justify-center p-5 border-1 border-r-slate-600 shadow-md">
    <div className='w-full p-5 flex flex-col rounded-md'>
    <div className='grid grid-cols-2 gap-10'>
      <div className='col-span-1'>
      <div className='flex items-center gap-2'>
      <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mt-3"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mt-8"></div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 mt-2"></div>
      </div>
      <div className='col-span-1 flex justify-end'>
      <div className="flex items-center justify-center h-full bg-gray-300 rounded sm:w-96 lg:w-1/2 dark:bg-gray-700 w-full">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
        </div>
      </div>
  </div>
  </div>
  </div>
  )
}

export default BlogsLoading