import { useEffect, useState } from 'react';
import './Nav.css';

interface MenuProps {
  addNotesRedirect: any,
  logout: any,
  chengePassword: any
}

const Nav: React.FC<MenuProps> = (props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [img, setImg] = useState(<i className="fas fa-bars"></i>);
  const [showMenu, setShowMenu] = useState({display: 'none'});

  useEffect(() => {      
      if (clicked === false) {
        setImg(<i className="fas fa-bars"></i>);
          
        setShowMenu({display: 'none'});  
      } else {
        setImg(<i className="fas fa-times"></i>);
        setShowMenu({display: 'block'});
      }
  },[clicked]);

  const chenge = () => {
    if (clicked === false) {
      setClicked(true);     
    } else {
      setClicked(false);
    }
  }

  return (
      <div className="Nav">
          <button className="HamburgerToggler" onClick={chenge}>{img}</button>
          <button className="AddNote" onClick={props.addNotesRedirect}><i className="fas fa-plus"></i></button>
          <div className="HidenMenu" style={showMenu}>
            <button className="MenuButton" onClick={props.logout}>logout</button>
            <button className="MenuButton" onClick={props.chengePassword}>change password</button>
          </div>
      </div>
  );
};

export default Nav;