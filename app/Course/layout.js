import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

function layout({children}) {
  return (
    <div>
             <DashboardHeader option={true}/>
        <div className=' md:mx-36 lg:mx-60 mt-8 rounded-2xl p-3'>
            {children}
        </div>
    </div>
  )
}

export default layout