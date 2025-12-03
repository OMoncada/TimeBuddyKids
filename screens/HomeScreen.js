import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { THEMES } from '../src/themes';

const DURATIONS = [
  { min: 1, shape: "circle", color: "#E74C3C" },
  { min: 5, shape: "circle", color: "#5DADE2" },
  { min: 10, shape: "badge", color: "#82E0AA" },
  { min: 15, shape: "badge", color: "#27AE60" },
  { min: 20, shape: "badge", color: "#5DADE2" },
  { min: 30, shape: "badge", color: "#154360" },
  { min: 60, shape: "badge", color: "#884EA0" },
];

export default function HomeScreen({ navigation }) {
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [selectedThemeId, setSelectedThemeId] = useState(THEMES[0].id);

  const startTimer = () => {
    const theme = THEMES.find(t => t.id === selectedThemeId);
    navigation.navigate('Timer', { minutes: selectedMinutes, theme });
  };

  const renderShape = (shape) => {
    switch (shape) {
      case "triangle":
        return (
          <View style={styles.triangle} />
        );
      case "pentagon":
        return <View style={styles.pentagon} />;
      case "badge":
        return <View style={styles.badge} />;
      default:
        return <View style={styles.innerCircle} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TimeBuddy Kids</Text>
      <Text style={styles.subtitle}>Choose time and theme</Text>

      <Text style={styles.sectionTitle}>Minutes</Text>

      {/* ----- MINUTES HORIZONTAL (Orden limpio como 1° imagen) ----- */}
      <FlatList
        data={DURATIONS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        keyExtractor={(item) => item.min.toString()}
        renderItem={({ item }) => {
          const selected = selectedMinutes === item.min;

          return (
            <TouchableOpacity
              onPress={() => setSelectedMinutes(item.min)}
              style={[
                styles.circleButton,
                { backgroundColor: item.color },
                selected && styles.circleSelected
              ]}
            >
              {/* Shape inside */}
              <View style={styles.shapeContainer}>
                {renderShape(item.shape)}
              </View>

              {/* Number */}
              <Text style={styles.timeNumber}>{item.min}</Text>

              {/* Check */}
              {selected && <Text style={styles.checkMark}>✔</Text>}
            </TouchableOpacity>
          );
        }}
      />

      {/* ----- THEMES (igual que antes) ----- */}
      <Text style={styles.sectionTitle}>Theme</Text>

      <FlatList
        data={THEMES}
        horizontal
        keyExtractor={item => item.id}
        contentContainerStyle={styles.themeList}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedThemeId;
          return (
            <TouchableOpacity
              style={[styles.themeCard, isSelected && styles.themeCardSelected]}
              onPress={() => setSelectedThemeId(item.id)}
            >
              <Text style={styles.themeEmoji}>{item.characterEmoji}</Text>
              <Text style={styles.themeName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.startButton} onPress={startTimer}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    paddingTop: 80,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333'
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  },

  /* ---------- MINUTE BUTTONS ---------- */
  circleButton: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },

  circleSelected: {
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 4
  },

  innerCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 30
  },

  badge: {
    width: 55,
    height: 55,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 6,
    borderColor: 'white'
  },

  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 22,
    borderRightWidth: 22,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
  },

  pentagon: {
    width: 50,
    height: 50,
    backgroundColor: "white",
  },

  shapeContainer: {
    position: "absolute",
    top: 18,
  },

  timeNumber: {
    fontSize: 26,
    fontWeight: "900",
    color: "#000",
    marginTop: 2    ,
  },

  checkMark: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 26,
    color: "#FFF",
    textShadowColor: "#000",
    textShadowRadius: 2,
  },

  /* ---------- THEMES ---------- */
  themeList: {
    paddingVertical: 8
  },

  themeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 6,
    alignItems: 'center',
    width: 130
  },

  themeCardSelected: {
    borderWidth: 2,
    borderColor: '#7ED957',
    backgroundColor: '#E6FFE6'
  },

  themeEmoji: {
    fontSize: 32,
    marginBottom: 4
  },

  themeName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333'
  },

  startButton: {
    marginTop: 32,
    marginBottom: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40
  },

  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600'
  }
});
