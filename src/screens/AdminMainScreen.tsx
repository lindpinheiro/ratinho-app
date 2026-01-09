import React, { useState } from 'react';
import { View } from 'react-native';
import AdminMyScoresScreen from './AdminMyScoresScreen';
import RankingScreen from './RankingScreen';
import AdminProfileScreen from './AdminProfileScreen';
import EditScoreScreen from './EditScoreScreen';
import AdminBottomTabBar from '../components/AdminBottomTabBar';

interface AdminMainScreenProps {
    onLogout: () => void;
}

export default function AdminMainScreen({ onLogout }: AdminMainScreenProps) {
    const [activeTab, setActiveTab] = useState('Partituras');
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = () => {
        // Logic to save would go here
        setIsEditing(false);
    };

    const renderContent = () => {
        if (isEditing) {
            return <EditScoreScreen onCancel={handleCancelEdit} onSave={handleSaveEdit} />;
        }

        switch (activeTab) {
            case 'Partituras':
                return <AdminMyScoresScreen onLogout={onLogout} onEdit={handleEdit} />;
            case 'Conquistas':
                return <RankingScreen />;
            case 'Perfil':
                return <AdminProfileScreen />;
            default:
                return <AdminMyScoresScreen />;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={{ flex: 1 }}>
                {renderContent()}
            </View>
            <AdminBottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
    );
}
