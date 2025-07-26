

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';


// Type for a single product, based on Coupang API response
export interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  productUrl: string;
}

const CategoryPage = () => {
  const params = useParams();
  const { category: categorySlug } = params;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryNameMap: { [key: string]: string } = {
    food: '사료',
    sand: '모래',
    toilet: '화장실',
    scratcher: '스크래처',
    toy: '장난감',
    cattower: '캣타워',
    dishes: '식기',
    'water-fountain': '급수기',
    house: '하우스',
    carrier: '이동장',
  };

  const categoryName = typeof categorySlug === 'string' ? categoryNameMap[categorySlug] || '알 수 없는 카테고리' : '로딩 중...';

  useEffect(() => {
    if (typeof categorySlug !== 'string' || categoryName === '로딩 중...') return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/products?keyword=${encodeURIComponent('고양이 ' + categoryName)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.rCode !== '0') {
          throw new Error(data.rMessage || 'Failed to fetch products from Coupang.');
        }

        setProducts(data.data?.productData || []);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, categoryName]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        {categoryName} 추천 상품
      </h1>

      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">상품을 불러오는 중입니다...</p>
        </div>
      )}
      {error && <p className="text-center text-red-500">오류가 발생했습니다: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500">추천 상품이 없습니다.</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.productId} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <div className="relative">
              <img className="w-full h-56 object-cover" src={product.productImage} alt={product.productName} />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg text-gray-800 truncate">{product.productName}</h3>
              <p className="mt-2 text-xl font-bold text-pink-500">{product.productPrice.toLocaleString()}원</p>
              <a 
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block w-full text-center bg-pink-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-500 transition-colors duration-300 mt-4"
              >
                구매하러 가기
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
