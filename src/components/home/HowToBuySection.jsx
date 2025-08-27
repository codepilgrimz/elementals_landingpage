import React from 'react';
import { Button } from '@/components/ui/button';

const steps = [
    { number: '1', title: 'Get a Wallet', description: 'Download Phantom or your wallet of choice from the app store or google play store for free.' },
    { number: '2', title: 'Get Some SOL', description: 'Have SOL in your wallet to swap for $ELEMENTALS. If you don’t have any SOL, you can buy directly on Phantom.' },
    { number: '3', title: 'Go to METEORA', description: 'Connect to METEORA. Go to METEORA in google chrome or on the browser inside your Phantom app.' },
    { number: '4', title: 'Swap for $ELEMENTALS', description: 'Swap SOL for $ELEMENTALS. We have ZERO taxes so you don’t need to worry about buying with a specific slippage.' },
];

export default function HowToBuySection() {
    const handleBuyNowClick = () => {
        window.open(
            "https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=5jfYvStC8je3PZPFNS4Qxp1VGKMai4MWVT6iArTUKhUe",
            "_blank"
        );
     };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-bangers text-6xl tracking-wider text-yellow-400">Initiation Guide</h2>
                <p className="font-inter uppercase font-bold mt-2 text-white">Follow the path. Join the collective.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="bg-yellow-400 text-black border-4 border-black rounded-2xl p-6 text-left">
                            <div className="font-bangers text-7xl text-black/20 leading-none">{step.number}</div>
                            <h3 className="font-bangers text-4xl mt-2">{step.title}</h3>
                            <p className="font-inter font-bold uppercase text-sm mt-3">{step.description}</p>
                        </div>
                    ))}
                </div>
                
                 <Button onClick={() => handleBuyNowClick()} className="mt-12 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-lg px-10 py-6 border-2 border-black rounded-lg shadow-[6px_6px_0px_#FBBF24] hover:shadow-none transition-all duration-200 transform hover:-translate-y-1">
                    Buy Now
                </Button>
            </div>
        </section>
    );
}