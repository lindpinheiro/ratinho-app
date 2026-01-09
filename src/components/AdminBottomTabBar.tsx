import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface AdminBottomTabBarProps {
    activeTab: 'Partituras' | 'Conquistas' | 'Perfil' | 'Adicionar';
    onTabPress: (tab: 'Partituras' | 'Conquistas' | 'Perfil' | 'Adicionar') => void;
}

export default function AdminBottomTabBar({ activeTab, onTabPress }: AdminBottomTabBarProps) {
    return (
        <View style={styles.tabBarContainer}>
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => onTabPress('Partituras')}
            >
                <Ionicons
                    name={activeTab === 'Partituras' ? "musical-notes" : "musical-notes-outline"}
                    size={24}
                    color={activeTab === 'Partituras' ? "#002259" : "#999"}
                />
                <Text style={[styles.tabText, { color: activeTab === 'Partituras' ? "#002259" : "#999" }]}>Partituras</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => onTabPress('Conquistas')}
            >
                <Ionicons
                    name={activeTab === 'Conquistas' ? "trophy" : "trophy-outline"}
                    size={24}
                    color={activeTab === 'Conquistas' ? "#002259" : "#999"}
                />
                <Text style={[styles.tabText, { color: activeTab === 'Conquistas' ? "#002259" : "#999" }]}>Conquistas</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => onTabPress('Perfil')}
            >
                <Ionicons
                    name={activeTab === 'Perfil' ? "person" : "person-outline"}
                    size={24}
                    color={activeTab === 'Perfil' ? "#002259" : "#999"}
                />
                <Text style={[styles.tabText, { color: activeTab === 'Perfil' ? "#002259" : "#999" }]}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => onTabPress('Adicionar')}
            >
                <Ionicons
                    name={activeTab === 'Adicionar' ? "add-circle" : "add-circle-outline"}
                    size={24}
                    color={activeTab === 'Adicionar' ? "#002259" : "#999"}
                />
                <Text style={[styles.tabText, { color: activeTab === 'Adicionar' ? "#002259" : "#999" }]}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}
