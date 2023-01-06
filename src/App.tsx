// Librairy
import { Routes, Route } from 'react-router-dom';

// Components
import Registration from './Components/Authentification/Registration';
import Game from './Components/Game';
import ModalBase from './Components/Game/Modal';
import Authentification from './Components/Authentification';
import Error from './Components/Error';
import Home from './Components/Home';

function App() {
    // Array of routes for the /game
    const routeGame = ['profil', 'maps', 'spell', 'info', 'reward'];

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/game'
                    element={<Game />}
                />
                <Route
                    path='/inscription'
                    element={<Registration />}
                />
                <Route
                    path='/connexion'
                    element={<Authentification />}
                />
                <Route
                    path='*'
                    element={<Error />}
                />
                {/* Browse the name array initialized above to call the correct route and provide the correct children  */}
                {routeGame.map((route: string) => (
                    <Route
                        path={'/game/' + route}
                        key={route}
                        element={
                            <>
                                <Game />
                                <ModalBase children={route} />
                            </>
                        }
                    />
                ))}
            </Routes>
        </>
    );
}

export default App;
