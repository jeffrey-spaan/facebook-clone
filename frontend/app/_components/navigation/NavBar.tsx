import Icon from "@/app/_components/logo/Icon";
import { FaUser, FaBell, FaFacebookMessenger, FaGrip, FaHouse, FaUserGroup, FaUsers } from "react-icons/fa6";

export default function NavBar() {
  return (
      <div className="flex flex-row items-center">

        {/* Left section of the navbar */}
        <div className="flex-1 justify-items-start py-2 px-4">
          <Icon height={40} width={40} />
        </div>

        {/* Center section of the navbar */}
        <div className="flex-1 justify-items-center">
          <div className="flex">
            <div className="flex-1 justify-items-center w-32 hover:bg-gray-100 dark:hover:bg-gray-900 p-3 cursor-pointer border-b-3 border-blue-500">
              <FaHouse className="text-blue-500 dark:text-blue-500" size={24} />
            </div>
            <div className="flex-1 justify-items-center w-32 hover:bg-gray-100 dark:hover:bg-gray-900 p-3 rounded-lg cursor-pointer">
              <FaUserGroup className="text-gray-800 dark:text-gray-300" size={24} />
            </div>
            <div className="flex-1 justify-items-center w-32 hover:bg-gray-100 dark:hover:bg-gray-900 p-3 rounded-lg cursor-pointer">
              <FaUsers className="fa-light text-gray-800 dark:text-gray-300" size={24} />
            </div>
          </div>
        </div>

        {/* Right section of the navbar */}
        <div className="flex-1 flex-col justify-items-end py-2 px-4">
          <div className="flex gap-x-2">
            <div className="flex-1">
              <div className="flex px-4 bg-gray-200 dark:bg-gray-700 hover:bg-black/20 dark:hover:bg-gray-900 active:bg-black/30 dark:active:bg-gray-950 active:scale-95 rounded-full h-10 w-full cursor-pointer items-center justify-center">
                <p className="text-sm font-semibold whitespace-nowrap">Find friends</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex bg-gray-200 dark:bg-gray-700 hover:bg-black/20 dark:hover:bg-gray-900 active:bg-black/30 dark:active:bg-gray-950 active:scale-95 rounded-full size-10 cursor-pointer items-center justify-center">
              <FaGrip className="text-gray-800 dark:text-gray-300" size={20} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex bg-gray-200 dark:bg-gray-700 hover:bg-black/20 dark:hover:bg-gray-900 active:bg-black/30 dark:active:bg-gray-950 active:scale-95 rounded-full size-10 cursor-pointer items-center justify-center">
              <FaFacebookMessenger className="text-gray-800 dark:text-gray-300" size={20} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex bg-gray-200 dark:bg-gray-700 hover:bg-black/20 dark:hover:bg-gray-900 active:bg-black/30 dark:active:bg-gray-950 active:scale-95 rounded-full size-10 cursor-pointer items-center justify-center">
              <FaBell className="text-gray-800 dark:text-gray-300" size={20} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex bg-gray-200 dark:bg-gray-700 hover:bg-black/20 dark:hover:bg-gray-900 active:bg-black/30 dark:active:bg-gray-950 active:scale-95 rounded-full size-10 cursor-pointer items-center justify-center">
              <FaUser className="text-gray-800 dark:text-gray-300" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}