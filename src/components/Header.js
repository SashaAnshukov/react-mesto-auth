import logo from '../images/logo.svg';

function Header({children}) {

    return (
        <div className="page__container">
            <div className="header">
                <img className="header__logo" src={logo} alt="логотип Mesto"/>
                {children}
            </div>
        </div>
    );
}

export default Header;

