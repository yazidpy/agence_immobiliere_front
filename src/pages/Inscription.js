import React from 'react';
import Navbar from '../composants/Navbar';
import { Link } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
const Inscription = () => {
    const input_class = "p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"
    const [userType, setUserType] = useState('AGENCE');
    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };
    const [errorMessage, setErrorMessage] = useState('');
    const [SuccesMsg, setSucessMsg] = useState('');
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        setErrorMessage('')
        if (data.password != data.repassword) {
            setErrorMessage("La confirmation de mot de passe n'est pas correcte ! ")
        }
        else {
            try {
                const responseUser = await axios.post('https://agence-immobiliere-backend.onrender.com/auth/users/', {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    first_name: data.nom,
                    last_name: data.prenom
                });
                const userId = responseUser.data.id;
                await axios.post('https://agence-immobiliere-backend.onrender.com/store/customer/', {
                    phone: data.telephone,
                    adress: data.adresse,
                    birthday: data.naissance,
                    user_type: userType,
                    user: userId
                });
                setErrorMessage('')
                setSucessMsg("Votre compte a été bien crée vous pouvez connecter !")
            } catch (error) {
                if (error.response) {
                    if (error.response.status == 400) {
                        setErrorMessage("Erreur lors de l'inscription vérifiez vos informations et réssayer")
                    }
                    else {
                        setErrorMessage("Erreur de connexion au serveur ! ")
                    }
                }
            }
            console.log(data)
        };
    }
    return (
        <div className='flex flex-col gap-40'>
            <Navbar />
            <div className="bg-white p-8 shadow-lg w-[50%] max-[768px]:w-[90%] m-auto border-t-4 border-pink-500 mb-8">
                <form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <h1 className='text-center font-extrabold uppercase text-pink-500'>Inscription</h1>
                        <p className='text-red-500 text-center font-bold'>Les champs avec * sont obligatoires</p>
                        {errorMessage && (<p className='text-red-500 font-semibold'>{errorMessage}</p>)}
                        {SuccesMsg && (<p className='text-green-500 font-bold'>{SuccesMsg}</p>)}
                    </div>
                    <div className="grid grid-cols-2 gap-12 max-[768px]:grid-cols-1">
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-user"></i>
                                <span className='text-gray-600'>Nom *</span>
                            </div>
                            <div>
                                <input className={input_class}
                                    type="text"
                                    placeholder="Saisir votre nom ici.."
                                    {...register('nom', {
                                        required: 'Le champ Nom est requis',
                                        minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' },
                                    })}
                                />
                                {errors.nom && <p className='text-red-500'>{errors.nom.message}</p>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-user"></i>
                                <span className='text-gray-600'>Prénom </span>
                            </div>
                            <div>
                                <input className={input_class}
                                    type="text"
                                    placeholder="Saisir votre prénom ici.."
                                    {...register('prenom', {

                                    })}
                                />
                                {errors.prenom && <p className='text-red-500'>{errors.prenom.message}</p>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-users"></i>
                                <span className='text-gray-600'>Nom d'utilisateur *</span>
                            </div>
                            <div>
                                <input className={input_class}
                                    type="text"
                                    placeholder="Votre nom d'utilisatuer.."
                                    {...register('username', {
                                        required: 'Le champ username est requis',
                                        minLength: { value: 6, message: "Le nom d'utilisateur doit contenir au moins 2 caractères" },
                                    })}
                                />
                                {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-envelope"></i>
                                <span className='text-gray-600'>Email *</span>
                            </div>
                            <div>
                                <input className={input_class}
                                    type="email"
                                    placeholder="Votre email.."
                                    {...register('email', {
                                        required: 'Le champ Email est requis',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Adresse email invalide',
                                        },
                                    })}
                                />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-phone"></i>
                                <span className='text-gray-600'>Téléphone *</span>
                            </div>
                            <div>
                                <input className={input_class}
                                    type="tel"
                                    placeholder="Votre numéro de téléphone.."
                                    {...register('telephone', {
                                        required: 'Le champ Téléphone est requis',
                                        pattern: {
                                            value: /^\d+$/,
                                            message: 'Le numéro de téléphone doit contenir uniquement des chiffres',
                                        },
                                    })}
                                />
                                {errors.telephone && <p className='text-red-500'>{errors.telephone.message}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-key"></i>
                                <span className='text-gray-600'>Mot de passe *</span>
                            </div>
                            <div>
                                <input className={input_class}
                                    type="password"
                                    placeholder="Donner un mot de passe.."
                                    {...register('password', {
                                        required: 'Le champ Mot de passe est requis',
                                        minLength: { value: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' },
                                    })}
                                />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-key"></i>
                                <span className='text-gray-600'>Confirmer le mot de passe *</span>
                            </div>
                            <div>
                                <input className={input_class}
                                    type="password"
                                    placeholder="Rétaper le mot de passe.."
                                    {...register('repassword', {
                                        required: 'Le champ Confirmer le mot de passe est requis',
                                    })}
                                />
                                {errors.repassword && <p className='text-red-500'>{errors.repassword.message}</p>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-calendar-days"></i>
                                <span className='text-gray-600'>Date de naissance</span>
                            </div>
                            <div>
                                <input className={input_class} type="date" {...register('naissance')} placeholder="Votre date de naissance.." />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-2 items-center">
                                <i className="fa-solid fa-location-dot"></i>
                                <span className='text-gray-600'>Adresse</span>
                            </div>
                            <div>
                                <input className={input_class} type="text" {...register('adresse')} placeholder="Votre adresse actuelle.." />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className='text-gray-600'>Type d'utilisateur *</span>
                        <select className='bg-white cursor-pointer border p-2' value={userType}
                            onChange={handleUserTypeChange}>
                            <option value="AGENCE">AGENCE</option>
                            <option value="PARTICULIER">PARTICULIER</option>
                        </select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input
                            type='checkbox'
                            {...register('acceptRules', { required: 'Vous devez accepter les règles' })}
                            className='cursor-pointer'
                        />
                        <span >J'accepte les règles de l'utilisation</span>
                    </div>
                    {errors.acceptRules && <p className='text-red-500'>{errors.acceptRules.message}</p>}

                    <div className="">
                        <p>Vous avez déjà un compte? ? <Link to="/connexion" className='font-bold underline text-pink-500'>cliquez ici</Link></p>
                    </div>

                    <input
                        type='submit'
                        className='p-2 bg-pink-500 cursor-pointer hover:bg-white border-2 hover:text-pink-500 text-white font-bold'
                        value="Envoyer"
                    />
                </form>
            </div>
        </div>
    );
};

export default Inscription;
