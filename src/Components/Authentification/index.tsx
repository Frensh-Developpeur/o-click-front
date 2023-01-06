// Libraries
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { useState, useEffect } from 'react';
import logoOclick from '../../assets/img/logo.gif';

// Component
import '../../App.css';

function Login() {
    // States
    const [inputMail, setInputMail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [createResponse, setCreateResponse] = useState('');
    const navigate = useNavigate();

    // ComponentDidMount
    useEffect(() => {
        // Check if the user is connected!
        if (localStorage.getItem('auth_token')) {
            navigate('/game');
        }
    }, []);

    // Methods
    // Modifies states according to the text entered in the inputs : InputControlled
    const handleChangeMail = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputMail(event.target.value);
    };
    const handleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputPassword(event.target.value);
    };

    const handleDeleteSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    // Connexion
    const handleSubmitLogin = () => {
        // Calls the api requesting a CSRF and adds it to the cookies
        axios.get('sanctum/csrf-cookie').then(() => {
            // Initialise the connection
            axios
                .post('api/login', {
                    // Sends the data of the states related to the inputs
                    email: inputMail,
                    password: inputPassword,
                    //
                })
                .then((res) => {
                    // Initialise the data received from the api
                    const data = res.data;
                    //

                    //  Checks if the user has filled in all the fields or has not made any mistakes!
                    if (
                        data.message === 'Invalid Credentials' ||
                        data.validation_errors
                    ) {
                        setCreateResponse('error');
                        setTimeout(() => {
                            setCreateResponse('');
                        }, 4000);
                    }

                    // Initializes the connection by adding a token and the user's name to the localStorage
                    else {
                        localStorage.setItem(
                            'auth_token',
                            res.data.token
                        );
                        localStorage.setItem(
                            'auth_name',
                            res.data.username
                        );
                        setCreateResponse('valid');
                        setTimeout(() => {
                            setCreateResponse('');
                            window.location.reload();
                        }, 4000);
                    }
                })

                // Returns an error
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    return (
        <div className='bg-inscription hero min-h-screen bg-base-200'>
            <div className=' hero-content text-center text-white flex flex-col bg-sky-700 rounded-3xl pl-20 pr-20 spawn-home'>
                <img
                    className='h-40 pb-4'
                    src={logoOclick}
                    alt="logo o'click"
                />
                <h1 className='mb-2 rounded-lg p-2 text-xl text-center text-white'>
                    Connexion
                </h1>
                <form
                    className='flex flex-col gap-4 text-center'
                    onSubmit={handleDeleteSubmit}
                >
                    <input
                        className='input placeholder:text-slate-400'
                        type='text'
                        name='email'
                        value={inputMail}
                        onChange={handleChangeMail}
                        placeholder='Email'
                    />
                    <input
                        className='input placeholder:text-slate-400 mb-4'
                        type='password'
                        name='password'
                        value={inputPassword}
                        onChange={handleChangePassword}
                        placeholder='Mot de passe'
                    />
                    <button
                        className='btn btn-accent pl-6 pr-6 hover:btn-ghost border-2 text-sm text-white'
                        type='button'
                        onClick={handleSubmitLogin}
                    >
                        Envoyer
                    </button>
                </form>
                <Link to='/inscription'>
                    <button className='btn btn-info pl-14 pr-14 hover:btn-ghost border-2 text-sm text-white'>
                        Inscription
                    </button>
                </Link>

                {/* Checks the createResponse state :: Responds according to the response  */}
                {createResponse !== '' ? (
                    <div
                        className={
                            createResponse === 'valid'
                                ? 'alert alert-success shadow-lg text-white spawn-foot'
                                : 'alert alert-error shadow-lg text-white spawn-foot'
                        }
                    >
                        <div>
                            <span>
                                {createResponse === 'valid'
                                    ? 'Connexion réussie. Veuillez patientez !'
                                    : 'Email ou mot de passe incorrect !'}
                            </span>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default Login;
