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
import { ProgrammeStackParamList } from '../RootStackPrams';
import { trpc } from '@zart/react/trpc';
import { useAppSelector } from '../../../store';
import { selectUserUuid } from '../../slice/authSlice';

type programmesScreenProp = StackNavigationProp<
  ProgrammeStackParamList,
  'Programmes'
>;

export function ProgrammesScreen() {
  const navigation = useNavigation<programmesScreenProp>();
  const programmes = trpc.useQuery(
    ['programmes.byUserUuid', useAppSelector(selectUserUuid)],
    {
      refetchInterval: 3000,
    },
  );
  console.log(useAppSelector(selectUserUuid));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {programmes.data ? (
        <FlatList
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProgrammeDetails', { uuid: item.uuid });
              }}
            >
              <View style={styles.item}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          data={programmes.data}
          keyExtractor={(item) => item.uuid}
        />
      ) : (
        <Text>{programmes.status}</Text>
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
