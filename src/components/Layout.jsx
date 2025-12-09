import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="app-container">
            <main className="main-content">
                <Outlet />
            </main>
            <Navbar />
        </div>
    );
};

export default Layout;
