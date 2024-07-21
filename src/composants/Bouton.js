import React from 'react';
import { Link } from 'react-router-dom';
const Bouton = (Value) => {
    return (
        <div className='p-2 text-white primary_color_bg transition-all flex items-center border cursor-pointer hover:bg-white hover:text-pink-500 font-bold'>
            <Link to={Value.lien} className='flex gap-2 items-center'>{Value.texte}
            <i className={Value.icon}></i>
            </Link>
        </div>
    );
};
export default Bouton;