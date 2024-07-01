export interface Link {
  url: string | undefined;
  rel: string | undefined;
}

export interface Author {
  name: string | undefined;
}

export interface Category {
  name: string | undefined;
}

export interface Image {
  url: string | undefined;
  title: string | undefined;
  description: string | undefined;
  width: number | undefined;
  height: number | undefined;
}

export interface ItunesCategory {
  name: string | undefined;
  subCategories: SubCategory[];
}

export interface SubCategory {
  name: string | undefined;
}

export interface Itunes {
  author: Author[];
  block: boolean | undefined;
  categories: ItunesCategory[];
  image: string | undefined;
  explicit: boolean | undefined;
  complete: boolean | undefined;
  newFeedUrl: string | undefined;
  owner: Owner;
  subtitle: string | undefined;
  summary: string | undefined;
}

export interface Owner {
  name: string | undefined;
  email: string | undefined;
}

export interface Enclosure {
  url: string | undefined;
  length: number | undefined;
  mimeType: string | undefined;
}

export interface Media {
  url: string | undefined;
  type: string | undefined;
  fileSize: number | undefined;
  medium: string | undefined;
}

export interface ItunesItem {
  authors: Author[];
  block: boolean | undefined;
  duration: string | undefined;
  explicit: boolean | undefined;
  image: string | undefined;
  isClosedCaptioned: boolean | undefined;
  order: number | undefined;
  subtitle: string | undefined;
  summary: string | undefined;
}

export interface Item {
  title: string | undefined;
  links: Link[];
  id: string | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
  content: string | undefined;
  categories: Category[];
  authors: Author[];
  published: string | undefined;
  enclosures: Enclosure[];
  itunes: ItunesItem;
  medias: Media[];
}

export interface Rss {
  type: string | undefined;
  title: string | undefined;
  links: Link[];
  description: string | undefined;
  language: string | undefined;
  copyright: string | undefined;
  authors: Author[];
  lastUpdated: string | undefined;
  lastPublished: string | undefined;
  categories: Category[];
  image: Image;
  itunes: Itunes;
  items: Item[];
}

export const rss: Rss = {
  type: undefined,
  title: undefined,
  links: [
    {
      url: undefined,
      rel: undefined,
    },
  ],
  description: undefined,
  language: undefined,
  copyright: undefined,
  authors: [
    {
      name: undefined,
    },
  ],
  lastUpdated: undefined,
  lastPublished: undefined,
  categories: [
    {
      name: undefined,
    },
  ],
  image: {
    url: undefined,
    title: undefined,
    description: undefined,
    width: undefined,
    height: undefined,
  },
  itunes: {
    author: [
      {
        name: undefined,
      },
    ],
    block: undefined,
    categories: [
      {
        name: undefined,
        subCategories: [
          {
            name: undefined,
          },
        ],
      },
    ],
    image: undefined,
    explicit: undefined,
    complete: undefined,
    newFeedUrl: undefined,
    owner: {
      name: undefined,
      email: undefined,
    },
    subtitle: undefined,
    summary: undefined,
  },
  items: [
    {
      title: undefined,
      links: [
        {
          url: undefined,
          rel: undefined,
        },
      ],
      id: undefined,
      imageUrl: undefined,
      description: undefined,
      content: undefined,
      categories: [
        {
          name: undefined,
        },
      ],
      authors: [
        {
          name: undefined,
        },
      ],
      published: undefined,
      enclosures: [
        {
          url: undefined,
          length: undefined,
          mimeType: undefined,
        },
      ],
      itunes: {
        authors: [
          {
            name: undefined,
          },
        ],
        block: undefined,
        duration: undefined,
        explicit: undefined,
        image: undefined,
        isClosedCaptioned: undefined,
        order: undefined,
        subtitle: undefined,
        summary: undefined,
      },
      medias: [
        {
          url: undefined,
          type: undefined,
          fileSize: undefined,
          medium: undefined,
        },
      ],
    },
  ],
};
