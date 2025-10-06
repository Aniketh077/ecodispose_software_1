import React from 'react';

const ProgressBar = ({ 
  current, 
  max, 
  label, 
  color = 'green', 
  showPercentage = true, 
  animated = true,
  size = 'md' 
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-pink-600',
    orange: 'from-orange-500 to-red-600',
    yellow: 'from-yellow-400 to-orange-500'
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div 
          className={`${sizeClasses[size]} bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{current}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default ProgressBar;