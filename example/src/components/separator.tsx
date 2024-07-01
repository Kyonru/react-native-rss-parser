import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export const Separator = (): React.ReactElement => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginVertical: 4,
  },
});
