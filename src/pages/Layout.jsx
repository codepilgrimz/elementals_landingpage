
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Twitter, Send, Instagram, Gamepad2, Images, Music2, Handshake, Menu, X } from 'lucide-react';
import logoImage from '@/images/logo.png';

const BUILD_MOD = import.meta.env.VITE_BUILD_MOD;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const DAILY_BOX_URL = import.meta.env.VITE_DAILY_BOX_URL;

const navLinks = [
    { name: 'Home', path: BUILD_MOD === 'HOME' ? createPageUrl('Home') : `${SITE_URL}/home` },
    { name: 'Tokenomics', path: BUILD_MOD === 'HOME' ? '#tokenomics' : `${SITE_URL}/home#tokenomics` },
    { name: 'How To Buy', path: BUILD_MOD === 'HOME' ? '#how-to-buy' : `${SITE_URL}/home#how-to-buy` },
    { name: 'Daily Box', path:  DAILY_BOX_URL},
];

export default function Layout({ children }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    return (
        <div className="bg-black text-white font-sans antialiased">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;700;900&display=swap');
                .font-bangers {
                    font-family: 'Bangers', cursive;
                }
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b-4 border-white">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to={createPageUrl('')} className="flex items-center gap-3">
                            <img src={logoImage} alt="Cult Coin Mascot" className="h-12 w-24"/>
                        </Link>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.path} 
                                    className="font-inter font-bold uppercase text-sm tracking-widest hover:text-yellow-400 transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        <a href="https://x.com/i/communities/1948979942345089490" target="_blank" rel="noopener noreferrer">
                           <Button className="hidden md:flex bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider border-2 border-black rounded-lg shadow-[4px_4px_0px_#ffffff] hover:shadow-none transition-all duration-200 transform hover:-translate-y-1">
                                Join Us
                            </Button>
                        </a>

                        <button
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:ring-offset-black"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </nav>
                {mobileOpen && (
                    <div className="md:hidden border-t-4 border-white bg-black/95 backdrop-blur-sm">
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="block font-inter font-bold uppercase text-sm tracking-widest hover:text-yellow-400 transition-colors duration-300"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a href="https://x.com/i/communities/1948979942345089490" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider border-2 border-black rounded-lg shadow-[4px_4px_0px_#ffffff] hover:shadow-none transition-all duration-200">
                                    Join Us
                                </Button>
                            </a>
                        </div>
                    </div>
                )}
            </header>

            <main className="font-inter">
                {children}
            </main>

            <footer className="bg-yellow-400 text-black border-t-4 border-black" id='social'>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="font-bangers text-5xl tracking-wider">Join the ELEMENTALSNFT</h3>
                            <p className="font-inter uppercase font-bold mt-1">Don't miss the signs.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="https://x.com/Elementals_NFT_" target="_blank" rel="noopener noreferrer" className="bg-black text-yellow-400 p-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="https://www.tiktok.com/@elementals_nft_" target="_blank" rel="noopener noreferrer" className="bg-black text-yellow-400 p-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <Music2 className="w-6 h-6" />
                            </a>
                            <a href="https://www.instagram.com/elementals_nft_" target="_blank" rel="noopener noreferrer" className="bg-black text-yellow-400 p-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="https://discord.gg/elementals" target="_blank" rel="noopener noreferrer" className="bg-black text-yellow-400 p-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <Gamepad2 className="w-6 h-6" />
                            </a>
                            <a href="https://t.me/Elementalscommunity" target="_blank" rel="noopener noreferrer" className="bg-black text-yellow-400 p-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <Send className="w-6 h-6" />
                            </a>
                            <a href="https://magiceden.io/marketplace/elementals" target="_blank" rel="noopener noreferrer" className="bg-black text-yellow-400 p-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <Images className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                    <div className="text-center mt-8 pt-8 border-t-2 border-black/20">
                        <p className="font-inter text-sm font-bold uppercase">&copy; {new Date().getFullYear()} ELEMENTALS NFT. All Rights Reserved. Memes are law.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
