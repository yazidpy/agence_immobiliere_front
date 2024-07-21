import React, { useState } from 'react';
import Navbar from '../composants/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const Modifier_annonce = () => {
    const { annonceId } = useParams()
    const [Property, setPropertys] = useState([])
    useEffect(() => {
        recuperer_infos(annonceId)
    }, []);
    const recuperer_infos = async (annonceId) => {
        try {
            const response_pro = await axios.get(`http://127.0.0.1:8000/store/property/${annonceId}/`);
            setPropertys(response_pro.data)
            setInputTitre(response_pro.data.title)
            setInputprice(response_pro.data.price)
            setInputadresse(response_pro.data.adress)
            setInputsurface(response_pro.data.area)
            setInputtypeProp(response_pro.data.type_propriete)
            setinputdesc(response_pro.data.description)
            if (response_pro.data.type_propriete === "Appartement") {
                try {
                    const appartement_info = await axios.get(`http://127.0.0.1:8000/store/property/appartement/${annonceId}/`);
                    setinputChambreAppar(appartement_info.data.rooms)
                    setInput_salle_bains(appartement_info.data.bathrooms)
                    setNetage(appartement_info.data.floors)
                    set_annee_fab(appartement_info.data.year_built)
                    set_renov_fab(appartement_info.data.year_renovted)
                    setInputVue(appartement_info.data.view)
                    setinput_leau(appartement_info.data.waterfront)
                }
                catch (error) {
                    console.log("Erreur de la récupération de l'appartement", error)
                }
            }
            else if (response_pro.data.type_propriete === "Villa") {
            }
            else {
            }
        }
        catch (error) {
            console.log("Erreur de la récuperation de la propertys")
        }
    }
    const input_class = "p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"
    const [input_titre, setInputTitre] = useState("")
    const handleInputTitleChange = (event) => {
        setInputTitre(event.target.value)
    }
    const [input_price, setInputprice] = useState("")
    const handleInputprice = (event) => {
        setInputprice(event.target.value)
    }
    const [input_adresse, setInputadresse] = useState("")
    const handleInputadress = (event) => {
        setInputadresse(event.target.value)
    }
    const [input_surface, setInputsurface] = useState("")
    const handleInputsurface = (event) => {
        setInputsurface(event.target.value)
    }
    const [input_type_prop, setInputtypeProp] = useState("")
    const handleInputProp = (event) => {
        setInputtypeProp(event.target.value)
    }
    const [input_descr, setinputdesc] = useState("")
    const handledesc = (event) => {
        setinputdesc(event.target.value)
    }
    const [input_chambre_appar, setinputChambreAppar] = useState("")
    const handleChambreAppar = (event) => {
        setinputChambreAppar(event.target.value)
    }
    const [input_salle_bains, setInput_salle_bains] = useState("")
    const handleBainsChange = (event) => {
        setInput_salle_bains(event.target.value)
    }
    const [input_n_etage, setNetage] = useState("")
    const handle_n_etage = (event) => {
        setNetage(event.target.value)
    }
    const [input_fab_annee, set_annee_fab] = useState("")
    const handle_fab_annee = (event) => {
        set_annee_fab(event.target.value)
    }
    const [input_renov_annee, set_renov_fab] = useState("")
    const handle_renov_annee = (event) => {
        set_renov_fab(event.target.value)
    }
    const [input_vue, setInputVue] = useState("")
    const handle_vue_change = (event) => {
        setInputVue(event.target.value)
    }
    const [input_vue_leau, setinput_leau] = useState(false)
    const handle_vue_eau_change = () => {
        setinput_leau(!input_vue_leau)
    }
    const { handleSubmit, control, register, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

    }
    return (
        <div className='flex flex-col gap-20'>
            <Navbar />
            <div></div>
            <div className="bg-white p-8 shadow-lg w-[70%] max-[768px]:w-[90%] m-auto border-pink-500 transition-all border-t-2">
                <div className="flex flex-col gap-4">
                    <span className='text-gray-600 text-lg text-center font-bold flex justify-center'>Modifier une annonce</span>
                </div>
                <form enctype="multipart/form-data">
                    <div className="grid grid-cols-2 p-8 gap-8 max-[768px]:grid-cols-1">
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Titre : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='text' className={input_class} value={input_titre} onChange={handleInputTitleChange} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Prix : DA </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='number' className={input_class} value={input_price} onChange={handleInputprice} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Adresse  </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='text' className={input_class} value={input_adresse} onChange={handleInputadress} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Surface : m² </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='number' className={input_class} value={input_surface} onChange={handleInputsurface} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'> Images </span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <input type='file' />
                                <input type='file' />
                                <input type='file' />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'> Type de la proprièté </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <select className='bg-white border p-2 cursor-pointer' onChange={handleInputProp} value={input_type_prop}>
                                    <option value="" disabled>Sélectionnez le type de propriété</option>
                                    <option value="Appartement">Appartement</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Terrain">Terrain</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'> Description de l'annonce </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='text' className="p-2 border text-gray-600 font-semibold outline-none w-[100%] h-[100px] focus:border-pink-500" value={input_descr} onChange={handledesc}
                                />
                            </div>
                        </div>
                        {input_type_prop === "Appartement" && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Chambre :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} value={input_chambre_appar} onChange={handleChambreAppar}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Salle de bains :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} value={input_salle_bains} onChange={handleBainsChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>N° étage :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} value={input_n_etage} onChange={handle_n_etage}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Année de fabrication :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} value={input_fab_annee} onChange={handle_fab_annee}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Année de renouvelement :  </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input type='number' min={0} className={input_class} value={input_renov_annee} onChange={handle_renov_annee}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'> Vue </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <select className='bg-white border p-2 cursor-pointer' onChange={handle_vue_change} value={input_vue}>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Bonne">Bonne</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Mauvaise">Mauvaise</option>
                                        </select>
                                    </div>
                                </div>
                                <div></div>
                                <div className="flex flex-rows gap-4">
                                    <div className="">
                                        <span className='text-gray-600 font-semibold'>Vue à l'eau :  </span>
                                    </div>
                                    <div className="">
                                        <input
                                            type='checkbox'
                                            onChange={handle_vue_eau_change} checked={input_vue_leau}
                                            className='cursor-pointer'
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <input type='submit' value="Modifier" className='p-4 bg-pink-500 text-white font-bold rounded-md cursor-pointer flex w-full hover:bg-white hover:text-pink-500 border-2 transition-all' />

                </form>
            </div>
        </div>
    );
};
export default Modifier_annonce;
