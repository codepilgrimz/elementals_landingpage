import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import MemeModal from './MemeModal';
const memeModules = import.meta.glob("/src/memes/**/*.{png,jpg,jpeg,gif,mov}", {
    eager: true,
});

export default function MemeGallery() {
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const memes = Object.entries(memeModules).map(([path, mod]) => {
        const image_url = (mod).default;
        const parts = path.split("/");
        const title = parts[parts.length - 1];
        const ext = title.split(".").pop() || "";
        return { title, image_url, type: ext };
    });

    const handleMemeClick = (meme) => {
        setSelectedMeme(meme);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMeme(null);
    };

    const handleQuickDownload = (e, meme) => {
        e.stopPropagation();
        fetch(meme.image_url)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // const fileName = meme.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                a.download = meme.title;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert('Could not download the image.'));
    };

    return (
        <>
            <section className="bg-black text-white border-t-4 border-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-bangers text-6xl tracking-wider text-yellow-400">Sacred Texts</h2>
                    <p className="font-inter uppercase font-bold mt-2">Propaganda for the masses. Go forth and spread the word.</p>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {memes.map((meme, key) => (
                            <div
                                key={key}
                                className="group bg-gray-900 border-4 border-yellow-400 rounded-2xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-[8px_8px_0px_#FBBF24] hover:-translate-y-2"
                                onClick={() => handleMemeClick(meme)}
                            >
                                <div className="relative overflow-hidden rounded-lg">
                                    {meme.type === "mov" ? (
                                        <video
                                            src={meme.image_url}
                                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                            controls
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={meme.image_url}
                                                alt={meme.title}
                                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="bg-yellow-400 text-black p-3 rounded-full">
                                                    <Eye className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </div>

                                <h3 className="font-bangers text-2xl mt-4 text-center break-words">{meme.title}</h3>

                                <div className="flex gap-2 mt-4">
                                    <div className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase tracking-wider text-sm py-2 px-3 rounded-lg border-2 border-black text-center transition-colors duration-200">
                                        Click to View
                                    </div>
                                    <button
                                        onClick={(e) => handleQuickDownload(e, meme)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg border-2 border-black transition-colors duration-200"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <MemeModal
                meme={selectedMeme}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}