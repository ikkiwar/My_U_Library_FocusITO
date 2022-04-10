import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from "../../redux/actions/userActions"
import "../../assets/style/Login.scss";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({
        user: state.user.user
    }));

    const handleSubmit = () => {
      dispatch(getUserData(email))
    };

    useEffect(() => {

        if (user[0]) {
            (user[0]?.password === password) ? window.location.href = "/home" : alert("Wrong password");
        }
    }, [user]);


  return (
    <div className="login-container">
        <div className="login-form">
      <h1>My U Library</h1>
      <div className="fields-container">
          <div className="text-field">
              <label>
                  Email:
              </label>
              <InputText placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>

        <div className="text-field">
            <label>
                 Password:
            </label>
             <Password placeholder="Password" value={password} onChange={(p)=>setPassword(p.target.value)}  toggleMask feedback={false} />
        </div>

       <Button label="Login" className="login-button" onClick={() => handleSubmit()} />
      </div>
        </div>
    </div>
  );
};

export default Login;