import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install or use available icons
import { LogoIllustration } from '../components/LogoIllustration';
import { useScores } from '../context/ScoreContext';

import { Score } from '../context/ScoreContext';

interface MyStudiesScreenProps {
    onLogout: () => void;
    onScoreSelect?: (score: Score) => void;
}

export default function MyStudiesScreen({ onLogout, onScoreSelect }: MyStudiesScreenProps) {
    const { scores } = useScores();

    return (
        <View style={[styles.safeArea, styles.myStudiesContainer]}>
            <StatusBar barStyle="light-content" />

            {/* Header Section with Gradient */}
            <LinearGradient
                colors={['#002259', '#003380', '#004aad']}
                style={styles.headerGradient}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        {/* Logo */}
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />

                        <Text style={styles.headerTitle}>Meus Estudos</Text>
                        <Text style={styles.headerSubtitle}>Pratique com anotações personalizadas</Text>

                        <View style={styles.searchContainer}>
                            <View style={styles.searchBar}>
                                <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Buscar partituras..."
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                />
                            </View>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="filter" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* Section: Estudados Recentemente */}
                <View style={{ backgroundColor: '#004aad' }}>
                    <View style={[styles.sectionTitle, { paddingHorizontal: 24 }]}>
                        <Ionicons name="time-outline" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Estudados Recentemente</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentContainer}>
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
                                <Text style={styles.cardTitle}>Em Busca da Minha Sorte</Text>
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
                                <Text style={styles.cardTitle}>Asa Branca</Text>
                                <Text style={styles.cardSubtitle}>Ontem</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Card 3 */}
                        <TouchableOpacity
                            style={styles.recentCard}
                            onPress={() => {
                                const score = scores.find(s => s.title === 'Parabéns pra Você');
                                if (score && onScoreSelect) onScoreSelect(score);
                            }}
                        >
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle}>Parabéns pra Você</Text>
                                <Text style={styles.cardSubtitle}>Há 2 dias</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    {/* Curved separation (Visual trick using background color of next section if needed, or just let it flow) */}
                </View>

                {/* Section: Todas as Partituras */}
                <View style={styles.listSection}>
                    <View style={styles.sectionHeaderDark}>
                        <Ionicons name="library-outline" size={24} color="#002259" style={{ marginRight: 8 }} />
                        <Text style={{ color: '#002259', fontSize: 18, fontWeight: 'bold' }}>Todas as Partituras</Text>
                    </View>

                    {/* List Item - Dynamic */}
                    {scores.map((score) => (
                        <TouchableOpacity key={score.id} style={styles.listItemCard} onPress={() => onScoreSelect && onScoreSelect(score)}>
                            <View style={styles.listIconBox}>
                                <Ionicons name="musical-notes" size={24} color="white" />
                            </View>
                            <View style={styles.listContent}>
                                <Text style={styles.cardTitle}>{score.title}</Text>
                                <Text style={styles.cardSubtitle}>Por {score.author}</Text>
                                <View style={styles.tagsContainer}>
                                    {score.tags.map((tag, index) => (
                                        <View key={index} style={[styles.tag, { backgroundColor: index % 2 === 0 ? '#E3F2FD' : '#E8F5E9' }]}>
                                            <Text style={[styles.tagText, { color: index % 2 === 0 ? '#1565C0' : '#2E7D32' }]}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>
                                <Text style={styles.timeText}><Ionicons name="time-outline" size={12} /> {score.duration}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* Exit Button at Bottom */}
                    <TouchableOpacity style={styles.bottomLogoutButton} onPress={onLogout}>
                        <Ionicons name="log-out-outline" size={24} color="#002259" />
                        <Text style={styles.bottomLogoutText}>Sair</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}
