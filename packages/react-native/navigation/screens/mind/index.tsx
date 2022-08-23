import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackPrams';
import { trpc } from '@zart/react/trpc';

type mentalScreenProp = StackNavigationProp<RootStackParamList, 'Mind'>;

export function MentalScreen() {
  const navigation = useNavigation<mentalScreenProp>();
  const articles = trpc.useQuery(['articles.all'], { refetchInterval: 3000 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {articles.data ? (
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
          data={articles.data}
          keyExtractor={(item) => item.uuid}
        />
      ) : (
        <Text>{articles.status}</Text>
      )}
    </View>
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
