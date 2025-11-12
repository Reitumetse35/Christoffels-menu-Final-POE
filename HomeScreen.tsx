import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the type for menu items
interface MenuItem {
  name: string;
  price: number;
}

// Define the navigation stack params
type RootStackParamList = {
  Home: undefined;
  MenuList: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Sample menu data
  const menu = {
    starters: [
      { name: 'Spring Rolls', price: 50 },
      { name: 'Garlic Bread', price: 35 },
      { name: 'Caesar Salad', price: 80 },
        { name: 'Fruit Salad', price: 40 },
      { name: 'Bruschetta', price: 55 },
      { name: 'Stuffed Mushrooms', price: 70 },

    ],
    mains: [
      { name: 'Grilled Chicken', price: 120 },
      { name: 'Beef Burger', price: 95 },
      { name: 'Spaghetti Bolognese', price: 110 },
      { name: 'Vegetarian Pizza', price: 100 },
      { name: 'Fish and Chips', price: 130 },
   { name: 'Lamb Chops & Rice', price: 250 },
   { name: 'Prawn Curry', price: 200 }
  
    ],
    desserts: [
      { name: 'Chocolate Cake', price: 60 },
      { name: 'Ice Cream Sundae', price: 45 },
      { name: 'Fruit Tart', price: 70 },
      { name: 'Cheesecake', price: 80 },
    
      { name: 'Lemon Meringue Pie', price: 65 }
     
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Chef’s Menu!</Text>
      <Text style={styles.message}>
        Explore our delicious menu and customize your meals to your liking.
      </Text>

      <Text style={styles.title}>Today's Menu</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Starters</Text>
        {menu.starters.map((item: MenuItem, index: number) => (
          <Text key={index} style={styles.menuItem}>
            {item.name} - R{item.price}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mains</Text>
        {menu.mains.map((item: MenuItem, index: number) => (
          <Text key={index} style={styles.menuItem}>
            {item.name} - R{item.price}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desserts</Text>
        {menu.desserts.map((item: MenuItem, index: number) => (
          <Text key={index} style={styles.menuItem}>
            {item.name} - R{item.price}
          </Text>
        ))}
      </View>

      <Button
        title="View Full Menu"
        onPress={() => navigation.navigate('MenuList')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});