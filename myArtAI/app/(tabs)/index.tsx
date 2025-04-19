// app/(tabs)/index.tsx
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { TopCardList } from '../../components/ui/topCardList';
import { TrendingStyleCard } from '../../components/ui/trendingStyleCard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const trendingStyles = [
    {
      image: require('../../assets/images/myResizedImages/Ghibli.jpg'),
      title: 'Ghibli',
      type: 'Avatar',
      rating: 5,
      views: '300k',
    },
    {
      image: require('../../assets/images/myResizedImages/Cartoon.jpg'),
      title: 'Cartoon',
      type: 'Avatar',
      rating: 4.5,
      views: '250k',
    },
    {
      image: require('../../assets/images/myResizedImages/Joyful.jpg'),
      title: 'Joyful Nod',
      type: 'Video',
      rating: 4.7,
      views: '150k',
    },
    {
      image: require('../../assets/images/myResizedImages/Warm.jpg'),
      title: 'Warm Greeting',
      type: 'Video',
      rating: 5,
      views: '50k',
    },
    {
      image: require('../../assets/images/myResizedImages/Sticker.jpg'),
      title: 'Sticker',
      type: 'Sticker',
      rating: 4.3,
      views: '40k',
    },
  ];

  return (
    <LinearGradient
      colors={['#FFE4E1', '#F8E1FF']}
      style={{ flex: 1 }}
    >
      {/* 🔒 Fixed Top Area */}
      <View style={{ paddingTop: 60, paddingHorizontal: 16 }}>
        {/* Top Bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Ionicons name="menu" size={28} color="black" />
          <Ionicons name="diamond" size={28} color="#8a2be2" />
        </View>
  
        {/* TopCard horizontal scroll */}
        <TopCardList />
      </View>
  
      {/* 🧻 Scrollable Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={{ paddingHorizontal: 16, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trending Styles</Text>
          <TouchableOpacity>
            <Text style={{ color: '#8a2be2', fontWeight: '600' }}>See All Styles</Text>
          </TouchableOpacity>
        </View>
  
        {trendingStyles.map((style, index) => (
          <TrendingStyleCard key={index} {...style} />
        ))}
      </ScrollView>
    </LinearGradient>
  );  
}
