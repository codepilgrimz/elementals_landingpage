import React from 'react';

import orcaLogoImage from '@/images/orca-logo.svg';
import raydiumLogoImage from '@/images/raydium-logo.svg';

const exchanges = [
    { name: 'Jupiter', logo: 'https://jup.ag/svg/jupiter-logo.svg', url: "https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=5jfYvStC8je3PZPFNS4Qxp1VGKMai4MWVT6iArTUKhUe" },
    { name: 'Raydium', logo: raydiumLogoImage, url: "https://raydium.io/swap/?inputMint=sol&outputMint=5jfYvStC8je3PZPFNS4Qxp1VGKMai4MWVT6iArTUKhUe" },
    { name: 'Orca', logo: orcaLogoImage, url: "https://www.orca.so/" },
    { name: 'Meteora', logo: 'https://www.meteora.ag/icons/v2/logo.svg', url: "https://www.meteora.ag/" },
];

export default function ExchangesSection() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
            <h2 className="font-bangers text-5xl tracking-wider">Find Us In The Wild</h2>
            <p className="font-inter uppercase font-bold mt-2">Available on all major Solana watering holes.</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {exchanges.map((exchange) => (
                    <a key={exchange.name} href={exchange.url} target="_blank" rel="noopener noreferrer" className="block bg-white border-4 border-black rounded-2xl p-6 hover:shadow-[8px_8px_0px_#000000] transition-all duration-200 transform hover:-translate-y-2">
                        <img src={exchange.logo} alt={`${exchange.name} logo`} className="h-16 mx-auto" />
                        <p className="font-inter font-black uppercase text-2xl mt-4">{exchange.name}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}