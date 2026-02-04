
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Preferences {
  theme: 'dark' | 'light';
  language: 'ar' | 'en';
  notificationsEnabled: boolean;
}

interface PreferencesContextType {
  prefs: Preferences;
  updatePref: (key: keyof Preferences, value: any) => void;
}

const PREFS_KEY = 'user_preferences';

const defaultPrefs: Preferences = {
  theme: 'dark',
  language: 'ar',
  notificationsEnabled: true
};

export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prefs, setPrefs] = useState<Preferences>(() => {
    const saved = localStorage.getItem(PREFS_KEY);
    return saved ? JSON.parse(saved) : defaultPrefs;
  });

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    // Apply theme to document
    if (prefs.theme === 'light') {
        document.documentElement.classList.add('light-mode');
    } else {
        document.documentElement.classList.remove('light-mode');
    }
  }, [prefs]);

  const updatePref = (key: keyof Preferences, value: any) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <PreferencesContext.Provider value={{ prefs, updatePref }}>
      {children}
    </PreferencesContext.Provider>
  );
};
