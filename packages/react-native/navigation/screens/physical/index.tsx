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
import { BodyStackParamList } from '../RootStackPrams';
import { trpc } from '@zart/react/trpc';

type physicalScreenProp = StackNavigationProp<BodyStackParamList, 'Body'>;

export function PhysicalScreen() {
  const navigation = useNavigation<physicalScreenProp>();

  const workouts = trpc.useQuery(['workouts.all'], { refetchInterval: 3000 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {workouts.data ? (
        <FlatList
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BodyDetails', { uuid: item.uuid });
              }}
            >
              <View style={styles.item}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          data={workouts.data}
          keyExtractor={(item) => item.uuid}
        />
      ) : (
        <Text>{workouts.status}</Text>
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
