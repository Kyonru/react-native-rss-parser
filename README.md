# @kyonru/react-native-rss-parser

React Native compatible package to parse RSS feeds

## Installation

```sh
npm install @kyonru/react-native-rss-parser
```

## Usage

```js
import * as RssParser from '@kyonru/react-native-rss-parser';

export const getParsed = async (url: string) => {
  const request = await fetch(url);
  const response = await request.text();

  const parsed = await RssParser.parse(response); // or parseToJson, which will parse the whole object ignoring specifications, might contain unnecessary data

  return (parsed || {}) as RssParser.Rss;
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

Based on [jameslawler/react-native-rss-parser](https://github.com/jameslawler/react-native-rss-parser)
