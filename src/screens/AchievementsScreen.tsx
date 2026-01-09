import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

export default function AchievementsScreen() {
    const [activeTab, setActiveTab] = useState<'Desafios' | 'Premios'>('Desafios');

    return (
        <View style={[styles.safeArea, styles.myStudiesContainer]}>
            <StatusBar barStyle="light-content" />

            {/* Header Section */}
            <LinearGradient
                colors={['#002259', '#003380', '#004aad']}
                style={styles.achievementsHeader}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        {/* Logo */}
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />

                        {/* Stats Card */}
                        <View style={{ width: '100%', paddingHorizontal: 0 }}>
                            <View style={styles.statsCard}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.pointsBadge}>
                                        <Ionicons name="star" size={24} color="white" />
                                    </View>
                                    <View>
                                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginLeft: 16 }}>Seus Pontos</Text>
                                        <Text style={styles.mainPointsText}>850</Text>
                                    </View>

                                    <TouchableOpacity style={{ marginLeft: 'auto', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="trending-up" size={16} color="white" style={{ marginRight: 4 }} />
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Ranking</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.statsRow}>
                                    <View style={styles.statItem}>
                                        <Ionicons name="trophy-outline" size={20} color="#FFC107" />
                                        <Text style={styles.statValue}>12</Text>
                                        <Text style={styles.statLabel}>Completados</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Ionicons name="flame-outline" size={20} color="#FF5722" />
                                        <Text style={styles.statValue}>5 dias</Text>
                                        <Text style={styles.statLabel}>Sequência</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Ionicons name="flash-outline" size={20} color="#FFC107" />
                                        <Text style={styles.statValue}>8</Text>
                                        <Text style={styles.statLabel}>Nível</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Toggle */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[styles.toggleButton, activeTab === 'Desafios' && styles.toggleButtonActive]}
                                onPress={() => setActiveTab('Desafios')}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="trophy-outline" size={16} color={activeTab === 'Desafios' ? 'white' : 'rgba(255,255,255,0.6)'} style={{ marginRight: 8 }} />
                                    <Text style={[styles.toggleText, activeTab === 'Desafios' ? styles.toggleTextActive : styles.toggleTextInactive]}>Desafios</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleButton, activeTab === 'Premios' && styles.toggleButtonActive]}
                                onPress={() => setActiveTab('Premios')}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="ribbon-outline" size={16} color={activeTab === 'Premios' ? 'white' : 'rgba(255,255,255,0.6)'} style={{ marginRight: 8 }} />
                                    <Text style={[styles.toggleText, activeTab === 'Premios' ? styles.toggleTextActive : styles.toggleTextInactive]}>Prêmios</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                <View style={styles.sectionTitle}>
                    <View style={{ backgroundColor: '#002259', padding: 6, borderRadius: 20, marginRight: 10, marginLeft: 24 }}>
                        <Ionicons name="trophy" size={16} color="white" />
                    </View>
                    <Text style={{ color: '#002259', fontSize: 16, fontWeight: 'bold' }}>Desafios da Semana</Text>
                </View>

                {/* Challenge 1 */}
                <View style={styles.challengeCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#002259' }}>Estudar 30 minutos de Escalas</Text>
                        <View style={{ backgroundColor: '#002259', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="star" size={12} color="white" style={{ marginRight: 4 }} />
                            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>100</Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 8, color: '#666', fontSize: 13 }}>Complete 30 minutos de prática com escalas esta semana</Text>

                    <View style={{ marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 12, color: '#666' }}>Progresso</Text>
                            <Text style={{ fontSize: 12, color: '#666' }}>60%</Text>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: '60%', backgroundColor: '#002259' }]} />
                        </View>
                    </View>

                    <View style={styles.expiringTag}>
                        <Ionicons name="flame" size={14} color="#FF5722" />
                        <Text style={styles.expiringText}>Expira em 2 dias</Text>
                    </View>
                </View>

                {/* Challenge 2 */}
                <View style={styles.challengeCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#002259' }}>Tocar "Asa Branca" 5 vezes</Text>
                        <View style={{ backgroundColor: '#002259', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="star" size={12} color="white" style={{ marginRight: 4 }} />
                            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>150</Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 8, color: '#666', fontSize: 13 }}>Pratique a música Asa Branca até completar 5 execuções</Text>
                    <View style={{ marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 12, color: '#666' }}>Progresso</Text>
                            <Text style={{ fontSize: 12, color: '#666' }}>40%</Text>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: '40%', backgroundColor: '#002259' }]} />
                        </View>
                    </View>
                    <View style={styles.expiringTag}>
                        <Ionicons name="flame" size={14} color="#FF5722" />
                        <Text style={styles.expiringText}>Expira em 4 dias</Text>
                    </View>
                </View>

                {/* Challenge 3 - Completed */}
                <View style={styles.challengeCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#002259' }}>Usar o Afinador 3 vezes</Text>
                        <View style={{ backgroundColor: '#00C853', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="checkmark" size={12} color="white" style={{ marginRight: 4 }} />
                            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Completo</Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 8, color: '#666', fontSize: 13 }}>Afine seu instrumento pelo menos 3 vezes nesta semana</Text>

                    <View style={{ marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 12, color: '#666' }}>Progresso</Text>
                            <Text style={{ fontSize: 12, color: '#666' }}>100%</Text>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: '100%', backgroundColor: '#00C853' }]} />
                        </View>
                    </View>

                    <View style={styles.expiringTag}>
                        <Ionicons name="flame" size={14} color="#FF5722" />
                        <Text style={styles.expiringText}>Completo</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}
