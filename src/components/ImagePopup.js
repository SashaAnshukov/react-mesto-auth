function ImagePopup({card, isOpen, onClose}) {
    return (
        //<div className={`popup ${card.src && "popup_visible"} popup popup_type_image`}>
        //<div className={isOpen ? `popup popup popup_type_image` : `popup popup_type_image popup_visible`}>
        <div className={`popup popup_type_image ${card && isOpen ? 'popup_visible' : ''}`}>
            <div className="popup__overlay"></div>
            <div className="popup__container-forImage">
                    <figure className ='popup__figure'>
                        <button
                            type ="button" aria-label="close" onClick={onClose}
                            className="popup__close-button popup__close-button_forImage opacity-buttons">
                        </button>
                        <img
                            className ="popup__figure-image"
                            src = {card ? card.link : ''}
                            alt= {card ? card.alt : ''}
                        />
                        <figcaption className ="popup__figure-caption">{card ? card.name : ''}</figcaption>
                    </figure>
            </div>
        </div>
    );
}

export default ImagePopup;