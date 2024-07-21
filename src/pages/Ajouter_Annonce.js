import React, { useEffect, useState } from 'react';
import Navbar from '../composants/Navbar';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
const Ajouter_Annonce = () => {
    const [userData, setUserData] = useState(null)
    const [message_success, setMessageSucces] = useState("")
    const [message_error, setMessageError] = useState("")


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

            } catch (error) {
                // console.log("Erreur lors de la récupération");
            }
        };
        fetchData();
    }, []);  // paser un tableau vide comme deuxième argument pour exécuter useEffect une seule fois
    const input_class = "p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"
    const [type_prop, setType] = useState("");
    const [isAppartement, setIsAppartement] = useState(false)
    const [isVilla, setIsVIlla] = useState(false)
    const [isTerrain, setIsTerrain] = useState(false)
    const { handleSubmit, control, register, formState: { errors } } = useForm();
    const [vue, setVue] = useState('Excellente');
    const [typeTerrain, setTypeTerrain] = useState('Agricole');
    const [Etatwaterfront, setEtatWaterfron] = useState(false)
    const [IsJardin, setIsJardin] = useState(false)
    const [IsPiscine, SetIspiscine] = useState(false)

    const JardinClick = () => {
        setIsJardin(!IsJardin)
    }
    const PiscineClick = () => {
        SetIspiscine(!IsPiscine)
    }
    const handleWterfront = () => {
        setEtatWaterfron(!Etatwaterfront)
    }
    const handleVueChange = (event) => {
        setVue(event.target.value);
    };
    const Terrain_type = (event) => {
        setTypeTerrain(event.target.value);
        
    };
    const OptionChange = (event) => {
        setIsAppartement(false);
        setIsTerrain(false);
        setIsVIlla(false);
        setType("")
        const selectedValue = event.target.value;
        setType(selectedValue);
        if (selectedValue === "Appartement") {
            setIsAppartement(!isAppartement)

        }
        else if (selectedValue === "Terrain") {
            setIsTerrain(!isTerrain)

        }
        else if (selectedValue === "Villa") {
            setIsVIlla(!isVilla)
        }
    }
    const onSubmit = async (data) => {
        setMessageError("")
        setMessageSucces("")
        if (type_prop === "Appartement") {
            try {
                const formData = new FormData();
                formData.append('title', data.titre);
                formData.append('description', data.description);
                formData.append('price', data.prix);
                formData.append('adress', data.adresse);
                formData.append('area', data.surface);
                formData.append('state', "DISPONIBLE");
                formData.append('type_propriete', "Appartement");
                formData.append('img_1', data.image1[0]);
                formData.append('img_2', data.image2[0]);
                formData.append('img_3', data.image3[0]);
                formData.append('rooms', data.rooms);
                formData.append('bathrooms', data.bathrooms);
                formData.append('floors', data.etage);
                formData.append('waterfront', data.waterfront);
                formData.append('view', vue);
                formData.append('year_built', data.fab);
                formData.append('year_renovted', data.renouv);

                const response_insertion_appartement = await axios.post('https://agence-immobiliere-backend.onrender.com/store/property/appartement/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const id_app = response_insertion_appartement.data.id;
                try {
                    const responseAnnonce = await axios.post('https://agence-immobiliere-backend.onrender.com/store/annonces/', {
                        Property: id_app,
                        Customer: userData.id
                    });
                    setMessageSucces("Votre annonce a été bien crée !")
                }
                catch (error) {
                    setMessageError("Erreur de serveur veuillez réesayez plus tard !")
                    console.log("Erreur de l'insertion de l'annonce", error)
                }


            } catch (error) {
                setMessageError("Erreur de serveur veuillez réesayez plus tard !")
                console.log("Erreur lors de l'insertion de l'appartement", error);
            }

        }
        else if (type_prop == "Villa") {
            try {
                const formData = new FormData();
                formData.append('title', data.titre);
                formData.append('description', data.description);
                formData.append('price', data.prix);
                formData.append('adress', data.adresse);
                formData.append('area', data.surface);
                formData.append('state', "DISPONIBLE");
                formData.append('type_propriete', "Villa");
                formData.append('img_1', data.image1[0]);
                formData.append('img_2', data.image2[0]);
                formData.append('img_3', data.image3[0]);
                formData.append('rooms', data.rooms_villa);
                formData.append('bathrooms', data.bathrooms_villa);
                formData.append('garden', data.jardin_villa);
                formData.append('pool', data.piscine_villa);
                formData.append('floors', data.etage_villa);
                formData.append('year_built', data.fab_villa);
                const response_insertion_villa = await axios.post('https://agence-immobiliere-backend.onrender.com/store/property/villa/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const id_villa = response_insertion_villa.data.id;
                try {
                    const responseAnnonce = await axios.post('https://agence-immobiliere-backend.onrender.com/store/annonces/', {
                        Property: id_villa,
                        Customer: userData.id
                    });
                    setMessageSucces("Votre annonce a été bien crée !")

                }
                catch (error) {
                    setMessageError("Erreur de serveur veuillez réesayez plus tard !")
                    console.log("Erreur de l'insertion de l'annonce", error)
                }
            }
            catch (error) {
                setMessageError("Erreur de serveur veuillez réesayez plus tard !")
                console.log("error", error)
            }

        }
        else if (type_prop === "Terrain") {
            try {
                const formData = new FormData();
                formData.append('title', data.titre);
                formData.append('description', data.description);
                formData.append('price', data.prix);
                formData.append('adress', data.adresse);
                formData.append('area', data.surface);
                formData.append('state', "DISPONIBLE");
                formData.append('type_propriete', "Terrain");
                formData.append('img_1', data.image1[0]);
                formData.append('img_2', data.image2[0]);
                formData.append('img_3', data.image3[0]);
                formData.append('Ground_type', typeTerrain)
                const response_insertion_terrain = await axios.post('https://agence-immobiliere-backend.onrender.com/store/property/ground/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const id_terrain = response_insertion_terrain.data.id;
                try {
                    const responseAnnonce = await axios.post('https://agence-immobiliere-backend.onrender.com/store/annonces/', {
                        Property: id_terrain,
                        Customer: userData.id
                    });
                    setMessageSucces("Votre annonce a été bien crée !")

                }
                catch (error) {
                    setMessageError("Erreur de serveur veuillez réesayez plus tard !")
                    console.log("Erreur de l'insertion de l'annonce", error)
                }
            }
            catch (error) {
                setMessageError("Erreur de serveur veuillez réesayez plus tard !")
                console.log("error", error)
            }
        }
    };
    return (
        <div className='flex flex-col gap-20'>
            <Navbar />
            <div className=""></div>
            <div className="bg-white p-8 shadow-lg w-[70%] max-[768px]:w-[95%] m-auto border-pink-500 transition-all mb-4">
                <div className="flex flex-col gap-4">
                    <span className='text-red-500 text-center font-semibold flex justify-center'>Vous devez d'abord choisir le type de la propriété !</span>
                    {message_success && (<p className='text-green-500 font-bold flex justify-center bg-green-100 p-2'>{message_success}</p>)}
                    {message_error && (<p className='text-red-500 font-bold flex justify-center bg-red-100 p-2'>{message_error}</p>)}

                </div>
                <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                    <div className="grid grid-cols-2 p-8 gap-8 max-[768px]:grid-cols-1">
                    <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'> Type de la proprièté </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Controller
                                    name="type_prop"
                                    control={control}
                                    render={({ field }) => (
                                        <select className='bg-white border p-2 cursor-pointer' {...field} onChange={OptionChange}>
                                            <option value="" disabled selected required >Sélectionnez le type de propriété</option>
                                            <option value="Appartement">Appartement</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Terrain">Terrain</option>
                                        </select>
                                    )}
                                />

                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Titre : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    type='text'
                                    className={input_class}
                                    placeholder='Donner un titre pour votre annonce'
                                    {...register('titre', { required: 'Ce champ est requis' })}
                                />
                                {errors.titre && <p className='text-red-500 font-semibold'>{errors.titre.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Prix : DA </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    type='number'
                                    min={0}
                                    className={input_class}
                                    placeholder='Le prix de votre annonce'
                                    {...register('prix', { required: 'Ce champ est requis' })}
                                />
                                {errors.prix && <p className='text-red-500 font-semibold'>{errors.prix.message}</p>}

                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Adresse : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    type='text'
                                    className={input_class}
                                    placeholder="L'adresse de votre annonce"
                                    {...register('adresse', { required: 'Ce champ est requis' })}
                                />
                                {errors.adresse && <p className='text-red-500 font-semibold'>{errors.adresse.message}</p>}

                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Surface : m² </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    type='number'
                                    min={0}
                                    className={input_class}
                                    placeholder='La surface de votre annonce'
                                    {...register('surface', { required: 'Ce champ est requis' })}
                                />
                                {errors.surface && <p className='text-red-500 font-semibold'>{errors.surface.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'> Images </span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <input type='file' {...register('image1')} />
                                <input type='file' {...register('image2')} />
                                <input type='file' {...register('image3')} />
                            </div>
                        </div>
                       

                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'> Description de l'annonce </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='text' className="p-2 border text-gray-600 font-semibold outline-none w-[100%] h-[100px] focus:border-pink-500" placeholder="Description de l'annonce"
                                    {...register('description', { required: 'Ce champ est requis' })}
                                />
                                {errors.description && <p className='text-red-500 font-semibold'>{errors.description.message}</p>}

                            </div>
                        </div>
                        {isAppartement && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Chambre :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder='Le nombre de chambre'
                                            {...register('rooms', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.rooms && <p className='text-red-500 font-semibold'>{errors.rooms.message}</p>}

                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Salle de bains :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder='Le nombre de salle de bains'
                                            {...register('bathrooms', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.bathrooms && <p className='text-red-500 font-semibold'>{errors.bathrooms.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>N° étage :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder="L'étage numèro : "
                                            {...register('etage', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.etage && <p className='text-red-500 font-semibold'>{errors.etage.message}</p>}

                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Année de fabrication :  </span>
                                    </div>
                                    <div className="">
                                        <input type='number' min={0} className={input_class} placeholder="L'année de fabrication de l'appartement : "
                                            {...register('fab', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.fab && <p className='text-red-500 font-semibold'>{errors.fab.message}</p>}

                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Année de renouvelement :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder="L'année de renouvelement de l'appartement : "
                                            {...register('renouv', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.renouv && <p className='text-red-500 font-semibold'>{errors.renouv.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Vue :  </span>
                                    </div>
                                    <select className='bg-white border p-2 cursor-pointer' value={vue}
                                        onChange={handleVueChange}>
                                        <option value="Excellente">Excellent</option>
                                        <option value="Bonne">Bonne</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Mauvaise">Mauvaise</option>
                                    </select>
                                </div>
                              
                                <div>
                                </div>
                                <div className="flex flex-rows gap-4 items-center">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Vue à l'eau :  </span>
                                    </div>
                                    <div className="">
                                        <input
                                            type='checkbox'
                                            {...register('waterfront')} checked={Etatwaterfront}
                                            className='cursor-pointer' onChange={handleWterfront}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        {isVilla && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Chambre :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder='Le nombre de chambre de villa'
                                            {...register('rooms_villa', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.rooms_villa && <p className='text-red-500 font-semibold'>{errors.rooms_villa.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Salle de bains :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder='Le nombre de salle de bains'
                                            {...register('bathrooms_villa', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.bathrooms_villa && <p className='text-red-500 font-semibold'>{errors.bathrooms_villa.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Année de fabrication :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder="Année de fabrication de villa"
                                            {...register('fab_villa', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.fab_villa && <p className='text-red-500 font-semibold'>{errors.fab_villa.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Nombre d'étages :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} placeholder="Le nombre d'étages"
                                            {...register('etage_villa', { required: 'Ce champ est requis' })}
                                        />
                                        {errors.etage_villa && <p className='text-red-500 font-semibold'>{errors.etage_villa.message}</p>}
                                    </div>
                                </div>
                                <div></div>
                                <div className="flex flex-rows gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Jardin :  </span>
                                    </div>
                                    <div className="">
                                        <input
                                            type='checkbox'
                                            {...register('jardin_villa')} onChange={JardinClick} checked={IsJardin}
                                            className='cursor-pointer'
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-rows gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Piscine :  </span>
                                    </div>
                                    <div className="">
                                        <input
                                            type='checkbox'
                                            {...register('piscine_villa')} onChange={PiscineClick} checked={IsPiscine}
                                            className='cursor-pointer'
                                        />
                                    </div>
                                </div>

                            </>
                        )}
                        {isTerrain && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Type de terrain :  </span>
                                    </div>
                                    <select className='bg-white border p-2 cursor-pointer' onChange={Terrain_type} value={typeTerrain}>
                                        <option value="Agricole">Agricole</option>
                                        <option value="Forestier">Forestier</option>
                                        <option value="Urbain">Urbain</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                    <input type='submit' value="Ajouter" className='p-4 bg-pink-500 text-white font-bold transition-all hover:text-pink-500 hover:bg-white border cursor-pointer flex w-full items-center justify-center' />
                </form>
            </div>
        </div>
    );
};

export default Ajouter_Annonce;