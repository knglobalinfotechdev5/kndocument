import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ExportButton from './ExportButton';
import useLocalStorage from '../Hooks/useLocalStorage'; // Import the custom hook

// Utility function for debouncing
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

// A helper function to wrap text based on color
const wrapEditableText = (htmlContent) => {
    return htmlContent
        .replace(/<span style="color: black">(.*?)<\/span>/g, '<span style="color: black" contenteditable="false">$1</span>') // Non-editable
        .replace(/<span style="color: red">(.*?)<\/span>/g, '<span style="color: red" contenteditable="true">$1</span>') // Editable
        .replace(/<span style="color: green">(.*?)<\/span>/g, '<span style="color: green" contenteditable="true">$1</span>'); // Editable
};

const DocumentView = () => {
    const location = useLocation();
    const { htmlContent } = location.state || { htmlContent: '' };
    
    const contentRef = useRef(null); // Reference to the rendered content
    const [editedContent, setEditedContent] = useLocalStorage('editedContent', ''); // Use the custom hook

    // Load and process the content when the component mounts
    useEffect(() => {
        const wrappedContent = wrapEditableText(htmlContent);
        contentRef.current.innerHTML = wrappedContent; // Directly update DOM
    }, [htmlContent]);

    // Set the content from local storage if available
    useEffect(() => {
        if (editedContent) {
            contentRef.current.innerHTML = editedContent; // Use stored content
        }
    }, [editedContent]);

    // Handle input changes with debounce
    const handleInput = debounce(() => {
        if (contentRef.current) {
            const currentContent = contentRef.current.innerHTML;
            setEditedContent(currentContent); // Update state on input
        }
    }, 500); // Debounce after 500 milliseconds

    const handleExit = () => {
        localStorage.removeItem('editedContent'); // Clear local storage on exit
    };

    return (
        <div>
            <div className='flex items-center justify-center gap-[20px]'>
                <ExportButton content={editedContent} /> {/* Pass edited content to ExportButton */}
                <Link to='/'>
                    <button onClick={handleExit} className="bg-red-700 p-[10px] mt-[20px] mb-[20px] text-white font-bold rounded-lg">
                        Exit
                    </button>
                </Link>
            </div>
            <div
                className="document-view w-[90%]"
                ref={contentRef} // Attach ref to the container
                contentEditable={false} // Overall div not editable
                onInput={handleInput} // Capture input changes
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    minHeight: "500px",
                    wordBreak: "break-all",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    fontSize: "24px",
                    outline: "none", // Disable default outline when editable
                }}
            />
        </div>
    );
};

export default DocumentView;
