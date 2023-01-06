// Library
import logoOclick from '../../../assets/img/logo.gif';

// Components
import Token from './Token';
import MenuProfil from './MenuProfil';
import '../../../App.css';

function NavBar() {
    return (
        <div className='flex justify-between items-start pl-4 pr-4 pt-4  grow spawn-nav'>
            <Token />
            <img
                className='w-20 '
                src={logoOclick}
                alt="logo o'click"
            />
            <MenuProfil />
        </div>
    );
}

export default NavBar;
