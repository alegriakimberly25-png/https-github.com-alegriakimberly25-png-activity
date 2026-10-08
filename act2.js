import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubtitle}>
          Student Information
        </Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileCard}>

        <View style={styles.profileImage}>
          <Text style={styles.profileEmoji}>👤</Text>
        </View>

        <Text style={styles.name}>Kimberly Alegria</Text>

        <Text style={styles.course}>
          Bachelor of Science in Information Technology
        </Text>

        <Text style={styles.section}>
          BSIT 2C
        </Text>

      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Subjects</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>95%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>

      </View>

      {/* Information */}
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <View style={styles.infoCard}>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>
            student@example.com
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Student ID</Text>
          <Text style={styles.infoValue}>
            2024-00001
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Year Level</Text>
          <Text style={styles.infoValue}>
            2nd Year
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Section</Text>
          <Text style={styles.infoValue}>
            BSIT 2C
          </Text>
        </View>

      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  header: {
    backgroundColor: '#2196F3',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#E3F2FD',
    fontSize: 15,
    marginTop: 5,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 4,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  profileEmoji: {
    fontSize: 45,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222222',
  },

  course: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    marginTop: 8,
  },

  section: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 8,
  },

  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },

  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
  },

  statLabel: {
    color: '#777777',
    fontSize: 13,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
    color: '#222222',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  infoLabel: {
    color: '#777777',
    fontSize: 15,
  },

  infoValue: {
    color: '#222222',
    fontSize: 15,
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },

  editButton: {
    backgroundColor: '#2196F3',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  editText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  settingsButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  settingsText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
