import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

function layout({children}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 grid-bg [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <DashboardHeader option={true} />
      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-8 md:px-6">
        {children}
      </div>
    </div>
  )
}

export default layout
