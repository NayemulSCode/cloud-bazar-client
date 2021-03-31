import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { initializeLogin,handleGoogleSignIn } from './ManageLogin';

const Login = () => {
    initializeLogin()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //private route 
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    // google sing in start
    const googleSignIn =() =>{
        handleGoogleSignIn()
        .then(res =>{
            console.log('login successfully')
            handleResponse(res, true);
        })
    }
    const handleResponse = (res, redirect)=>{
        setLoggedInUser(res)
        if(redirect){
            history.replace(from);
        }
    }

    return (
        <div>
            <h3>login component</h3>
            <button onClick={googleSignIn}>Continue with google</button>
        </div>
    );
};

export default Login;