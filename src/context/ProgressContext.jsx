import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import modules from '../data/modules.json';

const ProgressContext = createContext(null);

function getModuleTitle(moduleId) {
  const mod = modules.find(m => m.id === moduleId);
  return mod ? mod.title : `Module ${moduleId}`;
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);

  // Load progress from Supabase when user logs in
  useEffect(() => {
    if (!user || user.role === 'admin') {
      setProgress({});
      return;
    }

    async function loadProgress() {
      setLoading(true);
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('employee_name', user.name);

      if (error) {
        console.error('Error loading progress:', error);
        setProgress({});
      } else {
        const mapped = {};
        for (const row of data) {
          mapped[row.module_id] = {
            lessonComplete: row.lesson_completed,
            quizScore: row.quiz_score,
            quizPassed: row.quiz_passed,
            completed: !!row.completed_at,
            completedDate: row.completed_at
          };
        }
        setProgress(mapped);
      }
      setLoading(false);
    }

    loadProgress();
  }, [user]);

  const syncToSupabase = useCallback(async (moduleId, moduleProgress) => {
    if (!user?.name || user.role === 'admin') return;

    const { error } = await supabase
      .from('progress')
      .upsert(
        {
          employee_name: user.name,
          module_id: moduleId,
          module_title: getModuleTitle(moduleId),
          lesson_completed: moduleProgress.lessonComplete || false,
          quiz_score: moduleProgress.quizScore,
          quiz_passed: moduleProgress.quizPassed || false,
          completed_at: moduleProgress.completedDate || null,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'employee_name,module_id' }
      );

    if (error) {
      console.error('Error syncing progress:', error);
    }
  }, [user]);

  const getModuleProgress = (moduleId) => {
    return progress[moduleId] || { lessonComplete: false, quizScore: null, quizPassed: false, completed: false };
  };

  const markLessonComplete = (moduleId) => {
    setProgress(prev => {
      const updated = { ...getModuleProgress(moduleId), ...prev[moduleId], lessonComplete: true };
      syncToSupabase(moduleId, updated);
      return { ...prev, [moduleId]: updated };
    });
  };

  const saveQuizScore = (moduleId, score, total, passed) => {
    setProgress(prev => {
      const updated = { ...getModuleProgress(moduleId), ...prev[moduleId], quizScore: score, quizTotal: total, quizPassed: passed };
      syncToSupabase(moduleId, updated);
      return { ...prev, [moduleId]: updated };
    });
  };

  const markModuleComplete = (moduleId) => {
    setProgress(prev => {
      const updated = { ...getModuleProgress(moduleId), ...prev[moduleId], completed: true, completedDate: new Date().toISOString() };
      syncToSupabase(moduleId, updated);
      return { ...prev, [moduleId]: updated };
    });
  };

  const getOverallProgress = (totalModules) => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    return { completed, total: totalModules, percentage: Math.round((completed / totalModules) * 100) };
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, getModuleProgress, markLessonComplete, saveQuizScore, markModuleComplete, getOverallProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
