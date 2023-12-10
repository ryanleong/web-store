import type { NextApiRequest, NextApiResponse } from 'next'
import { API_URL } from '@/utils/constants';

type ResponseData = {
  message: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { id } = req?.query || {};

  if (req.method === 'GET' && id) {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`${response.statusText}`, { cause: response });
      }

      const data = await response.json();
      res.status(response.status).json(data)
    } catch (error: any) {
      const { cause } = error || {};
      const { status, statusText } = cause || {};
      res.status(status).json({ message: statusText })
    }
  }

  res.status(404).json({ message: 'Not found' });
}

export default handler;