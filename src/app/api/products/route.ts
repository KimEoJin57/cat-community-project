import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// This function will handle GET requests to /api/products
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  const ACCESS_KEY = process.env.COUPANG_ACCESS_KEY;
  const SECRET_KEY = process.env.COUPANG_SECRET_KEY;

  if (!ACCESS_KEY || !SECRET_KEY) {
    console.error('Coupang API keys are not set in .env.local');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const method = 'POST';
  const path = '/v2/providers/affiliate_open_api/apis/openapi/v1/products/search';
  const datetime = new Date().toISOString().substr(0, 19) + 'Z';
  
  const message = datetime + method.toUpperCase() + path;

  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(message)
    .digest('hex');

  const authorization = `CEA-HMAC-SHA256 AccessKey=${ACCESS_KEY}, SignedHeaders=x-cea-date, Signature=${signature}`;

  try {
    const response = await fetch(`https://api-gateway.coupang.com${path}` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization,
        'X-CEA-Date': datetime,
      },
      body: JSON.stringify({ 
        keyword: keyword,
        limit: 50, // Fetch up to 50 products
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Coupang API Error:', errorBody);
      return NextResponse.json({ error: `Coupang API request failed with status: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching from Coupang API:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Coupang API' }, { status: 500 });
  }
}
