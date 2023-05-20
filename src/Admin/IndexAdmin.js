import React from 'react'
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import DashboardAdmin from './DashboardAdmin';

const IndexAdmin = () => {
  return (
    <div className='hold-transition sidebar-mini'>
      <div class="wrapper">
        <HeaderAdmin active={'dashboard'} />
        <DashboardAdmin />
        <FooterAdmin />
      </div>
    </div>
  )
}

export default IndexAdmin;