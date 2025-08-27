import Layout from "./Layout.jsx";

import Home from "./Home";

import DailyBox from "./DailyBox";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const BUILD_MOD = import.meta.env.VITE_BUILD_MOD;

const PAGES = {

    Home: Home,

    DailyBox: DailyBox,

}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);

    if(BUILD_MOD === 'HOME') {
        return (
            <Layout currentPageName={currentPage}>
                <Routes>
                    
                    <Route path="/" element={<Home />} />

                    <Route path="/Home" element={<Home />} />

                </Routes>
            </Layout>
        );
    } else {
        return (
            <Layout currentPageName={currentPage}>
                <Routes>
                    
                    <Route path="/" element={<DailyBox />} />

                </Routes>
            </Layout>
        );
    }
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}