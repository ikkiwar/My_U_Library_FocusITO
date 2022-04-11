import React, {useRef, useState} from 'react';
import { Button } from 'primereact/button'
import "../assets/style/NewUserDialog.scss"
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {Toast} from "primereact/toast";
import { InputNumber } from 'primereact/inputnumber';

const NewBookDialog = ({getlist})=>{
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [genre, setGenre] = useState("");
    const [stock, setStock] = useState(0);
    const toast = useRef(null);

    const footer = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-secondary" />
            <Button label="Save" icon="pi pi-check" onClick={() => createBook()} className="p-button-success" />
        </div>
    );

    const createBook = () => {
        const body = {
            title: title,
            author: author,
            published_year: publishedYear,
            genre: genre,
            copies: stock
        };
        let heads = new Headers();
        heads.append("content-type", "Application/json");
        fetch(`http://localhost:49146/api/books`, {
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
                        detail: 'Book created',
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
            <Dialog header="New Book" visible={showModal} style={{ width: '25vw' }} footer={footer}  onHide={() => setShowModal(false) }>
                <div className="dialog-user-body">
                    <div className="text-field">
                        <label>
                            Title:
                        </label>
                        <InputText placeholder="title" value={ title } onChange={(e)=> setTitle(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label>
                            Author:
                        </label>
                        <InputText placeholder="Author" value={author} onChange={(e)=> setAuthor(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label>
                            Published Year:
                        </label>
                        <InputText placeholder="Published Year" value={publishedYear} onChange={(e)=> setPublishedYear(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label>
                            Genre:
                        </label>
                        <InputText placeholder="Genre" value={genre} onChange={(p)=>setGenre(p.target.value)}   />
                    </div>
                    <div className="number-field">
                        <label>
                            Copies:
                        </label>
                        <InputNumber value={stock} onChange={(s) => setStock(s.value)} showButtons buttonLayout="horizontal" step={1} min={0}
                                     decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"  />
                    </div>
                </div>
            </Dialog>

            <Button icon="pi pi-plus"  className="p-button-rounded p-button-info" tooltip="new book" tooltipOptions={{ position: 'bottom' }} onClick={()=> setShowModal(true)}/>
        </div>
    );
}

export default NewBookDialog;