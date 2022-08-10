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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackPrams';
import { useAppSelector, useAppDispatch } from '../../../store';
import { selectUserName, setRole } from '../../slice/authSlice';

type lifestyleScreenProp = StackNavigationProp<RootStackParamList, 'Lifestyle'>;

export function LifestyleScreen() {
  const navigation = useNavigation<lifestyleScreenProp>();
  const dispatch = useAppDispatch()


  const posts = trpc.useQuery(['post.all'], {
    refetchInterval: 3000,
  });

  const user = trpc.useQuery(['users.byName',  useAppSelector(selectUserName)]);
  if (user.data) {
    dispatch(setRole(user.data.role))
  }
  return (
    <SafeAreaView style={styles.container}>
      {posts.data ? (
        <FlatList
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Explore')
              }}
              >
              <View style={styles.item}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          data={posts.data}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>{posts.status}</Text>
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