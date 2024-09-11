import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdDashboard,
  MdOutlineShoppingCart,
  // MdBarChart,
  // MdPerson,
  // MdLock,
  MdLeaderboard, 
  // MdOutlineTag,
  MdOutlineShoppingBag,
  MdOutlineReport,
  MdMessage,
  MdSettings,
  MdExitToApp,
} from 'react-icons/md';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdDashboard className="h-6 w-6" />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: 'nft-marketplace',
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,

  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: 'data-tables',
  // },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: 'profile',
  //   icon: <MdPerson className="h-6 w-6" />,
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
  {
    name: 'Leaderboard',
    layout: '/admin',
    path: 'leaderboard',
    icon: <MdLeaderboard className="h-6 w-6" />,
  },
  {
    name: 'Order',
    layout: '/admin',
    path: 'order',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: 'Products',
    layout: '/admin',
    path: 'products',
    icon: <MdOutlineShoppingBag className="h-6 w-6" />,
  },
  {
    name: 'Sales Report',
    layout: '/admin',
    path: 'sales-report',
    icon: <MdOutlineReport className="h-6 w-6" />,
  },
  {
    name: 'Messages',
    layout: '/admin',
    path: 'messages',
    icon: <MdMessage className="h-6 w-6" />,
  },
  {
    name: 'Settings',
    layout: '/admin',
    path: 'settings',
    icon: <MdSettings className="h-6 w-6" />,
  },
  {
    name: 'Sign Out',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdExitToApp className="h-6 w-6" />,
  },
];
export default routes;
