import React, { useState } from 'react';
import { View } from 'react-native';
import AdminMyScoresScreen from './AdminMyScoresScreen';
import RankingScreen from './RankingScreen';
import AdminProfileScreen from './AdminProfileScreen';
import EditScoreScreen from './EditScoreScreen';
import AdminAddScoreScreen from './AdminAddScoreScreen';
import AdminBottomTabBar from '../components/AdminBottomTabBar';
import ScoreViewScreen from './ScoreViewScreen';

interface AdminMainScreenProps {
    onLogout: () => void;
}

export default function AdminMainScreen({ onLogout }: AdminMainScreenProps) {
    const [activeTab, setActiveTab] = useState<'Partituras' | 'Conquistas' | 'Perfil' | 'Adicionar'>('Partituras');
    const [isEditing, setIsEditing] = useState(false);
    const [editingScoreId, setEditingScoreId] = useState<string | null>(null);
    const [viewingScore, setViewingScore] = useState<any | null>(null);

    const handleEdit = (id: string) => {
        setEditingScoreId(id);
        setIsEditing(true);
    };

    const handleScoreSelect = (score: any) => {
        setViewingScore(score);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingScoreId(null);
    };

    const handleSaveEdit = () => {
        setIsEditing(false);
        setEditingScoreId(null);
    };

    const renderContent = () => {
        if (viewingScore) {
            return <ScoreViewScreen score={viewingScore} onBack={() => setViewingScore(null)} />;
        }

        if (isEditing && editingScoreId) {
            return <EditScoreScreen
                scoreId={editingScoreId}
                onCancel={handleCancelEdit}
                onSave={handleSaveEdit}
            />;
        }

        switch (activeTab) {
            case 'Partituras':
                return <AdminMyScoresScreen onLogout={onLogout} onEdit={handleEdit} onScoreSelect={handleScoreSelect} />;
            case 'Conquistas':
                return <RankingScreen />;
            case 'Perfil':
                return <AdminProfileScreen />;
            case 'Adicionar':
                return <AdminAddScoreScreen
                    onCancel={() => setActiveTab('Partituras')}
                    onSaveSuccess={() => setActiveTab('Partituras')}
                />;
            default:
                return <AdminMyScoresScreen />;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={{ flex: 1 }}>
                {renderContent()}
            </View>
            {!viewingScore && <AdminBottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />}
        </View>
    );
}
