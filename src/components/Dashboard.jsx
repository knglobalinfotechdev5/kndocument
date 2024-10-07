import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Upload from './Upload';
import Popups from './Popups';
import useLocalStorage from '../Hooks/useLocalStorage'; // Import the custom hook

const Dashboard = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();
    const [editedContent] = useLocalStorage('editedContent', ''); // Access the stored content

    // Check if there's any data in local storage
    const hasData = editedContent.length > 0;

    return (
        <section>
            <div className="relative mx-auto h-[100vh] z-100">
                <div className="flex items-center justify-center h-full">
                    <div className="flex items-center flex-col gap-[20px]">
                        <h1 className="relative text-center font-bold sm:text-[2rem] text-[1.8rem] text-black z-10">
                            Welcome to KN Doc <br />
                            Your Online Doc Template Editor
                        </h1>
                        <div className="flex items-center gap-[10px]">
                            <button
                                className="bg-blue-600 py-[10px] font-bold text-white rounded-lg px-[20px]"
                                onClick={() => setPopupVisible(true)}
                            >
                                Upload
                            </button>

                            {/* Conditionally render the Previous button */}
                            {hasData && (
                                <button
                                    className="bg-green-600 py-[10px] font-bold text-white rounded-lg px-[20px]"
                                    onClick={() => navigate('/edit')} // Navigate to the DocumentView
                                >
                                    Previous
                                </button>
                            )}
                        </div>

                        <Popups trigger={popupVisible} setTrigger={setPopupVisible}>
                            <Upload />
                        </Popups>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
