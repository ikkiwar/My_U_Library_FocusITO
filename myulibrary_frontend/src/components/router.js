import React from "react";
import { BrowserRouter, Route, Link , Routes} from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Users from "../pages/users/Users";
import Books from "../pages/books/Books";
import BookHistory from "../pages/book-history/BookHistory";



export default function Router() {

    return (
        <BrowserRouter >
            <Routes>
                <Route exact path="/"  element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/users" element={<Users/>} />
                <Route path="/books" element={<Books/>} />
                <Route path="/book-history" element={<BookHistory/>} />
            </Routes>
        </BrowserRouter>
    );
}