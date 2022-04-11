import React, {useEffect, useState} from 'react';
import MenuBar from '../../components/MenuBar';
import Filters from "../../components/Filters";
import NewBookDialog from "../../components/NewBookDialog";
import {useDispatch,useSelector} from "react-redux";
import {getBooksList} from "../../redux/actions/booksActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

const Books = (props) => {
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();
    const {books} = useSelector((state) => ({
        books: state.books.books
    }));


    useEffect(() => {
        getlist()
    }, []);

    const getlist = () =>{
        dispatch(getBooksList());
    }

    const actionsTemplate = (rowData) => {
        return (
            <div>
               <Button label="" icon="pi pi-pencil" className="p-button-warning" />
                <Button label="" icon="pi pi-eye" className="p-button-info" />
            </div>
        );
    };

  return (
    <div>
      <MenuBar />
        <div className="body-container">
            <Filters title="Books" icon="pi pi-book" >
                   <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                   <InputText type="search" placeholder="Search" value={filter} onChange={(e) => setFilter( e.target.value ) } />
                   </span>
                <NewBookDialog getlist={getlist}/>
            </Filters>
            <div className="table-container">
                <DataTable value={books} paginator rows={10} globalFilter={filter} >
                    <Column field="title" header="Title" />
                    <Column field="author" header="Author" />
                    <Column field="published_year" header="Published Year" />
                    <Column field="genre" header="Genre" />
                    <Column field="actions" header="Actions" body={actionsTemplate} />
                </DataTable>
            </div>
        </div>
    </div>
  );
};
export default Books;