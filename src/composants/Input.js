import React from 'react';

const Input = (props) => {
    return (
        <div>
            <input type={props.type} placeholder={props.placeholder} className="p-2 border text-gray-600 font-semibold outline-none w-[100%] focus:border-pink-500"/>
        </div>
    );
};

export default Input;