import React from 'react';
import { useState} from 'react';
import {Link} from 'react-router-dom';
//import * as auth from '../auth.js';
//import * as data from '../data.js';
//import './styles/Register.css';

function Register ({registration}) {
    
    // Стейт, в котором содержится значение инпута - mail, password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Обработчики изменения инпута обновляют стейт
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

//Отправляем данные на сервер
    function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    
    // Передаём значения управляемых компонентов во внешний обработчик
    const dataRegister = {};
    dataRegister.email = email;
    dataRegister.password = password;
    registration(dataRegister);
    }


    return (
        <div className="popup__container">
            <h2 className="popup__name">{'Регистрация'}</h2>
            <form name ={'Регистрация'} className="popup__form" onSubmit={handleSubmit}>
                <div className="popup__label">
                    <input
                        value={email || ''} onChange={handleChangeEmail}
                        required minLength="1" maxLength="30" type="text"
                        name ="Email" placeholder = "Email"
                        className="popup__input popup__input_text_namePlace"
                    />
                    <span className="popup__input-error"></span>
                    
                    </div>
                    <div className="popup__label">
                        <input 
                            value={password || ''} onChange={handleChangePassword}
                            required type="password" name ="password"
                            placeholder = "Пароль" className="popup__input popup__input_text_link"
                        />
                        <span className="popup__input-error"></span>
                    </div>
                        <button type ="submit" aria-label="saveButton"
                            className="popup__button popup__button_invalid">{'Зарегистрироваться'}
                        </button>
                    <div className="popup__name">
                        <p>Уже зарегистрированы?</p>
                        <Link to="login" className="register__login-link">Войти</Link>
                    </div>
            </form>
        </div>
    )
}

export default Register;