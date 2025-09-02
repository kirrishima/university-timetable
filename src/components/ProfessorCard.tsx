import React, { useState } from 'react';
import type { Professor } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ProfessorCardProps {
    professor: Professor;
    universityName: string;
}

const ImageWithFallback: React.FC<{ src?: string, alt: string }> = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

    const onError = () => {
        setImgSrc(placeholder);
    };

    return <img src={imgSrc || placeholder} alt={alt} onError={onError} className="w-24 h-24 rounded-full mx-auto object-cover object-center shadow-md" />;
};

const GoogleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
);


const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor, universityName }) => {
    const { theme } = useTheme();

    const handleSearch = () => {
        const query = `${professor.fullName} ${universityName}`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={`p-6 rounded-2xl shadow-md text-center flex flex-col justify-between h-full ${theme.colors.cardBg}`}>
            <div>
                <ImageWithFallback src={professor.imageUrl} alt={professor.fullName} />
                <h3 className={`mt-4 text-lg font-bold ${theme.colors.cardHeader}`}>{professor.fullName}</h3>
                <p className={`mt-1 text-sm ${theme.colors.secondaryText}`}>{professor.department}</p>
            </div>
            <button
                onClick={handleSearch}
                className={`
                    mt-4 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                    text-sm font-medium transition duration-150 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${theme.colors.ring} ${theme.colors.primaryMutedBg} ${theme.colors.primaryMuted} hover:opacity-90
                `}
            >
                <GoogleIcon />
                Искать в Google
            </button>
        </div>
    );
};

export default ProfessorCard;
