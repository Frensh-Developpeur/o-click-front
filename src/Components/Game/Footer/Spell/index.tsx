// Library
import chaudron from '../../../../assets/img/chaudron.png';
import { Link } from 'react-router-dom';

// Spell's button
function Spell() {
    return (
        <Link to='/game/spell'>
            <img
                className='w-18 mr-4 btn-ghost'
                src={chaudron}
                alt='chaudron'
            />
        </Link>
    );
}

export default Spell;
