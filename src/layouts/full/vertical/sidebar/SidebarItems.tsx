import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import Counter from '@components/shared/Counter/Counter';
import config from '@config/index';
import { Box, List, useMediaQuery } from '@mui/material';
import { toggleMobileSidebar } from '@store/customizer/CustomizerSlice';
import { AppState, useDispatch, useSelector } from '@store/Store';

import { SidebarCounter } from './counterH';
import Menuitems from './MenuItems';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';

const SidebarItems = () => {
  const { pathname } = useRouter();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const dispatch = useDispatch();

  const handleEnds = () => {
    signOut();
  };
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          }
        })}
      </List>
      <Box mt={8}>
        <SidebarCounter />
      </Box>
    </Box>
  );
};
export default SidebarItems;
