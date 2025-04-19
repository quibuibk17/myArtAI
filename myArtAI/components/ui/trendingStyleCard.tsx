import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

type Props = {
  image: any;
  title: string;
  type: string;
  rating: number;
  views: string;
};

export const TrendingStyleCard = ({ image, title, type, rating, views }: Props) => {
  const router = useRouter(); // 👈 Add router here

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginTop: 12,
      padding: 12,
      backgroundColor: '#f9f9f9',
      borderRadius: 12
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
        <View>
          <Text style={{ fontWeight: '600' }}>{title}</Text>
          <Text style={{ fontSize: 12, color: '#555' }}>{type}</Text>
          <Text style={{ fontSize: 12 }}>⭐ {rating} | ✨ {views}</Text>
        </View>
      </View>

      {/* 👉 Add navigation inside button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#8a2be2',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 20
        }}
        onPress={() => router.push('/genImages')} // 👈 This is where navigation happens
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};
