import productByCategoryApi from '@/pages/api/products/category/[category]';

describe('api/products/category/[id]', () => {
  it('should return 404 is method is not GET', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const req = { method: 'POST', query: { category: 'food' } };

    productByCategoryApi(req, res);
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: 'Not found' });
  });

  it('should return payload', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ something: 123 }]),
        ok: true,
        status: 200,
        statusText: '',
      })
    );

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const req = { method: 'GET', query: { category: 'food' } };

    await productByCategoryApi(req, res);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.API_URL}/products/category/food`
    );
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith([{ something: 123 }]);
  });

  it('should return error from API', async () => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([{ something: 123 }]),
        ok: false,
        status: 500,
        statusText: 'Something went wrong',
      });

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const req = { method: 'GET', query: { category: 'food' } };

    await productByCategoryApi(req, res);
    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Something went wrong' });
  });
});
