import React from 'react';
import { View, FlatList } from 'react-native';
import TopCardItem from './topCardItem';
import { useRouter } from 'expo-router';

const topCards = [
  {
    title: 'Avatar',
    rating: 5,
    image: require('../../assets/images/myImages/Avatar1.jpg'),
  },
  {
    title: 'Action Figure',
    rating: 5,
    image: require('../../assets/images/myImages/ActionFigure.jpg'),
  },
];

export const TopCardList = () => {
  const router = useRouter();
  return (
    <FlatList
      data={topCards}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TopCardItem {...item} onPress={() => router.push('/genImages')} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 16 }}
    />
  );
};
