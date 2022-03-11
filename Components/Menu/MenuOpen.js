import MenuSearch from "./MenuSearch";

function MenuOpen(props) {
    const menuName = props.manuname;
    const menuClass = props.menuclass;
    return (
        <div className={menuClass} menuname={menuName}>
            {menuName == "search" && <MenuSearch />}
        </div>
    )

}

export default MenuOpen;