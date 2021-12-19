import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from '../Auth';
import InfoTooltip from './InfoTooltip';
import NavBar from './NavBar';
import success from "../images/success.svg";
import error from "../images/error.svg";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const handleEditAvatarClick = () => {setIsEditAvatarPopupOpen(true)};

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const handleEditProfileClick = () => {setIsEditProfilePopupOpen(true)};

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const handleAddPlaceClick = () => {setIsAddPlacePopupOpen(true)};

  const [isLoadingButton, setisLoadingButton] = useState(false);

  const closeAllPopups = (form) => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPicturePopupOpen(false);
    setSelectedCard ({name:'', src:''})
    setShowToolTip(false)
  };

  const [selectedCard, setSelectedCard] = useState({name:'', src:''});
  const [isPicturePopupOpen, setIsPicturePopupOpen] = useState(false);
  const onPicturePopup = () => {setIsPicturePopupOpen(true)}
  const handleCardClick  = (card) => {setSelectedCard(card); onPicturePopup()};

  const [currentUser , setCurrentUser] = useState('');

  // стэйт пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = useState(false);

  // стэйт проверки токена
  const [checkToken, setCheckToken] = useState(false);
  // стэйт для получения email пользователя в шапке
  const [email, setEmail] = useState(false);
  // стэйт для модального окна при успешной/не успешной регистрации
  const [showToolTip, setShowToolTip] = useState(false);
  // стэйт для данных модального окна при успешной/не успешной регистрации
  const [info, setInfo] = useState({ image: "", text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api.getUserData().then(res => {
          setCurrentUser(res);
      })
      .catch(err => {
          console.log (`Ошибка: ${err}`)
      })
    }
  }, [loggedIn])

  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards().then(res => {
        setCards(res);
      })
      .catch(err => {
          console.log (`Ошибка: ${err}`)
      })
    }
  }, [loggedIn])

  function handleCardLike(card) {
    
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.сhangeLikeCard(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log (`Ошибка: ${err}`)
    })
  }

  function handleCardDelete (card) {
    // Отправляем запрос в API и удаляем карточку
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((i) => i._id !== card._id));
      })
      .catch(err => {
        console.log (`Ошибка: ${err}`)
      })
  } 

  function handleUpdateUser (dataUser) {
    // Отправляем запрос в API и обновляем значения профиля
    //console.log(data)
    setisLoadingButton(true)
    api.setUserData(dataUser).then((res) => {
        setCurrentUser(res);
        closeAllPopups()
        setisLoadingButton(false)
      })
      .catch(err => {
        console.log (`Ошибка: ${err}`)
      })
      .finally(() => setisLoadingButton(false)); 
  }

  function handleUpdateAvatar (dataAvatar) {
    setisLoadingButton(true)
    // Отправляем запрос в API и обновляем аватар
    api.setUserAvatar(dataAvatar).then((res) => {
        setCurrentUser(res);
        closeAllPopups()
        setisLoadingButton(false)
      })
      .catch(err => {
        console.log (`Ошибка: ${err}`)
      })
      .finally(() => setisLoadingButton(false)); 
  }

  function handleAddPlaceSubmit (newCard) {
    setisLoadingButton(true)
    // Отправляем запрос в API и обновляем аватар
    api.setMyCard(newCard).then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
        setisLoadingButton(false);
      })
      .catch(err => {
        console.log (`Ошибка: ${err}`)
      })
      .finally(() => setisLoadingButton(false)); 
  }

  function ChooseInfoTooltip (info) {
    setInfo({ image: info.image, text: info.text });
  }

  function registration({email, password}) {
    Auth.register(email, password)
    .then((response) => {
      setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: success,
        text:'Вы успешно зарегистрировались'
      })
      setTimeout(navigate, 3000, '/sign-in');
      setEmail(email);
    })
    .catch((err) => {
      setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: error,
        text: "Что-то пошло не так! Попробуйте еще раз!",
      });
    });
  }

  function authorization({email, password}) {
    Auth.authorize(email, password)
    .then((data) => {
      if (!data){
        setLoggedIn(false);
        setTimeout(setShowToolTip, 1000, true);
        ChooseInfoTooltip({
          image: error,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
      }
      else{
        setLoggedIn(true);
        navigate('/');
      }
    })
  }

  useEffect(() =>{
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      setCheckToken(true)
      // проверим токен
      Auth.tokenCheck (jwt).then((res) => {
        // авторизуем пользователя и отправим залогиниться??
        setLoggedIn (true);
        navigate('/');
        setEmail(res.data.email);
      })
      .catch(err => {
        console.log (`Ошибка: ${err}`)
      })
    }
  }, [])

  function signOut(){
    localStorage.removeItem('jwt');
    navigate('/sign-up');
    setLoggedIn (false);
  }

  return (
    
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <NavBar loggedIn={loggedIn} email={email} signOut={signOut}/>
      </Header>

      <Routes >
      
          <Route exact path='/sign-up' element={<Register registration = {registration}/>} />
          <Route exact path='/sign-in' element={<Login authorization = {authorization}/>} />
          
          <Route exact path='/' element={
            <ProtectedRoute loggedIn={loggedIn} checkToken={checkToken}>
              <Main 
                handleEditAvatarClick = {handleEditAvatarClick}
                handleEditProfileClick = {handleEditProfileClick}
                handleAddPlaceClick = {handleAddPlaceClick} onCardClick ={handleCardClick}
                onCardLike = {handleCardLike} onCardDelete ={handleCardDelete} cards={cards}
              />
              <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                onUpdateAvatar = {handleUpdateAvatar}
                buttonText = {isLoadingButton ? 'Сохранение...' : 'Сохранить'}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                onUpdateUser = {handleUpdateUser}
                buttonText = {isLoadingButton ? 'Сохранение...' : 'Сохранить'}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                onAddPlace = {handleAddPlaceSubmit}
                buttonText = {isLoadingButton ? 'Сохранение...' : 'Сохранить'}
              />
              <ImagePopup 
                card = {selectedCard} isOpen = {isPicturePopupOpen} onClose = {closeAllPopups} >
              </ImagePopup>
            </ProtectedRoute>
          }/>

          <Route path="/"
            element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
          />

      </Routes >

      <InfoTooltip 
        isOpen={showToolTip} 
        onClose={closeAllPopups} 
        info={info}
      />
      
      <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;