/* eslint-disable */
import React from 'react';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import DashIcon from 'components/icons/DashIcon';
// chakra imports
export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname();
  const { routes } = props;

  const activeRoute = useCallback(
    (routeName: string) => pathname?.includes(routeName),
    [pathname]
  );
  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      const isActive = activeRoute(route.path);
      return (
        <NavLink  key={index} href={route.layout + '/' + route.path}>
          <div className={`relative mb-6 flex hover:cursor-pointer ${isActive ? 'bg-[#201b4e] rounded-lg py-1 px-4 translate-xl-4  lg:translate-x-4 transition-all md:translate-x-0 dark:bg-brand-800' : ''}`}>
            <li className={`my-[10px] flex cursor-pointer items-center px-8 ${isActive ? 'text-white' : 'text-gray-600'}`}>
              <span>
                {route.icon ? route.icon : <DashIcon />}
              </span>
              <p className={`leading-1 ml-4 flex ${isActive ? 'font-bold' : 'font-medium'}`}>
                {route.name}
              </p>
            </li>
          
          </div>
        </NavLink>
      );
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
