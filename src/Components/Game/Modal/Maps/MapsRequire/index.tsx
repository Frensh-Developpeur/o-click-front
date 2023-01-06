// Images
import Stadium from '../../../../../assets/img/maps/Stadium.jpg';
import FullMoon from '../../../../../assets/img/maps/FullMoon.png';
import Jungle from '../../../../../assets/img/maps/Jungle.png';
import Lac from '../../../../../assets/img/maps/Lac.png';
import NewWorld from '../../../../../assets/img/maps/NewWorld.jpg';
import Portal from '../../../../../assets/img/maps/Portal.png';
import SpaceAdventure from '../../../../../assets/img/maps/SpaceAdventure.png';
import Tera from '../../../../../assets/img/maps/Tera.jpg';

// Libraries
import { useDispatch, useSelector } from 'react-redux';
import ozeilleImg from '../../../../../assets/img/ozeille.png';
import { useState, useEffect } from 'react';
import axios from '../../../../../config/axios';

// Actions
import {
    actionCurrentMapId,
    actionCurrentMap,
    actionBuySpellDeleteTokenAndMap,
} from '../../../../../actions';

// Interface
interface mapsProps {
    mapsPrice: number;
    mapsName: string;
    mapsId: number;
}

function MapsRequire({ mapsPrice, mapsName, mapsId }: mapsProps) {
    // States
    const dispatch = useDispatch();
    const [mapsBuy, setMapsBuy] = useState(false);
    const allMapsBuy = useSelector((state: any) => state.allMapsBuy);
    const token = useSelector((state: any) => state.token);
    const counteur = useSelector((state: any) => state.counteur);
    const tokenPerSec = useSelector(
        (state: any) => state.tokenPerSec
    );
    const counteurDeleteLife = useSelector(
        (state: any) => state.counteurDeleteLife
    );
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
    const mapsCurrent = useSelector(
        (state: any) => state.current_map
    );
    const [mapsStatic, setMapsStatic] = useState('');

    const mapsForm = [
        Stadium,
        FullMoon,
        Jungle,
        Lac,
        NewWorld,
        SpaceAdventure,
        Tera,
        Portal,
    ];

    // Interface
    interface AllMaps {
        theme_id: number;
    }

    // ComponentDidMount
    useEffect(() => {
        allMapsBuy.forEach((allMaps: AllMaps) => {
            if (allMaps.theme_id === mapsId) {
                setMapsBuy(true);
            }
        });

        mapsForm.forEach((maps) => {
            if (maps.includes(mapsName)) {
                setMapsStatic(maps);
            }
        });
    }, [allMapsBuy]);

    // Methods
    const handleSaveMaps = () => {
        if (token > mapsPrice) {
            axios
                .post('/api/createTheme', {
                    theme_id: mapsId,
                })
                .then((response) => {
                    dispatch(
                        actionBuySpellDeleteTokenAndMap(
                            token - mapsPrice
                        )
                    );
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
                                counteur_delete_life:
                                    counteurDeleteLife,
                                token_per_sec: tokenPerSec,
                            })
                            .then((response) =>
                                console.log(response)
                            );
                    }
                    setMapsBuy(true);
                });
        }
    };

    const handleChangeMaps = () => {
        dispatch(actionCurrentMapId(mapsId));
        dispatch(actionCurrentMap(mapsName));
    };

    return (
        <div className='flex items-center rounded-3xl bg-sky-600 justify-between text-center'>
            <img
                className='md:h-20 w-16 h-14 md:w-[10rem] object-fill rounded-bl-3xl rounded-tl-3xl'
                src={mapsStatic}
                alt={mapsName}
            />
            <p className='pl-2 text-white text-[12px] md:text-2xl font-bold uppercase'>
                {mapsName}
            </p>

            {token > mapsPrice && mapsBuy === false ? (
                <button
                    onClick={handleSaveMaps}
                    className='pl-2 text-sm md:text-xl text-white uppercase font-bold md:h-max rounded-br-3xl rounded-tr-3xl pt-6 pb-7 btn btn-warning w-1/4 md:w-1/6'
                >
                    {mapsPrice}
                    <img
                        className='w-6 hidden md:block md:ml-2 object-cover'
                        src={ozeilleImg}
                        alt='ozeille'
                    />
                </button>
            ) : (
                false
            )}

            {token < mapsPrice && mapsBuy === false ? (
                <button
                    disabled
                    className='pl-2 ml-2 text-sm md:text-xl text-white uppercase font-bold md:h-max rounded-br-3xl rounded-tr-3xl md:pt-6 md:pb-7 btn btn-warning w-1/4 md:w-1/6 flex flex-col md:flex-row justify-center p-7'
                >
                    <p className='ml-2'>{mapsPrice}</p>
                    <img
                        className='w-6 hidden md:block md:ml-2 object-cover'
                        src={ozeilleImg}
                        alt='ozeille'
                    />
                </button>
            ) : (
                false
            )}

            {mapsBuy === true && mapsCurrent !== mapsName ? (
                <button
                    onClick={handleChangeMaps}
                    className='pl-2 ml-2 text-sm md:text-xl text-white uppercase font-bold md:h-max rounded-br-3xl rounded-tr-3xl md:pt-6 md:pb-7 btn btn-error w-1/4 md:w-1/6 flex flex-col md:flex-row justify-center p-7'
                >
                    Activer
                </button>
            ) : (
                false
            )}

            {mapsBuy === true && mapsCurrent === mapsName ? (
                <button
                    onClick={handleChangeMaps}
                    className='pl-2 text-sm md:text-xl text-white uppercase font-bold h-max rounded-br-3xl rounded-tr-3xl rounded-xl py-4 md:pt-6 md:pb-7 bg-green-500 w-1/4 md:w-1/6 cursor-auto text-left md:text-center'
                >
                    Actif
                </button>
            ) : (
                false
            )}
        </div>
    );
}

export default MapsRequire;
