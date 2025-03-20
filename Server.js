const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;

// Constants
const THIRD_PARTY_API = "http://20.244.56.144/test/numbers";
const ACCESS_TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc2NDg2LCJpYXQiOjE3NDI0NzYxODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImUzNmYzNzc4LTU1ODQtNDgyNS1iYjdjLWY2OWJjNjQ5MzQyZiIsInN1YiI6InNhMjUxM0Bzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU2FoaWwgQWRoaWthcmkiLCJjbGllbnRJRCI6ImUzNmYzNzc4LTU1ODQtNDgyNS1iYjdjLWY2OWJjNjQ5MzQyZiIsImNsaWVudFNlY3JldCI6ImFTUnpZaW1BYUVWWExFZXgiLCJvd25lck5hbWUiOiJTYWhpbCIsIm93bmVyRW1haWwiOiJzYTI1MTNAc3JtaXN0LmVkdS5pbiIsInJvbGxObyI6IlJBMjIxMTAyNzAxMDAwMiJ9.D0XC60-IwMpunbu0Ud7R7HXyOFnij8uWwqnGkuIg04k";
const WINDOW_SIZE = 10;

// Sliding window storage
let numberWindow = [];

// Function to fetch numbers from third-party API
async function fetchNumbers(type) {
    try {
        const response = await axios.get(`${THIRD_PARTY_API}/${type}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            },
            timeout: 500 
        });

        console.log("Fetched numbers:", response.data.numbers); // Debugging
        return response.data.numbers || [];
    } catch (error) {
        console.error("Error fetching numbers:", error.message);
        return [];
    }
}

// Route: GET /numbers/:numberid
app.get("/numbers/:numberid", async (req, res) => {
    const { numberid } = req.params;
    if (!["p", "f", "e", "r"].includes(numberid)) {
        return res.status(400).json({ message: "Invalid number ID. Use 'p', 'f', 'e', or 'r'." });
    }

    const prevState = [...numberWindow]; // Store previous state
    const newNumbers = await fetchNumbers(numberid);

    // Add unique numbers to the window
    newNumbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            if (numberWindow.length >= WINDOW_SIZE) {
                numberWindow.shift(); // Remove oldest number
            }
            numberWindow.push(num);
        }
    });

    // Calculate average
    const avg = numberWindow.length > 0 ? (numberWindow.reduce((sum, num) => sum + num, 0) / numberWindow.length).toFixed(2) : 0;

    // Send response
    res.json({
        windowPrevState: prevState,
        windowCurrState: numberWindow,
        numbers: newNumbers,
        avg: parseFloat(avg)
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
