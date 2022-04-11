import React, {useState, useRef} from 'react';
import { Button } from 'primereact/button'
import "../assets/style/NewUserDialog.scss"
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {Password} from "primereact/password";
import RolDropDown from "../components/RolDropDown";
import {Toast} from "primereact/toast";

const NewUserDialog = ({getlist}) => {
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState("");
    const [lastName, setLastName] = useState();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [role, setRole] = useState(null);
    const toast = useRef(null);

    const footer = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-secondary" />
            <Button label="Save" icon="pi pi-check" onClick={() => createUser()} className="p-button-success" />
        </div>
    );

    const createUser = () => {
        const body = {
            name: userName,
            last_name: lastName,
            email: userEmail,
            idRole: role.idRole,
            password: userPassword
        };
        let heads = new Headers();
        heads.append("content-type", "Application/json");
        fetch(`http://localhost:49146/api/user`, {
            method: "POST",
            headers: heads,
            body: JSON.stringify(body)
        })
            .then(res => res)
            .then(res => {
                if (res.status === 200) {

                    toast.current.show({
                        severity: 'success',
                        summary: 'Exito',
                        detail: 'User created',
                        life: 3000
                    });
                    getlist()
                    setShowModal(false);

                } else {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Something went wrong',
                        life: 3000
                    });
                }
            });

    }

    return (
    <div className="new-user">
        <Toast ref={toast} />
        <Dialog header="New User" visible={showModal} style={{ width: '25vw' }} footer={footer}  onHide={() => setShowModal(false) }>
            <div className="dialog-user-body">
                <div className="text-field">
                    <label>
                        Name:
                    </label>
                    <InputText placeholder="Name" value={userName} onChange={(e)=> setUserName(e.target.value)} />
                </div>
                <div className="text-field">
                    <label>
                        Last Name:
                    </label>
                    <InputText placeholder="Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
                </div>
                <div className="text-field">
                    <label>
                        Email:
                    </label>
                    <InputText placeholder="Email" value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} />
                </div>
                <div className="text-field">
                    <label>
                        Password:
                    </label>
                    <Password placeholder="Password" value={userPassword} onChange={(p)=>setUserPassword(p.target.value)}  toggleMask feedback={false} />
                </div>
                <div className="text-field">
                    <label>
                        Role:
                    </label>
                    <RolDropDown role={role} setRole={setRole} />
                </div>
            </div>
        </Dialog>

      <Button icon="pi pi-plus"  className="p-button-rounded p-button-info" tooltip="new user" tooltipOptions={{ position: 'bottom' }} onClick={()=> setShowModal(true)}/>
    </div>
  );
};

export default NewUserDialog;