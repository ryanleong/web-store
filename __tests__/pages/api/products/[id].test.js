import productApi from '@/pages/api/products/[id]';

describe('api/products/[id]', () => {
  it('should return 404 is method is not GET', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const req = { method: 'POST', query: { id: 1 } };

    productApi(req, res);
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
    const req = { method: 'GET', query: { id: 1 } };

    await productApi(req, res);

    expect(global.fetch).toHaveBeenCalledWith(`${process.env.API_URL}/products/1`);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith([{'something': 123}]);
  });

  it('should return error from API', async () => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([{ something: 123 }]),
        ok: false,
        status: 500,
        statusText: 'Something went wrong',
      })

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const req = { method: 'GET', query: { id: 1 } };

    await productApi(req, res);
    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({'message': 'Something went wrong'});
  });
});
