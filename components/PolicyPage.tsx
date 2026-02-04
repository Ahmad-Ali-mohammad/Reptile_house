
import React from 'react';

interface PolicyPageProps {
    title: string;
    children: React.ReactNode;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, children }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
            <div className="bg-white/5 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl p-8 space-y-6 text-gray-300 leading-loose prose prose-invert prose-p:text-gray-300 prose-headings:text-amber-400">
                {children}
            </div>
        </div>
    );
};

export default PolicyPage;
