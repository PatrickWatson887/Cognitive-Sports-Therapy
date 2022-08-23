import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { trpc } from '@zart/react/trpc';

export function MindDetails(props: { route: { params: { uuid: string } } }) {
  const diary = trpc.useQuery(['articles.byUuid', props.route.params.uuid]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{JSON.stringify(diary.data ?? null, null, 4)}</Text>
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
