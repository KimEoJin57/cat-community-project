import Link from 'next/link';
import { Bone, Cat, ShoppingBasket, PawPrint, ToyBrick, Home, TowerControl, CupSoda, House, Plane } from 'lucide-react';

const categories = [
  { name: '사료', href: '/products/food', icon: Bone, color: 'bg-pink-200' },
  { name: '모래', href: '/products/sand', icon: ShoppingBasket, color: 'bg-yellow-200' },
  { name: '화장실', href: '/products/toilet', icon: Cat, color: 'bg-blue-200' },
  { name: '스크래처', href: '/products/scratcher', icon: PawPrint, color: 'bg-green-200' },
  { name: '장난감', href: '/products/toy', icon: ToyBrick, color: 'bg-purple-200' },
  { name: '캣타워', href: '/products/cattower', icon: TowerControl, color: 'bg-orange-200' },
  { name: '식기', href: '/products/dishes', icon: CupSoda, color: 'bg-teal-200' },
  { name: '급수기', href: '/products/water-fountain', icon: CupSoda, color: 'bg-cyan-200' },
  { name: '하우스', href: '/products/house', icon: House, color: 'bg-red-200' },
  { name: '이동장', href: '/products/carrier', icon: Plane, color: 'bg-indigo-200' },
];

const ProductsPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">고양이 용품 카테고리</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link href={category.href} key={category.name}>
              <div className={`flex flex-col items-center justify-center p-6 ${category.color} rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer aspect-square`}>
                <Icon className="w-16 h-16 text-gray-700 mb-4" />
                <span className="text-xl font-semibold text-gray-800">{category.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
