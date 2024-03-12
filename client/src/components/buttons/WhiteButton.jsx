import './WhiteButton.css';

const WhiteButton = ({width, children, onClick}) =>{
    const style = {
        height: `30px`,
        width: `${width}`
    };
    
    return(
        <div className='white-button' style={style} onClick={onClick}>
            {children}
        </div>
    );
}

export default WhiteButton;