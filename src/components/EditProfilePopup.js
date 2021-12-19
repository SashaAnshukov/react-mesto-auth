import PopupWithForm from './PopupWithForm';
import {useContext, useEffect, useState} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);
    // Стейт, в котором содержится значение инпута - name, description
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Обработчики изменения инпута обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
    
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm 
            name = {'edit'} title = {'Редактировать профиль'}
            isOpen = {isOpen} onClose = {onClose}
            buttonText = {buttonText} onSubmit={handleSubmit}
        >
            <div className="popup__label">
                <input
                    value={name || ''} onChange={handleChangeName}
                    required minLength="2" maxLength="40" type="text"
                    name ="name" className="popup__input popup__input_text_name"
                />
                <span className="popup__input-error"></span>
            </div>
            <div className="popup__label">
                <input
                    value={description || ''} onChange={handleChangeDescription} 
                    required minLength="2" maxLength="200" type="text"
                    name ="profession" className="popup__input popup__input_text_profession"
                />
                <span className="popup__input-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;