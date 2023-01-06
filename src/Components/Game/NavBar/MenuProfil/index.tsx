// Libraries
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionMuted } from '../../../../actions';
import axios from '../../../../config/axios';

// Assets
import userImg from '../../../../assets/img/user.png';
import saveImg from '../../../../assets/img/save.png';
import noiseImg from '../../../../assets/img/noise.png';
import muteImg from '../../../../assets/img/mute.png';
import soundFond from '../../../../assets/audio/Free.mp3';
import saveSound from '../../../../assets/audio/save.mp3';
import rewardButton from '../../../../assets/img/rewardButton.png';

function MenuProfil() {
    // States
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [audio] = useState(new Audio(soundFond));
    const saveEffect = new Audio(saveSound);
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
    const muted = useSelector((state: any) => state.muted);
    const nameUser = localStorage.getItem('auth_name');

    const counteur = useSelector((state: any) => state.counteur);
    const tokenPerSec = useSelector(
        (state: any) => state.tokenPerSec
    );
    const counteurDeleteLife = useSelector(
        (state: any) => state.counteurDeleteLife
    );

    // Methods
    // Triggers disconnection when clicked
    const logoutSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // Déconnecte l'utilisateur, supprime son localStorage et redirige à la page connexion
        axios.post(`/api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                navigate('/connexion');
            }
        });
    };

    const saveGame = () => {
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
                .then((response) => {
                    saveEffect.volume = 0.15;
                    muted ? saveEffect.play() : saveEffect.pause();
                })
                .catch((response) => {
                    if(response.response.data.message == 'Unauthenticated.') {
                     localStorage.removeItem('auth_token');
                     localStorage.removeItem('auth_name');
                     navigate('/connexion');
                    }
                 });
        }
    };

    // ComponentDidMount
    useEffect(() => {
        audio.volume = 0.03;
    }, []);

    useEffect(() => {
        muted ? audio.play() : audio.pause();
    }, [muted]);

    return (
        <div className='flex flex-col w-[10rem] items-end'>
            <div className='dropdown dropdown-end'>
                <label
                    tabIndex={0}
                    className='btn btn-ghost btn-circle avatar'
                >
                    <div className='w-12 rounded-full'>
                        <img
                            src={userImg}
                            alt='avatar'
                        />
                    </div>
                </label>
                <ul
                    tabIndex={0}
                    className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
                >
                    <li className='ml-3 capitalize border-b border-[#1F293D]'>
                        {nameUser}
                    </li>
                    <li className='mt-1'>
                        <Link
                            className='justify-between'
                            to='/game/profil'
                        >
                            Profil
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='justify-between'
                            to='/game/info'
                        >
                            Informations
                        </Link>
                    </li>
                    
                    <li>
                        <Link
                            onClick={logoutSubmit}
                            className='justify-between'
                            to='/connexion'
                        >
                            Déconnexion
                        </Link>
                    </li>
                </ul>
            </div>
            <div
                onClick={() => saveGame()}
                className='w-12 rounded-full btn btn-ghost btn-circle'
            >
                <img
                    src={saveImg}
                    alt='disquette'
                />
            </div>

            <div
                className='w-12 mt-3 rounded-full btn btn-ghost btn-circle'
            >
                 <Link
                            className='justify-between'
                            to='/game/reward'
                        >
                             <img
                    src={rewardButton}
                    alt='reward'
                />
                        </Link>
               
            </div>

            <div
                onClick={() => dispatch(actionMuted())}
                className='mt-3 w-30 rounded-full btn btn-ghost btn-circle '
            >
                <img
                    src={muted ? noiseImg : muteImg}
                    alt='mégaphone'
                />
            </div>
            
        </div>
    );
}

export default MenuProfil;
