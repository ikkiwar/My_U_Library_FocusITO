import React from 'react';
import { Button } from 'primereact/button'
import "../assets/style/NewUserDialog.scss"

const NewUserDialog = () => {

  return (
    <div className="new-user">
      <Button icon="pi pi-plus"  className="p-button-rounded p-button-info"/>
    </div>
  );
};

export default NewUserDialog;