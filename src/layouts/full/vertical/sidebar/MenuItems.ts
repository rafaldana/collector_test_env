import { uniqueId } from 'lodash';

import { IconPictureInPicture, IconUserCircle } from '@tabler/icons-react';

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
    title: "Start",
    icon: IconUserCircle,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "My Collection",
    icon: IconPictureInPicture,
    href: "/collection",
  },
];

export default Menuitems;
