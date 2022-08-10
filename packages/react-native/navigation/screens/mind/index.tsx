import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';

type mentalScreenProp = StackNavigationProp<RootStackParamList, 'Mind'>;


export function MentalScreen() {
  const navigation = useNavigation<mentalScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Mind Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Lifestyle')} />
    </View>
    );
}

