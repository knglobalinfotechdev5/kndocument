import React, { createContext, useState, useContext } from 'react';

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
    const [isTemplateVisible, setTemplateVisible] = useState(true);

    return (
        <VisibilityContext.Provider value={{ isTemplateVisible, setTemplateVisible }}>
            {children}
        </VisibilityContext.Provider>
    );
};

export const useVisibility = () => useContext(VisibilityContext);
