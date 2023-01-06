// Libraries
import { useEffect, useState } from 'react';
import axios from '../../../../config/axios';
import imgMaps from '../../../../assets/img/maps.jpg';
import { useDispatch, useSelector } from 'react-redux';
import soundEffectPage from '../../../../assets/audio/page.mp3';
import { actionAllMapsBuy } from '../../../../actions';
import {useNavigate} from 'react-router-dom';
// Components
import MapsRequire from './MapsRequire';
import { Loader } from '../../../Loader';

function Maps() {
    // Interface
    interface Maps {
        id: number;
        status: string;
        name: string;
        price: number;
    }

    // States
    const dispatch = useDispatch();
    const audioPage = new Audio(soundEffectPage);
    const muted = useSelector((state: any) => state.muted);
    const [loading, setLoading] = useState(true);
    const [maps, setMaps] = useState([]);
    const navigate = useNavigate();
    // ComponentDidMount
    useEffect(() => {
        axios.get('/api/themes').then((response) => {
            setMaps(response.data);
            axios.get('/api/allTheme').then((response) => {
                audioPage.volume = 0.15;
                muted ? audioPage.play() : audioPage.pause();
                dispatch(actionAllMapsBuy(response.data));
                setLoading(false);
            });
        })
        .catch((response) => {
            if(response.response.data.message === 'Unauthenticated.') {
             localStorage.removeItem('auth_token');
             localStorage.removeItem('auth_name');
             navigate('/connexion');
            }
         });
    }, []);

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center'>
                <img
                    className='h-64 rounded-lg w-full object-cover'
                    src={imgMaps}
                    alt='maps'
                />
            </div>

            {loading ? (
                <Loader />
            ) : (
                maps.map((maps: Maps) =>
                    maps.status === 'active' ? (
                        <MapsRequire
                            key={maps.id}
                            mapsPrice={maps.price}
                            mapsName={maps.name}
                            mapsId={maps.id}
                        />
                    ) : (
                        false
                    )
                )
            )}
        </div>
    );
}
export default Maps;