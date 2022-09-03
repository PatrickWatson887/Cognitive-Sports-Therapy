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
import { LifestyleStackParamList } from '../RootStackPrams';

type lifestyleScreenProp = StackNavigationProp<
  LifestyleStackParamList,
  'Lifestyle'
>;

export function LifestyleScreen() {
  const navigation = useNavigation<lifestyleScreenProp>();

  const diaries = trpc.useQuery(['diaries.all']);

  return (
    <SafeAreaView style={styles.container}>
      {diaries.data ? (
        <FlatList
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DiariesDetails', { uuid: item.uuid });
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
