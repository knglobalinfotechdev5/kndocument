import axios from 'axios';

export const exportDocument = async (content, format) => {
    try {
        const response = await axios.post('http://localhost:5000/export', {
            content,
            format,
        }, {
            responseType: 'blob', // Expecting a file (PDF/DOCX) in response
        });
        return response;
    } catch (error) {
        console.error('Error exporting document:', error);
        throw error;
    }
};
