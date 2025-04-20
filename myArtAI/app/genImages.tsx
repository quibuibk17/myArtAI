import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

export default function GenImagesScreen() {
  // Style definitions
  const styleOptions = [
    { name: 'Ghibli', image: require('../assets/images/myResizedImages/Ghibli.jpg') },
    { name: 'Cartoon', image: require('../assets/images/myResizedImages/Cartoon.jpg') },
    { name: 'Joyful', image: require('../assets/images/myResizedImages/Joyful.jpg') },
    { name: 'Warm', image: require('../assets/images/myResizedImages/Warm.jpg') },
    { name: 'Sticker', image: require('../assets/images/myResizedImages/Sticker.jpg') },
  ];

  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0].name);
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
          prompt: `Convert the attach images into a ${selectedStyle} style art`,
        }),
      });

      const data = await response.json();

      if (data?.image) {
        router.push({
          pathname: '/result',
          params: {
            generated: data.image,
            style: selectedStyle,
          },
        });
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

        {/* Uploaded Image or Upload Box */}
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

        {/* Style Selection */}
        <Text style={styles.styleLabel}>Choose a Style</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {styleOptions.map((style) => (
            <TouchableOpacity
              key={style.name}
              onPress={() => setSelectedStyle(style.name)}
              style={[
                styles.styleBox,
                selectedStyle === style.name && styles.styleBoxSelected,
              ]}
            >
              <Image source={style.image} style={styles.styleImage} />
              <Text style={styles.styleName}>{style.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Generate Button */}
        <TouchableOpacity style={styles.createButton} onPress={generateImage}>
          <Text style={styles.createText}>✨ Generate Your Avatar</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#ff6600" style={{ marginTop: 20 }} />}
      </View>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get('window').width;
const styleBoxWidth = (screenWidth - 64) / 3; // 3 boxes with padding/margin
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
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
    marginTop: 16,
    height: 500, // Bigger height
    borderWidth: 2,
    borderColor: '#00bcd4',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%', // Fill parent
    opacity: 0.3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  styleLabel: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  styleScroll: {
    marginBottom: 16,
  },
  styleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  styleButtonSelected: {
    backgroundColor: '#ff6600',
  },
  styleButtonText: {
    fontWeight: '500',
    color: '#333',
  },
  styleButtonTextSelected: {
    color: '#fff',
  },
  createButton: {
    marginTop: 10,
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
  styleBox: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: styleBoxWidth,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  styleBoxSelected: {
    borderColor: '#ff6600',
    borderWidth: 2,
  },
  styleImage: {
    width: '100%',
    height: styleBoxWidth - 30, // Adjust height to keep a nice ratio
    borderRadius: 10,
    resizeMode: 'cover',
  },
  styleName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },  
});
