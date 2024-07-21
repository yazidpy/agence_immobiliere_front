import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import axios from 'axios';
const annonce = [
  { key: "1", description: "offre limité paiement 24 mois , prix négociable avec possibilité de payer par tranche contacter nous.", date: "27/11/2023 23:15:08 ", piece: "3", superficie: "123.78", etage: "7" }
]
// ``
const Annonce = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [Appartement, SetAppartement] = useState([])
  const [Terrain, SetTerrain] = useState([])
  const [Villa, SetVilla] = useState([])
  const [Property, setProperty] = useState([])
  const [annonce, setAnnonce] = useState([])
  const [user_data, setUser] = useState([])
  useEffect(() => {
  
      axios
        .get(`https://agence-immobiliere-backend.onrender.com/store/property/${id}/`)
        .then((response) => {
          setProperty(response.data)
          axios
            .get(`https://agence-immobiliere-backend.onrender.com/store/annonce/${id}/`)
            .then((response_annonce) => {
              setAnnonce(response_annonce.data)
              axios
                .get(`https://agence-immobiliere-backend.onrender.com/store/customer/${response_annonce.data.Customer}/`)
                .then((response_user) => {
                  setUser(response_user.data)
                  console.log("user", response_user.data)
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });

          if (response.data.type_propriete === "Villa") {
            axios
              .get(`https://agence-immobiliere-backend.onrender.com/store/property/villa/${response.data.id}/`)
              .then((response_vil) => {
                SetVilla(response_vil.data)
              })
              .catch((error) => {
                console.error(error);
              });

          } else if (response.data.type_propriete === "Terrain") {
            axios
              .get(`https://agence-immobiliere-backend.onrender.com/store/property/ground/${response.data.id}/`)
              .then((response_terr) => {
                SetTerrain(response_terr.data)
              })
              .catch((error) => {
                console.error(error);
              });

          } else if (response.data.type_propriete === "Appartement") {
            axios
              .get(`https://agence-immobiliere-backend.onrender.com/store/property/appartement/${response.data.id}/`)
              .then((response_app) => {
                SetAppartement(response_app.data)
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  return (
    <div className='flex flex-col gap-20'>
      <Navbar />
      <div>
        <h1 className='text-gray-600 font-bold text-2xl p-8'>Détails de l'annonce</h1>
        <div className="p-8 grid grid-cols-2 gap-16 max-[768px]:grid-cols-1">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-16 max-[768px]:flex-col max-[768px]:gap-2">
              <span className='text-gray-600 font-bold'>{Property.title} , {Property.adress}</span>
              <span className='text-pink-500 font-extrabold'>{Property.price} DA</span>

            </div>
            <div className="flex overflow-y-auto p-2  gap-32 scroll-smooth">
              <img className='h-96' src={Property.img_1} />
              <img className='h-96' src={Property.img_2} />
              <img className='h-96' src={Property.img_3} /> 
            </div>
          </div>
          <div className="flex flex-col p-4 border border-pink-500 gap-8">
            <h1 className='pb-2 text-center font-bold text-black'>Description de l'annonce</h1>
            <div className="flex flex-row gap-8">
              <span className='text-gray-600 font-extrabold  underline'>Type de la proprieté :</span>
              <span>{Property.type_propriete}</span>
            </div>
            <div className="flex flex-row gap-8">
              <span className='text-gray-600 font-extrabold  underline'>Adresse :</span>
              <span>{Property.adress}</span>
            </div>
            <div className="flex flex-row gap-8">
              <span className='text-gray-600 font-extrabold  underline'>date :</span>
              <span>{annonce.publication_date}</span>
            </div>
            <div className="flex flex-row gap-8">
              <span className='text-gray-600 font-extrabold  underline'>Surface :</span>
              <span>{Property.area} m²</span>
            </div>
            <div className="flex flex-row gap-8">
              <span className='text-gray-600 font-extrabold  underline'>Etat :</span>
              {Property.state === "DISPONIBLE" && (
                <span className='text-green-500 font-bold'>Disponible</span>
              )}
              {Property.state !== "DISPONIBLE" && (
                <span className='text-red-500 font-bold'>N'est pas disponible pour l'instant</span>
              )}

            </div>
            <div className="flex flex-row gap-8">
              <span className='text-gray-600 font-extrabold  underline'>Description</span>
              <span>{Property.description}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className='text-gray-600 font-extrabold  underline'>Autres caractèristiques :</span>
              <div className="flex flex-col gap-2">
                {Property.type_propriete === "Appartement" && (
                  <>
                    <span>Nombre de chambres : {Appartement.rooms}</span>
                    <span>Salle de bains : {Appartement.bathrooms}</span>
                    <span>N° Etage : {Appartement.floors}</span>
                    <span>Vue à l'eau : {Appartement.waterfront ? 'Oui' : 'Non'}</span>
                    <span>Vue  : {Appartement.view}</span>
                    <span>Année de fabrication  : {Appartement.year_built}</span>
                    <span>Année de renouvellement  : {Appartement.year_renovted}</span>
                    
                  </>
                )}
              </div>
              {Property.type_propriete === "Villa" && (
                <>
                  <span>Nombre de chambres : {Villa.rooms}</span>
                  <span>Salle de bains : {Villa.bathrooms}</span>
                  <span>Jardin : {Villa.garden ? 'Oui' : 'Non'}</span>
                  <span>Piscine : {Villa.pool ? 'Oui' : 'Non'}</span>
                  <span>N° Etage : {Villa.floors}</span>
                  <span>Année de fabrication  : {Villa.year_built}</span>
                </>
              )}
            </div>
            {Property.type_propriete === "Terrain" && (
              <>
                <span>Type de terrain : {Terrain.Ground_type}</span>
              </>
            )}

          </div>
        </div>
        <div className="p-8 flex-col gap-8 flex">
          <div className="flex flex-row gap-2 items-center">
            <i className='fa-solid fa-user text-pink-500 font-bold'></i>
            <h1 className='text-gray-600 font-bold'>Contact & Coordonnés</h1>
          </div>
          <div className="flex flex-col p-8 border border-pink-500 gap-8 w-96">
            <div className="flex flex-row gap-4 items-center">
              <i className="fa-solid fa-location-dot"></i>
              <span className='text-gray-500 font-bold'>{user_data.adress}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <i className="fa-solid fa-phone"></i>
              <span className='text-gray-500 font-bold'>{user_data.phone}</span>
            </div>
            {/* <div className="flex flex-row gap-4 items-center">
              <i className="fa-solid fa-envelope"></i>
              <span className='text-gray-500 font-bold'>{user_data.last_name}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annonce;