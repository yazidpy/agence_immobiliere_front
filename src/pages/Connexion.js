import React ,{useState} from 'react';
import Navbar from "../composants/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";


const Connexion = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://agence-immobiliere-backend.onrender.com/auth/jwt/create/', data);
      const token = response.data.access;
      // console.log('Token:', token);
      localStorage.setItem('token', token);
      setErrorMessage('');
      navigate('/')
    } catch (error) {
      console.error("Erreur de connexion", error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Nom d'utilisateur ou mot de passe incorrects");
        } else {  
          setErrorMessage("Erreur de connexion: " + error.response.status);
        }
      } else if (error.request) {
        setErrorMessage("Pas de réponse du serveur");
      } else {
        setErrorMessage("Erreur de configuration de la requête: " + error.message);
      }
    }
  };
  return (
    <div className='flex flex-col gap-40'>
      <Navbar />
      <div className="bg-white p-8 shadow-xl w-[50%] max-[768px]:w-[90%] m-auto border-t-4 border-pink-500 mb-8">
        <form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <h1 className='text-center font-extrabold uppercase text-pink-500'>Connexion</h1>
            <p className='text-gray-600 text-center font-semibold'>Connectez-vous pour ajouter des annonces !</p>
            {errorMessage && (<p className='text-red-500 font-semibold transition-all'>{errorMessage}</p>)}
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <i className='fa-solid fa-user'></i>
                <span className='text-gray-500'>Nom d'utilisateur * </span>
              </div>
              <input
                type="text"
                {...register("username", { required: "Ce champ est requis", minLength: { value: 4, message: "Au moins 4 caractères" } })}
                placeholder="Tapez votre nom d'utilisateur..."
                className="p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"
              />
              {errors.username && <p className='text-red-500 transition-all'>{errors.username.message}</p>}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <i className='fa-solid fa-key'></i>
                <span className='text-gray-500'>Mot de passe * </span>
              </div>
              <input
                type="password"
                {...register("password", { required: "Ce champ est requis", minLength: { value: 1, message: "Au moins 1 caractères" } })}
                placeholder="Tapez votre mot de passe..."
                className="p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"
              />
              {errors.password && <p className='text-red-500 transition-all'>{errors.password.message}</p>}
            </div>
          </div>
          <div className="">
            <p>Vous n'avez pas de compte ? <Link to="/inscription" className='font-bold underline text-pink-500'>Cliquez ici</Link></p>
          </div>
          <div className="flex justify-center">
            <button type='submit' className='p-2 primary_color_bg text-white transition-all cursor-pointer w-[60%] rounded-md hover:bg-white hover:text-pink-500 border-2'>Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Connexion;
