// app/result.tsx
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ResultScreen = () => {
  const { generated } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {generated ? (
        <Image
          source={{ uri: `data:image/png;base64,${generated}` }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32,
    borderRadius: 12,
  },
});
