'use client';
// Layout components
import { usePathname } from 'next/navigation';
import {  useState } from 'react';
import routes from 'routes';

import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import React from 'react';
import Navbar from 'components/navbar';
import Footer from 'components/footer/Footer';

export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  return (
    <div className="flex h-full mx-auto max-w-[1400px] bg-white dark:bg-blue-50">
      {/* <Sidebar routes={routes} open={open} setOpen={setOpen} variant="admin" /> */}
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-blue-50">
        {/* Main Content */}
        <main
          className={`mx-2.5  flex-none transition-all dark:!bg-blue-50
              md:pr-2 `}
        >
          {/* Routes */}
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              
              secondary={getActiveNavbar(routes, pathname)}
            />
            <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
              {children}
            </div>
            <div className="sticky bottom-4 z-40 px-5  flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10  backdrop-blur-xl dark:bg-[#35394e11]">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
