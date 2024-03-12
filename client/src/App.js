import './global.css';
import logo from './logo.svg';
import RoomSelector from './components/pages/RoomSelector';
import LoginPrompter from './components/pages/LoginPrompter';
import ChatRoom from './components/pages/ChatRoom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { backendDomain } from "./global";
import { loggedUsername, loggedId } from './global';
import { userArray } from './global';
import Cookies from 'js-cookie';

function App() {
  
  const [loading, setLoading] = useState(false);
  const [logged, setLoggedUser] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [cookieSession, setCookieSession] = useState();



  const getLoggedUser = async () => {
    try {
      console.log('About to fetch sessions');
      const response = await fetch(`${backendDomain}/sessions`);
      const data = await response.json();
      setSessions(data.sessions);
      console.log('Fetching sessions...');
    } catch (error) {
      console.log(`Couldn't fetch sessions: `, error);
    }
  };
  
  useEffect(() => {
    getLoggedUser();
  }, []);
  
  useEffect(() => {
    const sessionIdCookie = Cookies.get('session_id');
    sessions.forEach(session => {
      console.log(session.session_id);
    });
    const selectedSession = sessions.find(session => session.session_id === sessionIdCookie);
    if (selectedSession) {
      console.log('Session ID:', selectedSession.session_id);
      setLoggedUser(true);
      setLoggedUserId(selectedSession.associated_user_id);
      const sessionUser = userArray.find(user => user.id === selectedSession.associated_user_id);
      loggedUsername.value = sessionUser.username;
      loggedId.value = sessionUser.id;
    } else {
      console.log('No session found with the specified session ID.');
    }
    console.log('New logged user id: ' + loggedUserId);
  }, [sessions]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element=
           {loggedUserId == null ? (
              <LoginPrompter/>
            ):(
              <RoomSelector/>
            )}
          />
          <Route path='/rooms/:id' element={<ChatRoom/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;