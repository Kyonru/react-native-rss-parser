import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRssQuery } from '../hooks/useRssParser';
import { FeedItem } from '../components/feedItem';
import type { Item } from '@kyonru/react-native-rss-parser';
import { Separator } from '../components/separator';

const podcastUrl = 'https://feeds.simplecast.com/dHoohVNH';

export const EpisodesListScreen = () => {
  const {
    data: { items: episodes = [] } = {},
    isLoading,
    isError,
  } = useRssQuery(podcastUrl, 'rss-feed');

  const renderItem = React.useCallback(({ item }: { item: Item }) => {
    return (
      <FeedItem
        url={item.enclosures?.[0]?.url}
        image={item.medias?.[0]?.url || item.imageUrl || item.itunes?.image}
        title={item.title}
        description={item.description}
      />
    );
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container]}>
        <Text>Failed to load episodes</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.list}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Episodes</Text>
      </View>
      <FlatList
        style={styles.list}
        data={episodes}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.id || item.enclosures?.[0]?.url || item.links?.[0]?.url || ''
        }
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
