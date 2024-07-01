import React, { useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { openLink } from '../utils/linking';

export const FeedItem = ({
  title = '',
  url = '',
  image = '',
  description = '',
}: {
  title?: string;
  url?: string;
  image?: string;
  description?: string;
}): React.ReactElement => {
  const onPress = useCallback(() => {
    openLink(url);
  }, [url]);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      android_ripple={{ color: 'black', borderless: true }}
      onPress={onPress}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
          style={styles.cover}
        />
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={3} style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 100,
  },
  cover: {
    height: '100%',
    width: 100,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    paddingRight: 20,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
});
