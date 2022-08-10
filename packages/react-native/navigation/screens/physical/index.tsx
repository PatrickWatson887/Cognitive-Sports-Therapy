import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';

type physicalScreenProp = StackNavigationProp<RootStackParamList, 'Body'>;


export function PhysicalScreen() {
  const navigation = useNavigation<physicalScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Physical Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Lifestyle')} />
    </View>
    );
}

