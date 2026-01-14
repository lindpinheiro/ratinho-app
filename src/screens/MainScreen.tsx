import React, { useState } from 'react';
import { View } from 'react-native';
import MyStudiesScreen from './MyStudiesScreen';
import AchievementsScreen from './AchievementsScreen';
import ProfileScreen from './ProfileScreen';
import ScoreViewScreen from './ScoreViewScreen';
import { BottomTabBar } from '../components/BottomTabBar';
import { styles } from '../styles/styles';

interface MainScreenProps {
    onLogout: () => void;
}

export default function MainScreen({ onLogout }: MainScreenProps) {
    const [activeTab, setActiveTab] = useState<'Estudos' | 'Conquistas' | 'Perfil'>('Estudos');
    const [viewingScore, setViewingScore] = useState<any | null>(null);

    const handleScoreSelect = (score: any) => {
        setViewingScore(score);
    };

    const renderContent = () => {
        if (viewingScore) {
            return <ScoreViewScreen score={viewingScore} onBack={() => setViewingScore(null)} />;
        }

        switch (activeTab) {
            case 'Estudos':
                return <MyStudiesScreen onLogout={onLogout} onScoreSelect={handleScoreSelect} />;
            case 'Conquistas':
                return <AchievementsScreen />;
            case 'Perfil':
                return <ProfileScreen onLogout={onLogout} />;
            default:
                return <MyStudiesScreen onLogout={onLogout} onScoreSelect={handleScoreSelect} />;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={{ flex: 1 }}>
                {renderContent()}
            </View>
            {!viewingScore && <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />}
        </View>
    );
}
