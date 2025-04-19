import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TopCardItemProps {
  title: string;
  rating: number;
  image: any;
  onPress?: () => void;
}

const CARD_WIDTH = Dimensions.get('window').width / 2 - 24; // 2 cards + padding

const TopCardItem: React.FC<TopCardItemProps> = ({ title, rating, image, onPress }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const starsArray = Array(5).fill(0).map((_, i) => (
      <FontAwesome
        key={i}
        name={i < fullStars ? 'star' : 'star-o'}
        size={14}
        color="#FFD700"
        style={{ marginRight: 2 }}
      />
    ));
    return <View style={styles.starRow}>{starsArray}</View>;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          {renderStars()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopCardItem;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
