import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { category } = req?.query || {};

  if (req.method === 'GET' && category) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/category/${category}`
      );
      if (!response.ok) {
        throw new Error(`${response.statusText}`, { cause: response });
      }

      const data = await response.json();
      res.status(response.status).json(data);
      return;
    } catch (error: any) {
      const { cause } = error || {};
      const { status, statusText } = cause || {};
      res.status(status).json({ message: statusText });
      return;
    }
  }

  res.status(404).json({ message: 'Not found' });
};

export default handler;
