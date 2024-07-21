import React, { useEffect, useState } from 'react';
import Navbar from '../composants/Navbar';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const Favoris = () => {
    const { userId } = useParams();
    const userIdInt = parseInt(userId);
    const [favoris, setfavoris] = useState([])
    const [property, setPropertys] = useState([]);
    const [supprimerSucces, setSuprrimerSucces] = useState("")
    const fetchData = async () => {
        try {
            const favoris_resp = await axios.get('https://agence-immobiliere-backend.onrender.com/store/favoris/');
            const favoris_id = favoris_resp.data.filter(itm_favoris => itm_favoris.Customer === userIdInt);
            setfavoris(favoris_id)
            try {
                const propertysPromises = favoris_id.map(favoris_annonce =>
                    axios.get(`https://agence-immobiliere-backend.onrender.com/store/property/${favoris_annonce.Annonce}/`)
                );
                const propertysRes = await Promise.all(propertysPromises);
                const propertysData = propertysRes.map(response => response.data);
                setPropertys(propertysData)
            }
            catch (error) {
                console.log("Erreur de la récupèration des proprietés", error)
            }
        }
        catch (error) {
            console.log("Erreur de la récupération des favoris")
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleDeleteFavoris = async (annonceId) => {
        const favori = favoris.find(favori => favori.Annonce === annonceId);
        try {
            const response = await axios.delete(`https://agence-immobiliere-backend.onrender.com/store/favoris/${favori.id}/`);

            if (response.status == 204) {
                fetchData()
                setSuprrimerSucces("L'annonce a été bien supprimée de la liste des favoris")
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
                <span className='text-gray-600 font-bold  text-2xl ml-8 max-[768px]:text-xl max-[768px]:text-center'>Ma liste des favoris</span>
                {property.length === 0 && <span className='text-red-600 font-bold ml-8 text-2xl max-[768px]:text-xl'>Vous n'avez pas des annonces favorisées  ! </span>}
                {supprimerSucces && <span className='text-green-500 bg-green-100 p-2 text-center font-bold'>{supprimerSucces}</span>}
            </div>
            {property.length > 0 && (
                <div className="gap-12 mx-16 pb-8 max-[1024px]:mx-2 grid grid-cols-1 w-[60%] max-[1024px]:w-full max-[1024px]:px-4 max-[786px]:px-8">
                    {property?.map((prop, i) => (
                        <div key={i} className='border  flex flex-rows shadow-md  max-[1024px]:flex-col'>
                            <div>
                                <img className="w-96 h-80 max-[1024px]:w-full max-[768px]:h-56" src={prop.img_3} />
                            </div>
                            <div className="flex flex-col justify-between p-8 max-[786px]:p-4 max-[1024px]:justify-center border-r-2 border-l-2 max-[768px]:border-none">
                                <div className="pb-8">
                                    <span className='text-gray-600 font-bold'>{prop.title} , {prop.adress}</span>
                                </div>
                                <div className="flex flex-row justify-around pb-8 max-[768px]:pb-4">
                                    <div className="flex flex-row gap-2 items-center">
                                        <i className='fa-solid fa-cube text-pink-500'></i>
                                        <span className='text-gray-600'>Surface : {prop.area} m²</span>
                                    </div>
                                </div>
                                <div className="flex justify-center pb-8">
                                    <span className='text-gray-600 font-extrabold'>Prix : {prop.price} DA</span>
                                </div>
                            </div>
                            <div className="p-8 max-[768px]:p-4 flex flex-col justify-evenly max-[768px]:flex-row w-52 max-[1024px]:flex-col max-[1024px]:w-full max-[1024px]:gap-4">
                                < Link className='p-3 flex font-bold justify-center w-full rounded-sm primary_color_bg cursor-pointer text-white border hover:bg-white hover:text-pink-500 transition-all' to={`/annonces/annonce/${prop.id}`} >Voir plus</Link>
                                <button onClick={() => handleDeleteFavoris(prop.id)}
                                    className='p-3 flex font-bold justify-center w-full rounded-sm bg-red-500 cursor-pointer text-white border hover:bg-white hover:text-red-500 transition-all'>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favoris;