// Libraries
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../config/axios';
import imgSpell from '../../../../assets/img/bgSpell.jpg';
import soundEffectPage from '../../../../assets/audio/page.mp3';
import { actionAllSpellsBuy } from '../../../../actions';
import {useNavigate} from 'react-router-dom';

// Components
import SpellRequire from './SpellRequire';
import { Loader } from '../../../Loader';

function Spell() {
    // Interface
    interface Data {
        status: string,
        id: number,
        description: string,
        price: number,
        name: string
    }
    
    const dispatch = useDispatch();
    const [spellRequire, setSpellRequire] = useState([]);
    const [loading, setLoading] = useState(true);
    const audioPage = new Audio(soundEffectPage);
    const muted = useSelector((state: any) => state.muted);
    const navigate = useNavigate();

    // ComponentDidMount
    useEffect(() => {
        axios.get('/api/spells').then((response) => {
            audioPage.volume = 0.15;
            muted ? audioPage.play() : audioPage.pause();
            setSpellRequire(response.data);
            axios.get('/api/allSpell').then((response) => {
                dispatch(actionAllSpellsBuy(response.data));
                setLoading(false);
            })
            .catch((response) => {
                if(response.response.data.message == 'Unauthenticated.') {
                 localStorage.removeItem('auth_token');
                 localStorage.removeItem('auth_name');
                 navigate('/connexion');
                }
             });
        });
    }, []);

    
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center'>
                <img
                    className='h-64 rounded-lg w-full object-cover '
                    src={imgSpell}
                    alt='sort'
                />
            </div>
            {loading ? (
                <Loader />
            ) : (
                spellRequire.map((data: Data) =>
                    data.status === 'active' ? (
                        <SpellRequire
                            key={data.id}
                            dataDescription={data.description}
                            dataPrice={data.price}
                            dataName={data.name}
                            dataId={data.id}
                        />
                    ) : (
                        false
                    )
                )
            )}
        </div>
    );
}
export default Spell;
