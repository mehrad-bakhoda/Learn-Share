import { useState } from 'react'; 

import MenuSearch from "./MenuSearch";
import MenuProfile from "./MenuProfile";

function MenuOpen(props) {
    const menuName = props.manuname;
    const menuClass = props.menuclass;
    return (
        <div className={menuClass} menuname={menuName}>
            {menuName == "search" && <MenuSearch />}
            {menuName == "profile" && <MenuProfile />}
        </div>
    )

}

export default MenuOpen;