import './DialogBox.css';
const DialogBox = ({headMessage, children}) =>{
    const iconStyle = {
        color: 'white'
    };

 return(
    <div className="dialog-box">
        <div className="dialog-box-content">
            <p>
                {children}
            </p>
        </div>
    </div>
 );
}

export default DialogBox;