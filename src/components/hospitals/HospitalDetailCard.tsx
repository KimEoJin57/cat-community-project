"use client";

import { Star, Phone, MessageSquare, UserCircle, Clock } from 'lucide-react';
import Link from 'next/link';

// 임시 타입 정의
type Hospital = {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  openingHours: string;
};

const sampleReviews = [
  {
    id: 1,
    author: '냥집사123',
    rating: 5,
    content: '의사선생님 정말 친절하시고, 우리 냥이도 편안하게 진료 잘 받았어요! 강추합니다!!',
    createdAt: '2023-10-26',
  },
  {
    id: 2,
    author: '고양이최고',
    rating: 4,
    content: '시설이 깨끗하고 좋았어요. 다만 대기 시간이 조금 길었네요.',
    createdAt: '2023-10-25',
  },
];

interface HospitalDetailCardProps {
  hospital: Hospital;
}

const HospitalDetailCard = ({ hospital }: HospitalDetailCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{hospital.name}</h2>
      <p className="text-gray-600 mb-4">{hospital.address}</p>
      
      <div className="flex items-center justify-between mb-6 pb-6 border-b">
        <div className="flex items-center text-lg">
          <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
          <span className="font-bold text-yellow-500">{hospital.rating}</span>
          <span className="text-gray-500 ml-2">({hospital.reviewCount}개)</span>
        </div>
        <div className="flex items-center text-lg text-gray-700">
          <Phone className="w-5 h-5 mr-2" />
                    <span>{hospital.phone}</span>
        </div>
      </div>

      <div className="flex items-start text-gray-700 mb-6 pb-6 border-b">
        <Clock className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
        <div>
          <p className="font-bold">영업시간</p>
          <p>{hospital.openingHours}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
          방문자 후기
        </h3>
        <div className="space-y-4">
          {sampleReviews.map(review => (
            <div key={review.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <UserCircle className="w-6 h-6 text-gray-400 mr-2" />
                                    <Link href={`/profile/${review.author}`} className="font-bold hover:underline">
                    {review.author}
                  </Link>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.content}</p>
              <p className="text-xs text-gray-400 text-right mt-2">{review.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailCard;
