import { Icon } from '@chakra-ui/react'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart
} from 'react-icons/md'

// Admin Imports
import MainDashboard from 'pages/admin/default'
import NFTMarketplace from 'pages/admin/nft-marketplace'
import Profile from 'pages/admin/profile'
import DataTables from 'pages/admin/data-tables'
import RTL from 'pages/rtl/rtl-default'

// Auth Imports
import SignInCentered from 'pages/auth/sign-in'
import { IRoute } from 'types/navigation'
import Mails from 'views/admin/Mails/Mails'
import { IoMdSettings, IoMdPeople } from 'react-icons/io'
import Users from 'pages/admin/users'

const routes: IRoute[] = [
  {
    name: 'Inbox',
    layout: '/admin',
    path: '/mails',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Mails
  },
  {
    name: 'Users',
    layout: '/admin',
    path: '/users',
    icon: (
      <IoMdPeople
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: <Users />,
    secondary: true
  },
  {
    name: 'Settings',
    layout: '/admin',
    icon: <IoMdSettings width='20px' height='20px' color='inherit' />,
    path: '/data-tables',
    component: DataTables
  },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: '/sign-in',
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL
  // }
]

export default routes
