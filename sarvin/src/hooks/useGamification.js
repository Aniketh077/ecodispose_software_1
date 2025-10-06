import { useState, useEffect, useCallback } from 'react';

const useGamification = () => {
  const [userProgress, setUserProgress] = useState({
    viewedProducts: new Set(),
    cartAdditions: 0,
    timeSpent: 0,
    streak: 0,
    level: 1,
    points: 0,
    achievements: [],
    dailyChallenge: {
      target: 10,
      progress: 0,
      completed: false
    }
  });

  const [achievements, setAchievements] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('ecotradeGameProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setUserProgress(prev => ({
          ...prev,
          ...parsed,
          viewedProducts: new Set(parsed.viewedProducts || [])
        }));
      } catch (error) {
        console.error('Error loading gamification progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((progress) => {
    const toSave = {
      ...progress,
      viewedProducts: Array.from(progress.viewedProducts)
    };
    localStorage.setItem('ecotradeGameProgress', JSON.stringify(toSave));
  }, []);

  // Add points and check for level up
  const addPoints = useCallback((points, reason) => {
    setUserProgress(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      const leveledUp = newLevel > prev.level;
      
      const updated = {
        ...prev,
        points: newPoints,
        level: newLevel
      };

      if (leveledUp) {
        triggerNotification({
          type: 'level',
          title: `Level ${newLevel} Reached!`,
          description: `Congratulations! You've reached level ${newLevel}!`,
          points: 0
        });
      }

      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  // Trigger achievement notification
  const triggerNotification = useCallback((notification) => {
    setNotifications(prev => [...prev, { ...notification, id: Date.now() }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 4000);
  }, []);

  // Track product view
  const trackProductView = useCallback((productId) => {
    setUserProgress(prev => {
      if (!prev.viewedProducts.has(productId)) {
        const newViewed = new Set(prev.viewedProducts);
        newViewed.add(productId);
        
        const updated = {
          ...prev,
          viewedProducts: newViewed
        };

        // Add points for viewing
        addPoints(5, 'Product viewed');
        
        // Check achievements
        if (newViewed.size === 1) {
          triggerNotification({
            type: 'achievement',
            title: 'First Look!',
            description: 'You viewed your first product!',
            points: 10
          });
        } else if (newViewed.size === 5) {
          triggerNotification({
            type: 'achievement',
            title: 'Explorer Badge!',
            description: 'You\'ve viewed 5 products!',
            points: 25
          });
        } else if (newViewed.size === 10) {
          triggerNotification({
            type: 'achievement',
            title: 'Product Hunter!',
            description: 'Daily challenge completed! Special discount unlocked!',
            points: 50
          });
        }

        saveProgress(updated);
        return updated;
      }
      return prev;
    });
  }, [addPoints, triggerNotification, saveProgress]);

  // Track cart addition
  const trackCartAddition = useCallback(() => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        cartAdditions: prev.cartAdditions + 1
      };

      addPoints(10, 'Item added to cart');

      if (updated.cartAdditions === 1) {
        triggerNotification({
          type: 'achievement',
          title: 'First Purchase Intent!',
          description: 'You added your first item to cart!',
          points: 15
        });
      } else if (updated.cartAdditions === 3) {
        triggerNotification({
          type: 'achievement',
          title: 'Cart Master!',
          description: 'You\'ve added 3 items to cart!',
          points: 30
        });
      }

      saveProgress(updated);
      return updated;
    });
  }, [addPoints, triggerNotification, saveProgress]);

  // Track time spent
  const trackTimeSpent = useCallback(() => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        timeSpent: prev.timeSpent + 1
      };

      if (updated.timeSpent === 60) { // 1 minute
        addPoints(20, 'Time spent shopping');
        triggerNotification({
          type: 'achievement',
          title: 'Dedicated Shopper!',
          description: 'You spent a full minute exploring!',
          points: 20
        });
      }

      saveProgress(updated);
      return updated;
    });
  }, [addPoints, triggerNotification, saveProgress]);

  // Reset daily progress
  const resetDailyProgress = useCallback(() => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        dailyChallenge: {
          target: 10,
          progress: 0,
          completed: false
        }
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  return {
    userProgress,
    notifications,
    addPoints,
    trackProductView,
    trackCartAddition,
    trackTimeSpent,
    triggerNotification,
    resetDailyProgress
  };
};

export default useGamification;