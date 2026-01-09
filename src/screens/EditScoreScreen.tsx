import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface EditScoreScreenProps {
    onCancel: () => void;
    onSave: () => void;
}

export default function EditScoreScreen({ onCancel, onSave }: EditScoreScreenProps) {
    const [difficulty, setDifficulty] = useState('Intermediário');
    const [title, setTitle] = useState('Em Busca da Minha Sorte');
    const [author, setAuthor] = useState('Tradicional');
    const [instrument, setInstrument] = useState('');

    return (
        <View style={styles.editScoreContainer}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.editHeader}>
                <TouchableOpacity style={styles.backButton} onPress={onCancel}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.editHeaderTitle}>Editar Partitura</Text>
                    <Text style={styles.editHeaderSubtitle}>Atualize as informações da partitura</Text>
                </View>
            </View>

            {/* Icon Header */}
            <View style={{ backgroundColor: '#002259', alignItems: 'center', paddingBottom: 40 }}>
                <View style={{
                    width: 60, height: 60, backgroundColor: '#FFC107',
                    borderRadius: 16, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Ionicons name="musical-note" size={32} color="#002259" />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={[styles.editFormCard, { marginTop: -20 }]}>

                    <Text style={[styles.formLabel, { marginTop: 0 }]}>Título da Partitura<Text style={styles.requiredMark}>*</Text></Text>
                    <TextInput
                        style={styles.formInput}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.formLabel}>Instrumento<Text style={styles.requiredMark}>*</Text></Text>
                    <TextInput
                        style={styles.formInput}
                        value={instrument}
                        onChangeText={setInstrument}
                    />

                    <Text style={styles.formLabel}>Nível de Dificuldade<Text style={styles.requiredMark}>*</Text></Text>
                    <View style={styles.difficultyContainer}>
                        {['Básico', 'Intermediário', 'Avançado'].map((level) => (
                            <TouchableOpacity
                                key={level}
                                style={[styles.difficultyButton, difficulty === level && styles.difficultyButtonActive]}
                                onPress={() => setDifficulty(level)}
                            >
                                <Text style={[styles.difficultyText, difficulty === level && styles.difficultyTextActive]}>{level}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.formLabel}>Autor/Compositor<Text style={styles.requiredMark}>*</Text></Text>
                    <TextInput
                        style={styles.formInput}
                        value={author}
                        onChangeText={setAuthor}
                    />

                    <Text style={styles.formLabel}>Arquivo da Partitura</Text>
                    <Text style={{ fontSize: 10, color: '#999', marginBottom: 8 }}>(opcional - deixe em branco para manter o arquivo atual)</Text>

                    <TouchableOpacity style={styles.uploadContainer}>
                        <View style={{ backgroundColor: '#E0E0E0', padding: 8, borderRadius: 20, marginBottom: 4 }}>
                            <Ionicons name="cloud-upload-outline" size={20} color="#666" />
                        </View>
                        <Text style={styles.uploadText}>Clique para fazer upload</Text>
                        <Text style={styles.uploadSubtext}>PDF ou imagem (PNG, JPG)</Text>
                    </TouchableOpacity>

                    <View style={styles.formActions}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.updateButton} onPress={onSave}>
                            <Ionicons name="save-outline" size={20} color="white" />
                            <Text style={styles.updateButtonText}>Atualizar Partitura</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
