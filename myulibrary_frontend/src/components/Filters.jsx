import React from 'react';
import "../assets/style/Filters.scss";

const Filters =({ title, icon ,children})=>{
    return(
        <div className="filter-row">
            <div className="filter-title">
                <i className={icon}></i>
                <h2>{title}</h2>
            </div>
            <div className="filter-children">
                {children}
            </div>

        </div>
    )
}
export default Filters;