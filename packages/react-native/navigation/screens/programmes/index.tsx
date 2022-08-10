import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';

type programmesScreenProp = StackNavigationProp<RootStackParamList, 'Programmes'>;


export function ProgrammesScreen() {
  const navigation = useNavigation<programmesScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Programmes Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Lifestyle')} />
    </View>
    );
}

