import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Copy, Check } from 'lucide-react';
import heroImage from '@/images/hero.webp';

const CONTRACT_ADDRESS = import.meta.env.VITE_COLLECTION_PUBKEY || "5jfYvStC8je3PZPFNS4Qxp1VGKMai4MWVT6iArTUKhUe";

export default function HeroSection() {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    return (
        <section className="bg-black text-white border-b-4 border-white overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="sunburst"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
                <div className="flex flex-col items-center animate-fade-in">
                
                    <h1 className="font-bangers text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-yellow-400 leading-none tracking-wider">
                        Elementals arc.
                    </h1>
                    
                    <div className="my-4 md:my-0 animate-float">
                        <img 
                            src={heroImage}
                            alt="Cult Coin Mascot" 
                            className="relative z-10 w-48 md:w-64 lg:w-[800px] xl:w-[1000px] 2xl:2-[1280px]"
                        />
                    </div>
                    

                    <p className="font-inter uppercase font-bold text-lg mt-8 max-w-2xl mx-auto">
                       The ritual has begun. The memes have been summoned. There is no escape. There is only CULT.
                    </p>

                    <div className="mt-8 bg-gray-900/50 border-2 border-yellow-400/50 rounded-lg p-3 w-full max-w-md mx-auto">
                        <p className="text-xs font-inter uppercase text-yellow-400/70">Contract Address</p>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="font-mono text-sm text-white truncate flex-1 text-left">{CONTRACT_ADDRESS}</p>
                            <Button onClick={handleCopy} size="sm" variant="ghost" className="text-yellow-400 hover:text-black hover:bg-yellow-400 shrink-0">
                                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                <span className="ml-2">{isCopied ? 'Copied!' : 'Copy'}</span>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
                        <Button className="w-full sm:w-auto flex-1 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-lg px-8 py-6 border-2 border-black rounded-lg shadow-[6px_6px_0px_#FBBF24] hover:shadow-none transition-all duration-200 transform hover:-translate-y-1"
                            onClick={() => {
                                window.location.href = "#social";
                            }}
                        >
                            How To Join
                        </Button>
                        
                         <Button variant="outline" className="w-full sm:w-auto flex-1 bg-transparent hover:bg-yellow-400 hover:text-black text-yellow-400 font-bold uppercase tracking-wider text-lg px-8 py-6 border-2 border-yellow-400 rounded-lg transition-all duration-200"
                            onClick={() => {
                                window.location.href = "#memes";
                            }}
                         >
                            See the Memes <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>

                </div>
            </div>
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                @keyframes sunburst-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .sunburst {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 200%;
                    height: 200%;
                    background-image: 
                        repeating-conic-gradient(
                            from 0deg,
                            #fbbd24 0deg 5deg,
                            transparent 5deg 10deg
                        );
                    animation: sunburst-spin 180s linear infinite;
                    transform: translate(-50%, -50%);
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    opacity: 0;
                    animation: fade-in-up 1s ease-out forwards;
                }
            `}</style>
        </section>
    );
}