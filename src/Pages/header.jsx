import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
const Header = () => {
    const location = useLocation()
    const menuItems = [
        {id:1,path:'/bot',label:'Automation',icon:'bi bi-robot'},
        {id:2,path:'/device-management',label:'Device Management',icon:'bi bi-pc'},
        {id:3,path:'/account-management',label:'Account Management',icon:'bi bi-person-badge'},
        {id:4,path:'/logout',label:'Sign Out',icon:'bi bi-box-arrow-right',style:{bottom:0}}
    

    ]
    const userCookies = Cookies.get("agentID");
    return (

        <div>

            <div>
                {
                    userCookies?
                    <aside id="sidebar" className="sidebar">

                    <ul className="sidebar-nav" id="sidebar-nav">
                        {
                            menuItems.map((menuItem)=>(
                                <div>
                                   {/* { menuItem.id === 4 && <div><br /> <br /> <br /> <br /></div>} */}
                                <li className="nav-item active" key={menuItem.id} activeclassname="actives" id={menuItem.id === 4 && 'logoutButton'}>

                                    <Link to={menuItem.path} className={location.pathname === menuItem.path ? 'nav-link show':'nav-link collapsed'} > <i className = {menuItem.icon}></i> {menuItem.label}</Link>
                                </li>
                                </div>
                            ))
                        }
    
                    </ul>
                </aside>:''
                }
            </div>
           

        </div>
    );
};

export default Header;
