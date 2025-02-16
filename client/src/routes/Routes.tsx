import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChecklistPage from "../pages/ChecklistPage.tsx";
import HomePage from "../pages/HomePage.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/:id" element={<ChecklistPage/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;