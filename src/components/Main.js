import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {useContext} from 'react';

function Main(
    {handleEditAvatarClick, handleEditProfileClick,
    handleAddPlaceClick, onCardClick, onCardLike, onCardDelete, cards}) {

    const currentUser = useContext(CurrentUserContext);
    //console.log (cards);

    return (
        <main>
            <div className="page__container">
                <section className="profile">
                    <div className="profile__space">
                        <div className = "profile__holder">
                            <div className = "profile__round">
                                <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя"/>
                                <button type ="button" aria-label="edit" onClick={handleEditAvatarClick} 
                                    className="profile__avatar-button">
                                </button>
                            </div> 
                        </div>    
                            <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type ="button" aria-label="edit" onClick={handleEditProfileClick}
                            className="profile__edit-button opacity-buttons"></button>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                    </div>
                    <button type ="button" aria-label="add" onClick={handleAddPlaceClick}
                    className="profile__add-button opacity-buttons"></button>
                </section>
                
                <section className="elements">
                    {cards.map (card => {
                        return <Card 
                            onCardClick = {onCardClick} onCardLike = {onCardLike}
                            onCardDelete ={onCardDelete} card={card} key = {card._id}/>
                    })}
                </section>
            </div>
        </main>
    );
}

export default Main;