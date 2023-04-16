import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ArchiveBoxIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import HiOutlineCheck from '@heroicons/react/24/solid/PrinterIcon';

import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'รายชื่อบัญชีการฉ่อโกง',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'รายชื่อผู้ใช้',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
 
  {
    title: 'อนุมัติ',
    path: '/approve',
    icon: (
      <SvgIcon fontSize="small">
        <HiOutlineCheck />
      </SvgIcon>
    )
  },

];
