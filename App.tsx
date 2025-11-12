import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Define styles at the top
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "bold",
    color: '#333',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  menuItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    lineHeight: 20,
  },
  price: {
    fontWeight: "bold",
    color: "#2e7d32",
    fontSize: 16,
  },
  selectedSection: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#90caf9",
  },
  dishesSection: {
    marginBottom: 20,
  },
  selectedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedDishInfo: {
    flex: 1,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#90caf9",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976d2",
  },
  addButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  clearButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  navButtons: {
    marginTop: 25,
    gap: 12,
  },
  navButton: {
    backgroundColor: "#841584",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: "#6a1b9a",
  },
  navButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
});

// Main MenuList Component with course selection
const MenuList = ({ navigation }: any) => {
  // Menu data organized by course type
  const menu = {
    starter: [
      { name: "Garlic Bread", description: "Freshly baked bread with garlic butter and herbs.", price: 45 },
      { name: "Spring Rolls", description: "Crispy vegetable spring rolls with sweet chili sauce.", price: 55 },
      { name: "Chicken Wings", description: "Spicy buffalo wings with blue cheese dip.", price: 75 }
    ],
    main: [
      { name: "Beef Burger", description: "Juicy beef burger with cheese, lettuce, and special sauce.", price: 120 },
      { name: "Grilled Salmon", description: "Fresh salmon fillet with lemon butter and vegetables.", price: 150 },
      { name: "Chicken Curry", description: "Spicy chicken curry with rice and naan bread.", price: 95 },
      { name: "Vegan Stir Fry", description: "Fresh veggies with tofu in soy sauce.", price: 90 }
    ],
    dessert: [
      { name: "Chocolate Cake", description: "Rich chocolate cake with vanilla ice cream.", price: 65 },
      { name: "Cheesecake", description: "New York style cheesecake with berry compote.", price: 70 },
      { name: "Ice Cream Sundae", description: "Vanilla ice cream with chocolate sauce and nuts.", price: 50 }
    ]
  };

  const [searchInput, setSearchInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDishes, setSelectedDishes] = useState<any[]>([]);

  // Function to handle course search
  const handleCourseSearch = () => {
    const input = searchInput.toLowerCase().trim();
    
    if (input === "starter") {
      setSelectedCourse("starter");
    } else if (input === "main") {
      setSelectedCourse("main");
    } else if (input === "dessert") {
      setSelectedCourse("dessert");
    } else {
      alert("Please type only: 'starter', 'main', or 'dessert'");
      setSelectedCourse("");
    }
    setSearchInput("");
  };

  // Function: add dish to selected dishes
  const handleAddToSelected = (dish: any) => {
    setSelectedDishes([...selectedDishes, dish]);
    alert(`${dish.name} added to your order!`);
  };

  // Function: remove dish from selected dishes
  const handleRemoveFromSelected = (index: number) => {
    const newSelectedDishes = [...selectedDishes];
    newSelectedDishes.splice(index, 1);
    setSelectedDishes(newSelectedDishes);
  };

  // Function: clear all selected dishes
  const handleClearSelected = () => {
    setSelectedDishes([]);
  };

  // Calculate total price
  const totalPrice = selectedDishes.reduce((sum, dish) => sum + dish.price, 0);

  // Get course title for display
  const getCourseTitle = () => {
    switch (selectedCourse) {
      case "starter": return "Starters";
      case "main": return "Main Courses";
      case "dessert": return "Desserts";
      default: return "";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Restaurant Menu</Text>

      {/* SEARCH COURSE SECTION */}
      <Text style={styles.subtitle}>What would you like to order?</Text>
      <Text style={styles.instruction}>
        Type "starter", "main", or "dessert" below:
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Type starter, main, or dessert"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <Button title="Show Dishes" onPress={handleCourseSearch} color="#841584" />

      {/* SELECTED DISHES SECTION */}
      {selectedDishes.length > 0 && (
        <View style={styles.selectedSection}>
          <Text style={styles.sectionTitle}>Your Order ({selectedDishes.length})</Text>
          {selectedDishes.map((dish, index) => (
            <View key={index} style={styles.selectedItem}>
              <View style={styles.selectedDishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.price}>R{dish.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromSelected(index)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Total: R{totalPrice}</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearSelected}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* DISPLAY DISHES BASED ON SELECTED COURSE */}
      {selectedCourse && (
        <View style={styles.dishesSection}>
          <Text style={styles.sectionTitle}>{getCourseTitle()}</Text>
          <Text style={styles.instruction}>Select the dishes you want:</Text>
          
          {menu[selectedCourse as keyof typeof menu].map((dish, index) => (
            <View key={index} style={styles.menuItem}>
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.description}>{dish.description}</Text>
                <Text style={styles.price}>Price: R{dish.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToSelected(dish)}
              >
                <Text style={styles.addButtonText}>Add to Order</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* NAVIGATION BUTTONS */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Customize')}
        >
          <Text style={styles.navButtonText}>Customize Your Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navButton, styles.homeButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Simple HomeScreen
const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.welcomeTitle}>Welcome to Christoffel's Restaurant</Text>
      <Text style={styles.subtitle}>Experience the finest cuisine</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="View Our Menu"
          onPress={() => navigation.navigate('MenuList')}
          color="#841584"
        />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Christoffel\'s Restaurant',
            headerStyle: {
              backgroundColor: '#841584',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="MenuList"
          component={MenuList}
          options={{ 
            title: 'Our Menu',
            headerStyle: {
              backgroundColor: '#841584',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Customize"
          component={HomeScreen} // Temporary - you can add your CustomizeScreen later
          options={{ 
            title: 'Customize Meal',
            headerStyle: {
              backgroundColor: '#841584',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}