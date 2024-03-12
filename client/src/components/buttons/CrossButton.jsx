import './CrossButton.css';

const CrossButton = ({onClick}) =>{
    
    return(
        <div className='cross-button' onClick={onClick}>
           ✕
        </div>
    );
}

export default CrossButton;