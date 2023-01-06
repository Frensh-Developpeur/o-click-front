// Libraries
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    actionAddToken,
    actionDeleteLife,
    actionRoundLife,
    actionNameMonster,
    actionIdMonsterAdd,
    actionLifeMonster,
    actionLifeMaxValue,
} from '../../../actions';
import axios from '../../../config/axios';

// Images
import bopi from '../../../assets/img/monsters/bopi.png';
import garo from '../../../assets/img/monsters/garo.png';
import grix from '../../../assets/img/monsters/grix.png';
import junki from '../../../assets/img/monsters/junki.png';
import luci from '../../../assets/img/monsters/luci.png';
import roro from '../../../assets/img/monsters/roro.png';

// Audio
import blaster from '../../../assets/audio/blaster.mp3';
import ah from '../../../assets/audio/ah.mp3';
import epee from '../../../assets/audio/epee.mp3';
import boing from '../../../assets/audio/boing.mp3';
import aaah from '../../../assets/audio/aaah.mp3';
import meuh from '../../../assets/audio/meuh.mp3';
import {useNavigate} from 'react-router-dom';

// Components
import Life from './Life';
import { Loader } from '../../Loader';
import '../../../App.css';

function Monster() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // States
    const [animate, SetAnimate] = useState(false);
    const idMonster = useSelector((state: any) => state.id_monster);
    const life = useSelector((state: any) => state.life);
    const [imgMonster, setImgMonster] = useState('');
    const [loader, setLoader] = useState(true);
    const muted = useSelector((state: any) => state.muted);

    // Sounds Effects
    const audioEffectBlaster = new Audio(blaster);
    const audioEffectAh = new Audio(ah);
    const audioEffectEpee = new Audio(epee);
    const audioEffectBoing = new Audio(boing);
    const audioEffectAaah = new Audio(aaah);
    const audioEffectMeuh = new Audio(meuh);

    const monsterForm = [bopi, garo, grix, junki, luci, roro];

    // ComponentDidMount
    useEffect(() => {
        axios.get('/api/monsters/' + idMonster).then((response) => {
            monsterForm.forEach((monster) => {
                if (monster.includes(response.data.name)) {
                    setLoader(false);
                    return setImgMonster(monster);
                }
            })

            dispatch(actionNameMonster(response.data.name));
            dispatch(actionLifeMaxValue(response.data.life));
        });
    }, []);

    // Methods
    // Adds tokens according to the counter base
    const handleAddToken = () => {
        if (life === 0) {
            audioEffectAaah.volume = 0.09;
            muted ? audioEffectAaah.play() : audioEffectAaah.pause();
            setLoader(true);
            dispatch(actionIdMonsterAdd());
            const newId = idMonster + 1;
            axios.get('/api/monsters/' + newId).then((response) => {
                monsterForm.forEach((monster) => {
                    if (monster.includes(response.data.name)) {
                        setLoader(false);
                        return setImgMonster(monster);
                    }
                })
                
                dispatch(actionNameMonster(response.data.name));
                dispatch(actionLifeMonster(response.data.life));
                dispatch(actionLifeMaxValue(response.data.life));
            })
            .catch((response) => {
                if(response.response.data.message == 'Unauthenticated.') {
                 localStorage.removeItem('auth_token');
                 localStorage.removeItem('auth_name');
                 navigate('/connexion');
                }
             });
        } else {
            SetAnimate(true);
            setTimeout(() => SetAnimate(false), 100);
            let effectModulo = Math.floor(Math.random() * 5);

            switch (effectModulo) {
                case 0:
                    {
                        audioEffectBlaster.volume = 0.09;
                        muted
                            ? audioEffectBlaster.play()
                            : audioEffectBlaster.pause();
                    }
                    break;
                case 1:
                    {
                        audioEffectAh.volume = 0.09;
                        muted
                            ? audioEffectAh.play()
                            : audioEffectAh.pause();
                    }
                    break;
                case 2:
                    {
                        audioEffectEpee.volume = 0.09;
                        muted
                            ? audioEffectEpee.play()
                            : audioEffectEpee.pause();
                    }
                    break;
                case 3:
                    {
                        audioEffectBoing.volume = 0.09;
                        muted
                            ? audioEffectBoing.play()
                            : audioEffectBoing.pause();
                    }
                    break;
                case 4:
                    {
                        audioEffectMeuh.volume = 0.09;
                        muted
                            ? audioEffectMeuh.play()
                            : audioEffectMeuh.pause();
                    }
                    break;
                default: {
                    return false;
                }
            }
        }

        dispatch(actionAddToken());
        dispatch(actionDeleteLife());
        dispatch(actionRoundLife());
    };

    return (
        <div
            className={
                animate === true
                    ? 'flex flex-col items-center justify-end scale-90 rotate-6 spawn-monster '
                    : 'flex flex-col items-center justify-end spawn-monster '
            }
        >
            {loader ? (
                <Loader />
            ) : (
                <>
                    <Life />
                    <img
                        onClick={handleAddToken}
                        className='w-3/5 md:w-1/5 monster cursor-pointer'
                        src={imgMonster}
                        alt='monstre'
                    />
                </>
            )}
        </div>
    );
}

export default Monster;
