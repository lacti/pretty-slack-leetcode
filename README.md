# Pretty Leetcode from Slack threads

Make Leetcode solutions as pretty from Slack threads!

## Prerequisite

- [Node.js 14](https://nodejs.org/)
- [pandoc](https://pandoc.org/)

## Quick start

First, download Slack export data and dump them into `data/slack` directory, and,

```bash
yarn
yarn start
```

then, you can see `output.html`.

### Some options

If you want to filter authors, give them as command line argument like this.

```bash
yarn start jaeyoung.choi
```

## License

MIT
