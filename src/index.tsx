import { DOMParser } from 'xmldom';
import * as rssV2Parser from './parsers/rssv2';
import * as atomV1Parser from './parsers/atomv1';
import type { Rss } from './models/rss';
export type {
  Link,
  Author,
  Category,
  Image,
  ItunesCategory,
  SubCategory,
  Itunes,
  Owner,
  Enclosure,
  Media,
  ItunesItem,
  Item,
  Rss,
} from './models/rss';

type Parser = {
  parse: (document: Document) => any;
};

const getParser = (document: Document): Parser | null => {
  const isRssSpecification =
    document.getElementsByTagName('channel')[0] !== undefined;
  const isAtomSpecification =
    document.getElementsByTagName('feed')[0] !== undefined;

  if (isRssSpecification) {
    return rssV2Parser;
  }

  if (isAtomSpecification) {
    return atomV1Parser;
  }

  return null;
};

export const parse = async (feed: string): Promise<Rss> =>
  new Promise((resolve, reject) => {
    const document = new DOMParser({
      errorHandler: (_level: string, msg: string) => {
        reject(msg);
      },
    }).parseFromString(feed, 'text/xml');

    const parser = getParser(document);

    if (!parser) {
      reject('Unable to find any RSS element in feed');
      return;
    }

    const parsedFeed = parser.parse(document);

    resolve(parsedFeed);
  });
