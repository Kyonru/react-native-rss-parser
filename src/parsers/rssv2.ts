import * as utils from './utils';
import * as model from '../models/rss';
import * as namespaces from './namespaces';
import * as itunesParser from './itunes';

interface Author {
  name: string;
}

interface Link {
  url: string | null;
  rel: string | null;
}

interface Category {
  name: string | null;
}

interface Image {
  url: string | null;
  title: string | null;
  description: string | null;
  width: string | null;
  height: string | null;
}

interface Enclosure {
  url: string | null;
  length: string | null;
  mimeType: string | null;
}

interface Media {
  url: string | null;
  type: string | null;
  fileSize: string | null;
  medium: string | null;
}

interface Item {
  title: string | null;
  links: Link[];
  description: string | null;
  content: string | null;
  id: string | null;
  authors: Author[];
  categories: Category[];
  published: string | null;
  enclosures: Enclosure[];
  itunes: ReturnType<typeof itunesParser.parseItem>;
  medias: Media[];
}

interface Channel {
  title: string | null;
  links: Link[];
  description: string | null;
  language: string | null;
  copyright: string | null;
  authors: Author[];
  lastUpdated: string | null;
  lastPublished: string | null;
  categories: Category[];
  image: Image;
  itunes: ReturnType<typeof itunesParser.parseChannel> | null;
}

const getChannelTitle = (node: Element): string | null =>
  utils.getElementTextContent(node, 'title') ||
  utils.getElementTextContent(node, 'dc:title') ||
  null;

const getChannelLinks = (node: Element): Link[] => {
  const links = utils.getChildElements(node, 'link');
  return links.map((link) => ({
    url: link.textContent,
    rel: link.getAttribute('rel'),
  }));
};

const getChannelDescription = (node: Element): string | null =>
  utils.getElementTextContent(node, 'description') ||
  utils.getElementTextContent(node, 'dc:description') ||
  null;

const getChannelLanguage = (node: Element): string | null =>
  utils.getElementTextContent(node, 'language') || null;

const getChannelCopyright = (node: Element): string | null =>
  utils.getElementTextContent(node, 'copyright') || null;

const getChannelAuthors = (node: Element): Author[] => {
  const authors = utils.getElementTextContentArray(node, 'managingEditor');
  return authors.map((author) => ({
    name: author,
  }));
};

const getChannelLastUpdated = (node: Element): string | null =>
  utils.getElementTextContent(node, 'lastBuildDate') ||
  utils.getElementTextContent(node, 'dc:date') ||
  null;

const getChannelLastPublished = (node: Element): string | null =>
  utils.getElementTextContent(node, 'pubDate') || null;

const getChannelCategories = (node: Element): Category[] => {
  const categories = utils.getElementTextContentArray(node, 'category');
  return categories.map((category) => ({
    name: category,
  }));
};

const getChannelImage = (node: Element): Image => {
  const imageNodes = utils.getChildElements(node, 'image');
  if (imageNodes.length === 0) {
    return {
      url: null,
      title: null,
      description: null,
      width: null,
      height: null,
    };
  }
  const imageNode = imageNodes[0];
  return {
    url: utils.getElementTextContent(imageNode, 'url') || null,
    title: utils.getElementTextContent(imageNode, 'title') || null,
    description: utils.getElementTextContent(imageNode, 'description') || null,
    width: utils.getElementTextContent(imageNode, 'width') || null,
    height: utils.getElementTextContent(imageNode, 'height') || null,
  };
};

const getItemTitle = (node: Element): string | null =>
  utils.getElementTextContent(node, 'title') || null;

const getItemLinks = (node: Element): Link[] => {
  const links = utils.getChildElements(node, 'link');
  return links.map((link) => ({
    url: link.textContent,
    rel: link.getAttribute('rel'),
  }));
};

const getItemDescription = (node: Element): string | null =>
  utils.getElementTextContent(node, 'description') || null;

const getItemContent = (node: Element): string | null =>
  utils.getElementTextContent(node, 'encoded', namespaces.content) || null;

const getItemAuthors = (node: Element): Author[] => {
  let authors = utils.getElementTextContentArray(node, 'author');
  if (authors.length === 0) {
    authors = utils.getElementTextContentArray(node, 'dc:creator');
  }
  return authors.map((author) => ({
    name: author,
  }));
};

const getItemCategories = (node: Element): Category[] => {
  let categories = utils.getElementTextContentArray(node, 'category');
  if (categories.length === 0) {
    categories = utils.getElementTextContentArray(node, 'dc:subject');
  }
  return categories.map((category) => ({
    name: category,
  }));
};

const getItemId = (node: Element): string | null =>
  utils.getElementTextContent(node, 'guid') || null;

const getItemPublished = (node: Element): string | null =>
  utils.getElementTextContent(node, 'pubDate') ||
  utils.getElementTextContent(node, 'dc:date') ||
  null;

const getItemEnclosures = (node: Element): Enclosure[] => {
  const enclosures = utils.getChildElements(node, 'enclosure');
  return enclosures.map((enclosure) => ({
    url: enclosure.getAttribute('url'),
    length: enclosure.getAttribute('length'),
    mimeType: enclosure.getAttribute('type'),
  }));
};

const getItemMedia = (node: Element): Media[] => {
  const medias = utils.getChildElements(node, 'media:content');
  return medias.map((media) => ({
    url: media.getAttribute('url'),
    medium: media.getAttribute('medium'),
    fileSize: media.getAttribute('fileSize'),
    type: media.getAttribute('type'),
  }));
};

const mapChannelFields = (document: Document): Channel => {
  const channelNodes = utils.getElements(
    document as unknown as Element,
    'channel'
  );
  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }
  const channelNode = channelNodes[0];

  return {
    title: channelNode ? getChannelTitle(channelNode) : null,
    links: channelNode ? getChannelLinks(channelNode) : [],
    description: channelNode ? getChannelDescription(channelNode) : null,
    language: channelNode ? getChannelLanguage(channelNode) : null,
    copyright: channelNode ? getChannelCopyright(channelNode) : null,
    authors: channelNode ? getChannelAuthors(channelNode) : [],
    lastUpdated: channelNode ? getChannelLastUpdated(channelNode) : null,
    lastPublished: channelNode ? getChannelLastPublished(channelNode) : null,
    categories: channelNode ? getChannelCategories(channelNode) : [],
    image: channelNode
      ? getChannelImage(channelNode)
      : {
          url: null,
          title: null,
          description: null,
          width: null,
          height: null,
        },
    itunes: channelNode ? itunesParser.parseChannel(channelNode) : null,
  };
};

const mapItems = (document: Document): Item[] => {
  const itemNodes = utils.getElements(document as unknown as Element, 'item');
  return itemNodes.map((item) => ({
    title: getItemTitle(item),
    links: getItemLinks(item),
    description: getItemDescription(item),
    content: getItemContent(item),
    id: getItemId(item),
    authors: getItemAuthors(item),
    categories: getItemCategories(item),
    published: getItemPublished(item),
    enclosures: getItemEnclosures(item),
    itunes: itunesParser.parseItem(item),
    medias: getItemMedia(item),
  }));
};

export const parse = (document: Document) => ({
  ...model.rss,
  type: 'rss-v2',
  ...mapChannelFields(document),
  items: mapItems(document),
});
