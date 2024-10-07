import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ExportButton from './ExportButton';

const TemplateView = () => {
    const location = useLocation();
    const templateName = location.state?.templateName || ''; // Get the template name passed from TemplateManager
    const [templateContent, setTemplateContent] = useState('');
    const contentRef = useRef(null);

    // Load the template content from localStorage
    useEffect(() => {
        const savedTemplates = JSON.parse(localStorage.getItem('templates')) || [];
        const selectedTemplate = savedTemplates.find(t => t.name === templateName);
        if (selectedTemplate) {
            setTemplateContent(selectedTemplate.content);
        }
    }, [templateName]);

    const handleContentChange = () => {
        if (contentRef.current) {
            const updatedContent = contentRef.current.innerHTML;
            setTemplateContent(updatedContent);

            // Save updated content to localStorage
            const savedTemplates = JSON.parse(localStorage.getItem('templates')) || [];
            const updatedTemplates = savedTemplates.map(t => 
                t.name === templateName ? { ...t, content: updatedContent } : t
            );
            localStorage.setItem('templates', JSON.stringify(updatedTemplates));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-[20px] p-[10px]">
                <Link to="/templates"> {/* Link back to TemplateManager */}
                    <button className="bg-blue-600 p-[10px] text-white font-bold rounded-lg">
                        Back to Templates
                    </button>
                </Link>
                <ExportButton content={templateContent} />
            </div>

            <div
                className="template-view w-[90%] mx-auto"
                ref={contentRef}
                contentEditable="true"
                onInput={handleContentChange} // Update content on input
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    minHeight: '500px',
                    wordBreak: 'break-all',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    fontSize: '24px',
                    outline: 'none',
                }}
                dangerouslySetInnerHTML={{ __html: templateContent }}
            />
        </div>
    );
};

export default TemplateView;
