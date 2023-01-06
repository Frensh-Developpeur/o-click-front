// Libraries
import axios from '../../../../config/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import userImg from '../../../../assets/img/user.png';
import { Loader } from '../../../Loader';

function Profil() {
    // States
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userEmailInput, setUserEmailInput] = useState('');
    const [userNameInput, setUserNameInput] = useState('');
    const [userPasswordInput, setUserPasswordInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [responseChangeEmail, setResponseChangeEmail] =
        useState('');
    const [responseChangePseudo, setResponseChangePseudo] =
        useState('');
    const [responseChangePassword, setResponseChangePassword] =
        useState('');
    const navigate = useNavigate();

    // ComponentDidMount
    useEffect(() => {
        axios.get('/api/user').then((response) => {
            setLoading(false);
            setUserEmail(response.data.email);
            setUserName(response.data.name);
        });
    }, []);

    // Methods
    const handleDelete = (): void => {
        axios.post('/api/user/delete').then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                navigate('/');
            }
        });
    };

    const handleChangeName = () => {
        axios
            .post('/api/user', {
                name: userNameInput,
            })

            .then((response) => {
                localStorage.removeItem('auth_name');
                localStorage.setItem('auth_name', response.data.name);
                setUserName(response.data.name);
                setUserNameInput('');
                if (response.data.status === 200) {
                    setResponseChangePseudo('valide');
                }
                setTimeout(() => {
                    setResponseChangePseudo('');
                }, 3000)
            })
            .catch((response) => {
                if (response.response.data.message === 'Unauthenticated.') {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    navigate('/connexion');
                }
            });
    };

    const handleChangeEmail = () => {
        axios
            .post('/api/user', {
                email: userEmailInput,
            })

            .then((response) => {
                setUserEmailInput('');
                if (response.data.status === 200) {
                        setResponseChangeEmail('valide');
                        setUserEmail(response.data.email);
                }
                if(response.data.validation_errors){
                    setResponseChangeEmail('error');
                }
                setTimeout(() => {
                    setResponseChangeEmail('');
                }, 3000)
            });
    };

    const handleChangePass = () => {
        axios
            .post('/api/user', {
                password: userPasswordInput,
            })

            .then((response) => {
                setUserPasswordInput('');
                if (response.data.status === 200) {
                    setResponseChangePassword('valide');
                }
                setTimeout(() => {
                    setResponseChangePassword('');
                }, 3000)
            });
    };

    const handleChangeMail = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserEmailInput(e.target.value);
    };
    const handleChangePseudo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserNameInput(e.target.value);
    };
    const handleChangePassword = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserPasswordInput(e.target.value);
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center mt-6'>
                <img
                    className=' btn-ghost btn-circle avatar h-14 w-14 lg:h-48 lg:w-48'
                    src={userImg}
                    alt='avatar'
                />
            </div>

            <div className='form-control flex flex-col justify-center items-center mt-6'>
                <label className='label'>
                    <span className='label-text text-xl mb-2 text-white'>
                        Email actuel :
                        {loading ? <Loader /> : userEmail}
                    </span>
                </label>
                <label
                    htmlFor='email'
                    className='input-group flex justify-center flex-wrap'
                >
                    <span className='w-[33%] hidden lg:inline'>
                        Nouvel Email
                    </span>
                    <input
                        onChange={handleChangeMail}
                        value={userEmailInput}
                        name='email'
                        type='text'
                        placeholder='Nouvel Email'
                        className='input input-bordered placeholder:text-slate-400'
                    />
                    {userEmail !== userEmailInput ? (
                        <button
                            onClick={handleChangeEmail}
                            className='btn bg-green-700 pl-6 pr-6 hover:bg-green-500 border-2 text-sm text-black'
                        >
                            Valider
                        </button>
                    ) : (
                        <button className='btn bg-red-600 pl-6 pr-6 cursor-auto border-2 text-sm text-black '>
                            Impossible
                        </button>
                    )}

                    {responseChangeEmail === 'valide' && (
                        <div className='ml-4 label-text text-xl mb-2 text-white mt-4 sm:mt-0'>
                            Changement éffectué !
                        </div>
                    )}
                    {responseChangeEmail === 'error' && (
                        <div className='ml-4 label-text text-xl mb-2 text-white mt-4 sm:mt-0'>
                            Email Indisponible !
                        </div>
                    )}
                </label>
            </div>

            <div className='form-control flex flex-col justify-center items-center mt-4 '>
                <label className='label'>
                    <span className='label-text text-xl text-white mb-2'>
                        Pseudo actuel :
                        {loading ? <Loader /> : userName}
                    </span>
                </label>
                <label
                    htmlFor='name'
                    className='input-group flex flex-row justify-center flex-wrap'
                >
                    <span className='w-[33%] hidden lg:inline'>
                        Nouveau Pseudo
                    </span>
                    <input
                        onChange={handleChangePseudo}
                        value={userNameInput}
                        name='name'
                        type='text'
                        placeholder='Nouveau pseudo'
                        className='input input-bordered placeholder:text-slate-400'
                    />
                    {userName !== userNameInput ? (
                        <button
                            onClick={handleChangeName}
                            className='btn bg-green-700 pl-6 pr-6 hover:bg-green-500 border-2 text-sm text-black'
                        >
                            Valider
                        </button>
                    ) : (
                        <button className='btn bg-red-600 pl-6 pr-6 cursor-auto border-2 text-sm text-black '>
                            Impossible
                        </button>
                    )}
                    {responseChangePseudo === 'valide' ? (
                        <div className='flex items-center ml-4 label-text text-xl mb-2 text-white mt-4 sm:mt-0'>
                            Changement éffectué
                        </div>
                    ) : (
                        ''
                    )}
                </label>
            </div>

            <div className='form-control flex flex-col justify-center items-center mt-10'>
                <label
                    htmlFor='password'
                    className='input-group flex flex-row justify-center'
                >
                    <span className='w-[33%] hidden lg:inline'>
                        Nouveau mot de passe
                    </span>
                    <input
                        onChange={handleChangePassword}
                        value={userPasswordInput}
                        name='password'
                        minLength={8}
                        type='password'
                        placeholder='Nouveau mot de passe'
                        className='input input-bordered placeholder:text-slate-400'
                    />
                    <button
                        onClick={handleChangePass}
                        className='btn bg-green-700 pl-6 pr-6 hover:bg-green-500 border-2 text-sm text-black'
                    >
                        Valider
                    </button>
                    {responseChangePassword === 'valide' ? (
                        <div className='flex items-center ml-4 label-text text-xl mb-2 text-white'>
                            Changement éffectué
                        </div>
                    ) : (
                        ''
                    )}
                </label>
            </div>

            <div className='flex flex-col justify-center items-center mt-12'>

                {/* The button to open modal */}
                <label htmlFor="my-modal-4" className="btn">Supprimer mon compte</label>

                {/* Put this part before </body> tag */}
                <input 
                    type="checkbox"
                    id="my-modal-4"
                    className="modal-toggle"
                />
                <label 
                    htmlFor="my-modal-4"
                    className="modal cursor-pointer"
                >
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="font-bold md:text-3xl text-center">Valider la suppression ?</h3>
                        <p className="py-4">
                            Voulez-vous vraiment supprimer votre compte ?
                            <span className='text-lg block py-2'>
                                (Cette action est définitive)
                            </span>
                        </p>
                        <div className="modal-action">
                            <label 
                                onClick={handleDelete}
                                htmlFor="my-modal"
                                className="btn bg-red-600 hover:bg-red-400 text-black"
                            >
                                Oui
                            </label>

                            <label
                                htmlFor="my-modal-4"
                                className="btn bg-green-700 hover:bg-green-500 text-black"
                            >
                                Non
                            </label>
                        </div>
                    </label>
                </label>
            </div>
        </div>
    );
}
export default Profil;