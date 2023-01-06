// Library
import { Link } from 'react-router-dom';

// Components
import Spell from './Spell';
import Profil from './Profil';
import Info from './Info';
import Maps from './Maps';
import Reward from './Reward';

// Interface
interface modalprops {
    children: string,
}

// Displays the base of a modal
function Modal({ children }: modalprops) {
    return (
        <div className='modal modal-open '>
            <div className='modal-box w-11/12 max-w-5xl min-h-[80vh] pt-2'>
                <Link to='/game'>
                    <label
                        htmlFor='my-modal-3'
                        className='btn btn-sm btn-circle absolute right-2 top-2'
                    >
                        ✕
                    </label>
                </Link>
                {/* Checks the props children to display a custom modal */}
                {children === 'spell' ? <Spell /> : false}
                {children === 'info' ? <Info /> : false}
                {children === 'profil' ? <Profil /> : false}
                {children === 'maps' ? <Maps /> : false}
                {children === 'reward' ? <Reward /> : false}
            </div>
        </div>
    );
}

export default Modal;
