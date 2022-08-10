import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoginStackParamList} from '../RootStackPrams';

type forgotPasswordScreenProp = StackNavigationProp<LoginStackParamList, 'ForgotPassword'>;


export function ForgotPasswordScreen() {
  const navigation = useNavigation<forgotPasswordScreenProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Forgot Password Screen</Text>
    </View>
    );
}

