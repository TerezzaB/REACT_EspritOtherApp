import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import AutocompleteComponent from '../components/Autocomplete';

// Utility function to format date as HH:mm DD.MM.RRRR
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

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
                    // Format date fields in the fetched data
                    const formattedData = data.map((item) => ({
                        ...item,
                        time: formatDate(item.time), 
                        writetime: formatDate(item.writetime),
                    }));
                    setData(formattedData);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedSerialNumber]);

    return (
        <>
            <div style={{ margin: '3em 0 2em 0' }}>
                <AutocompleteComponent
                    options={serialNumbers}
                    onChange={(event, value) => setSelectedSerialNumber(value)}
                />
                <div style={{ marginTop: '3em' }}>
                    {selectedSerialNumber && <DataTable data={data} />}
                </div>
            </div>
        </>
    );
}