// import React from "react";
// import { Menu } from "@headlessui/react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { Link, NavLink } from "react-router-dom";

// const NavbarLG = () => {
//   return (
//     <div>
//       <aside className="w-72" aria-label="Sidebar">
//         <div className="overflow-y-auto py-4 px-3 bg-black rounded dark:bg-gray-800">
//           <ul className="space-y-2">
//             <li>
//               <Link
//                  to="/home"
//                 className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800 "
//               >
//                 <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
//                   Home
//                 </span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                  to="/Admistrators"
//                 className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800 "
//               >
//                 <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
//                   Adminstrators
//                 </span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                  to="/Industries"
//                 className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800 "
//               >
//                 <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
//                   Industries
//                 </span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                  to="/Customers"
//                 className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800 "
//               >
//                 <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
//                   Customers
//                 </span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                  to="/Performers"
//                 className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800 "
//               >
//                 <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
//                   Performers
//                 </span>
//               </Link>
//             </li>

//             <li>
//               <button
//                 type="button"
//                 className="flex items-center p-2 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-gray-800"
//                 aria-controls="dropdown-example"
//                 data-collapse-toggle="dropdown-example"
//               >
//                 <span
//                   className="flex-1 ml-3 text-left whitespace-nowrap text-lg font-medium"
//                   sidebar-toggle-item
//                 >
//                   Reports
//                 </span>
//               </button>
//               <ul id="dropdown-example" className="py-2 space-y-2">
//                 <li>
//                   <Link
//                      to="/reports/Icca"
//                     className="flex items-center py-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-gray-800"
//                   >
//                     ICCA
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                      to="/reports/phaseController"
//                     className="flex items-center py-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-gray-800"
//                   >
//                     Phase Control
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/reports/iccawithoutnumber"
//                     className="flex items-center py-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-gray-800"
//                   >
//                     ICCA without number
//                   </Link>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </aside>
//     </div>
//   );
// };

// function NavbarSm() {
//   return (
//     <Menu>
//       <Menu.Button>
//         <AiOutlineMenu />
//       </Menu.Button>

//       <Menu.Items className="bg-black w-44 flex flex-col gap-2">
//         <Menu.Item className="text-white">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/">
//               Home
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/Admistrators">
//               Adminstrators
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/Industries">
//               Industries
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/Customers">
//               Customers
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/Performers">
//               Performers
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white mb-4">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/Reports">
//               Reports
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white mb-4">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/reports/Icca">
//               ICCA
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white mb-4">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/reports/phaseController">
//              Phase Control 
//             </a>
//           )}
//         </Menu.Item>
//         <br />
//         <Menu.Item className="text-white mb-4">
//           {({ active }) => (
//             <a className={`${active && "bg-gray-900"}`} href="/reports/iccawithoutnumber">
//               ICCA without number
//             </a>
//           )}
//         </Menu.Item>
//       </Menu.Items>
//     </Menu>
//   );
// }

// const SideNavbar = () => {
//   return (
//     <>
//       <div className="lg:hidden">
//         {/*Mobile */}
//         <NavbarSm />
//       </div>

//       <div className="hidden lg:block ">
//         {/*large devices */}
//         <NavbarLG />
//       </div>
//     </>
//   );
// };

// export default SideNavbar;


import React from "react";
import { Menu } from "@headlessui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavbarLG = () => {
  return (
    <div>
      <aside className="w-72" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-black rounded dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800">
                <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admistrators" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800">
                <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
                  Administrators
                </span>
              </Link>
            </li>
            <li>
              <Link to="/industries" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-800">
                <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
                  Industries
                </span>
              </Link>
            </li>
            <li>
              <Link to="/customers" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover-bg-gray-800">
                <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
                  Customers
                </span>
              </Link>
            </li>
            <li>
              <Link to="/performers" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover-bg-gray-800">
                <span className="flex-1 ml-3 whitespace-nowrap text-lg font-medium">
                  Performers
                </span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover-bg-gray-800"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span
                  className="flex-1 ml-3 text-left whitespace-nowrap text-lg font-medium"
                 
                >
                  Reports
                </span>
              </button>
              <ul id="dropdown-example" className="py-2 space-y-2">
                <li>
                  <Link to="/reports/Icca" className="flex items-center py-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover-bg-gray-800">
                    ICCA
                  </Link>
                </li>
                <li>
                  <Link to="/reports/phaseController" className="flex items-center py-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover-bg-gray-800">
                    Phase Control
                  </Link>
                </li>
                <li>
                  <Link to="/reports/iccawithoutnumber" className="flex items-center py-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover-bg-gray-800">
                    ICCA without number
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

function NavbarSm() {
  return (
    <Menu>
      <Menu.Button>
        <AiOutlineMenu />
      </Menu.Button>

      <Menu.Items className="bg-black w-44 flex flex-col gap-2">
        <Menu.Item className="text-white">
          {({ active }) => (
            <Link to="/" className={`${active && "bg-gray-900"}`}>
              Home
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white">
          {({ active }) => (
            <Link to="/admistrators" className={`${active && "bg-gray-900"}`}>
              Administrators
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white">
          {({ active }) => (
            <Link to="/industries" className={`${active && "bg-gray-900"}`}>
              Industries
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white">
          {({ active }) => (
            <Link to="/customers" className={`${active && "bg-gray-900"}`}>
              Customers
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white">
          {({ active }) => (
            <Link to="/performers" className={`${active && "bg-gray-900"}`}>
              Performers
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white mb-4">
          {({ active }) => (
            <Link to="/reports" className={`${active && "bg-gray-900"}`}>
              Reports
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white mb-4">
          {({ active }) => (
            <Link to="/reports/Icca" className={`${active && "bg-gray-900"}`}>
              ICCA
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white mb-4">
          {({ active }) => (
            <Link to="/reports/phaseController" className={`${active && "bg-gray-900"}`}>
              Phase Control
            </Link>
          )}
        </Menu.Item>
        <Menu.Item className="text-white mb-4">
          {({ active }) => (
            <Link to="/reports/iccawithoutnumber" className={`${active && "bg-gray-900"}`}>
              ICCA without number
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

const SideNavbar = () => {
  return (
    <>
      <div className="lg:hidden">
        {/* Mobile */}
        <NavbarSm />
      </div>

      <div className="hidden lg:block">
        {/* Large devices */}
        <NavbarLG />
      </div>
    </>
  );
};

export default SideNavbar;
