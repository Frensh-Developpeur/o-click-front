import maps from '../../../../assets/img/carte.png';
import { Link } from 'react-router-dom';

// Button Maps
function Maps() {
    return (
        <Link to='/game/maps'>
            <img
                className='w-16 mr-4 mb-4  btn-ghost'
                src={maps}
                alt='carte'
            />
        </Link>
    );
}

export default Maps;
