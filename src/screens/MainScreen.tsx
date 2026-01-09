import React, { useState } from 'react';
import { View } from 'react-native';
import MyStudiesScreen from './MyStudiesScreen';
import AchievementsScreen from './AchievementsScreen';
import ProfileScreen from './ProfileScreen';
import { BottomTabBar } from '../components/BottomTabBar';
import { styles } from '../styles/styles';

interface MainScreenProps {
    onLogout: () => void;
}

export default function MainScreen({ onLogout }: MainScreenProps) {
    const [activeTab, setActiveTab] = useState<'Estudos' | 'Conquistas' | 'Perfil'>('Estudos');

    const renderContent = () => {
        switch (activeTab) {
            case 'Estudos':
                return <MyStudiesScreen onLogout={onLogout} />;
            case 'Conquistas':
                return <AchievementsScreen />;
            case 'Perfil':
                return <ProfileScreen onLogout={onLogout} />;
            default:
                return <MyStudiesScreen onLogout={onLogout} />;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={{ flex: 1 }}>
                {renderContent()}
            </View>
            <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
    );
}
