import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';

type exploreScreenProp = StackNavigationProp<RootStackParamList, 'Explore'>;


export function ExploreScreen() {
  const navigation = useNavigation<exploreScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Explore Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Lifestyle')} />
    </View>
    );
}

