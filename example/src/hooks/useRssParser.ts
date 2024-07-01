import { useQuery } from '@tanstack/react-query';
import type { Rss } from '@kyonru/react-native-rss-parser';
import { getParser } from '../libs/rss';
import { getUUID } from '../utils/random';

export const useRssQuery = (url: string, key: string) => {
  return useQuery({
    retry: false,
    staleTime: 1000 * 60 * 5,
    queryKey: [key],
    queryFn: async (): Promise<Rss> => {
      const parsed = await getParser(url);

      return {
        ...parsed,
        items:
          parsed?.items
            ?.map((item) => ({
              ...item,
              id: getUUID(),
            }))
            .reverse() || [],
      };
    },
  });
};
