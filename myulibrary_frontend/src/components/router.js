import React from "react";
import { BrowserRouter, Route, Link , Routes} from "react-router-dom";
import Login from "../pages/login/Login"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"  element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}