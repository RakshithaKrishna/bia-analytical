import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThreeDPlot from './ThreeDPlot';
import FormComponent from './FormComponent';

const App = () => {
    const [plotPoints, setPlotPoints] = useState([]);
    const [newPoints, setNewPoints] = useState([]);

    useEffect(() => {
      // Axios call set plot points using react hooks
        const fetchPoints = async () => {
            try {
                const response = await axios.get('http://localhost:5000/points');
                setPlotPoints(response.data);
            } catch (error) {
                console.error("Error fetching plot points:", error);
            }
        };
        fetchPoints();
    }, []);

    // Setting up new points
    const handleNewPoint = (point) => {
        setNewPoints([...newPoints, point]);
    };

    return (
        <div>
            <FormComponent onSubmit={handleNewPoint} />
            <ThreeDPlot plotPoints={plotPoints} newPoints={newPoints} />
        </div>
    );
};

export default App;
