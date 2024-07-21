import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import User_Icon from '../assets/user_icon.png'
import axios from 'axios';

const Profil = () => {
    const input_class = "p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"
    const { userId } = useParams();
    const userIdInt = parseInt(userId);
    const [nom, setNom] = useState("")
    const handleNomChange = (event) => {
        setNom(event.target.value)
    }
    const [prenom, setPrenom] = useState("")
    const handlePrenomChange = (event) => {
        setPrenom(event.target.value)
    }
    const [userName, setUsername] = useState("")

    const [Email, setEmail] = useState("")
    const handleEmailchange = (event) => {
        setEmail(event.target.value)
    }
    const [adresse, setAdresse] = useState("")
    const handAdressechange = (event) => {
        setAdresse(event.target.value)
    }
    const [phone, setPhone] = useState("")
    const handlePhonechange = (event) => {
        setPhone(event.target.value)
    }
    const [errorMsg, setErrorMessage] = useState("")
    const [succesMsg, setSuccesMsg] = useState("")
    const recuperer_donnees = async () => {
        try {
            var token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const response = await axios.get('https://agence-immobiliere-backend.onrender.com/auth/users/me/', {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            });
            setNom(response.data.first_name)
            setPrenom(response.data.last_name)
            setUsername(response.data.username)
            setEmail(response.data.email)
            try {
                const donnes_profil = await axios.get(`https://agence-immobiliere-backend.onrender.com/store/customer/${response.data.id}/`);
                setAdresse(donnes_profil.data.adress)
                console.log(donnes_profil.data)
                setPhone(donnes_profil.data.phone)

            }
            catch (error) {
                console.log("Erreur de la récupèration des données profile", error)
            }
        }
        catch (error) {
            console.log("Erreur de la récupération des données de l'utilisateur", error)
        }
    }
    useEffect(() => {
        recuperer_donnees();
    }, []);
    const handleSubmit = async (event) => {
        var token = localStorage.getItem('token');
        setErrorMessage('')
        event.preventDefault()
        if (nom === "" || Email === "" || phone === "" || adresse === "") {
            setErrorMessage("Vous devez remplir tout les champs !")
        }
        else {
            try {
                const response = await axios.put('https://agence-immobiliere-backend.onrender.com/auth/users/me/', {
                    first_name: nom,
                    last_name: prenom,
                    username: userName,
                    email: Email,
                }, {
                    headers: {
                        Authorization: `JWT ${token}`,
                    },

                });
                try {
                    const update_pro = axios.patch(`https://agence-immobiliere-backend.onrender.com/store/customer/${response.data.id}/`, {
                        phone: phone,
                        adress: adresse,
                    });                    
                setSuccesMsg("Votre profil a été modifié avec succès !")
                }
                catch (error2) {
                    console.log(error2)
                    setErrorMessage("Erreur lors de la modification vérifiez vos informations et réssayer")
                }

            } catch (error) {
                console.log("Erreur lors de la modification des données utilisateur", error);
                setErrorMessage("Erreur lors de la modification vérifiez vos informations et réssayer")

            }
        }
    }
    return (
        <div className='flex flex-col gap-24 max-[700px]:gap-16'>
            <Navbar />
            <div></div>
            <form className="flex justify-center items-center mb-8" onSubmit={handleSubmit}>
                <div className="relative bg-white p-8 px-8 w-[60%] shadow-md border-t-4 max-[768px]:w-[95%]">
                    <div className="absolute left-[44%] top-[-8%] max-[768px]:top-[-5%]">
                        <img className='w-28 h-28 max-[768px]:w-20 max-[768px]:h-20' src={User_Icon} />
                    </div>
                    <div className="flex flex-col gap-6 p-8">
                        <div className="flex gap-2 flex-col">
                            {errorMsg && (<span className='text-red-500 bg-red-100 p-2 font-bold'>{errorMsg}</span>)}
                            {succesMsg && (<span className='text-green-500 bg-green-100 p-2 font-bold'>{succesMsg}</span>)}

                            <span className='text-gray-600 font-bold'>Nom </span>
                            <input type='text' className={input_class} value={nom} onChange={handleNomChange} />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <span className='text-gray-600 font-bold'>Prénom </span>
                            <input type='text' className={input_class} value={prenom} onChange={handlePrenomChange} />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <span className='text-gray-600 font-bold'>Nom d'utilisateur </span>
                            <input type='text' className="p-2 border text-gray-600 font-semibold bg-gray-300 w-[100%] cursor-not-allowed" disabled value={userName} />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <span className='text-gray-600 font-bold'>Email</span>
                            <input type='email' className={input_class} value={Email} onChange={handleEmailchange} />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <span className='text-gray-600 font-bold'>Téléphone</span>
                            <input type='number' className={input_class} value={phone} onChange={handlePhonechange} />
                        </div>
                        <div className="flex gap-2 flex-col">
                            <span className='text-gray-600 font-bold'>Adresse</span>
                            <input type='text' className={input_class} value={adresse} onChange={handAdressechange} />
                        </div>
                        <input type='submit' className='p-2 bg-pink-500 text-white font-bold mt-11 hover:bg-white transition-all cursor-pointer hover:text-pink-500 border' value='Modifier' />
                    </div>
                </div>
            </form>
        </div >
    );
};

export default Profil;