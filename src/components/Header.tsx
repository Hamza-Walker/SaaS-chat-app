import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import React from "react";
import UserButton from "./UserButton";
function Header() {
  return (
    <div>
      <header className=" sticky top-0 z-50 bg-white dark:bg-gray-900">
        <nav className="flex items-columns sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto ">
          <Logo />
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* language switcher */}

            {/* sessions &&
             */}
            <DarkModeToggle />
            <UserButton />
          </div>
        </nav>
        {/* upgrade banner */}
      </header>
    </div>
  );
}

export default Header;
