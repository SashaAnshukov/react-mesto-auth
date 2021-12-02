import React from 'react';
import { useState } from 'react';

function Login({authorization}) {
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
        /*const dataLogin = {};
        dataLogin.email = email;
        dataLogin.password = password;*/
        authorization({ email, password });
        //console.log(dataLogin)
    }

    //очищаем инпуты при каждом открытии модального окна
    /*useEffect(() => {
        if (isOpen) {
            setMail('');
            setPassword('')
        }
    }, [isOpen])*/

    return (

        <div className="popup__container">
            <h2 className="popup__name">{'Вход'}</h2>
                    <form name ={'Вход'} className="popup__form" onSubmit={handleSubmit}>
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
                            className="popup__button popup__button_invalid">{'Войти в айти'}
                        </button>
                    </form>
        </div>
    )

}

export default Login;