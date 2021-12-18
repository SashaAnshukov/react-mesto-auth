import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';

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
    const datastartPage = {};
    datastartPage.email = email;
    datastartPage.password = password;
    registration(datastartPage);
    }

    return (
        <div className="startPage__container">
            <h2 className="startPage__name">Регистрация</h2>
            <form name ={'Регистрация'} className="startPage__form" onSubmit={handleSubmit}>
                <div className="startPage__label">
                    <input
                        value={email || ''} onChange={handleChangeEmail}
                        required minLength="1" maxLength="30" type="text"
                        name ="Email" placeholder = "Email"
                        className="startPage__input startPage__input_text_namePlace"
                    />
                    <span className="startPage__input-error"></span>
                </div>
                <div className="startPage__label">
                    <input 
                        value={password || ''} onChange={handleChangePassword}
                        required type="password" name ="password"
                        placeholder = "Пароль" className="startPage__input startPage__input_text_link"
                    />
                    <span className="startPage__input-error"></span>
                </div>
                <button type ="submit" aria-label="saveButton"
                    className="startPage__button startPage__button_invalid">Зарегистрироваться
                </button>
                <p className="startPage__button_span">Уже зарегистрированы?
                    <Link className="startPage__button_link" to='/sign-in'> Войти</Link>
                </p>
            </form>
        </div>
    )
}

export default Register;