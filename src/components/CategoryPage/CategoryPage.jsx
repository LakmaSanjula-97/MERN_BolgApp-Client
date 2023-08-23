import React from 'react'
import Category from '../Categories/Category'
import SideBar from '../SideBar/SideBar'
import "./categoryPage.css"

export default function CategoryPage() {
  return (
    <div className='categoryPage'>
          <Category />
          <SideBar />
    </div>
  )
}
