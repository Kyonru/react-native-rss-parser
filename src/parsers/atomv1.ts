import * as utils from './utils';
import * as model from '../models/rss';
import * as itunesParser from './itunes';

type Element = any; // You should replace 'any' with the actual type if known

const getChannelTitle = (node: Element): string =>
  utils.getElementTextContent(node, 'title') || '';

const getChannelLinks = (
  node: Element
): { url: string | null; rel: string | null }[] => {
  const links = utils.getChildElements(node, 'link');

  return links.map((link: Element) => ({
    url: link.getAttribute('href'),
    rel: link.getAttribute('rel'),
  }));
};

const getChannelDescription = (node: Element): string =>
  utils.getElementTextContent(node, 'subtitle') || '';

const getChannelCopyright = (node: Element): string =>
  utils.getElementTextContent(node, 'rights') || '';

const getChannelAuthors = (node: Element): { name: string }[] => {
  const authors = utils.getChildElements(node, 'author');

  return authors.map((author: Element) => ({
    name: utils.getElementTextContent(author, 'name') || '',
  }));
};

const getChannelLastUpdated = (node: Element): string =>
  utils.getElementTextContent(node, 'updated') || '';

const getChannelLastPublished = (node: Element): string =>
  utils.getElementTextContent(node, 'published') || '';

const getChannelCategories = (node: Element): { name: string | null }[] => {
  const categories = utils.getChildElements(node, 'category');

  return categories.map((category: Element) => ({
    name: category.getAttribute('term'),
  }));
};

const getChannelImage = (
  node: Element
): {
  url: string | null;
  title: undefined;
  description: undefined;
  width: undefined;
  height: undefined;
} | null => {
  let img = utils.getElementTextContent(node, 'image');

  if (img === '' || img === undefined) {
    img = utils.getElementTextContent(node, 'logo');
  }

  if (img === '' || img === undefined) {
    img = utils.getElementTextContent(node, 'icon');
  }

  return {
    url: img || null,
    title: undefined,
    description: undefined,
    width: undefined,
    height: undefined,
  };
};

const getItemTitle = (node: Element): string =>
  utils.getElementTextContent(node, 'title') || '';

const getItemLinks = (
  node: Element
): { url: string | null; rel: string | null }[] => {
  const links = utils.getChildElements(node, 'link');
  const linksWithoutEnclosures = links.filter(
    (link: Element) => link.getAttribute('rel') !== 'enclosure'
  );

  return linksWithoutEnclosures.map((link: Element) => ({
    url: link.getAttribute('href'),
    rel: link.getAttribute('rel'),
  }));
};

const getItemDescription = (node: Element): string =>
  utils.getElementTextContent(node, 'summary') || '';

const getItemContent = (node: Element): string =>
  utils.getElementTextContent(node, 'content') || '';

const getItemImage = (node: Element): string =>
  utils.getElementTextContent(node, 'icon') || '';

const getItemAuthors = (node: Element): { name: string }[] => {
  const authors = utils.getChildElements(node, 'author');

  return authors.map((author: Element) => ({
    name: utils.getElementTextContent(author, 'name') || '',
  }));
};

const getItemCategories = (node: Element): { name: string | null }[] => {
  const categories = utils.getChildElements(node, 'category');

  return categories.map((category: Element) => ({
    name: category.getAttribute('term'),
  }));
};

const getItemPublished = (node: Element): string => {
  let pub = utils.getElementTextContent(node, 'updated');

  if (pub === '' || pub === undefined) {
    pub = utils.getElementTextContent(node, 'published');
  }

  return pub || '';
};

const getItemId = (node: Element): string =>
  utils.getElementTextContent(node, 'id') || '';

const getItemEnclosures = (
  node: Element
): { url: string | null; length: string | null; mimeType: string | null }[] => {
  const links = utils.getChildElements(node, 'link');
  const enclosureLinks = links.filter(
    (link: Element) => link.getAttribute('rel') === 'enclosure'
  );

  return enclosureLinks.map((link: Element) => ({
    url: link.getAttribute('href'),
    length: link.getAttribute('length'),
    mimeType: link.getAttribute('type'),
  }));
};

const mapChannelFields = (document: Document): any => {
  // Replace 'any' with the actual return type if known
  const channelNodes = utils.getElements(document as Element, 'feed');

  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

  return {
    title: getChannelTitle(channelNode),
    links: getChannelLinks(channelNode),
    description: getChannelDescription(channelNode),
    copyright: getChannelCopyright(channelNode),
    authors: getChannelAuthors(channelNode),
    lastUpdated: getChannelLastUpdated(channelNode),
    lastPublished: getChannelLastPublished(channelNode),
    categories: getChannelCategories(channelNode),
    image: getChannelImage(channelNode),
    itunes: channelNode ? itunesParser.parseChannel(channelNode) : null,
  };
};

const mapItems = (document: Document): any[] => {
  // Replace 'any' with the actual return type if known
  const itemNodes = utils.getElements(document as Element, 'entry');

  return itemNodes.map((item: Element) => ({
    title: getItemTitle(item),
    links: getItemLinks(item),
    description: getItemDescription(item),
    id: getItemId(item),
    imageUrl: getItemImage(item),
    content: getItemContent(item),
    authors: getItemAuthors(item),
    categories: getItemCategories(item),
    published: getItemPublished(item),
    enclosures: getItemEnclosures(item),
    itunes: itunesParser.parseItem(item),
  }));
};

export const parse = (document: Document): any => ({
  // Replace 'any' with the actual return type if known
  ...model.rss,
  type: 'atom-v1',
  ...mapChannelFields(document),
  items: mapItems(document),
});
