import React from 'react'
import AttendeeSidebar from '../components/AttendeeSidebar'
import { Outlet } from 'react-router-dom'

const AttendeeLayout = () => {
  return (
    <>
        <AttendeeSidebar />
        <Outlet />
    </>
  )
}

export default AttendeeLayout