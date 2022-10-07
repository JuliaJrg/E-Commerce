import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai";
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'

export const AdminSidebar = () => {
  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo">Deus Ex Machina</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <AiOutlineUser className='icon' />
            <Link className='span' to='/admin/users'>Utilisateur</Link>
          </li>
          <li>
            <MdOutlineProductionQuantityLimits className='icon' />
            <Link className='span' to='/admin/product'>Produits</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSidebar;