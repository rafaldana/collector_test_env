import { uniqueId } from 'lodash';

import {
    IconBan, IconShoppingCart, IconUserCircle, IconUserPlus, IconZoomCode
} from '@tabler/icons-react';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUserCircle,
    href: "/user-profile/profile",
  },
  {
    navlabel: true,
    subheader: "Auctions",
  },
  {
    id: uniqueId(),
    title: "Auction - 1",
    icon: IconShoppingCart,
    href: "/auctions/detail/1",
  },
  {
    id: uniqueId(),
    title: "Disabled",
    icon: IconBan,
    href: "",
    disabled: true,
  },
];

export default Menuitems;
