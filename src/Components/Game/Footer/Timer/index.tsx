// Libraries
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import timerImg from '../../../../assets/img/timer.png';
import axios from '../../../../config/axios';
import {useNavigate} from 'react-router-dom';

function Timer() {
    // States
    const navigate = useNavigate();
    const [seconde, setSeconde] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hours, setHours] = useState(0);
    const [goTimer, setGoTimer] = useState(false);
    const token = useSelector((state: any) => state.token);
    const monsters_id = useSelector((state: any) => state.id_monster);
    const monsters_life = useSelector((state: any) => state.life);
    const monsters_name = useSelector(
        (state: any) => state.name_monster
    );
    const current_theme = useSelector(
        (state: any) => state.current_map_id
    );
    const current_theme_name = useSelector(
        (state: any) => state.current_map
    );
    const counteur = useSelector((state: any) => state.counteur);
    const tokenPerSec = useSelector(
        (state: any) => state.tokenPerSec
    );
    const counteurDeleteLife = useSelector(
        (state: any) => state.counteurDeleteLife
    );
    // Initializes a value not included in the state
    let newSeconde = 0;
    let newMinute = 0;
    let newHours = 0;

    // Manages playing time
    function timer(): void {
        // Checks if seconds exceed 59, returns to 0 and adds 1 minute
        if (newSeconde === 59) {
            newSeconde = 0;
            setSeconde(newSeconde);
            newMinute = newMinute + 1;
            setMinute(newMinute);
        }
        // Checks if minutes exceed 59, resets to 0 and adds 1 hour
        else if (newMinute === 59 && newSeconde === 59) {
            newSeconde = 0;
            setSeconde(newSeconde);
            newMinute = 0;
            setMinute(newMinute);
            newHours = newHours + 1;
            setHours(newHours);
        }
        // As long as minute less than 59 adds 1 second
        else {
            newSeconde = newSeconde + 1;
            setSeconde(newSeconde);
        }
        // Restarts the loop function with 1 second delay
        setTimeout(timer, 1000);
    }

    // ComponentDidMount
    useEffect(() => {
        if (
            monsters_id !== 0 &&
            current_theme !== 0 &&
            monsters_name !== '' &&
            current_theme_name !== ''
        ) {
            axios
                .post('/api/updateSave', {
                    token: token,
                    monsters_id: monsters_id,
                    monsters_life: monsters_life,
                    current_theme: current_theme,
                    counteur: counteur,
                    counteur_delete_life: counteurDeleteLife,
                    token_per_sec: tokenPerSec,
                })
                .then((response) => response)
                .catch((response) => {
                  if(response.response.data.message == 'Unauthenticated.') {
                   localStorage.removeItem('auth_token');
                   localStorage.removeItem('auth_name');
                   navigate('/connexion');
                  }
               });
        }
    }, [minute]);

    // Triggers the timer
    if (goTimer === false) {
        timer();
        setGoTimer(true);
    }

    return (
        <div className='flex items-center w-full lg:w-1/4'>
            <img
                src={timerImg}
                alt='timer'
                className='w-14'
            />
            <p className='text-white ml-2 text-2xl'>
                {hours < 10 ? 0 : false}
                {hours} : {minute < 10 ? 0 : false}
                {minute} : {seconde < 10 ? 0 : false}
                {seconde}
            </p>
        </div>
    );
}
export default Timer;
