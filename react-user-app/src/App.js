import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/user-management">User Management</Link>
                        </li>
                        <li>
                            <Link to="/product-management">Product Management</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/product-management" element={<ProductManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
