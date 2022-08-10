import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';

type breathScreenProp = StackNavigationProp<RootStackParamList, 'Breath'>;


export function BreathScreen() {
  const navigation = useNavigation<breathScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Breath Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Lifestyle')} />
    </View>
    );
}

