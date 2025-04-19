import { View, ScrollView, Image, Text } from 'react-native';
import React from 'react';

const cards = [
    {
        title: 'Avatar',
        image: require('../../assets/images/myImages/Avatar.jpg'),
        rating: 5,
        },
        {
        title: 'Action Figure',
        image: require('../../assets/images/myImages/ActionFigure.png'),
        rating: 4.5,
    },
];

export const TopCardList = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16 }}>
    {cards.map((card, index) => (
      <View key={index} style={{ marginRight: 16 }}>
        <Image source={card.image} style={{ width: 160, height: 220, borderRadius: 12 }} />
        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600' }}>{card.title}</Text>
      </View>
    ))}
  </ScrollView>
);

