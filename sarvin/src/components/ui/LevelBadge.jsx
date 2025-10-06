import React from 'react';
import { Trophy, Crown, Star, Zap } from 'lucide-react';

const LevelBadge = ({ level, points, size = 'md', showPoints = true, animated = true }) => {
  const getLevelInfo = (level) => {
    if (level >= 10) return { 
      icon: Crown, 
      color: 'from-purple-500 to-pink-500', 
      title: 'VIP Elite',
      textColor: 'text-purple-600'
    };
    if (level >= 7) return { 
      icon: Trophy, 
      color: 'from-yellow-400 to-orange-500', 
      title: 'Gold Member',
      textColor: 'text-yellow-600'
    };
    if (level >= 4) return { 
      icon: Star, 
      color: 'from-blue-500 to-cyan-500', 
      title: 'Silver Member',
      textColor: 'text-blue-600'
    };
    return { 
      icon: Zap, 
      color: 'from-green-500 to-emerald-500', 
      title: 'Bronze Member',
      textColor: 'text-green-600'
    };
  };

  const sizeClasses = {
    sm: { container: 'w-8 h-8', icon: 'h-4 w-4', text: 'text-xs' },
    md: { container: 'w-12 h-12', icon: 'h-6 w-6', text: 'text-sm' },
    lg: { container: 'w-16 h-16', icon: 'h-8 w-8', text: 'text-base' }
  };

  const levelInfo = getLevelInfo(level);
  const LevelIcon = levelInfo.icon;
  const sizeClass = sizeClasses[size];

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClass.container} bg-gradient-to-br ${levelInfo.color} rounded-full flex items-center justify-center shadow-lg ${
        animated ? 'animate-pulse' : ''
      }`}>
        <LevelIcon className={`${sizeClass.icon} text-white`} />
      </div>
      <div>
        <div className={`font-bold ${levelInfo.textColor} ${sizeClass.text}`}>
          Level {level}
        </div>
        <div className={`text-gray-500 ${sizeClass.text}`}>
          {levelInfo.title}
        </div>
        {showPoints && (
          <div className={`text-gray-400 ${sizeClass.text}`}>
            {points} points
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelBadge;