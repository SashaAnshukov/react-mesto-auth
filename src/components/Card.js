import {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, card}) {
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `rectangle__trash ${isOwn ? 'rectangle__trash opacity-buttons' : 'rectangle__trash_hidden'}`
    ); 
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `rectangle__mesto-like ${isLiked ? 'rectangle__mesto-like_active opacity-like' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick () {
        onCardDelete (card);
    }

    return (
                <div className="rectangle-item-template">
                    <article className="rectangle">
                        <img 
                            className="rectangle__image" onClick={handleClick}
                            src={card.link} alt={card.alt}/>
                        <button
                            onClick={handleDeleteClick} 
                            className = {cardDeleteButtonClassName}
                            type ="button" aria-label="trash" 
                            /*className="rectangle__trash opacity-buttons"*/>
                        </button>
                        <div className="rectangle__info">
                            <h2 className="rectangle__mesto-text">{card.name}</h2>
                            <div className="rectangle__likes">
                                <button
                                    onClick={handleLikeClick}
                                    className = {cardLikeButtonClassName}
                                    type ="button" aria-label="like" 
                                    /*className="rectangle__mesto-like opacity-like"*/>
                                </button>
                                <h3 className="rectangle__mesto-numbersLike">{card.likes.length}</h3>
                            </div>
                        </div>
                    </article>
                </div>
    );
}

export default Card;