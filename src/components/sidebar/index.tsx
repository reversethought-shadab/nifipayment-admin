/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';
// import SidebarCard from 'components/sidebar/components/SidebarCard';
import { IRoute } from 'types/navigation';

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`sm:none duration-175 border-r w-[280px] border-gray-300 linear fixed !z-50 flex h-full flex-col bg-[#F5F1FF] pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-blue-50 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[10px] flex items-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <img src="/logo.png" alt="" />
        </div>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      <ul className="mb-auto flex-1 ">
        <Links routes={routes} />
      </ul>
    </div>
  );
}

export default SidebarHorizon;
