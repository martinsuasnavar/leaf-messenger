import Image from "../supports/Image/Image";
import WhiteSpace from "../supports/WhiteSpace/WhiteSpace";
import GenericButton from "../buttons/GenericButton";
import DialogBox from "../containers/DialogBox";
import './LoginPrompter.css';
import WhiteButton from "../buttons/WhiteButton";
import { useState, useEffect } from "react";
import CrossButton from "../buttons/CrossButton";
import Cookies from 'js-cookie';
import { backendDomain } from "../../global";
import { loggedUsername } from "../../global";
import { userArray } from "../../global";


import { useNavigate } from "react-router-dom";
import { callApi } from "../supports/Fetch/Fetch";

const LoginPrompter = () =>{
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    //login
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    //sign up
    const [signUpUsername, setSignUpUsername] = useState(null);
    const [signUpPassword, setSignUpPassword] = useState(null);  

    const [isSignUpActive, setSignUp] = useState(false);
    const [signUpMessage, setSignUpMessage] = useState('');
    const [sessions, setSessions] = useState(null);

    //login error handling
    const [isLoginErrorActive, setLoginErrorState] = useState(false);
    const [loginErrorString, setLoginErrorString] = useState('');

    //loading
    const [isLoading, setLoading] = useState(true);

    const toggleSignUp = () => {
        setSignUp(!isSignUpActive);
    };

    const handleUsername = e => {
        setUsername(e.target.value);
        console.log('username: ' + username);
    };

    const handlePassword = e =>{
        setPassword(e.target.value);
        console.log('password: ' + password);
    }

    const handleSignUpUsername = e =>{
        setSignUpUsername(e.target.value);
    }

    const handleSignUpPassword = e =>{
        setSignUpPassword(e.target.value);
    }

    const signUp = (username, password) =>{
        setSignUpMessage('Signing up...')
        fetchNewSignUp(username, password);
    }
    
    useEffect(() =>{
        getUsers();
    }, []);
    
    const getUsers = async ()  =>{
        const data = await callApi(`${backendDomain}/users`, 'GET');
        setUsers(data);
        setLoading(false);
    }

    console.log("userArray lenght : " + users.length);

    const fetchNewSignUp = async (username, password) => {
        const checkIfUsernameExists = users.users.find(user => user.username == username);
        if (checkIfUsernameExists != null){
            setSignUpMessage('Failed to create account, username already exists');
            console.error("Failed to create account, username already exists");
        }else{
            try{
                const response = await fetch(`${backendDomain}/create-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: userArray.length,
                        username: username,
                        password: password,
                    }),
                })
                const validPassword = password != null && !password.includes(' ');
                const validUsername = username != null && Array.from(username)[0] != ' ';
                const validCredentials = validPassword && validUsername;
                if (validPassword == false){
                    setSignUpMessage('Invalid password');
                }
                if (validUsername == false){
                    setSignUpMessage('Invalid username');
                }
                if (validCredentials){
                    if (response.ok) {
                        setSignUpMessage('Account created, now you can login with your data')
                        console.log('Created a new account, saved sucessfully in database');
                    } else {
                        setSignUpMessage('Failed to create account, API error');
                    }
                }
            }
            catch (error){
                console.error("Failed to create account", error);
            }
        }
    };

    useEffect(() => {
    }, []);
    //get 

    /*
    const fetchUsers = async () => {
       const response = await fetch(`${backendDomain}/users`);
       const data = await response.json();
       try{
            setUsers(data.users);
       }catch(error){
            console.log(`Couldn't fetch users: `, error)
       }
    };
    */

    const logIn = async () =>{
        
        const selectedUser = userArray.find(user => user.username == username);
 
        if (selectedUser != null){
            console.log("input username: " + username);
            console.log("input password: " + password);
            console.log("actual username: " + selectedUser.username);
            console.log("actual password: " + selectedUser.password);
            if (password == selectedUser.password){
                 console.log('Password is ok');
                 generateSessionId(selectedUser.id);
                 navigate('/');
            }else{
                setLoginErrorState(true); setLoginErrorString('Password is not correct');
                console.error(`Password with value ${password} for username ${username} does not exist`);
                
            }
        }else{
            setLoginErrorState(true); setLoginErrorString('User does not exist');
            console.error(`User with username ${username} does not exist`);
        }
    };


    let rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };
    
    let token = function() {
        return rand() + rand(); // to make it longer
    };
    
   
    const generateSessionId = async (associatedUserId) =>{
        const newSessionId = token();
        const response = await fetch(`${backendDomain}/create-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_id: newSessionId,
                associated_user_id: associatedUserId,
            }),
        });
        if (response.ok) {
            console.log('Created a new session id');
            console.log('Logging in...');
            window.location.reload();
        } else {
            console.error("Create session id");
        }

        /* do another fetch call to retrieve all sessions,
        then it would select a session associated with
        the selected user id, finally it will get saved
        in a cookie as reference for the RoomSelector.jsx
        session */

        Cookies.set('session_id', [newSessionId], { expires: 1 }); // Expires in 1 day
        /*
        const selectedSession = sessions.find(session => session.associated_user_id === associatedUserId);
        
        */
    }


    return(
        <section>
           
            {isSignUpActive ? (
            <DialogBox>
            <div style={{float: 'right'}}>
                <CrossButton onClick={toggleSignUp}></CrossButton>
            </div>
            <br/>
            
            Create an account
                <form style={{color: 'white'}}>
                  
                        
                   User
                        <input type='text' required onChange={handleSignUpUsername}>
                        </input>
                   
                    <WhiteSpace height={1} />
                    Password 
                    <input type='text' required onChange={handleSignUpPassword}>
                    </input>
                    <div>
                    <WhiteSpace height={1}/>
                  
                 
                        
                    </div>
                </form>
                {signUpMessage} <br/>
                Do not provide any sensitive information
                    <WhiteButton width={'100px'} onClick={() => signUp(signUpUsername, signUpPassword)}>
                        Sign up
                    </WhiteButton>
            </DialogBox>
            ):(
                <div>

                </div>
            )}

            <div style={{textAlign: 'center'}}>
                <WhiteSpace height={100} />
                <Image src="logo.png" height={120} />
                <WhiteSpace height={20} />
                <div className='login-text'>
                    Chat for 24 hours
                </div>
                <WhiteSpace height={70} />
                {!isLoading ? (
                    <form>
                        <div>
                            Username 
                            <input required type='text' onChange={handleUsername}>
                            </input>
                        </div>
                        <WhiteSpace height={40} />
                        Password 
                        <input required type='text' onChange={handlePassword}>
                        </input>
                        <div>
                        {isLoginErrorActive ? (
                            <div style={{color: 'red'}}>
                                {loginErrorString}
                            </div>
                            ):(
                            <div>
                            </div>
                        )}
                        <WhiteSpace height={20}/>
                    
                        <GenericButton width={'100px'} onClick={logIn}>
                            Log In
                        </GenericButton>
                    
                        <a onClick={toggleSignUp} style={{cursor: 'pointer'}}>
                            Haven't created an account? Sign up here
                        </a>
                        </div>
                    </form>
                ):(
                    <main className='login-text'><Image height={50} src="/loading.gif"></Image> </main>
                )}
            </div>
        </section>
    );
};

export default LoginPrompter;