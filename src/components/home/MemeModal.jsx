import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, X, Twitter, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function MemeModal({ meme, isOpen, onClose }) {
    if (!meme) return null;

    const handleDownload = () => {
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

    const handleShare = (platform) => {
        const text = `Check out this CULT meme: ${meme.title}`;
        const url = window.location.href;

        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'telegram') {
            window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl bg-black border-4 border-yellow-400 text-white p-0 overflow-hidden">
                <DialogHeader className="p-6 border-b-2 border-yellow-400/30">
                    <DialogTitle className="font-bangers text-4xl text-yellow-400 text-center">
                        {meme.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    <div className="flex justify-center">
                        {meme.type === "mov" ? (
                            <video
                                src={meme.image_url}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                controls
                            />
                        ) : (
                            <img
                                src={meme.image_url}
                                alt={meme.title}
                                className="max-w-full max-h-[60vh] object-contain rounded-lg border-2 border-yellow-400/50"
                            />
                        )}
                    </div>

                    <div className="text-center space-y-4">
                        <p className="font-inter uppercase font-bold text-gray-300">
                            Spread the word. Share the prophecy. Download and deploy.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button
                                onClick={handleDownload}
                                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase tracking-wider border-2 border-black rounded-lg shadow-[4px_4px_0px_#000000] hover:shadow-none transition-all duration-200 transform hover:-translate-y-1"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Download Meme
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => handleShare('twitter')}
                                    variant="outline"
                                    size="icon"
                                    className="bg-transparent hover:bg-blue-500 text-blue-400 hover:text-white border-2 border-blue-400 hover:border-blue-500 rounded-lg transition-all duration-200"
                                >
                                    <Twitter className="h-5 w-5" />
                                </Button>

                                <Button
                                    onClick={() => handleShare('telegram')}
                                    variant="outline"
                                    size="icon"
                                    className="bg-transparent hover:bg-blue-600 text-blue-400 hover:text-white border-2 border-blue-400 hover:border-blue-600 rounded-lg transition-all duration-200"
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="bg-gray-900 border-2 border-yellow-400/30 rounded-lg p-4">
                            <p className="font-inter uppercase font-bold text-xs text-gray-400 mb-2">
                                Pro Tip:
                            </p>
                            <p className="font-inter text-sm text-gray-300">
                                Use these memes to recruit new members to the CULT. The more they see, the more they believe.
                            </p>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="absolute top-[6px] right-[6px] text-yellow-400 hover:text-white hover:bg-yellow-400/20 rounded-full"
                >
                    <X className="h-6 w-6" />
                </Button>
            </DialogContent>
        </Dialog>
    );
}