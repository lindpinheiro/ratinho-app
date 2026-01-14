import React from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useScores } from '../context/ScoreContext';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

import { Score } from '../context/ScoreContext';

interface AdminMyScoresScreenProps {
    onLogout?: () => void;
    onEdit?: (id: string) => void;
    onScoreSelect?: (score: Score) => void;
}

export default function AdminMyScoresScreen({ onLogout, onEdit, onScoreSelect }: AdminMyScoresScreenProps) {

    const { scores, deleteScore } = useScores();

    // Function to handle delete confirmation
    const handleDelete = (id: string) => {
        Alert.alert(
            "Excluir Partitura",
            "Você deseja realmente excluir essa partitura?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => deleteScore(id),
                    style: 'destructive'
                }
            ]
        );
    };

    return (
        <View style={[styles.safeArea, styles.myStudiesContainer]}>
            <StatusBar barStyle="light-content" />

            {/* Header Section */}
            <LinearGradient
                colors={['#002259', '#003380', '#004aad']}
                style={styles.headerGradient}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.headerTitle}>Minhas Partituras</Text>
                        <Text style={styles.headerSubtitle}>Adicione, remova e edite o material de estudo</Text>

                        <View style={styles.searchContainer}>
                            <View style={styles.searchBar}>
                                <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" />
                                <TextInput
                                    placeholder="Buscar partituras..."
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    style={styles.searchInput}
                                />
                            </View>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="filter" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Editados Recentemente */}
                <View style={styles.sectionTitle}>
                    <Ionicons name="time-outline" size={20} color="#002259" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#002259', fontSize: 16, fontWeight: 'bold' }}>Editados Recentemente</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: 'visible' }}>
                        {/* Card 1 */}
                        <TouchableOpacity
                            style={styles.recentCard}
                            onPress={() => {
                                const score = scores.find(s => s.title === 'Em Busca da Minha Sorte');
                                if (score && onScoreSelect) onScoreSelect(score);
                            }}
                        >
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle} numberOfLines={1}>Em Busca da Minha Sorte</Text>
                                <Text style={styles.cardSubtitle}>Hoje</Text>
                            </View>
                            <View style={styles.pillButton}>
                                <Text style={styles.pillText}>Com anotações</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Card 2 */}
                        <TouchableOpacity
                            style={styles.recentCard}
                            onPress={() => {
                                const score = scores.find(s => s.title === 'Asa Branca');
                                if (score && onScoreSelect) onScoreSelect(score);
                            }}
                        >
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle} numberOfLines={1}>Asa Branca</Text>
                                <Text style={styles.cardSubtitle}>Ontem</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Todas as Partituras */}
                <View style={[styles.sectionTitle, { marginTop: 10 }]}>
                    <View style={{ backgroundColor: '#002259', padding: 6, borderRadius: 20, marginRight: 10 }}>
                        <Ionicons name="musical-notes" size={16} color="white" />
                    </View>
                    <Text style={{ color: '#002259', fontSize: 16, fontWeight: 'bold' }}>Todas as Partituras</Text>
                </View>

                {/* List Item 1 */}
                {/* List Item - Dynamic */}
                {scores.map((score) => (
                    <View key={score.id} style={styles.listItemCard}>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={() => onScoreSelect && onScoreSelect(score)}>
                            <View style={styles.listIconBox}>
                                <Ionicons name="musical-note" size={24} color="white" />
                            </View>
                            <View style={styles.listContent}>
                                <Text style={styles.cardTitle}>{score.title}</Text>
                                <Text style={styles.cardSubtitle}>Por {score.author}</Text>
                                <View style={styles.tagsContainer}>
                                    {score.tags.map((tag, index) => (
                                        <View key={index} style={[styles.tag, { backgroundColor: index % 2 === 0 ? '#E3F2FD' : '#E8F5E9' }]}>
                                            <Text style={[styles.tagText, { color: index % 2 === 0 ? '#1976D2' : '#388E3C' }]}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>
                                <Text style={styles.timeText}><Ionicons name="time-outline" size={12} /> {score.duration}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Action Buttons */}
                        <View style={styles.actionButtonsContainer}>
                            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => onEdit && onEdit(score.id)}>
                                <Ionicons name="pencil" size={16} color="#1976D2" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete(score.id)}>
                                <Ionicons name="trash" size={16} color="#D32F2F" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={[styles.bottomLogoutButton, { marginTop: 20 }]} onPress={onLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#002259" />
                    <Text style={styles.bottomLogoutText}>Sair</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
