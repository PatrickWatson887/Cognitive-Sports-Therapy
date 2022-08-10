import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoginStackParamList} from '../RootStackPrams';

type signupScreenProp = StackNavigationProp<LoginStackParamList, 'Signup'>;


export function SignupScreen() {
  const navigation = useNavigation<signupScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignUp Screen</Text>
    </View>
    );
}

