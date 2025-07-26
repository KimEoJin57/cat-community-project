import { NextResponse } from 'next/server';

// 상품 데이터의 타입을 정의합니다.
interface Product {
  productName: string;
  productPrice: number;
  productUrl: string;
  productImage: string;
}

// 실제 API 대신 사용할 임시 상품 데이터입니다.
const sampleProducts: Product[] = [
  {
    productName: '고양이 츄르 간식 50개입',
    productPrice: 15000,
    productUrl: '#',
    productImage: 'https://placekitten.com/300/300',
  },
  {
    productName: '프리미엄 고양이 사료 2kg',
    productPrice: 28000,
    productUrl: '#',
    productImage: 'https://placekitten.com/301/301',
  },
  {
    productName: '푹신한 고양이 숨숨집',
    productPrice: 45000,
    productUrl: '#',
    productImage: 'https://placekitten.com/302/302',
  },
  {
    productName: '고양이 자동 장난감',
    productPrice: 22000,
    productUrl: '#',
    productImage: 'https://placekitten.com/303/303',
  },
  {
    productName: '스크래쳐 겸용 캣타워',
    productPrice: 89000,
    productUrl: '#',
    productImage: 'https://placekitten.com/304/304',
  },
  {
    productName: '향기로운 고양이 모래 10L',
    productPrice: 18000,
    productUrl: '#',
    productImage: 'https://placekitten.com/305/305',
  },
];

/**
 * GET 요청을 처리하여 상품 목록을 반환합니다.
 * 현재는 쿠팡 API 대신 임시 데이터를 반환합니다.
 */
export async function GET() {
  // 나중에 실제 API 로직을 다시 추가할 수 있습니다.
  // 지금은 임시 데이터를 반환합니다.
  console.log('Fetching sample product data...');

  // API 응답 형식에 맞게 데이터를 감싸서 반환합니다.
  return NextResponse.json({ items: sampleProducts });
}
