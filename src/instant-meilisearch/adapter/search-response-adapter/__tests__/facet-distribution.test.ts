import { adaptFacetDistribution } from '../facet-distribution-adapter'

const initialFacetDistribution = {
  movie: {
    genre: { comedy: 3, horror: 2, drama: 4 },
    releaseYear: { '1990': 10, '2001': 30 },
  },
}

describe('Facet distribution unit tests', () => {
  test('Fill facet values on one undefined facet', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      undefined,
      initialFacetDistribution.movie,
      { genre: { comedy: 3 } }
    )

    expect(returnedDistribution).toEqual({})
  })

  /* checking that the adaptFacetDistribution function correctly handles the case where
  keepZeroFacets is false and facet is undefined, and it should return undefined
  without filling facet values */
  test('Do not fill facet values if keepZeroFacets is false and facet is undefined', () => {
    const returnedDistribution = adaptFacetDistribution(
      false,
      undefined,
      initialFacetDistribution.movie,
      undefined
    );

    expect(returnedDistribution).toBeUndefined();
  });

  /* should return empty  since facetDistribution is empty */
  test('Do not fill facet values if keepZeroFacets is false and facetDistribution is empty', () => {
    const returnedDistribution = adaptFacetDistribution(
      false,
      ['genre'],
      initialFacetDistribution.movie,
      {}
    );

    expect(returnedDistribution).toEqual({});
  });

  /* The expected result is a distribution where missing values are filled with zeros */
  test('Fill facet values on multiple facets with varying initial and current distributions', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      ['genre', 'releaseYear'],
      initialFacetDistribution.movie,
      { genre: { comedy: 3 }, releaseYear: { '2001': 5 } }
    );

    expect(returnedDistribution).toEqual({
      genre: { comedy: 3, horror: 0, drama: 0 },
      releaseYear: { '1990': 0, '2001': 5 },
    });
  });

  test('Fill facet values on one facet in string format', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      'genre',
      initialFacetDistribution.movie,
      { genre: { comedy: 3 } }
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 3, horror: 0, drama: 0 },
    })
  })

  test('Fill facet values on one facet in array format', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      ['genre'],
      initialFacetDistribution.movie,
      { genre: { comedy: 3 } }
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 3, horror: 0, drama: 0 },
    })
  })

  test('Do not fill facet values as keepZeroFacets is false', () => {
    const returnedDistribution = adaptFacetDistribution(
      false,
      ['genre'],
      initialFacetDistribution.movie,
      { genre: { comedy: 3 } }
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 3 },
    })
  })

  test('Fill facet values on empty object distribution', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      'genre',
      initialFacetDistribution.movie,
      {}
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 0, horror: 0, drama: 0 },
    })
  })

  test('Fill facet values on undefined distribution', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      'genre',
      initialFacetDistribution.movie,
      undefined
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 0, horror: 0, drama: 0 },
    })
  })

  test('Fill facet values on empty initial distribution and empty distribution', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      'genre',
      {},
      undefined
    )

    expect(returnedDistribution).toEqual({})
  })

  test('Fill facet values on two facets with only one with results', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      ['genre', 'releaseYear'],
      initialFacetDistribution.movie,
      { genre: { comedy: 3 } }
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 3, horror: 0, drama: 0 },
      releaseYear: { '1990': 0, '2001': 0 },
    })
  })

  test('Fill facet values on two facets', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      ['genre', 'releaseYear'],
      initialFacetDistribution.movie,
      { genre: { comedy: 3 }, releaseYear: { '1990': 1 } }
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 3, horror: 0, drama: 0 },
      releaseYear: { '1990': 1, '2001': 0 },
    })
  })

  test('Fill facet values on two empty facets', () => {
    const returnedDistribution = adaptFacetDistribution(
      true,
      ['genre', 'releaseYear'],
      initialFacetDistribution.movie,
      {}
    )

    expect(returnedDistribution).toEqual({
      genre: { comedy: 0, horror: 0, drama: 0 },
      releaseYear: { '1990': 0, '2001': 0 },
    })
  });
})
