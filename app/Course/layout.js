import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

function layout({children}) {
  return (
    <div>
             <DashboardHeader option={true}/>
        <div >
            {children}
        </div>
    </div>
  )
}

export default layout