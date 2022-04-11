import React from 'react';
import { Dropdown } from 'primereact/dropdown';


const RolDropDown = ({role, setRole}) => {
    const rolesOptions = [
        {  "idRole": 0, "role": "librarian"},
        {"idRole": 1, "role": "student"}
    ];

    const onChange = (e) => {
        setRole(e.value);
    }
    return (
        <div>
            <Dropdown value={role} options={rolesOptions} onChange={onChange} optionLabel="role" placeholder="Select a Role" />
        </div>
    );
}
export default RolDropDown;