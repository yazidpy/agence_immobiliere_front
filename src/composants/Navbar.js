import React, { useEffect, useState } from 'react';
import "../../src/App.css"
import Logo from "../../src/assets/favicon.svg"
import Bouton from './Bouton';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const header_lien = [
    { name: "Estimation des prix", link: "/estimation_des_prix_appartements" },
    { name: "Acceuil", link: "/" },

]
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                var token = localStorage.getItem('token');
                if (!token) {
                    // console.log("Token non trouvé ");
                    return;
                }
                const response = await axios.get('https://agence-immobiliere-backend.onrender.com/auth/users/me/', {
                    headers: {
                        Authorization: `JWT ${token}`,
                    },
                });
                setUserData(response.data);
                localStorage.setItem('id', response.data.id);

            } catch (error) {

            }
        };
        fetchData();
    }, []);
    const [userMenu, SetUserMenu] = useState(false)
    const profileClick = () => {
        SetUserMenu(!userMenu)
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserData(null);
        navigate('/connexion')
    }
    return (
        <div>
            <nav>
                <div className="w-full p-2 bg-white fixed top-0  border-b-2 z-50 shadow-md transition-all">
                    <div className="flex justify-between px-4 p-2">
                        <div className="flex gap-3 items-center">
                            <img className='h-8 w-8 max-[768px]:h-6 max-[768px]:w-6' src={Logo} alt='Navbar_logo' />
                            <h3 className='text-xl max-[768px]:text-lg font-bold'>NEXT<span className='primary_color'>-NEST</span></h3>

                        </div>
                        <div className="flex gap-16 max-[1024px]:hidden">
                            <div className="flex justify-between text-gray-600 font-semibold">
                                <ul className='md:flex gap-4 items-center'>
                                    {header_lien?.map((menu, i) => (
                                        <li key={i}>
                                            <Link to={menu?.link} className="hover:border-b-4 pb-4 transition-all hover:border-pink-500">{menu?.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-between gap-4 items-center">
                                {!userData && (
                                    <>
                                        <Link to="/inscription" className='font-bold text-gray-600 underline'>
                                            Créer un compte ?
                                        </Link>
                                        <Bouton texte="Connexion" lien="/connexion" icon="fa-solid fa-user" />
                                    </>
                                )}
                                {userData && (
                                    <>
                                        <span className='text-gray-600'>Mon compte</span>
                                        <div onClick={profileClick} className="p-4 relative cursor-pointer rounded-full bg-gray-100 items-center flex font-bold">

                                            <i className='fa-solid fa-user'></i>
                                        </div>
                                        <span className='text-gray-600'>Mes favoris</span>
                                        <Link className='p-4 rounded-full  flex items-center bg-gray-100 cursor-pointer'
                                            to={`/mes_favoris/utilisateur/${userData.id}`}>

                                            <i className='fa-solid fa-heart font-bold'></i>
                                        </Link>

                                    </>
                                )}
                                {userMenu && userData && (
                                    <>
                                        <div className="p-12 bg-white rounded-sm shadow-xl absolute top-20 right-16 transition-all">
                                            <div className="absolute top-0 right-2 cursor-pointer" onClick={profileClick}>
                                                <i className='fa-solid fa-close'></i>
                                            </div>
                                            <div className="flex flex-col gap-6">
                                                <div className="flex flex-row items-center gap-3 pb-2 border-b">
                                                    <span className='text-gray-600 font-bold'>{userData.first_name} {userData.last_name}</span>
                                                    <span className=' bg-green-500 rounded-full h-3 w-3'></span>
                                                </div>
                                                <Link to={`/utilisateur/mon_profil/${userData.id}`} className='cursor-pointer'>Mon profil</Link>
                                                <Link to={`/mes_annonces/utilisateur/${userData.id}`} className='cursor-pointer'>Mes annonces</Link>
                                                <span className='text-gray-600 font-bold pt-2  cursor-pointer' onClick={handleLogout}>Déconnecter</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                        <bouton onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 font-bold text-2xl cursor-pointer max-[1024px]:flex hidden items-center">
                            {menuOpen ? (
                                <i className="fa-solid fa-close"></i>
                            ) : (
                                <i className="fa-solid fa-bars"></i>
                            )}
                        </bouton>
                    </div>
                    {menuOpen ? (
                        <div>
                            {!userData ? (
                                <div className='flex justify-center flex-col gap-16 min-[768px]:hidden pb-4'>
                                    <ul className='flex flex-col gap-8 items-center'>
                                        {header_lien?.map((menu, i) => (
                                            <li key={i}>
                                                <Link to={menu?.link} className="hover:border-b-4 pb-4 transition-all hover:border-pink-500">{menu?.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-between gap-4 flex-col items-center">
                                        <Link to="/inscription" className='font-bold text-gray-600 underline'>Créer un compte ?</Link>
                                        <Bouton texte="Connexion" lien="/connexion" icon="fa-solid fa-user" />
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-16 p-8'>
                                    <ul className='flex flex-col gap-8 items-center'>
                                        {header_lien?.map((menu, i) => (
                                            <li key={i}>
                                                <Link to={menu?.link} className="hover:border-b-4 pb-4 transition-all hover:border-pink-500">{menu?.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-col gap-4 shadow-md p-8">
                                    <div className="flex flex-row items-center gap-4 justify-center">
                                        <span className='text-gray-600 text-base'>Utilisateur <i className='fa-solid fa-user mr-2'></i>:</span>
                                        <span className='text-green-600 font-bold'>{userData.first_name} {userData.last_name}</span>
                                    </div>
                                    <div className="flex flex-col gap-8 justify-center items-center">
                                    <Link to={`/utilisateur/mon_profil/${userData.id}`} className='cursor-pointer hover:border-b-pink-500 hover:border-b-4 pb-2 transition-all'>Mon profil</Link>
                                    <Link to={`/mes_annonces/utilisateur/${userData.id}`} className='cursor-pointer hover:border-b-pink-500 hover:border-b-4 pb-2 transition-all'>Mes annonces</Link>
                                    <Link className=' cursor-pointer hover:border-b-pink-500 hover:border-b-4 pb-2 transition-all'
                                            to={`/mes_favoris/utilisateur/${userData.id}`}>Mes favoris
                                        </Link>
                                    <span className='text-gray-600 font-bold pt-2  cursor-pointer hover:border-b-pink-500 hover:border-b-4 pb-2 transition-all' onClick={handleLogout}>Déconnecter</span>
                                    </div>
                                    </div> 
                                </div>
                            )}
                        </div>
                    ) : null}

                </div>
            </nav>
        </div>
    );
};

export default Navbar;