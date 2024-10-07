import React from 'react';
import { exportDocument } from '../services/exportDocument';

const ExportButton = ({ content }) => {
    const handleExport = async (format) => {
        if (!content) {
            alert('No content to export!');
            return;
        }

        try {
            const response = await exportDocument(content, format);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `exported-document.${format}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting document:', error);
            alert('Error exporting document. Please try again.');
        }
    };

    return (
        <div className="export-buttons flex gap-[20px] items-center justify-center">
            <button
                onClick={() => handleExport('docx')}
                className='bg-green-700 p-[10px] mt-[20px] mb-[20px] text-white font-bold rounded-lg'
            >
                Export as DOCX
            </button>
        </div>
    );
};

export default ExportButton;
