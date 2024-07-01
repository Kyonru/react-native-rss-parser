import * as RssParser from '@kyonru/react-native-rss-parser';

export const getParser = async (url: string) => {
  const request = await fetch(url);
  const response = await request.text();

  const parsed = await RssParser.parse(response);

  return (parsed || {}) as RssParser.Rss;
};
