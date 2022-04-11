import React , {useState,useEffect} from 'react';
import MenuBar from "../../components/MenuBar";
import Filters from "../../components/Filters";
import NewUserDialog from "../../components/NewUserDialog";
import {useDispatch,useSelector} from "react-redux";
import {getUsersList} from "../../redux/actions/userActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

const Users = () => {
const dispatch = useDispatch();
    const {usersList} = useSelector((state) => ({
        usersList: state.user.usersList
    }));

    useEffect(() => {
        dispatch(getUsersList());
    }, []);

    console.log(usersList);

    return (
        <div>
            <MenuBar />
           <div className="body-container">
               <Filters title="Users" icon="pi pi-users" >
                   <NewUserDialog />
               </Filters>
               <div className="table-container">
                    <DataTable value={usersList} paginator={true} rows={10}>
                        <Column field="name" header="Name" />
                        <Column field="last_name" header="Last Name" />
                        <Column field="email" header="Email" />
                </DataTable>
               </div>
           </div>
        </div>
    );
};

export default Users;