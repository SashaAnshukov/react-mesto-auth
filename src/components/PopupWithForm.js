function PopupWithForm({name, title, isOpen, onClose, children, buttonText, onSubmit}) {
    
    return (
        //<div className= {`popup ${isOpen && "popup_visible"} popup_type_${name}`}>
        <div className= {`popup_type_${name} popup ${isOpen ? 'popup_visible' : ''} `}> 
                <div className="popup__container">
                    <button id="closeButton" type ="button" aria-label="close" onClick={onClose}
                        className="popup__close-button opacity-buttons">
                    </button>
                    <h2 className="popup__name">{title}</h2>
                    <form name ={`${name}`} className="popup__form" onSubmit={onSubmit}>
                        {children}
                        <button type ="submit" aria-label="saveButton"
                            className="popup__button popup__button_invalid">{buttonText}
                        </button>
                    </form>
                </div>
        </div>
    );
}

export default PopupWithForm;