# BGH Search - A Search Frontend for BGH Judgements

This is a frontend that is specifically desinged for searching BGH-Judgements. You can see a working example under [bgh-urteil-suche.de](https://bgh-urteil-suche.de). It requires a [meilisearch](https://github.com/meilisearch/meilisearch) backend sever to run
Check out [bghinsights](https://github.com/progius/bghinsights) repository on how to build the search index.
## Usage
First set the environment variables in the .env file to connect with the meilisearch server.
Afterwards you can simply use npm to install and run your own search interface:

```sh
npm install
npm start
```
