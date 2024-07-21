import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import axios from 'axios';
const Mes_annonces = () => {
  const { userId } = useParams();
  const userIdInt = parseInt(userId);
  const [annonces, setAnnonces] = useState([]);
  const [property, setPropertys] = useState([]);
  const [supprimerSucces, setSuprrimerSucces] = useState("")
  const [input_etat, setIputEtat] = useState("")
  const [is_favorite,setIsfavorite]=useState(false)

  const handleEtatChange = (event) => {
    setIputEtat(event.target.value)
  }
  const fetchData = async () => {
    setSuprrimerSucces("")
    try {
      const annonces_resp = await axios.get('https://agence-immobiliere-backend.onrender.com/store/annonces/');
      const annoncesData = annonces_resp.data.filter(itm_annonce => itm_annonce.Customer === userIdInt);
      setAnnonces(annoncesData);
      try {
        const propertysPromises = annoncesData.map(annonce =>
          axios.get(`https://agence-immobiliere-backend.onrender.com/store/property/${annonce.Property}/`)
        );
        const propertysRes = await Promise.all(propertysPromises);
        const propertysData = propertysRes.map(response => response.data);
        setPropertys(propertysData)
      } catch (error) {
        console.log("Erreur de la récupération des propertys", error);
      }
    } catch (error) {
      console.log("Erreur de la récupération des annonces", error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);


  const handleUpdateAnnonce = async (annonceId) => {
    if(input_etat===""){
    alert("L'annonce est déja dans cette état ")
    }
    try {
      const response = await axios.patch(`https://agence-immobiliere-backend.onrender.com/store/property/${annonceId}/`, {
        state: input_etat
      });
      if (response.status == 200) {
        fetchData()
        setSuprrimerSucces("Annonce a été modifiée avec succès ! ")
      }
    }
    catch (error) {
      console.log("Erreur de la modification d'une annonce", error)
    }
  }
  const handleDeleteAnnonce = async (annonceId) => {
    try {
      const response = await axios.delete(`https://agence-immobiliere-backend.onrender.com/store/property/${annonceId}/`);

      if (response.status == 204) {
        fetchData()
        setSuprrimerSucces("L'annonce a été  supprimée avec succès")
      }
    }
    catch (error) {
      console.log("Erreur de la suppresion de l'annonce", error)
    }
  };

  return (
    <div className='flex flex-col gap-20'>
      <Navbar />
      <div className="p-8 flex flex-col gap-16">
        <span className='text-gray-600 font-bold  text-3xl text-center max-[768px]:text-xl'>Mes annonces</span>
        {annonces.length === 0 && <span className='text-red-600 font-bold text-center text-2xl max-[768px]:text-xl'>Vous n'avez aucune annonce ! </span>}
        {supprimerSucces && <span className='text-green-500 bg-green-100 p-2 text-center font-bold'>{supprimerSucces}</span>}

      </div>
      {property.length > 0 && (
        <div className="flex flex-col gap-12 mx-32 pb-8 max-[1024px]:mx-4">
          {property?.map((prop, i) => (
            <div key={i} className='flex flex-row border shadow-md justify-between max-[1024px]:flex-col'>
              <div className="">
                <img className="w-96 h-80 max-[768px]:h-56 max-[1024px]:w-full" src={prop.img_3} />
              </div>
              <div className="flex flex-col justify-between  p-8 max-[768px]:p-4 max-[1024px]:justify-center">
                <div className="pb-8">
                  <span className='text-gray-600 font-bold'>{prop.title} , {prop.adress}</span>
                </div>
                <div className="flex flex-row justify-around pb-8">
                  <div className="flex flex-row gap-2 items-center">
                    <i className='fa-solid fa-cube text-pink-500'></i>
                    <span className='text-gray-600'>Surface : {prop.area} m²</span>
                  </div>
                </div>
                <div className="flex justify-center pb-8">
                  <span className='text-gray-600 font-extrabold'>Prix : {prop.price} DA</span>
                </div>
              </div>
              <div className="p-8 max-[768px]:p-4 flex flex-col justify-around w-52  max-[1024px]:flex-col max-[1024px]:w-full max-[1024px]:gap-4 max-[768px]:grid max-[768px]:grid-cols-2">
                < Link className='p-3 flex font-bold justify-center w-full rounded-sm primary_color_bg cursor-pointer text-white border hover:bg-white hover:text-pink-500 transition-all' to={`/annonces/annonce/${prop.id}`} >Voir plus</Link>
                <button
                  className='p-3 flex font-bold justify-center w-full  rounded-sm bg-red-500 cursor-pointer text-white border hover:bg-white hover:text-red-500 transition-all'
                  onClick={() => handleDeleteAnnonce(prop.id)}
                >
                  Supprimer
                </button>
                <select name="" id="" className='p-3 bg-white border cursor-pointer transition-all' onChange={handleEtatChange}>
                  <option disabled>L'état</option>
                  <option value="DISPONIBLE" selected={prop.state === "DISPONIBLE"}>Disponible</option>
                  <option value="VENDUE" selected={prop.state === "VENDUE"}>Vendue</option>
                  <option value="ARCHIVE" selected={prop.state === "ARCHIVE"}>Archivé</option>
                  <option value="EN_ATTENTE" selected={prop.state === "EN_ATTENTE"}>En attente</option>
                </select>
                < button className='p-3 flex font-bold justify-center w-full rounded-sm bg-green-500 cursor-pointer text-white border hover:bg-white hover:text-green-500 transition-all' onClick={() => handleUpdateAnnonce(prop.id)}>Modifier</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};
export default Mes_annonces;