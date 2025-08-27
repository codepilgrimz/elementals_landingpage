import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, XCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction } from '@solana/web3.js';
import { Buffer } from "buffer";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"
const endpoint = import.meta.env.VITE_SOLANA_RPC || "https://api.devnet.solana.com" 
const connection = new Connection(endpoint)

export default function SimpleWalletConnect() {
    const { publicKey, signTransaction, connected, connect, wallet, select } = useWallet();
    const [step, setStep] = useState('connect'); // 'connect', 'opening', 'result'
    const [reward, setReward] = useState(null); // null, 'sol', 'nft', 'nothing'
    const [rewardAmount, setRewardAmount] = useState(null);
    const [error, setError] = useState('');

    const [remaining, setRemaining] = useState(1);
    const [cooldownTime, setCooldownTime] = useState(null);

    // Helper to format ms to hh:mm:ss
    function formatCooldown(ms) {
        if (ms <= 0) return "00:00:00";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    }

    // Fetch eligibility info
    const fetchEligibility = async (ownerPubkey) => {
        try {
            const res = await fetch(`${BACKEND_URL}/eligibility?owner=${ownerPubkey}`);
            const data = await res.json();
            
            if (data && data.opens) {
                setCooldownTime(data.opens.cooldownMs);
                setRemaining(data.opens.remaining);
            }
        } catch (e) {
            setRemaining(1);
            setCooldownTime(null);
        }
    };

    // Update eligibility when wallet connects
    React.useEffect(() => {
        if (publicKey) {
            fetchEligibility(publicKey.toBase58());
        } else {
            setRemaining(1);
            setCooldownTime(null);
        }
    }, [publicKey]);

    // Optionally, update cooldown timer every second
    React.useEffect(() => {
        if (cooldownTime === null) return;
        if (cooldownTime <= 0) return;
        const interval = setInterval(() => {
            setCooldownTime(prev => (prev > 1000 ? prev - 1000 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [cooldownTime]);

    const handleConnect = async () => {
        try {
            if (!wallet) {
                await select("Phantom");
            }
            if (!connected) await connect();
            setStep("connect");
            setError("");
        } catch (e) {
            setError("Wallet connection failed: " + e.message);
        }
    };

    const handleOpenBox = async () => {
        if (!publicKey || !signTransaction) {
            setError("Please connect your wallet first.");
            return;
        }
        setStep("opening");
        setError("");
        setReward(null);
        setRewardAmount(null);

        try {
            // Step 1: Prepare unsigned tx from backend
            const prepRes = await fetch(`${BACKEND_URL}/prepare-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ owner: publicKey.toBase58() }),
            });
            const prep = await prepRes.json();
            if (!prep.ok) throw new Error(prep.error || "Failed to prepare payment");

            // Step 2: Decode tx
            const tx = Transaction.from(Buffer.from(prep.txBase64, "base64"));

            // Step 3: Sign with wallet
            const signed = await signTransaction(tx);

            // Step 4: Send tx to chain
            const sig = await connection.sendRawTransaction(signed.serialize(), {
                skipPreflight: true,
            });
            await connection.confirmTransaction(sig, "confirmed");

            // Step 5: Call backend /open with payment signature
            const openRes = await fetch(`${BACKEND_URL}/open`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ owner: publicKey.toBase58(), signature: sig }),
            });
            const open = await openRes.json();
            if (!open.ok) throw new Error(open.error || "Failed to open box");

            setReward(open.result.kind.toLowerCase());
            setRewardAmount(open.result.label);
            setStep("result");
        } catch (e) {
            setError("Error: " + e.message);
            setStep("connect");
        }
    };

    const reset = () => {
        setStep('connect');
        setReward(null);
        setRewardAmount(null);
        setError('');
    }

    const renderReward = () => {
        switch (reward) {
            case 'sol':
                return (
                    <div className="text-center">
                        <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                        <h3 className="font-bangers text-5xl mt-4 text-green-400">`You Received ${rewardAmount}!`</h3>
                        <p className="font-inter uppercase font-bold mt-2">The CULT is pleased with your offering.</p>
                    </div>
                );
            case 'nft':
                return (
                    <div className="text-center">
                        <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                        <h3 className="font-bangers text-5xl mt-4 text-purple-400">You Received a Sacred Relic! (NFT)</h3>
                        <p className="font-inter uppercase font-bold mt-2">A rare artifact is now yours. Guard it well.</p>
                    </div>
                );
            case 'nothing':
                return (
                    <div className="text-center">
                        <XCircle className="w-16 h-16 mx-auto text-red-500" />
                        <h3 className="font-bangers text-5xl mt-4 text-red-500">You Received Nothing.</h3>
                        <p className="font-inter uppercase font-bold mt-2">Your loyalty is noted, but the CULT demands more. Try again tomorrow.</p>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="bg-gray-900 border-4 border-yellow-400 rounded-2xl p-8 md:p-12 max-w-lg mx-auto">
            {step === 'connect' && (
                <div className="text-center">
                    <h3 className="font-bangers text-4xl">Connect Your Wallet</h3>
                    <p className="font-inter uppercase text-gray-400 mt-2 mb-6">Connect your Solana wallet to participate in the daily ritual.</p>
                    <Button
                        onClick={handleConnect}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold uppercase tracking-wider text-lg py-6 border-2 border-black rounded-lg shadow-[6px_6px_0px_#22c55e] hover:shadow-none transition-all duration-200 transform hover:-translate-y-1 mb-4">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        {connected ? "Wallet Connected" : "Connect Wallet"}
                    </Button>
                    <Button
                        onClick={handleOpenBox}
                        disabled={!connect || remaining < 1}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-lg py-6 border-2 border-black rounded-lg shadow-[6px_6px_0px_#ef4444] hover:shadow-none transition-all duration-200 transform hover:-translate-y-1">
                        <Gift className="mr-2 h-5 w-5" />
                        Open Daily Box
                    </Button>
                </div>
            )}

            {step === 'opening' && (
                <div className="text-center">
                    <h3 className="font-bangers text-4xl">Opening Your Box...</h3>
                    <p className="font-inter uppercase text-gray-400 mt-2 mb-6">The CULT is judging your worthiness...</p>
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400"></div>
                    </div>
                </div>
            )}

            {step === 'result' && (
                <div className="text-center">
                    {renderReward()}
                    <Button
                        onClick={reset}
                        variant="outline"
                        className="mt-8 bg-transparent hover:bg-yellow-400 hover:text-black text-yellow-400 font-bold uppercase tracking-wider border-2 border-yellow-400 rounded-lg transition-all duration-200">
                        Try Again Tomorrow
                    </Button>
                </div>
            )}

            {error && <p className="text-red-500 font-bold text-center mt-4">{error}</p>}
            {remaining < 1 && <p className="text-red-500 font-bold text-center mt-4">{formatCooldown(cooldownTime)}</p>}
        </div>
    );
}