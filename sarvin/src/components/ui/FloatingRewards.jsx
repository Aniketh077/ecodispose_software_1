import React, { useState, useEffect } from 'react';
import { Gift, Star, Trophy, Zap, Target, Timer } from 'lucide-react';

const FloatingRewards = ({ isVisible, onClose, reward }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getRewardIcon = (type) => {
    switch (type) {
      case 'points': return Star;
      case 'level': return Trophy;
      case 'achievement': return Target;
      case 'bonus': return Gift;
      default: return Zap;
    }
  };

  const RewardIcon = getRewardIcon(reward?.type);

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
      isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
    }`}>
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-2xl border-4 border-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <RewardIcon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{reward?.title || 'Reward Unlocked!'}</h3>
          <p className="text-white/90 mb-4">{reward?.description || 'You earned a reward!'}</p>
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold text-lg">+{reward?.points || 0} Points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingRewards;