import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          
        </a>
        <span className="ms-1">&copy; 2024 GitCode.</span>
      </div>
      
    </CFooter>
  )
}

export default React.memo(AppFooter)
