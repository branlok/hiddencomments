import React, { useState } from "react";
import { ReactComponent as Menu } from "../../styles/menu-hamburger-nav-svgrepo-com.svg";
function Dropdown() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative w-full overflow-hidden  ">
          <Menu
            onClick={() => setToggle(true)}
            className="h-full fill-current text-white cursor-click"
          />
    </div>
  );
}

export default Dropdown;
