// Librarie
import { Link } from 'react-router-dom';
import deathLogoError from '../../assets/img/monsters/error.png';
import logoOclick from '../../assets/img/logo.gif';

// Page 404 if the route is not recognised.
function Error() {
    return (
        <div className='min-h-screen flex items-center flex-col pt-8 bg-gradient-to-br from-red-600 to-blue-500'>
            <img
                className='w-24 pb-8 my-14'
                src={logoOclick}
                alt="logo o'click"
            />
            {/* If connected redirect to /game, otherwise redirect to /connexion */}
            <Link
                to='/game'
                className='p-1 text-2xl uppercase text-red-600'
            >
                404 error
            </Link>
            <img
                className='w-3/12'
                src={deathLogoError}
                alt='logo error'
            />
            <Link
                to='/game'
                className='p-1 text-2xl uppercase text-red-600'
            >
                404 error
            </Link>
        </div>
    );
}

export default Error;
