import useApi from '../useApi';

global.fetch = jest.fn();

describe('useApi', () => {
  it('fetches products', async () => {
    const mockData = [{ id: '1', name: 'Product 1' }];
    (global.fetch).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { fetchProducts } = useApi();
    const data = await fetchProducts({});

    expect(data).toEqual(mockData);
  });

  it('fetches a product', async () => {
    const mockData = { id: '1', name: 'Product 1' };
    (global.fetch).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { fetchProduct } = useApi();
    const data = await fetchProduct('1');

    expect(data).toEqual(mockData);
  });

  it('fetches categories', async () => {
    const mockData = ['Category 1', 'Category 2'];
    (global.fetch).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { fetchCategories } = useApi();
    const data = await fetchCategories();

    expect(data).toEqual(mockData);
  });
});