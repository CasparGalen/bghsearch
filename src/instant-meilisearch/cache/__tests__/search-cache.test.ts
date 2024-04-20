import { SearchCache } from '../search-cache'
import { searchResponse } from '../assets/utils';

describe('Entries in the cache', () => {
  test('to getEntry on empty cache', () => {
    const cache = SearchCache();
    const key = cache.getEntry('');

    expect(key).toBeUndefined();
  });

  test('to getEntry on invalid json', () => {
    const cache = SearchCache({ myKey: 'myValue' });
    const key = cache.getEntry('myKey');

    expect(key).toBeUndefined();
  });

  test('to getEntry on valid json string', () => {
    const cache = SearchCache({ myKey: '"myValue"' });
    const key = cache.getEntry('myKey');

    expect(key).toEqual('myValue');
  });

  test('to getEntry on valid json object', () => {
    const cache = SearchCache({ myKey: '{ "id": 1 }' });
    const key = cache.getEntry('myKey');

    expect(key).toHaveProperty('id', 1);
  });

  test('to getEntry on invalid json object', () => {
    const cache = SearchCache({ myKey: '{ id: 1 }' });
    const key = cache.getEntry('myKey');

    expect(key).toBeUndefined();
  });
});

describe('Key formatting in the cache', () => {
  test('to format an empty string', () => {
    const cache = SearchCache();
    const key = cache.formatKey(['']);

    expect(key).toEqual('""');
  });

  test('to format a number', () => {
    const cache = SearchCache();
    const key = cache.formatKey([1]);

    expect(key).toEqual('1');
  });

  test('to format multiple empty strings', () => {
    const cache = SearchCache();
    const key = cache.formatKey(['', '', '']);

    expect(key).toEqual('""""""');
  });

  test('to format empty array', () => {
    const cache = SearchCache();
    const key = cache.formatKey([]);

    expect(key).toEqual('');
  });

  test('to format undefined', () => {
    const cache = SearchCache();
    const key = cache.formatKey([undefined]);

    expect(key).toEqual('undefined');
  });
});

describe('Setting entries in the cache', () => {
  test('Set a response on a key', () => {
    const cache = SearchCache();
    const key = 'test';
    const formattedKey = cache.formatKey([key]);
    cache.setEntry(formattedKey, searchResponse);
    const cached = cache.getEntry(formattedKey);

    expect(JSON.stringify(cached)).toEqual(JSON.stringify(searchResponse));
  });

  test('Set a response on an empty key', () => {
    const cache = SearchCache();
    const key = '';
    const formattedKey = cache.formatKey([key]);
    cache.setEntry(formattedKey, searchResponse);
    const cached = cache.getEntry(formattedKey);

    expect(JSON.stringify(cached)).toEqual(JSON.stringify(searchResponse));
  });

  test('Set a response on an existing key', () => {
    const cache = SearchCache();
    const key = 'test';
    const formattedKey = cache.formatKey([key]);
    cache.setEntry(formattedKey, searchResponse);
    cache.setEntry(formattedKey, searchResponse);
    const cached = cache.getEntry(formattedKey);

    expect(JSON.stringify(cached)).toEqual(JSON.stringify(searchResponse));
  });

  /* functionality of a cache (SearchCache instance) with multiple keys. */
  /* It sets entries in the cache for different keys and then retrieves and compares the cached entries to the expected responses. */
  test('Set responses on multiple keys', () => {
    const cache = SearchCache();
    const key1 = 'key1';
    const key2 = 'key2';
    const key3 = 'key3';
    const formattedKey1 = cache.formatKey([key1]);
    const formattedKey2 = cache.formatKey([key2]);
    const formattedKey3 = cache.formatKey([key3]);

    cache.setEntry(formattedKey1, searchResponse);
    cache.setEntry(formattedKey2, { hits: [{ objectID: '1', name: 'Item 1' }] });
    cache.setEntry(formattedKey3, { hits: [{ objectID: '2', name: 'Item 2' }] });

    const cached1 = cache.getEntry(formattedKey1);
    const cached2 = cache.getEntry(formattedKey2);
    const cached3 = cache.getEntry(formattedKey3);

    expect(JSON.stringify(cached1)).toEqual(JSON.stringify(searchResponse));
    expect(JSON.stringify(cached2)).toEqual(JSON.stringify({ hits: [{ objectID: '1', name: 'Item 1' }] }));
    expect(JSON.stringify(cached3)).toEqual(JSON.stringify({ hits: [{ objectID: '2', name: 'Item 2' }] }));
  });
});
