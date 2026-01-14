import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Annotation {
    id: string;
    type: 'path' | 'circle' | 'text' | 'highlight';
    points?: string[]; // For paths: ["x,y", "x,y"]
    color: string;
    strokeWidth: number;
    text?: string;
    x?: number; // For text/circle
    y?: number; // For text/circle
    radius?: number; // For circle
}

export interface Score {
    id: string;
    title: string;
    author: string;
    instrument: string;
    level: 'Básico' | 'Intermediário' | 'Avançado';
    duration: string;
    tags: string[]; // e.g., ['Violão', 'Intermediário', 'Anotações']
    hasAnnotations: boolean;
    lastEdited?: string; // e.g., "Hoje", "Ontem"
    imageSource?: any; // For require() or { uri: ... }
    annotations?: Annotation[];
}

interface ScoreContextType {
    scores: Score[];
    addScore: (score: Omit<Score, 'id'>) => void;
    updateScore: (id: string, updatedScore: Partial<Score>) => void;
    deleteScore: (id: string) => void;
    saveAnnotations: (id: string, annotations: Annotation[]) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Initial dummy data to match existing hardcoded values
const INITIAL_SCORES: Score[] = [
    {
        id: '1',
        title: 'Em Busca da Minha Sorte',
        author: 'Tradicional',
        instrument: 'Flauta',
        level: 'Intermediário',
        duration: '45min',
        tags: ['Flauta', 'Intermediário', 'Anotações'],
        hasAnnotations: true,
        lastEdited: 'Hoje',
        imageSource: require('../../assets/scores/em_busca.jpg'),
        annotations: []
    },
    {
        id: '2',
        title: 'Asa Branca',
        author: 'Luiz Gonzaga',
        instrument: 'Trompete',
        level: 'Básico',
        duration: '30min',
        tags: ['Trompete', 'Básico'],
        hasAnnotations: false,
        lastEdited: 'Ontem'
    },
    {
        id: '3',
        title: 'Escala Maior Dó',
        author: 'Método',
        instrument: 'Piano',
        level: 'Básico',
        duration: '20min',
        tags: ['Piano', 'Básico', 'Anotações'],
        hasAnnotations: true
    }
];

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
    const [scores, setScores] = useState<Score[]>(INITIAL_SCORES);

    const addScore = (newScoreData: Omit<Score, 'id'>) => {
        const newScore: Score = {
            ...newScoreData,
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        };
        setScores(prev => [newScore, ...prev]);
    };

    const updateScore = (id: string, updatedScore: Partial<Score>) => {
        setScores(prev => prev.map(score =>
            score.id === id ? { ...score, ...updatedScore } : score
        ));
    };

    const deleteScore = (id: string) => {
        setScores(prev => prev.filter(score => score.id !== id));
    };

    const saveAnnotations = (id: string, annotations: Annotation[]) => {
        setScores(prev => prev.map(score =>
            score.id === id ? { ...score, annotations } : score
        ));
    };

    return (
        <ScoreContext.Provider value={{ scores, addScore, updateScore, deleteScore, saveAnnotations }}>
            {children}
        </ScoreContext.Provider>
    );
};

export const useScores = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error('useScores must be used within a ScoreProvider');
    }
    return context;
};
