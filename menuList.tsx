import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

// Define the type for a dish
type Dish = {
  name: string;
  description: string;
  price: number;
};

const MenuList = ({ navigation }: any) => {
  // Menu data organized by course type
  const menu = {
    starters: [
      { name: "Garlic Bread", description: "Fresh bread with garlic butter", price: 45 },
      { name: "Spring Rolls", description: "Crispy vegetable rolls", price: 55 },
      { name: "Chicken Wings", description: "Spicy buffalo wings", price: 75 }
    ],
    main: [
      { name: "Beef Burger", description: "Juicy burger with cheese", price: 120 },
      { name: "Grilled Salmon", description: "Fresh salmon with vegetables", price: 150 },
      { name: "Chicken Curry", description: "Spicy curry with rice", price: 95 }
    ],
    dessert: [
      { name: "Chocolate Cake", description: "Rich chocolate cake", price: 65 },
      { name: "Cheesecake", description: "Creamy cheesecake", price: 70 },
      { name: "Ice Cream", description: "Vanilla ice cream", price: 50 }
    ]
  };

  // State variables with proper types
  const [searchText, setSearchText] = useState<string>(""); // string type
  const [order, setOrder] = useState<Dish[]>([]); // Array of Dish type

  // Search function - looks through ALL categories
  const searchDish = () => {
    if (!searchText.trim()) {
      alert("Please type a dish name");
      return;
    }

    let foundDish: Dish | undefined = undefined;
    const searchLower = searchText.toLowerCase();

    // Check starters
    foundDish = menu.starters.find(dish => 
      dish.name.toLowerCase().includes(searchLower)
    );

    // Check main courses if not found
    if (!foundDish) {
      foundDish = menu.main.find(dish => 
        dish.name.toLowerCase().includes(searchLower)
      );
    }

    // Check desserts if still not found
    if (!foundDish) {
      foundDish = menu.dessert.find(dish => 
        dish.name.toLowerCase().includes(searchLower)
      );
    }

    if (foundDish) {
      // Add to order
      setOrder([...order, foundDish]);
      alert(`Added ${foundDish.name} to order!`);
      setSearchText("");
    } else {
      alert(`"${searchText}" not found. Try: Burger, Wings, Cake, etc.`);
    }
  };

  // Remove item from order
  const removeItem = (index: number) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  // Calculate total
  const total = order.reduce((sum, item) => sum + item.price, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Restaurant Menu</Text>

      {/* SEARCH SECTION */}
      <View style={styles.searchBox}>
        <Text style={styles.subtitle}>Search for any dish:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type dish name..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Add to Order" onPress={searchDish} color="#6a1b9a" />
      </View>

      {/* ORDER SECTION */}
      {order.length > 0 && (
        <View style={styles.orderBox}>
          <Text style={styles.sectionTitle}> Your Order ({order.length} items)</Text>
          
          {order.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemPrice}>R{item.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.removeBtn}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total: R{total}</Text>
            <TouchableOpacity 
              style={styles.clearBtn}
              onPress={() => setOrder([])}
            >
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* MENU BY CATEGORY - Easy to browse */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Starters</Text>
        {menu.starters.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemPrice}>R{item.price}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Main Courses</Text>
        {menu.main.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemPrice}>R{item.price}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Desserts</Text>
        {menu.dessert.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemPrice}>R{item.price}</Text>
          </View>
        ))}
      </View>

      {/* SIMPLE NAVIGATION */}
      <View style={styles.navBox}>
        <Button 
          title="← Back to Home" 
          onPress={() => navigation.navigate('Home')} 
          color="#666"
        />
      </View>
    </ScrollView>
  );
};

// Styles remain the same as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: '#6a1b9a',
  },
  searchBox: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: '#6a1b9a',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  orderBox: {
    backgroundColor: "#f3e5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#e1bee7",
  },
  menuSection: {
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItem: {
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#e1bee7",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  removeBtn: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 6,
  },
  removeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#e1bee7",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6a1b9a",
  },
  clearBtn: {
    backgroundColor: "#ff9800",
    padding: 10,
    borderRadius: 6,
  },
  clearText: {
    color: "white",
    fontWeight: "bold",
  },
  navBox: {
    marginTop: 20,
  },
});

export default MenuList;