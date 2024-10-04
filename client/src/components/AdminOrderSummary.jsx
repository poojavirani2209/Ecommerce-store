import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrderSummary = () => {
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get('http://localhost:8887/admin/summary');
                setSummary(response.data);
            } catch (error) {
                setError('Failed to fetch order summary');
            }
        };

        fetchSummary();
    }, []);

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!summary) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Admin Order Summary</h2>
            <div>
                <p>Total Items Purchased: {summary.itemsPurchased}</p>
                <p>Total Amount from Purchased Items: ${summary.totalItemsPurchasedAmount}</p>
            </div>
        </div>
    );
};

export default AdminOrderSummary;
