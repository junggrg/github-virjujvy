import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ThankYouScreenProps {
  onReturnHome: () => void;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-white mx-auto" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          Thank You!
        </h1>

        {/* Subtext */}
        <p className="text-xl text-white mb-8 leading-relaxed">
          We've received your consultation request and will contact you shortly.
        </p>

        {/* Return Home Button */}
        <button
          onClick={onReturnHome}
          className="px-8 py-4 border-2 border-white text-white bg-transparent font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};