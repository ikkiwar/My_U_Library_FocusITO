import React , {useState,useEffect} from 'react';
import MenuBar from "../../components/MenuBar";
import Filters from "../../components/Filters";
import NewUserDialog from "../../components/NewUserDialog";
import {useDispatch,useSelector} from "react-redux";
import {getUsersList} from "../../redux/actions/userActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';

const Users = () => {
    const [filter, setFilter] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const dispatch = useDispatch();
    const {usersList} = useSelector((state) => ({
        usersList: state.user.usersList
    }));
    console.log(filter);

    useEffect(() => {
        getlist()
    }, []);

    const getlist = () =>{
        dispatch(getUsersList());
    }


    return (
        <div>
            <MenuBar />
           <div className="body-container">
               <Filters title="Users" icon="pi pi-users" >
                   <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                   <InputText type="search" placeholder="Search" value={filter} onChange={(e) => setFilter( e.target.value ) } />
                   </span>
                       <NewUserDialog getlist={getlist}/>
               </Filters>
               <div className="table-container">
                    <DataTable value={usersList} paginator rows={10} globalFilter={filter} >
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