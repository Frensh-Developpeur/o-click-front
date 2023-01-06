// Libraries
import { Link, useNavigate } from 'react-router-dom';
import oclick from '../../assets/img/logo.gif';
import { ReactTypical } from '@deadcoder0904/react-typical'

// Component
import '../../App.css';

function Home() {
    // useNavigate
    const navigate = useNavigate();

    // Methods
    // Checks if the user is logged in when the button is clicked
    const handleCheckLog = () => {
        if (localStorage.getItem('auth_token')) {
            navigate('/game');
        }
    };

    return (
        <div className='hero min-h-screen bg-base-200 bg-home p-2 md:p-0'>
            <div className='hero-content text-center text-white flex flex-col bg-sky-800 rounded-3xl spawn-home mb-8 md:mb-0'>
                <img
                    className='h-40 pb-4'
                    src={oclick}
                    alt="logo o'click"
                />
                <div className='max-w-md '>
                    <h1 className='text-4xl font-bold'>
                        Bienvenue sur O'click
                    </h1>

                    <p className='py-6'>
                    <ReactTypical
		steps={['Le clicker par excellence. Demarrez votre aventure dés maintenant !', 1000]}
		wrapper="p"
	/>
                        
                    </p>
                    <Link to='/connexion'>
                        <button
                            className='btn hover:btn-warning pl-6 pr-6 btn-ghost border-[#FBBD23] border-2 text-xl hover:text-white'
                            onClick={handleCheckLog}
                        >
                            Let's go
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
