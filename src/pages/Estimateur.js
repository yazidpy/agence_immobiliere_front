import React, { useState } from 'react';
import Navbar from '../composants/Navbar';
import axios from 'axios';
const input_class = "p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"


const Estimateur = () => {
    const [bathroms, setbathroms] = useState("")
    const [batdroms, setbadroms] = useState("")
    const [surface, setsurface] = useState("")
    const [floors, setFloors] = useState("")
    const [vue, setvue] = useState("")
    const [vue_eau, setVueEau] = useState("")
    const [condition, setcondition] = useState("")
    const [errorMsg, setErrorMessage] = useState("")
    const [prix_estimer, setPrix_estime] = useState("")

    const handleBathrom = (event) => {
        setbadroms(event.target.value)
    }
    const handleBadrom = (event) => {
        setbathroms(event.target.value)
    }
    const handlesurface = (event) => {
        setsurface(event.target.value)
    }

    const handlevue = (event) => {
        setvue(event.target.value)
    }

    const handleFloor = (event) => {
        setFloors(event.target.value)
    }
    const vue_eau_change = (event) => {
        setVueEau(event.target.value)
    }
    const condition_hndle = (event) => {
        setcondition(event.target.value)
    }

    const handleSubmit = async (event) => {
        setErrorMessage('')
        setPrix_estime('')
        event.preventDefault()
        if (batdroms === "" || bathroms === "" || surface === "" || floors === "" || vue === "" || vue_eau === "" || condition === "") {
            setErrorMessage("Vous devez remplir tout les champs !")
        }
        else {
            try {
                const esimation = await axios.post('https://agence-immobiliere-backend.onrender.com/store/estimator/appartement/', {
                    bedrooms: batdroms,
                    bathrooms: bathroms,
                    sqft_living: surface,
                    floors: floors,
                    waterfront: vue_eau,
                    view: vue,
                    condition: condition,
                })

                setPrix_estime(esimation.data.price)
            }
            catch (error) {
                console.log("Erreur de la récuperation de prix ", error)
            }
        }
    }
    return (
        <div className='flex flex-col gap-20'>
            <Navbar />
            <div></div>
            <div className="bg-white p-8 shadow-lg w-[70%] max-[768px]:w-[90%] m-auto border-pink-500 transition-all border-t-2">
                <div className="flex flex-col gap-4">
                    <span className='text-gray-600 text-base text-center font-bold flex justify-center'>Estimer le prix d'un appartement</span>
                    {errorMsg && (<span className='text-red-500 bg-red-100 p-3 font-bold text-center'>{errorMsg}</span>)}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 p-8 gap-16 max-[768px]:grid-cols-1 max-[768px]:gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Nombre de chambre : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='number' className={input_class} onChange={handleBadrom} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Salle de bains : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='number' className={input_class} onChange={handleBathrom} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>N° étage : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='number' className={input_class} onChange={handleFloor} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Surface : m² </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type='number' className={input_class} onChange={handlesurface} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Vue  : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <select className='p-2 bg-white border cursor-pointer' onChange={handlevue}>
                                    <option disabled selected>Selectionner la vue</option>
                                    <option value="4">Excellent</option>
                                    <option value="3">Bonne</option>
                                    <option value="2">Normal</option>
                                    <option value="1">Mauvaise</option>
                                    <option value="0">Très mauvais</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Vue à l'eau  : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <select className='p-2 bg-white border cursor-pointer' onChange={vue_eau_change}>
                                    <option disabled selected>Selectionner la vue à l'eau</option>
                                    <option value="1">Oui</option>
                                    <option value="0">Non</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <span className='text-gray-600 font-semibold'>Condition  : </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <select className='p-2 bg-white border cursor-pointer' onChange={condition_hndle}>
                                    <option disabled selected>Selectionner la condition</option>
                                    <option value="4">5/5</option>
                                    <option value="3">4/5</option>
                                    <option value="2">3/5</option>
                                    <option value="1">2/5</option>
                                    <option value="0">1/5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type='submit' value="Estimer" className='p-3 bg-pink-500 text-white font-bold transition-all hover:bg-white hover:text-pink-500  border rounded-sm cursor-pointer w-full ' />
                    </div>
                </form>
            </div>
            {prix_estimer && (
                <div className="flex justify-center p-8 w-full border gap-4">
                    <span className='text-gray-600 font-bold text-3xl max-[768px]:text-2xl '>Prix estimé :</span>
                    <span className='text-green-500 font-bold text-3xl text-center max-[768px]:text-2xl'> {parseInt(prix_estimer)} DA </span>

                </div>
            )}

        </div>

    );
};

export default Estimateur;