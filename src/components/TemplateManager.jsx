import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'; // Icon for edit

const TemplateManager = () => {
    const [templates, setTemplates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTemplates = JSON.parse(localStorage.getItem('templates')) || [];
        setTemplates(savedTemplates);
    }, []);

    const handleDeleteTemplate = (templateToDelete) => {
        const updatedTemplates = templates.filter(template => template.name !== templateToDelete.name);
        setTemplates(updatedTemplates);
        localStorage.setItem('templates', JSON.stringify(updatedTemplates));
    };

    const handleEditTemplate = (template) => {
        // Navigate to DocumentView, passing the template content to edit
        navigate('/edit', { state: { htmlContent: template.content } });
    };

    return (
        <div className="template-manager w-[90%] mx-auto text-center">
            <h3 className="font-bold text-2xl mb-4">Manage Templates</h3>

            <h4 className="mt-6 font-semibold">Saved Templates:</h4>
            <ul className="mt-4">
                {templates.map((template, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                        <div className="text-left w-full">
                            {/* Template Name */}
                            <p className="text-lg font-bold">{template.name}</p>
                            {/* Display template content in a read-only manner */}
                            <p className="text-sm text-gray-600">{template.content.slice(0, 100)}...</p> {/* Show preview */}
                        </div>
                        <div className="flex items-center">
                            {/* Edit Button */}
                            <button
                                onClick={() => handleEditTemplate(template)}
                                className="bg-blue-600 p-2 text-white font-bold rounded-lg flex items-center"
                            >
                                <FiEdit className="mr-1" /> Edit
                            </button>
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteTemplate(template)}
                                className="ml-2 bg-red-600 p-2 text-white font-bold rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TemplateManager;
