import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface BottomTabBarProps {
    activeTab: 'Estudos' | 'Conquistas' | 'Perfil';
    onTabPress: (tab: 'Estudos' | 'Conquistas' | 'Perfil') => void;
}

export function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
    return (
        <View style={styles.tabBarContainer}>
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => onTabPress('Estudos')}
            >
                <Ionicons
                    name={activeTab === 'Estudos' ? "book" : "book-outline"}
                    size={24}
                    color={activeTab === 'Estudos' ? "#002259" : "#999"}
                />
                <Text style={[styles.tabText, { color: activeTab === 'Estudos' ? "#002259" : "#999" }]}>Estudos</Text>
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
        </View>
    );
}
