import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TimerScreen({ route, navigation }) {
  const { minutes, theme } = route.params;

  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Si se acabó el tiempo, ir a la pantalla final
    if (secondsLeft <= 0) {
      navigation.replace('End');
      return;
    }

    // Si está en pausa, no arrancamos intervalo
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isPaused, navigation]);

  const itemsCount = 6;
  const step = Math.floor(totalSeconds / itemsCount);
  const itemsLeft = Math.floor(secondsLeft / step);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <View style={styles.container}>
      
      {/* Botón de regreso */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.backText}>⬅️</Text>
      </TouchableOpacity>

      {/* Tiempo */}
      <Text style={styles.timerText}>
        {Math.floor(secondsLeft / 60)}:
        {(secondsLeft % 60).toString().padStart(2, '0')}
      </Text>

      {/* Fila de ítems + personaje */}
      <View style={styles.row}>
        {[...Array(itemsCount)].map((_, i) => (
          <Text key={i} style={styles.itemEmoji}>
            {i < itemsLeft ? theme.itemEmoji : '❌'}
          </Text>
        ))}

        <Text style={styles.characterEmoji}>{theme.characterEmoji}</Text>
      </View>

      {/* Botón Pausar/Reanudar */}
      <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
        <Text style={styles.pauseText}>
          {isPaused ? 'Resume' : 'Pause'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 50
  },
  backText: {
    fontSize: 20,
    color: '#fff'
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemEmoji: {
    fontSize: 40,
    marginHorizontal: 4
  },
  characterEmoji: {
    fontSize: 50,
    marginLeft: 10
  },
  pauseButton: {
    marginTop: 40,
    backgroundColor: '#FFB000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30
  },
  pauseText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  }
});
