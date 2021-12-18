import { Link, useLocation } from 'react-router-dom';

function NavBar({ loggedIn, email, signOut}) {
  const {pathname} = useLocation();

  const textBar = pathname === `${"/sign-in"}` ? "Регистрация" : "Войти";
  const linkRoute = `${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;
  
  return (
    <nav className="navBar__container">
      {loggedIn ?
        (<>
          <h2 className="navBar__link">{email}</h2>
          <Link to='' onClick= {signOut} className="navBar__link_out">Выйти</Link>
        </>)
      : 
        (<>
          <Link to={linkRoute} className="navBar__link_out">{textBar}</Link>
        </>)
      }
    </nav>
  );
}

export default NavBar;