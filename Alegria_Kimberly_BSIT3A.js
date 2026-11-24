
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Product data
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 1499,
    category: 'Electronics',
    emoji: '🎧',
    description:
      'Enjoy your favorite music with comfortable wireless headphones, clear sound, and a modern design.',
  },
  {
    id: '2',
    name: 'Running Shoes',
    price: 2199,
    category: 'Fashion',
    emoji: '👟',
    description:
      'Lightweight running shoes designed for comfort, daily walking, exercise, and outdoor activities.',
  },
  {
    id: '3',
    name: 'Smart Watch',
    price: 1899,
    category: 'Accessories',
    emoji: '⌚',
    description:
      'A stylish smartwatch that complements your everyday look and helps you keep track of daily activities.',
  },
  {
    id: '4',
    name: 'Backpack',
    price: 999,
    category: 'Bags',
    emoji: '🎒',
    description:
      'A practical backpack with plenty of room for school supplies, personal items, and everyday essentials.',
  },
];

// SCREEN 1: HOME
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.smallHeading}>WELCOME TO</Text>
      <Text style={styles.heading}>ShopEasy 🛍️</Text>

      <Text style={styles.subtitle}>
        Find your everyday essentials in one place.
      </Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🛒</Text>
        <Text style={styles.heroTitle}>
          Discover Something New
        </Text>
        <Text style={styles.heroDescription}>
          Browse our collection of useful products at affordable
          sample prices.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Catalog')}
      >
        <Text style={styles.primaryButtonText}>
          Explore Products →
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Simple shopping, made easy.
      </Text>
    </View>
  );
}

// SCREEN 2: PRODUCT CATALOG
function CatalogScreen({ navigation }) {
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('Details', {
          product: item,
        })
      }
    >
      <View style={styles.productImage}>
        <Text style={styles.productEmoji}>{item.emoji}</Text>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>
          ₱{item.price.toLocaleString('en-PH')}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Products</Text>
      <Text style={styles.subtitle}>
        Select a product to view more information.
      </Text>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>
          ← Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// SCREEN 3: PRODUCT DETAILS
function DetailsScreen({ route, navigation }) {
  // Receive product data from the Catalog screen
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailsImage}>
        <Text style={styles.detailsEmoji}>{product.emoji}</Text>
      </View>

      <Text style={styles.detailsName}>{product.name}</Text>

      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.detailsPrice}>
        ₱{product.price.toLocaleString('en-PH')}
      </Text>

      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>Product Description</Text>
        <Text style={styles.description}>
          {product.description}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.primaryButtonText}>
          ← Back to Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.secondaryButtonText}>
          Return to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// MAIN APP
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#245B43',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#F4F7F4',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'ShopEasy' }}
        />

        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{ title: 'Product Catalog' }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F4',
    padding: 22,
  },

  smallHeading: {
    color: '#4D8968',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 25,
  },

  heading: {
    color: '#183C2D',
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 8,
  },

  subtitle: {
    color: '#77847D',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 22,
  },

  heroCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 15,
    elevation: 3,
  },

  heroEmoji: {
    fontSize: 65,
    marginBottom: 15,
  },

  heroTitle: {
    color: '#183C2D',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  heroDescription: {
    color: '#77847D',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
  },

  primaryButton: {
    backgroundColor: '#245B43',
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 20,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  footer: {
    color: '#8A968F',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },

  listContent: {
    paddingBottom: 15,
  },

  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 13,
    marginBottom: 13,
    elevation: 2,
  },

  productImage: {
    width: 70,
    height: 75,
    borderRadius: 12,
    backgroundColor: '#E5EFE7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productEmoji: {
    fontSize: 37,
  },

  productInfo: {
    flex: 1,
    marginLeft: 14,
  },

  productName: {
    color: '#183C2D',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  category: {
    color: '#77847D',
    fontSize: 13,
    marginBottom: 7,
  },

  price: {
    color: '#26704C',
    fontSize: 16,
    fontWeight: 'bold',
  },

  arrow: {
    color: '#245B43',
    fontSize: 30,
    marginLeft: 5,
  },

  backButton: {
    borderColor: '#245B43',
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },

  backButtonText: {
    color: '#245B43',
    fontSize: 14,
    fontWeight: 'bold',
  },

  detailsImage: {
    height: 180,
    borderRadius: 20,
    backgroundColor: '#E5EFE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  detailsEmoji: {
    fontSize: 85,
  },

  detailsName: {
    color: '#183C2D',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  detailsPrice: {
    color: '#26704C',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
  },

  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginTop: 22,
  },

  sectionTitle: {
    color: '#183C2D',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    color: '#66746B',
    fontSize: 14,
    lineHeight: 23,
  },

  secondaryButton: {
    alignItems: 'center',
    padding: 14,
    marginTop: 5,
  },

  secondaryButtonText: {
    color: '#245B43',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
