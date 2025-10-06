import React, { useState } from 'react';
import { Trophy, Star, Target, Gift, Zap, ChevronDown, ChevronUp, Timer, Eye, ShoppingCart } from 'lucide-react';

const GamificationPanel = ({ userProgress, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getProgressPercentage = () => {
    const pointsInCurrentLevel = userProgress.points % 100;
    return (pointsInCurrentLevel / 100) * 100;
  };

  const getNextLevelPoints = () => {
    return 100 - (userProgress.points % 100);
  };

  const achievements = [
    {
      id: 'first_view',
      title: 'First Look',
      description: 'View your first product',
      icon: Eye,
      unlocked: userProgress.viewedProducts.size >= 1,
      progress: Math.min(userProgress.viewedProducts.size, 1),
      target: 1
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'View 5 different products',
      icon: Target,
      unlocked: userProgress.viewedProducts.size >= 5,
      progress: Math.min(userProgress.viewedProducts.size, 5),
      target: 5
    },
    {
      id: 'time_spender',
      title: 'Dedicated Shopper',
      description: 'Spend 1 minute browsing',
      icon: Timer,
      unlocked: userProgress.timeSpent >= 60,
      progress: Math.min(userProgress.timeSpent, 60),
      target: 60
    },
    {
      id: 'cart_master',
      title: 'Cart Master',
      description: 'Add 3 items to cart',
      icon: ShoppingCart,
      unlocked: userProgress.cartAdditions >= 3,
      progress: Math.min(userProgress.cartAdditions, 3),
      target: 3
    }
  ];

  return (
    <div className={`fixed top-24 left-4 z-40 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 ${
      isExpanded ? 'w-80' : 'w-16'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl hover:from-purple-600 hover:to-pink-600 transition-all"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="h-5 w-5 mr-2" />
            <span className="font-medium">Hide Progress</span>
          </>
        ) : (
          <Zap className="h-5 w-5" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Level and Points */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Level {userProgress.level}</h3>
            <p className="text-sm text-gray-600">{userProgress.points} points</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress to Level {userProgress.level + 1}</span>
              <span>{getNextLevelPoints()} points to go</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Eye className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-600">{userProgress.viewedProducts.size}</div>
              <div className="text-xs text-blue-600">Viewed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <Timer className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-green-600">{Math.floor(userProgress.timeSpent / 60)}m</div>
              <div className="text-xs text-green-600">Time</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              Achievements
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`flex items-center p-2 rounded-lg transition-all ${
                    achievement.unlocked 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    achievement.unlocked 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-500'
                  }`}>
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900">{achievement.title}</div>
                    <div className="text-xs text-gray-600">{achievement.description}</div>
                    {!achievement.unlocked && (
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Gift className="h-4 w-4 text-orange-600 mr-2" />
              <span className="text-sm font-semibold text-orange-900">Daily Challenge</span>
            </div>
            <p className="text-xs text-orange-800 mb-2">View 10 products to unlock a special discount!</p>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((userProgress.viewedProducts.size / 10) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-orange-700 mt-1">
              {userProgress.viewedProducts.size}/10 products viewed
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationPanel;