import AdminLayout from 'layouts/admin'
import React from 'react'
import UsersView from 'views/admin/Users/UsersView'

const Users = () => {
  return (
    <AdminLayout>
        <UsersView />
    </AdminLayout>
  )
}

export default Users
