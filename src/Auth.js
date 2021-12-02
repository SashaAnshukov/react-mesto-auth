export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
    .then((response) => {
        try {
        if (response.status === 200){
            return response.json();
        }
        } catch(e){
        return (e)
        }
    })
    .then((res) => {
        return res;
    })
    .catch((err) => console.log(err));
};

// функция, которая будет проверять логин и пароль пользователя
// на соответствие какому-либо профилю, хранящемуся в базе данных
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
    })
    .then((response => response.json()))
    .then((data) => {
        if (data.jwt){
            // сохраняем токен в localStorage
            localStorage.setItem('jwt', data.jwt);
            return data;
        } else {
            return;
        }
    })
    .catch(err => console.log(err))
};

//Запрос для проверки валидности токена и получения email для вставки в шапку сайта
export const tokenCheck  = (token) => {
    console.log(token)
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    //.then(res => res.json())
    .then(data => data)
}
