import React from 'react'
import Router from 'next/router'
import { Swipeable } from 'react-swipeable'
import Tabs from 'components/Tabs'

import { tabs as TABS } from 'utils/metadata'



export default ({ currentTab, children }) => (
  <>
    <Swipeable
      className="container main"
      onSwipedLeft={() => {
        if(currentTab == TABS.length - 1) return
        Router.push(TABS[currentTab + 1].path)
      }}
      onSwipedRight={() => {
        if(currentTab == 0) return
        Router.push(TABS[currentTab - 1].path)
      }}
    >
      {children}
    </Swipeable>
    <Tabs current={currentTab} />
  </>
)