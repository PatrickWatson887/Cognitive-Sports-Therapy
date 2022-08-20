import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { trpc } from '@zart/react/trpc';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackPrams';
import { useAppSelector, useAppDispatch } from '../../../store';
import { selectUserUuid, setRole } from '../../slice/authSlice';

type lifestyleScreenProp = StackNavigationProp<RootStackParamList, 'Lifestyle'>;

export function LifestyleScreen() {
  const navigation = useNavigation<lifestyleScreenProp>();
  const dispatch = useAppDispatch();

  const user = trpc.useQuery(['users.byUuid', useAppSelector(selectUserUuid)]);
  const diaries = trpc.useQuery(['diaries.all']);

  if (user.data) {
    dispatch(setRole(user.data.role.title));
  }
  return (
    <SafeAreaView style={styles.container}>
      {diaries.data ? (
        <FlatList
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Explore');
              }}
            >
              <View style={styles.item}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          data={diaries.data}
          keyExtractor={(item) => item.uuid}
        />
      ) : (
        <Text>{diaries.status}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
});
