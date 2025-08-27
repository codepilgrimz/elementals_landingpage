import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Initial', value: 25, color: '#000000' },
    { name: 'Staking & Rewards', value: 30, color: '#4d4d4d' },
    { name: 'Treasury', value: 15, color: '#808080' },
    { name: 'Partnerships, Listing', value: 10, color: '#A0A0A0' },
    { name: 'Marketing', value: 10, color: '#C0C0C0' },
    { name: 'Team', value: 10, color: '#DADADA' },
];

export default function TokenomicsSection() {
    return (
        <section className="py-20 text-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                     <h2 className="font-bangers text-4xl md:text-6xl tracking-wider">The Sacred Numbers</h2>
                     <p className="font-inter uppercase font-bold mt-2 text-sm md:text-base">Perfectly balanced, as all things should be.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="bg-white border-4 border-black rounded-2xl p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 border-b-2 border-black/20 pb-2 mb-4">
                           <p className="font-inter uppercase font-black text-base md:text-xl">Total Supply</p>
                           <p className="font-bangers text-2xl md:text-4xl">1,000,000,000</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 border-b-2 border-black/20 pb-2 mb-4">
                           <p className="font-inter uppercase font-black text-base md:text-xl">Initial</p>
                           <p className="font-bangers text-2xl md:text-4xl">25%</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                           <p className="font-inter uppercase font-black text-base md:text-xl">Staking & Rewards</p>
                           <p className="font-bangers text-lg md:text-2xl">30% (Meteora LP, NFT Staking)</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                           <p className="font-inter uppercase font-black text-base md:text-xl">Treasury</p>
                           <p className="font-bangers text-lg md:text-2xl">15% (vested for 24 months)</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                           <p className="font-inter uppercase font-black text-base md:text-xl">Partnerships, Listing</p>
                           <p className="font-bangers text-lg md:text-2xl">10% (vested for 12 months)</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                           <p className="font-inter uppercase font-black text-base md:text-xl">Marketing</p>
                           <p className="font-bangers text-lg md:text-2xl">10% (vested for 12 months)</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                           <p className="font-inter uppercase font-black text-base md:text-xl">Team</p>
                           <p className="font-bangers text-lg md:text-2xl">10% (vested for 24 months)</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full h-64 md:h-[420px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ fontFamily: 'Inter', fontWeight: 'bold', textTransform: 'uppercase', border: '2px solid black', borderRadius: '8px' }}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}