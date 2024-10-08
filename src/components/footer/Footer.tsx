import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex w-full  flex-col items-center justify-between px-1 py-4 lg:px-8 xl:flex-row">
      <p className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <span className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
          ©{new Date().getFullYear()} Nifipayment. All Rights Reserved.
        </span>
      </p>
      <div>
      <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
          <li>
            <Link
              target="blank"
              href="#"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Support
            </Link>
          </li>
          <li>
            <Link
              target="blank"
              href="#"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              License
            </Link>
          </li>
          <li>
            <Link
              target="blank"
              href="#"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Terms of Use
            </Link>
          </li>
        
        </ul>
      </div>
    </div>
  );
};

export default Footer;
