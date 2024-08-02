// src/FormComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import '../src/styles/styles.css'

const FormComponent = ({ onSubmit }) => {
    // Axis Variables
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [z, setZ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const point = { x: parseFloat(x), y: parseFloat(y), z: parseFloat(z) };
        try {
            // Axios call to backend python
            const response = await axios.post('http://localhost:5000/plot', point);
            if (response.status === 200) {
                onSubmit(point);
                setX('');
                setY('');
                setZ('');
            } else {
                // Failed Response
                alert("Failed to add point");
            }
        } catch (error) {
            // Catching error message
            alert(error.response.data.error);
        }
    };

    return (
        
        <form onSubmit={handleSubmit}>            
            <h1>BIA ANALYTICAL</h1>
            <div>
                {/* Input fields */}
                <label><b>X:</b></label>
                <input className='input-field' type="number" value={x} onChange={(e) => setX(e.target.value)} required min="0" max="10" />
            </div>
            <div>
                <label><b>Y:</b></label>
                <input className='input-field' type="number" value={y} onChange={(e) => setY(e.target.value)} required min="0" max="10" />
            </div>
            <div>
                <label><b>Z:</b></label>
                <input className='input-field' type="number" value={z} onChange={(e) => setZ(e.target.value)} required min="0" max="10" />
            </div>
            {/* Submit Button */}
            <button type="submit" className='plot-point'>Submit</button>
        </form>
    );
};

export default FormComponent;
