// Components
import Timer from './Timer';
import Spell from './Spell';
import Maps from './Maps';
import '../../../App.css';


// Displays the timer, the spell button, the maps button
function Footer() {
    return (
        <div className='flex justify-between items-end pl-4 pb-2 grow spawn-foot'>
          
            <Timer />
            <div className='flex flex-col-reverse items-center'>
                <Spell />
                <Maps />
            </div>
        </div>
    );
}

export default Footer;
