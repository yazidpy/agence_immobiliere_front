import React, { useEffect, useState } from 'react';
import Navbar from "../composants/Navbar"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Annonces = () => {
  var token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [annonces, setAnnonces] = useState([]);
  const [property, setPropertys] = useState([]);
  const input_class = "p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"
  const items = 50
  const [current, setCurrent] = useState(1)
  const nb_pages = Math.ceil(property.length / items)
  const startIndex = (current - 1) * items
  const endIndex = startIndex + items
  const dataPerPage = property.slice(startIndex, endIndex)
  var id_user = localStorage.getItem('id')
  useEffect(() => {
    axios.get('https://agence-immobiliere-backend.onrender.com/store/annonces/')
      .then(response => {
        setAnnonces(response.data);
        const propertyRequests = response.data.map(annonce =>
          axios.get(`https://agence-immobiliere-backend.onrender.com/store/property/${annonce.Property}/`)
        );
        return Promise.all(propertyRequests);
      })
      .then(responses => {

        const propertyData = responses.map(response => response.data);
        setPropertys(propertyData);
      })
      .catch(error => {
        console.log('Error:', error);
      });

  }, []);
  const [maxprice, setmaxPrice] = useState("")
  const [minprice, setminprice] = useState("")
  const [adresseFilter, setAdresseFilter] = useState("")
  const [TypePropFilter, setTypeProp] = useState("")


  const handleminPriceFilter = async (event) => {
    setminprice(event.target.value);
    filtrer(maxprice, event.target.value, adresseFilter, TypePropFilter)
  };
  const handleAdresseFilter = (event) => {
    setAdresseFilter(event.target.value);
    filtrer(minprice, maxprice, event.target.value, TypePropFilter)
  };
  const handlemaxpriceFilter = (event) => {
    setmaxPrice(event.target.value);
    filtrer(event.target.value, minprice, adresseFilter, TypePropFilter)
  };
  const handleTypeProp = (event) => {
    setTypeProp(event.target.value)
    filtrer(minprice, maxprice, adresseFilter, event.target.value)
  }
  const filtrer = async (max_price, min_price, adresse, type) => {
    try {
      const propertyRequests = await axios.get(`https://agence-immobiliere-backend.onrender.com/store/property/?price__gt=${max_price}&price__lt=${min_price}&adress__icontains=${adresse}&type_propriete=${type}`);
      setPropertys(propertyRequests.data)
      console.log(propertyRequests.data)
    } catch (error) {
      console.log('Error:', error);
    }
  }
  const handleFavoriteAdd = async (annonceId) => {
    try {
      const id_user = localStorage.getItem('id')
      const response = await axios.post('https://agence-immobiliere-backend.onrender.com/store/favoris/', {
        Customer: id_user,
        Annonce: annonceId
      })
      console.log(response)
      alert("Annonce ajoutée à la liste des favoris")
    }
    catch (error) {
      console.log("Erreur lors de l'insertion à la liste des favoris", error)
    }
  }
  return (
    <div className='flex flex-col gap-20'>
      <Navbar />
      <div className="p-8 flex flex-col gap-8">
        <span className='text-gray-600 text-xl flex justify-center font-bold'>Filtrer  les annonces</span>
        <div className="flex flex-rows justify-between items-center max-[1024px]:grid max-[1024px]:grid-cols-1 max-[1024px]:gap-4">
          <div className="flex flex-col gap-2">
            <span className='text-gray-600 font-semibold'>Prix inferieur à : </span>
            <input type='number' min={0} className={input_class} placeholder='Le prix maximum en Da' onChange={handleminPriceFilter} />
          </div>
          <div className="flex flex-col gap-2">
            <span className='text-gray-600 font-semibold'>Prix superieur à  : </span>
            <input type='number' className={input_class} placeholder="Prix minimum en Da" onChange={handlemaxpriceFilter} />
          </div>
          <div className="flex flex-col gap-2">
            <span className='text-gray-600 font-semibold'>Adresse : </span>
            <input type='text' className={input_class} placeholder="L'adresse de l'annonce" onChange={handleAdresseFilter} />
          </div>
          <div className="flex flex-col gap-2">
            <span className='text-gray-600 font-semibold'>Type de la proprièté : </span>
            <select className='p-2 bg-white border cursor-pointer' onChange={handleTypeProp}>
              <option selected value="">Tout les types</option>
              <option value="Appartement">Appartement</option>
              <option value="Villa">Villa</option>
              <option value="Terrain">Terrain</option>
            </select>
          </div>
        </div>
        {token && (
          <div className="flex p-3 rounded-sm  bg-pink-500 text-white font-bold items-center cursor-pointer w-max hover:bg-white hover:text-pink-500 border transition-all">
            <Link to="/ajouter_annonce">Ajouter Annonce</Link>
          </div>
        )}
      </div>
      {property.length == 0 && (<span className='text-gray-600 font-bold flex justify-center text-xl'>Aucune Annonce n'a été trouvée </span>)}
      {property.length > 0 && (
        <div className="grid grid-cols-2 gap-8 mx-8 max-[1024px]:grid-cols-1 pb-8">
          {dataPerPage?.map((prop, i) => (
            <div key={i} className='flex flex-row h-80 max-[768px]:h-auto border shadow-md mt-10 max-[768px]:mt-5 max-[768px]:flex-col'>
              <div className="relative">
                <img className="w-80 h-80 max-[768px]:w-full max-[768px]:h-56" src={prop.img_3} />
                {token && (
                  <div className="absolute top-2 right-2 bg-white p-3 rounded-full cursor-pointer flex items-center" onClick={() => handleFavoriteAdd(prop.id)}
                  >
                    <i className='fa-solid fa-heart text-gray-300 text-xl'></i>
                  </div>
                )}
              </div>
              <div className="flex flex-col p-4 gap-4 w-[50%] max-[768px]:w-full">
                <div className="pb-8 border-b-2">
                  <span className='text-gray-600 font-bold'>{prop.title} , {prop.adress}</span>
                </div>
                <div className="flex flex-row justify-around  pb-8 border-b-2 max-[768px]:pb-3">
                  <div className="flex flex-row gap-2 items-center">
                    <i className='fa-solid fa-cube text-pink-500'></i>
                    <span className='text-gray-600'>Surface : {prop.area} m²</span>
                  </div>
                </div>
                <div className="flex justify-center pb-8 border-b-2 items-center max-[768px]:pb-4">
                  <span className='text-gray-600 font-extrabold'>Prix : {prop.price} DA</span>
                </div>
                <div className="p-2 flex justify-center">
                  < Link className='p-3 flex font-bold  justify-center w-[60%] rounded-sm primary_color_bg cursor-pointer text-white border hover:bg-white hover:text-pink-500 transition-all' to={`/annonces/annonce/${prop.id}`} >Voir plus</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ul className="flex justify-center gap-2 mb-8">
        {Array.from({ length: nb_pages }, (_, i) => i + 1).map(page => {
          return <button className='bg-pink-400 text-white font-bold  transition-all rounded-full h-9 w-9' onClick={() => setCurrent(page)}>{page}</button>;
        })}
      </ul>
    </div>
  );
}
export default Annonces;