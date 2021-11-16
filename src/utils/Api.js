export class Api {
    constructor({adress, token}) {
        this._adress = adress;
        this._token = token;
    }

    getFullPageInfo() {
        return Promise.all([this.getInitialCards(), this.getUserData()])
    }

    getInitialCards() {
        return fetch(`${this._adress}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            },
        })
        .then(this._checkResponse)
    }
    
    getUserData() {
        return fetch(`${this._adress}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            },
        })
        .then(this._checkResponse)
    }

    setUserData(data) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }

    setUserAvatar({avatar}) {
        //console.log('!!!', avatar);
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkResponse)
    }

    // добавление новой карточки
    setMyCard(data) {
        return fetch(`${this._adress}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
        .then(this._checkResponse)
    }

    // удаление карточки 
    deleteCard(id) {
        return fetch(`${this._adress}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json' 
            },
        })
        .then(this._checkResponse)
    }

    // лайки.постановка/удаление
    сhangeLikeCard(id, like) {
        return fetch(`${this._adress}/cards/likes/${id}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json' 
            },
        })
        .then(this._checkResponse)
    }

    //метод проверки ответа от сервера
    _checkResponse(response) {
        // тут проверка ответа
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
    }
}

const api = new Api({
    adress: 'https://mesto.nomoreparties.co/v1/cohort-26',
    token: '86724e9f-206a-43a9-ab92-a5e8d301d078'
})

export default api;