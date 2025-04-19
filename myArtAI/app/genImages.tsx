import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GenImagesScreen() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={styles.safeArea}> 
        <View style={styles.container}>
          {/* Top Navigation */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Ionicons name="arrow-back" size={28} color="#ff6600" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeText}>UPGRADE</Text>
            </TouchableOpacity>
          </View>

          {/* Upload Image Box */}
          <View style={styles.uploadBox}>
            <Image
              source={require('../assets/images/BackGroundGenScreen.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Ionicons name="cloud-upload-outline" size={28} color="#008080" />
              <Text style={styles.uploadTitle}>Upload Your Photo</Text>
              <Text style={styles.uploadDescription}>
                A <Text style={{ fontWeight: 'bold' }}>close-up</Text> photo, profile pic or a selfie of{' '}
                <Text style={{ color: '#ff6600' }}>yourself</Text> or someone else!
              </Text>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createText}>✨ Generate Your Avatar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upgradeButton: {
    borderWidth: 1,
    borderColor: '#ff6600',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  upgradeText: {
    color: '#ff6600',
    fontWeight: '600',
  },
  uploadBox: {
    marginTop: 32,
    borderWidth: 2,
    borderColor: '#00bcd4',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    opacity: 0.3,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    color: '#000',
  },
  uploadDescription: {
    marginTop: 8,
    textAlign: 'center',
    color: '#555',
  },
  createButton: {
    marginTop: 40,
    backgroundColor: '#ff6600',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  createText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
