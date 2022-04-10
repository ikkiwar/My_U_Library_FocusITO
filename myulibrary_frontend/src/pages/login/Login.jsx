import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from "../../redux/actions/userActions"


const Login = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({
        user: state.user.user
    }));


  useEffect(() => {
    dispatch(getUserData());
  }, []);

   console.log(user)
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;