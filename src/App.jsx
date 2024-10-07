import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/Upload';
import DocumentView from './components/DocumentView';
import Dashboard from './components/Dashboard';
import { VisibilityProvider } from './Context/VisibilityContext';

const App = () => {
    return (
        <VisibilityProvider>
            <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path='/upload' element={<Upload/>}/>
                <Route path="/edit" element={<DocumentView />} />
            </Routes>
        </Router>
        </VisibilityProvider>
    );
};

export default App;
