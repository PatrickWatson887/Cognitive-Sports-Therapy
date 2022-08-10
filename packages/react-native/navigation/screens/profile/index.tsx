import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import { useAppDispatch } from '../../../store';
import { setSignOut } from '../../slice/authSlice';



export function ProfileScreen() {
  const dispatch = useAppDispatch()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Sign Out" onPress={() => dispatch(setSignOut())} />
    </View>
    );
}

