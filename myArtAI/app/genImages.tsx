import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GenImagesScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage({
        uri: asset.uri,
        base64: asset.base64,
      });
    }
  };

  const generateImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.102:5000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage.base64,
          prompt: 'Convert the attach images into a ghibli style art',
        }),
      });

      const data = await response.json();

      if (data?.image) {
        setGeneratedImage(`data:image/jpeg;base64,${data.image}`);
      } else {
        Alert.alert('Failed', 'No image returned from server.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.image} resizeMode="cover" />
          ) : (
            <>
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
            </>
          )}
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity style={styles.createButton} onPress={generateImage}>
          <Text style={styles.createText}>✨ Generate Your Avatar</Text>
        </TouchableOpacity>

        {/* Loading & Result */}
        {loading && <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 20 }} />}

        {generatedImage && (
          <Image
            source={{ uri: generatedImage }}
            style={{ width: '100%', height: 300, borderRadius: 20, marginTop: 24 }}
            resizeMode="cover"
          />
        )}
      </View>
    </SafeAreaView>
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
