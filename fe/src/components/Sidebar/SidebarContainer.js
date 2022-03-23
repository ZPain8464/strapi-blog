import React from "react";
import Cookies from "universal-cookie";

import SidebarButtons from "./SidebarButtons";
import NotificationsIcon from "./NotificationsIcon";

const SidebarContainer = () => {
    const cookies = new Cookies();
    const username = cookies.get("username");

    return (
    <div className={username ? "sidebar_container active" : "sidebar_container hidden"}>
        <div className="display_username_container">
            <div className={username ? "active" : "hidden"}>
                <p>Hello, {username}!</p>
            </div>
        </div>
        <div className="notifications_icon_container">
            <NotificationsIcon />
        </div>
        <div className="sidebar_buttons_container">
            <SidebarButtons />
        </div>
    </div>
    )
}

export default SidebarContainer;