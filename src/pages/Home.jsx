import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ExchangesSection from '../components/home/ExchangesSection';
import HowToBuySection from '../components/home/HowToBuySection';
import TokenomicsSection from '../components/home/TokenomicsSection';
import MemeGallery from '../components/home/MemeGallery';

export default function HomePage() {
    return (
        <div className="overflow-hidden">
            <HeroSection />
            <div className="bg-yellow-400 border-y-4 border-black py-12">
                <ExchangesSection />
            </div>
            <div className="bg-black border-y-4 border-white" id="how-to-buy">
                <HowToBuySection />
            </div>
            <div className="bg-yellow-400 border-y-4 border-black" id="tokenomics">
                <TokenomicsSection />
            </div>
            <div id="memes">
                <MemeGallery />
            </div>
        </div>
    );
}