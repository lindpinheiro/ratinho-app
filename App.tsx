import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminMainScreen from './src/screens/AdminMainScreen';
import { ScoreProvider } from './src/context/ScoreContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Login' | 'Main' | 'AdminLogin' | 'AdminMain'>('Login');

  const handleLogin = () => {
    setCurrentScreen('Main');
  };

  const handleAdminAccess = () => {
    setCurrentScreen('AdminLogin');
  };

  const handleAdminLogin = () => {
    setCurrentScreen('AdminMain');
  }

  const handleAdminLogout = () => {
    setCurrentScreen('AdminLogin');
  }

  const handleLogout = () => {
    setCurrentScreen('Login');
  };

  const renderScreen = () => {
    if (currentScreen === 'Main') {
      return <MainScreen onLogout={handleLogout} />;
    }

    if (currentScreen === 'AdminLogin') {
      return <AdminLoginScreen onLogin={handleAdminLogin} onBack={handleLogout} />;
    }

    if (currentScreen === 'AdminMain') {
      return <AdminMainScreen onLogout={handleAdminLogout} />;
    }

    return <LoginScreen onLogin={handleLogin} onAdminAccess={handleAdminAccess} />;
  };

  return (
    <ScoreProvider>
      {renderScreen()}
    </ScoreProvider>
  );
}