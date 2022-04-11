import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import Book from "../assets/images/book.png"
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "../assets/style/MenuBar.scss"

const MenuBar = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => ({
        user: state.user.user[0]
    }));

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => navigate("/home")
        },
        {
            label: 'Books',
            icon: 'pi pi-fw pi-book',
            command: () => navigate("/books")
        },
       {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
            command: () => navigate("/users")
        } ,
        {
            label: 'Book History',
            icon: 'pi pi-fw pi-calendar',
            command: () => navigate("/book-history")
        },
        {
            label: 'Exit',
            icon: 'pi pi-fw pi-power-off',
            command: () => navigate("/")

        }
    ];

    const start = <img alt="logo" src={Book} height="40" className="mr-2"></img>;
    const end = <label style={{marginRight: "10px", fontWeight:"600"}}>{user.name.toUpperCase() +" "+user["last_name"].toUpperCase()}</label>;

    return (
        <div className="menu-bar">
            <div className="card">
                <Menubar model={  items } start={start} end={end} />
            </div>
        </div>
    );
}

export default MenuBar;