import WhiteSpace from '../supports/WhiteSpace/WhiteSpace';
import Message from '../elements/Message';
import Image from '../supports/Image/Image';
import CrossButton from '../buttons/CrossButton';
import { useNavigate, useParams } from 'react-router-dom';
import './ChatRoom.css';
import GenericButton from '../buttons/GenericButton';
import { backendDomain } from '../../global';
import { useState } from 'react';
import { useEffect } from 'react';
import { loggedId, userArray } from '../../global';
import DialogBox from '../containers/DialogBox';


const ChatRoom = () =>{
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
  

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    const navigate = useNavigate();
    const navigateToRoomSelector = () =>{
        navigate(`/`);
      } 
      
    const { id } = useParams(); 

    const handleMessageContent = e =>{
        setNewMessage(e.target.value);
    }

    useEffect(() => {
        fetchRooms();
        fetchMessages();
    }, []);

    const fetchMessages = async () =>{
        try {
            const response = await fetch(`${backendDomain}/messages`)
            const data = await response.json(); // Response received
            setMessages(data.messages);
            //setLoading(false); // Stop loading
        } catch (error) {
            //setLoading(false); // Stop loading in case of error
            console.error(error);
        }
    }
    const sendMessage = async () =>{
        console.log('Sending message with content ' + newMessage + '...')
        const response = await fetch(`${backendDomain}/create-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: newMessage,
                parent_room_id: id,
                messager_user_id: loggedId.value
            }),
        });
        if (response.ok) {
            fetchMessages();
            console.log('Created a new message');
          
        } else {
            console.error("Error creating message");
        }
    }

    const returnUsernameById = (messagerId) => {
        // Find the user object with the matching ID in the userArray
        const messagerById = userArray.find(user => user.id === messagerId);
        
        // If a matching user is found, return their username
        // Otherwise, return null or handle the case appropriately
        return messagerById ? messagerById.username : null;
      };

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${backendDomain}/rooms`);
            const data = await response.json();
        
            setRooms(data.rooms);
            const selected = data.rooms.find(room => room.room_id === parseInt(id));
            setSelectedRoom(selected);
        
        } catch (error) {
            console.error(error);
        }
      };
      if (!selectedRoom) {
        return <div>Room not found, please try again later</div>; // Add loading state if the selected entry is not yet available
      }

    return(
        <div id="messenger">
        <body>
           
            <div id="chat-container">
            <nav className='topbar'>
                <div className='topbar-room-name'>
                      <div style={{display: 'flex'}}>
                      <WhiteSpace width={5}/>
                    <Image src="/logo.png" height={24} />
                    {selectedRoom.room_name}
                    </div>
                </div>
              
                <div className='topbar-blank-space'>
                    <div style={{float: 'right', padding: '4px'}}>
                        <CrossButton onClick={() => navigateToRoomSelector()}/>
                    </div>
                </div>
            </nav>
                <div id="side-bar">
                    
                </div>
                <div id="chat-window">
                    <div className='messages-rows'>
                        Welcome to Leaf Messenger!
                        <WhiteSpace height={50}/>
                        {messages.map((message) => (
                            <key key={message.message_id}>
                                {message.parent_room_id == selectedRoom.room_id ? (
                                    <div>
                                        {message.messager_user_id == loggedId.value ? (
                                            <div style={{textAlign: 'right'}}>
                                                <Message>{returnUsernameById(message.messager_user_id)}: {message.content}</Message>
                                            </div>
                                        ):(
                                            <div style={{textAlign: 'left'}}>
                                                <Message>{returnUsernameById(message.messager_user_id)}: {message.content}</Message>
                                            </div>
                                            )
                                        }
                                    </div>
                                ):
                                (
                                    <div>
                                    </div>
                                )}
                            </key>
                        ))}
                        </div>
                        <div id='send-area'>
                            <input type="text" placeholder="Type your message..." />
                            <GenericButton width={'100px'} onClick={sendMessage}>Send</GenericButton>
                        </div>
                </div>
            </div>
            {/*old code*/} 
          {/*
            <nav className='topbar'>
                <div className='topbar-room-name'>
                    <Image src="logo-white.png" height={40} />
                    {selectedRoom.room_name}
                </div>
              
                <div className='topbar-blank-bar'>
                    <div style={{float: 'right', padding: '4px'}}>
                        <CrossButton onClick={() => navigateToRoomSelector()}/>
                    </div>
                </div>
            </nav>
         
            <section className='chat-section'>
            
                <div id='chat_sidebar'>         
                    <WhiteSpace height={20}/>
                    <div className='users-box' style={{width: '140px', height: '50px'}}>
                        Connected users 0/8
                    </div>
                    <WhiteSpace height={20}/>
                    <div className='users-box' style={{width: '140px', height: '350px'}}>
                       
                    </div>
                </div>
               
           
                <div id='chat_window'>
                    <div className='chat-board-messages'>
                        <div className='messages-rows'>
                        Welcome to Leaf Messenger!
                        <WhiteSpace height={50}/>
                        {messages.map((message) => (
                            <key key={message.message_id}>
                                {message.parent_room_id == selectedRoom.room_id ? (
                                    <div>
                                        {message.messager_user_id == loggedId.value ? (
                                            <div style={{textAlign: 'right'}}>
                                                <Message>{returnUsernameById(message.messager_user_id)}: {message.content}</Message>
                                            </div>
                                        ):(
                                            <div style={{textAlign: 'left'}}>
                                                <Message>{returnUsernameById(message.messager_user_id)}: {message.content}</Message>
                                            </div>
                                            )
                                        }
                                    </div>
                                ):
                                (
                                    <div>
                                    </div>
                                )}
                            </key>
                        ))}
                        </div>

                        <div className='send-area'>
    <input type="text" placeholder="Type your message..." />
    <button onClick={sendMessage}>Send</button>
  </div>
                        
                    </div>
               
             
                </div>
              
            </section>
   <GenericButton/>
   */}
        </body>
        </div>
    );
};

export default ChatRoom;