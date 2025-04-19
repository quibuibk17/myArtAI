import React from 'react';
import { View, FlatList } from 'react-native';
import TopCardItem from './topCardItem';

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
  return (
    <FlatList
      data={topCards}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <TopCardItem {...item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 16 }}
    />
  );
};
