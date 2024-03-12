import './Message.css';

const Message = ({children}) =>{
    return(
        <div className="message">
            {children}
        </div>
    );
}

export default Message;