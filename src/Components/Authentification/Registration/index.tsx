// Libraries
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../config/axios';
import '../../../App.css';
import logoOclick from '../../../assets/img/logo.gif';

function Form() {
    // States
    const [inputName, setInputName] = useState('');
    const [inputMail, setInputMail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [createResponse, setCreateResponse] = useState('');
    const navigate = useNavigate();

    // ComponentDidMount
    useEffect(() => {
        // we check if the user is connected
        if (localStorage.getItem('auth_token')) {
            navigate('/game');
        }
    }, []);

    // Methods
    const handleDeleteSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    const handleChangePseudo = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputName(event.target.value);
    };

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

    const handleSubmit = () => {
        const checkPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(checkPass.test(inputPassword)){
        // Account creation
        axios
            .post('api/register', {
                // Sends the data of the states related to the inputs
                name: inputName,
                email: inputMail,
                password: inputPassword,
                //
            })
            .then((response) => {
                // Initialize the data received from the api
                const dataResponse = response.data.validation_errors;
                //

                // Checks if the user meets all the conditions to create the account
                // Put an error message according to the error with the name of createResponse
                if (dataResponse) {
                    if (
                        dataResponse.email &&
                        dataResponse.name === undefined &&
                        dataResponse.password === undefined
                    ) {
                        setCreateResponse('emailError');
                    } else if (
                        dataResponse.name &&
                        dataResponse.email === undefined &&
                        dataResponse.password === undefined
                    ) {
                        setCreateResponse('nameError');
                    } else if (
                        dataResponse.password &&
                        dataResponse.email === undefined &&
                        dataResponse.name === undefined
                    ) {
                        setCreateResponse('passwordError');
                    } else {
                        setCreateResponse('error');
                    }

                    // Leave the error message for 7 sec and reset the createResponse state
                    setTimeout(() => {
                        setCreateResponse('');
                    }, 7000);

                    // Creates the account by returning a success message and redirects after 4 seconds to the login page
                } else {
                    setCreateResponse('valid');
                    setTimeout(() => {
                        setCreateResponse('');
                        navigate('/connexion');
                    }, 4000);
                }
            })

            // Returns an error
            .catch((error) => {
                console.log(error);
            });
        //
    } else {
        setCreateResponse('passwordError');
         // Leave the error message for 7 sec and reset the createResponse state
         setTimeout(() => {
            setCreateResponse('');
        }, 7000);
    }
    };

    return (
        <div className='bg-inscription hero min-h-screen bg-base-200'>
            <div className='hero-content text-center text-white flex flex-col bg-sky-700 rounded-3xl pl-20 pr-20 spawn-home'>
                <img
                    className='h-40 pb-4'
                    src={logoOclick}
                    alt="logo o'click"
                />
                <h1 className='mb-2 rounded-lg p-2 text-xl text-center text-white'>
                    Inscription
                </h1>
                <form
                    className='flex flex-col gap-4 text-center'
                    onSubmit={handleDeleteSubmit}
                >
                    <input
                        className='input placeholder:text-slate-400'
                        type='text'
                        name='name'
                        placeholder='Pseudo'
                        value={inputName}
                        onChange={handleChangePseudo}
                    />
                    <input
                        className='input placeholder:text-slate-400'
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={inputMail}
                        onChange={handleChangeMail}
                    />
                    <input
                        className='input placeholder:text-slate-400'
                        type='password'
                        name='password'
                        value={inputPassword}
                        placeholder='Mot de passe'
                        onChange={handleChangePassword}
                    />
                    <button
                        className='btn btn-info pl-6 pr-6 hover:btn-ghost border-2 text-sm text-white'
                        type='button'
                        onClick={handleSubmit}
                    >
                        Envoyer
                    </button>
                    <Link
                        className='btn btn-accent pl-6 pr-6 hover:btn-ghost border-2 text-sm text-white '
                        to='/connexion'
                    >
                        Se connecter
                    </Link>
                </form>

                {/* Checks the createResponse state : Responds according to the response  */}
                {createResponse !== '' ? (
                    <div
                        className={
                            createResponse === 'valid'
                                ? 'alert alert-info shadow-lg text-white spawn-foot'
                                : 'alert alert-error shadow-lg text-white spawn-foot'
                        }
                    >
                        <div>
                            <span>
                                {createResponse === 'valid'
                                    ? 'Création du compte réussie ! Veuillez patientez...'
                                    : ''}
                                {createResponse === 'nameError'
                                    ? 'Nom incorrect minimum 2 caracères !'
                                    : false}

                                {createResponse === 'emailError'
                                    ? "L'adresse mail est incorrect ou déjà utilisée"
                                    : false}
                                {createResponse === 'passwordError'
                                    ? 'Mot de passe incorrect, 8 caractères minimum avec une majuscule, un chiffre et un caractère spécial !'
                                    : false}
                                {createResponse === 'error'
                                    ? 'Plusieurs erreurs dans les champs ! '
                                    : false}
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

export default Form;
