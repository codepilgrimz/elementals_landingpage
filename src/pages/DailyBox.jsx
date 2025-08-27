import React from 'react';
import SimpleWalletConnect from '../components/dailybox/SimpleWalletConnect';

export default function DailyBoxPage() {
    return (
        <div className="bg-black text-white border-y-4 border-white min-h-[calc(100vh-220px)] flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="font-bangers text-7xl md:text-8xl text-yellow-400 tracking-wider">
                        The Offering
                    </h1>
                    <p className="font-inter uppercase font-bold text-lg mt-4">
                        A daily tribute for the worthy. Prove your loyalty and you may be rewarded. Or you may get nothing. Such is the way of the CULT.
                    </p>
                </div>
                <div className="mt-12">
                    <SimpleWalletConnect />
                </div>
            </div>
        </div>
    );
}