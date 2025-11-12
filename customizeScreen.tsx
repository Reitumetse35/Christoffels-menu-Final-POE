import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

// Define the type for a single meal code entry
interface MealCodeEntry {
  id: string; // Using id for key management in FlatList
  code: string;
}

const MealCodeCustomizer: React.FC = () => {
  const [mealCodes, setMealCodes] = useState<MealCodeEntry[]>([]);
  const [newCode, setNewCode] = useState<string>('');

  const addMealCode = () => {
    if (newCode.trim() === '') return;
    const newEntry: MealCodeEntry = {
      id: Math.random().toString(), // Simple unique ID generation
      code: newCode.trim(),
    };
    setMealCodes([...mealCodes, newEntry]);
    setNewCode(''); // Clear the input field after adding
  };

  const removeMealCode = (id: string) => {
    setMealCodes(mealCodes.filter(entry => entry.id !== id));
  };

  const handleCodeChange = (id: string, text: string) => {
    setMealCodes(mealCodes.map(entry =>
      entry.id === id ? { ...entry, code: text } : entry
    ));
  };

  const renderItem = ({ item }: { item: MealCodeEntry }) => (
    <View style={styles.entryContainer}>
      <TextInput
        style={styles.input}
        value={item.code}
        onChangeText={(text: string) => handleCodeChange(item.id, text)}
        placeholder="Enter meal code"
      />
      <Button title="Remove" onPress={() => removeMealCode(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Meal Codes</Text>

      {/* Input area for new codes */}
      <View style={styles.newInputContainer}>
        <TextInput
          style={styles.input}
          value={newCode}
          onChangeText={setNewCode}
          placeholder="Enter new meal code"
        />
        <Button title="Add" onPress={addMealCode} />
      </View>

      {/* List of current codes */}
      <FlatList
        data={mealCodes}
        renderItem={renderItem}
        keyExtractor={(item: { id: any; }) => item.id}
        style={styles.list}
      />

      <Text>Total codes added: {mealCodes.length}</Text>
      <Text>Final list: {JSON.stringify(mealCodes.map(item => item.code))}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  newInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  list: {
    marginBottom: 20,
  },
});

export default MealCodeCustomizer;
