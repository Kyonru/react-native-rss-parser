import * as utils from './utils';
import * as namespaces from './namespaces';

interface Author {
  name: string;
}

interface SubCategory {
  name: string | null;
}

interface Category {
  name: string | null;
  subCategories: SubCategory[];
}

interface Owner {
  name: string | undefined;
  email: string | undefined;
}

interface Channel {
  authors: Author[];
  block: string | undefined;
  categories: Category[];
  complete: string | undefined;
  explicit: string | undefined;
  image: string | undefined | null;
  newFeedUrl: string | undefined;
  owner: Owner;
  subtitle: string | undefined;
  summary: string | undefined;
}

interface Item {
  authors: Author[];
  block: string | undefined;
  duration: string | undefined;
  explicit: string | undefined;
  image: string | undefined | null;
  isClosedCaptioned: string | undefined;
  order: string | undefined;
  subtitle: string | undefined;
  summary: string | undefined;
}

const getAuthors = (node: Element): Author[] => {
  const authors = utils.getElementTextContentArray(
    node,
    'author',
    namespaces.itunes
  );

  return authors.map((author) => ({
    name: author,
  }));
};

const getBlock = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'block', namespaces.itunes);

const getSubCategories = (node: Element): SubCategory[] => {
  const categories = utils.getChildElements(
    node,
    'category',
    namespaces.itunes
  );

  if (categories.length === 0) {
    return [];
  }

  return categories.map((category) => ({
    name: category.getAttribute('text'),
  }));
};

const getCategories = (node: Element): Category[] => {
  const categories = utils.getChildElements(
    node,
    'category',
    namespaces.itunes
  );

  return categories.map((category) => ({
    name: category.getAttribute('text'),
    subCategories: getSubCategories(category),
  }));
};

const getComplete = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'complete', namespaces.itunes);

const getDuration = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'duration', namespaces.itunes);

const getExplicit = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'explicit', namespaces.itunes);

const getImage = (node: Element): string | undefined | null => {
  const images = utils.getChildElements(node, 'image', namespaces.itunes);

  return images.length > 0 ? images?.[0]?.getAttribute('href') : undefined;
};

const getIsClosedCaptioned = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'isClosedCaptioned', namespaces.itunes);

const getNewFeedUrl = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'new-feed-url', namespaces.itunes);

const getOrder = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'order', namespaces.itunes);

const getOwner = (node: Element): Owner => {
  const owners = utils.getChildElements(node, 'owner', namespaces.itunes);

  if (owners.length === 0) {
    return {
      name: undefined,
      email: undefined,
    };
  }

  return {
    name: utils.getElementTextContent(owners[0], 'name', namespaces.itunes),
    email: utils.getElementTextContent(owners[0], 'email', namespaces.itunes),
  };
};

const getSubtitle = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'subtitle', namespaces.itunes);

const getSummary = (node: Element): string | undefined =>
  utils.getElementTextContent(node, 'summary', namespaces.itunes);

export const parseChannel = (node: Element): Channel => ({
  authors: getAuthors(node),
  block: getBlock(node),
  categories: getCategories(node),
  complete: getComplete(node),
  explicit: getExplicit(node),
  image: getImage(node),
  newFeedUrl: getNewFeedUrl(node),
  owner: getOwner(node),
  subtitle: getSubtitle(node),
  summary: getSummary(node),
});

export const parseItem = (node: Element): Item => ({
  authors: getAuthors(node),
  block: getBlock(node),
  duration: getDuration(node),
  explicit: getExplicit(node),
  image: getImage(node),
  isClosedCaptioned: getIsClosedCaptioned(node),
  order: getOrder(node),
  subtitle: getSubtitle(node),
  summary: getSummary(node),
});
