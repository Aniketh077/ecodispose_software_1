import React, { useEffect, useState } from 'react';
import { Trophy, Star, Target, Gift, X, Sparkles } from 'lucide-react';

const AchievementToast = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'level': return Trophy;
      case 'points': return Star;
      case 'challenge': return Target;
      case 'bonus': return Gift;
      default: return Sparkles;
    }
  };

  const AchievementIcon = getAchievementIcon(achievement.type);

  return (
    <div className={`fixed top-24 right-4 z-50 transform transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white rounded-xl shadow-2xl border-4 border-white p-6 max-w-sm relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 animate-bounce">
              <AchievementIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{achievement.title}</h3>
              <p className="text-white/90 text-sm">{achievement.description}</p>
            </div>
          </div>
          
          {achievement.points > 0 && (
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="font-bold text-xl">+{achievement.points} Points!</p>
              <p className="text-white/80 text-xs">Keep exploring for more rewards</p>
            </div>
          )}
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default AchievementToast;