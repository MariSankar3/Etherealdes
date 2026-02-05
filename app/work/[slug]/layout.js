import { ROUTE } from '../../constants/constants'
import React from 'react'
import MidSec from '../components/MidSec'
import CommonLayout from '../../components/common/CommonLayout'

function WorkLayout({children}) {
  return (
    <CommonLayout midsec={<MidSec />} page={ROUTE.WORK.LABEL}>
      {children}
    </CommonLayout>
  )
}

export default WorkLayout