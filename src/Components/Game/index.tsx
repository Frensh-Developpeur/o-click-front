// Libraries
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import LoaderGame from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
    actionInitialToken,
    actionLifeMonster,
    actionIdMonster,
    actionCurrentMapId,
    actionCurrentMap,
    actionAddOneCounteurValue,
    actionInitialTokenPerSec,
    actionInitialCounteurDeleteLife,
    actionTokenTime,
} from '../../actions';

// Components
import NavBar from './NavBar';
import Monster from './Monster';
import Footer from './Footer';

function Game() {
    // States
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenPerSec = useSelector(
        (state: any) => state.token_per_sec
    );
    const current_map = useSelector(
        (state: any) => state.current_map
    );
    const [loader, setLoader] = useState(true);

    // ComponentDidMount
    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/connexion');
        }

        axios.post('/api/save').then((response) => {
            const save = response.data.save;
            dispatch(actionInitialToken(save.token));
            dispatch(actionLifeMonster(save.monsters_life));
            dispatch(actionIdMonster(save.monsters_id));
            dispatch(actionCurrentMapId(save.current_theme));
            dispatch(actionAddOneCounteurValue(save.counteur));
            dispatch(actionInitialTokenPerSec(save.token_per_sec));
            dispatch(
                actionInitialCounteurDeleteLife(
                    save.counteur_delete_life
                )
            );
            axios
                .get('/api/themes/' + save.current_theme)
                .then((response) => {
                    dispatch(actionCurrentMap(response.data.name));
                    setLoader(false);
                })
                .catch((response) => {
                    if(response.response.data.message == 'Unauthenticated.') {
                     localStorage.removeItem('auth_token');
                     localStorage.removeItem('auth_name');
                     navigate('/connexion');
                    }
                 });
        })
        .catch((response) => {
           if(response.response.data.message == 'Unauthenticated.') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            navigate('/connexion');
           }
        });
        if (tokenPerSec !== 0) {
            TokenPerSec();
        }
    }, []);

    function TokenPerSec() {
        dispatch(actionTokenTime());
        setTimeout(TokenPerSec, 1000);
    }

    // Loader
    // Display the loader as long as the state loader is not false, then display the game page
    return loader ? (
        <LoaderGame />
    ) : (
        <div
            className={
                current_map +
                ' bg-cover bg-center min-h-screen flex flex-col justify-between'
            }
        >
            <NavBar />
            <Monster />
            <Footer />
        </div>
    );
}

export default Game;