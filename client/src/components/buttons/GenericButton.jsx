import './GenericButton.css';

const GenericButton = ({width, children, onClick}) =>{
    const style = {
        height: `50px`,
        width: `${width}`
    };
    
    return(
        <div className='generic-button' style={style} onClick={onClick}>
           {children}
        </div>
    );
}

export default GenericButton;