import MenuOpen from './MenuOpen';
import { useState } from 'react'; 
import Link from 'next/link';

const Menu = () => {    
    const [menu, setMenu] = useState({'name': 'default', 'class': 'menuOpen'});

    const clickedItem = (myClass) => {
        if (menu.name === myClass) {
            setMenu({'name': 'default', 'class': 'menuOpen'});
        }
        else {
            setMenu({'name': myClass, 'class': 'menuOpen opened'});
        }
    }
    return (
        <div className="menu">
            <MenuOpen menuclass={menu.class} manuname={menu.name} />
            <div className="navBar">
                <div className="navItem home">
                <Link href="/">
                        <a>
                            <i className="fal fa-home-lg-alt"></i>
                        </a>
                    </Link>
                    
                </div>
                <div className="navItem search">
                    <i className="far fa-search" onClick={() => clickedItem("search")}></i>
                </div>
                <div className="navItem categories">
                    <Link href="/categories">
                        <a>
                            <i className="fas fa-th-large"></i>
                        </a>
                    </Link>
                </div>
                <div className="navItem profile">
                    <i className="fal fa-user" onClick={() => clickedItem("profile")}></i>
                </div>
            </div>
        </div>
    )
}

export default Menu;