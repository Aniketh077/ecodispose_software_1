import React from 'react';
import { Gift, Target, Clock, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';

const DailyChallenge = ({ challenge, onComplete }) => {
  const { target, progress, completed, timeLeft } = challenge;
  const percentage = Math.min((progress / target) * 100, 100);

  const formatTimeLeft = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className={`bg-gradient-to-r ${
      completed 
        ? 'from-green-100 to-emerald-100 border-green-300' 
        : 'from-orange-100 to-red-100 border-orange-300'
    } border-2 rounded-xl p-4 shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            completed ? 'bg-green-500' : 'bg-orange-500'
          }`}>
            {completed ? (
              <CheckCircle className="h-5 w-5 text-white" />
            ) : (
              <Gift className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className={`font-bold ${completed ? 'text-green-800' : 'text-orange-800'}`}>
              Daily Challenge
            </h3>
            <p className={`text-sm ${completed ? 'text-green-700' : 'text-orange-700'}`}>
              {completed ? 'Challenge Completed!' : 'View 10 products today'}
            </p>
          </div>
        </div>
        
        {!completed && timeLeft && (
          <div className="text-right">
            <div className="flex items-center text-orange-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{formatTimeLeft(timeLeft)}</span>
            </div>
            <p className="text-xs text-orange-500">Time left</p>
          </div>
        )}
      </div>

      {!completed && (
        <div className="mb-3">
          <ProgressBar
            current={progress}
            max={target}
            color="orange"
            size="md"
            animated={true}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className={`text-sm ${completed ? 'text-green-700' : 'text-orange-700'}`}>
          {completed ? (
            <span className="font-bold">🎉 Reward: 10% discount code sent!</span>
          ) : (
            <span>{progress}/{target} products viewed</span>
          )}
        </div>
        
        {completed && (
          <button
            onClick={onComplete}
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Claim Reward
          </button>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;