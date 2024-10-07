import axios from 'axios';

export const exportDocument = async (content, format) => {
    try {
        const response = await axios.post('http://localhost:5000/export', {
            content: content,
            format: format
        }, {
            responseType: 'blob'  // Expect a binary blob in the response
        });
        return response;
    } catch (error) {
        console.error('Error exporting document:', error);
        throw error;
    }
};
