import iconMenu from "../assets/icon_menu.svg";
import logo from "../assets/logo.svg";

import BoxInitials from "./BoxInitials";

import useUser from "../hooks/useUser";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="app__header header">
      <div className="header__logo">
        <a href="./">
          <img className="block" alt="B" src={logo} />
        </a>
      </div>
      <div className="header__center">
        <button>
          <img className="block" alt="menu" src={iconMenu} />
        </button>
      </div>
      <a href="./" className="header__user">
        <BoxInitials
          className="mr10"
          firstName={user.firstName}
          lastName={user.lastName}
        />
        {user.firstName && `${user.firstName} ${user.lastName}`}
      </a>
    </header>
  );
};

export default Header;
