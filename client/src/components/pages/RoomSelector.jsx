import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch.js';
import { useNavigate } from 'react-router-dom';
import Image from '../supports/Image/Image.jsx';
import WhiteSpace from '../supports/WhiteSpace/WhiteSpace.jsx';
import GenericButton from '../buttons/GenericButton.jsx';
import WhiteButton from '../buttons/WhiteButton.jsx';
import { backendDomain, loggedUsername } from '../../global.js';
import { userArray, loggedId } from '../../global.js';
import Fetch, { callApi } from '../supports/Fetch/Fetch.jsx';
import Cookies from 'js-cookie';
import DialogBox from '../containers/DialogBox.jsx';
import CrossButton from '../buttons/CrossButton.jsx';


const RoomSelector = () => {
  const navigate = useNavigate();

  const roomButtonSize = '500px';
  const roomButtons = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px'
  }; 
  const [roomName, setRoomName] = useState(null);
  const [roomPassword, setRoomPassword] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [createRoomDialog, setCreateRoomDialog] = useState(false);
  const [enterRoomDialog, setEnterRoomDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  useEffect(() => {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    if (tokenElement) {
      setCsrfToken(tokenElement.getAttribute('content'));
    }
  }, []); 
  const [rooms, setRooms] = useState([]);
  let roomCount = 0


  //const { data, error, loading } = Fetch({ url: `${backendDomain}/rooms`, method: 'GET' });
  useEffect(() => {
    fetchRooms();
  }, []);  // Asegúrate de incluir 'data' como dependencia para que se ejecute cuando 'data' cambie
  
  const [loading, setLoading] = useState(false);
  const fetchRooms = async () => {
        try {
          //setLoading(true); // Set loading before sending API request
          const response = await fetch(`${backendDomain}/rooms`)
          const data = await response.json(); // Response received
          setRooms(data.rooms);
          roomCount = rooms.lenght;
          //setLoading(false); // Stop loading
      } catch (error) {
          //setLoading(false); // Stop loading in case of error
          console.error(error);
      }
  };

  const toggleCreateRoom = () =>{
    setRoomName(null);
    setRoomPassword(null);
    setCreateRoomDialog(!createRoomDialog)
  }
  const toggleEnterRoom = (room) =>{
    setRoomPassword(null);
    setSelectedRoom(room);
    setEnterRoomDialog(!enterRoomDialog)
  }
  const handleRoomName = e => {
      setRoomName(e.target.value);
  };

  const handleRoomPassword = e =>{
      setRoomPassword(e.target.value);
  }

  const createNewRoom = async () => {
    console.log('creating room...');
    let newRoomName = roomName;
    if (newRoomName == null || Array.from(newRoomName)[0] == ' '){
      newRoomName =`${loggedUsername.value}'s room`;
    }
    console.log(newRoomName);
    console.log(roomPassword);
    /*await callApi(`${backendDomain}/create-room`, 'POST', {
      room_id: roomCount,
      room_name: newRoomName,
      hoster_user_id: loggedId.value,  
      password: roomPassword
    })*/
      try {
        console.log('trying to create room...');
        const response = await fetch(`${backendDomain}/create-room`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                room_id: roomCount,
                room_name: newRoomName,
                hoster_user_id: loggedId.value,  
                password: roomPassword
              }),
        });

        if (response.ok) {
            console.log("Room created");
            fetchRooms();
            toggleCreateRoom();
        } else {
            console.error("Failed to create room");
        }
    } catch (error) {
        console.error("Error creating room:", error.message);
    }
  };

  const logOut = async () =>{
    console.log('Loggin out...');
      const sessionId = Cookies.get('session_id');
      const response = await fetch(`${backendDomain}/delete-session/${sessionId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Handle successful deletion (you might want to update the state or show a success message)
        Cookies.remove('session_id');
      } else {
        console.error("Failed to delete session:", response.status, response.statusText);
      }
      window.location.reload();
    
  
  }

 

  const navigateToRoom = (room) =>{
    console.log(room.password);
    if (room.password == roomPassword){
      navigate(`/rooms/${room.room_id}`);
    }else{
      console.log("Couldn't join room because password isn't correct");
    }
  } 

  const returnUsernameById = (hosterId) => {
    // Find the user object with the matching ID in the userArray
    const usernameById = userArray.find(user => user.id === hosterId);
    
    // If a matching user is found, return their username
    // Otherwise, return null or handle the case appropriately
    return usernameById ? usernameById.username : null;
  };


  return (
    <div>

    {/**************/}
    {/**************/}
    {/*DIALOG BOXES*/}
    {/**************/}
    {/**************/}
  


    {/*USE CASE 1: creating a new room*/}

    {!createRoomDialog ? (
      <div>
          {/*nothing is displayed*/}
      </div>
      ):(
        <div>
          <DialogBox>
              <div style={{float:'right'}}>
                <CrossButton  onClick={(toggleCreateRoom)}/>
              </div>
              <Image src="logo-white.png" height={70}/>
              Create a new room
              <WhiteSpace height={20}/>
              <form style={{color:'white'}}>
                Room name <input onChange={handleRoomName}/>
                <WhiteSpace height={20}/>
                Room password <input onChange={handleRoomPassword}/>
              </form>
              <div style={{textAlign:'right'}}>
                <WhiteButton width={'100px'} onClick={createNewRoom}>+ Create</WhiteButton>
              </div>
          </DialogBox>
        </div>
      )}



    {/*USE CASE 2: joining a room*/}

      {!enterRoomDialog ? (
        <div>
        </div>
      ):(
        <div>
        <DialogBox>
            <div style={{float:'right'}}>
                <CrossButton  onClick={(toggleEnterRoom)}/>
              </div>
              <WhiteSpace height={40}/>
              ⚠ Enter password
              <WhiteSpace height={20}/>
              <form style={{color:'white'}}>
                <WhiteSpace height={20}/>
                Room password <input onChange={handleRoomPassword}/>
              </form>
              <div style={{textAlign:'right'}}>
              <WhiteButton width={'100px'} onClick={()=>navigateToRoom(selectedRoom)}>Join</WhiteButton>
              </div>
          </DialogBox>
        </div>
      )}
            
          

      {/********/}
      {/********/}
      {/* MAIN */}
      {/********/}
      {/********/}

      <section className="header">
      
        <div style={{float: 'left'}}>
          <div style={{display:'flex'}}>
          <Image src="/logo.png" height={54}/> <br/>
          <WhiteButton width="110px" onClick={toggleCreateRoom}>
            + New room
          </WhiteButton>
          </div>
        </div>


        <div style={{float: 'right'}}>
          <GenericButton height={'10px'} width={'100px'} onClick={logOut}>  
            <Image src="/user.png" height={14}/> {loggedUsername.value} <br/>
            ✕ Log out
          </GenericButton>
        </div>

        
      </section>
        
      <div style={{textAlign: 'center'}}>
      
       
       
      </div>

      <WhiteSpace height={50} />

      <div style={{textAlign: 'center'}}>
      📡 Hoster<br/>
      {/* to be implemented, 👤 Users connected */}
      </div>

      <div className="rooms-container">
        <section className="rooms">
          <WhiteSpace height={10} />
          {rooms[0] == null ? (
            <section style={{textAlign: 'center'}}>
                No rooms found
                <WhiteSpace height={100} width={500}/>
            </section>
          ):(
            <div>
                {/*room buttons*/}
                <div style={{textAlign: 'center'}}>
                  All rooms
                  {rooms.map((room) => (
                    <div key={room.room_id} style={roomButtons}>
                        <GenericButton 
                                        width={roomButtonSize}
                                        onClick={() => toggleEnterRoom(room)}> 
                            <div style={{fontWeight: '500'}}>{room.room_name}
                            <br/>
                            <div style={{fontWeight: '200', fontSize: '0.72rem'}}>📡 {returnUsernameById(room.hoster_user_id)}</div>
                            </div>
                    
                            <div><WhiteSpace width={320}/></div>
                            {/* to be implemented, users connected <div>👤0/8</div> */}
                        </GenericButton>
                      </div>
                    ))}
                </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default RoomSelector;
