import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import AutocompleteComponent from '../components/Autocomplete';

export default function ApiView() {
    const [data, setData] = useState([]);
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [selectedSerialNumber, setSelectedSerialNumber] = useState(null);

    useEffect(() => {
        // Fetch data for Autocomplete
        fetch('https://muses.esprit-bs.sk/viewerapi/flopres/getDistinctSensors')
            .then((response) => response.json())
            .then((data) => {
                const serialNumbers = data.map((item) => item.serial_number);
                setSerialNumbers(serialNumbers);
            })
            .catch((error) => {
                console.error('Error fetching serial numbers:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedSerialNumber) {
            fetch(`https://muses.esprit-bs.sk/viewerapi/flopres/getSensorData/${selectedSerialNumber}`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedSerialNumber]);

    return (
        <>
            <div style={{ margin: '20px' }}>
                <AutocompleteComponent
                    options={serialNumbers}
                    onChange={(event, value) => setSelectedSerialNumber(value)}
                />
                <div style={{ margin: '20px' }}>
                    {selectedSerialNumber && <DataTable data={data} />}
                </div>

            </div>
        </>
    );
}