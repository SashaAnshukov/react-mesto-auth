import PopupWithForm from './PopupWithForm';
import {useState, useEffect} from 'react';


function AddPlacePopup({isOpen, onClose, onAddPlace, buttonText}) {
    // Стейт, в котором содержится значение инпута - name, link
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    // Обработчики изменения инпута обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        
        // Передаём значения управляемых компонентов во внешний обработчик
        const dataCard = {};
        dataCard.name = name;
        dataCard.link = link;
        onAddPlace(dataCard);
    }

    //очищаем инпуты при каждом открытии модального окна
    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('')
        }
    }, [isOpen])



    return (
        <PopupWithForm 
            name = {'add-card'} title = {'Новое место'}
            isOpen = {isOpen} onClose = {onClose}
            buttonText = {buttonText} onSubmit={handleSubmit}
        >
            <div className="popup__label">
            <input
                value={name || ''} onChange={handleChangeName}
                required minLength="1" maxLength="30" type="text"
                name ="name" placeholder = "Название"
                className="popup__input popup__input_text_namePlace"
            />
            <span className="popup__input-error"></span>
            
            </div>
            <div className="popup__label">
                <input 
                    value={link || ''} onChange={handleChangeLink}
                    required type="url" name ="link"
                    placeholder = "Ссылка на катинку" className="popup__input popup__input_text_link"
                />
                <span className="popup__input-error"></span>
            </div>
        </PopupWithForm>

    );
}

export default AddPlacePopup;