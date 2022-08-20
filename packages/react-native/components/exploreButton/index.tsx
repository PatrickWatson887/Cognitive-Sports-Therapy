import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/screens/RootStackPrams';

export default function ExploreButton(
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lifestyle'>,
) {
  return (
    <Ionicons
      onPress={() => navigation.navigate('Explore')}
      name="search-outline"
      color="gray"
      size={32}
      style={{ paddingRight: 16 }}
    />
  );
}
