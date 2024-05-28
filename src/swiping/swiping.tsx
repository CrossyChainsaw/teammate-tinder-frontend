import React, { useState } from 'react';
import './swiping.css'
import config from '../config/config';

interface UserData {
    id: number;
    username: string;
    powerRanking: number;
}

// IDs
const MY_USER_ID = 1;
const REQUESTING_USER_ID = 2;

function Swiping() {
    const [data, setData] = useState<UserData | null>(null); // Update state type to single UserData
    const [loading, setLoading] = useState(false);
    const [NoClicked, setNoClicked] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            console.log(REQUESTING_USER_ID)
            const response = await fetch(`${config.profileServiceUrl}read/${REQUESTING_USER_ID}`); 
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const jsonData: UserData = await response.json(); // Parse response as single UserData
            setData(jsonData);
            setLoading(false);
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const clickNo = async (id2: number) => {
        console.log('no') 
        console.log(MY_USER_ID)
        const response = await fetch(`${config.matchServiceUrl}no2?swiperID=${MY_USER_ID}&id2=${id2}`, {
            method: 'POST', // Specify the HTTP method as 'POST'
            headers: {
              'Content-Type': 'application/json' // Assuming you're sending JSON data
            },
            body: JSON.stringify({}) // Add a request body if needed
          });
        console.log(response);
        setNoClicked(true);
    };

    const clickYes = async (id2: number) => {
        // click yes logic
    };

    function getButtonState() {
        if (NoClicked === false){
            return "big-button"
        }
        else {
            return "big-button disabled"
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>hello (Pretend you are player with ID={MY_USER_ID})</p>
                <button onClick={fetchUser} disabled={loading}>
                    {loading ? 'Fetching...' : 'Fetch Data'}
                </button>
                {data && (
                    <div>
                        <h2>What do you think of this profile</h2>
                        <ul>
                            <li key={data.id}>
                                <strong>ID:</strong> {data.id}, <strong>Username:</strong> {data.username}, <strong>Power Ranking:</strong> {data.powerRanking}
                            </li>
                        </ul>
                        <button onClick={() => clickYes(data.id)} className="big-button">YES!😍</button>
                        <button onClick={() => clickNo(data.id)} className={getButtonState()} disabled={NoClicked}>NO!🤮</button>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Swiping;
