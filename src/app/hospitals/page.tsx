"use client";

import { useState, useEffect } from 'react';
import { useKakaoLoader, Map as KakaoMap, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import { getDistanceFromLatLonInKm } from '@/lib/utils';
import HospitalDetailCard from '@/components/hospitals/HospitalDetailCard';
import { Search, Star, Phone } from 'lucide-react';

// 샘플 데이터에 위도(lat), 경도(lng) 추가
const allHospitals = [
  {
    id: 1,
    name: '튼튼 고양이 병원',
    address: '서울시 강남구 냥이대로 123',
    phone: '02-123-4567',
    rating: 4.8,
    reviewCount: 120,
    lat: 37.507313, 
    lng: 127.053918,
    openingHours: '평일 09:00 - 19:00, 주말 10:00 - 17:00'
  },
  {
    id: 2,
    name: '행복한 캣 클리닉',
    address: '서울시 서초구 집사로 45',
    phone: '02-234-5678',
    rating: 4.9,
    reviewCount: 235,
    lat: 37.488439, 
    lng: 127.005824,
    openingHours: '매일 10:00 - 20:00 (수요일 휴무)'
  },
  {
    id: 3,
    name: '24시 야옹 동물메디컬센터',
    address: '경기도 성남시 분당구 판교역로 1',
    phone: '031-345-6789',
    rating: 4.7,
    reviewCount: 88,
    lat: 37.394776, 
    lng: 127.111148,
    openingHours: '24시간 연중무휴'
  },
];

const HospitalsPage = () => {
  const [loading, error] = useKakaoLoader({ appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!, libraries: ['services', 'clusterer'] });

  const [map, setMap] = useState<kakao.maps.Map>();
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitals, setHospitals] = useState(allHospitals);
  const [selectedHospital, setSelectedHospital] = useState<(typeof allHospitals)[0] | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  useEffect(() => {
    if (selectedHospital) {
      setIsDetailVisible(true);
    } else {
      setIsDetailVisible(false);
    }
  }, [selectedHospital]);

  useEffect(() => {
    if (map && selectedHospital) {
      const newCenter = new kakao.maps.LatLng(selectedHospital.lat, selectedHospital.lng);
      map.panTo(newCenter);
    }
  }, [map, selectedHospital]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim() || !map) return;

    const ps = new kakao.maps.services.Places();
        setSelectedHospital(null);
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const firstResult = data[0];
        const newCenter = new kakao.maps.LatLng(Number(firstResult.y), Number(firstResult.x));
                map.setCenter(newCenter);

        const searchLat = Number(firstResult.y);
        const searchLng = Number(firstResult.x);

        const nearbyHospitals = allHospitals.filter(hospital => {
          const distance = getDistanceFromLatLonInKm(searchLat, searchLng, hospital.lat, hospital.lng);
          return distance <= 5; // 5km 이내
        });

        setHospitals(nearbyHospitals);

        if(nearbyHospitals.length === 0) {
          alert('주변 5km 이내에 동물병원이 없습니다.');
        }
      } else {
        alert('검색 결과가 없습니다.');
      }
    });
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">우리 동네 동물병원 찾기</h1>
        <p className="text-center text-gray-600 mb-12">지역을 검색하여 가까운 동물병원을 찾아보세요.</p>

        {/* Search Bar */}
        <form className="max-w-2xl mx-auto mb-12" onSubmit={handleSearch}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="예: 서울시 강남구, 판교역" 
              className="w-full p-4 pl-12 pr-28 text-lg border-2 border-blue-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </form>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map and List Container */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-8">
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg aspect-square lg:aspect-auto overflow-hidden h-[60vh]">
              {loading && (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-gray-500">지도 로딩 중...</p>
                </div>
              )}
              {error && (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-red-500">지도 로딩에 실패했습니다. API 키를 확인해주세요.</p>
                </div>
              )}
              {!loading && !error && (
                <KakaoMap
                  center={{ lat: 37.507313, lng: 127.053918 }}
                  style={{ width: '100%', height: '100%' }}
                  level={5}
                  onCreate={setMap}
                >
                  {hospitals.map((hospital) => (
                    <MapMarker
                      key={hospital.id}
                      position={{ lat: hospital.lat, lng: hospital.lng }}
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      {selectedHospital?.id === hospital.id && (
                        <MapInfoWindow position={{ lat: hospital.lat, lng: hospital.lng }} removable={true}>
                          <div className="p-2 text-sm font-bold">{hospital.name}</div>
                        </MapInfoWindow>
                      )}
                    </MapMarker>
                  ))}
                </KakaoMap>
              )}
            </div>

            {/* Hospital List */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">검색 결과</h2>
              </div>
              <div className="space-y-2 p-4 max-h-[40vh] overflow-y-auto">
                {hospitals.map((hospital) => (
                  <div 
                    key={hospital.id} 
                    className={`p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer ${selectedHospital?.id === hospital.id ? 'bg-blue-100 ring-2 ring-blue-300' : ''}`}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <h3 className="font-bold text-lg text-gray-800">{hospital.name}</h3>
                    <p className="text-gray-600">{hospital.address}</p>
                    <div className="flex items-center text-sm mt-2 text-gray-500">
                      <div className="flex items-center mr-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-bold text-yellow-500">{hospital.rating}</span>
                        <span className="ml-1">({hospital.reviewCount})</span>
                      </div>
                      <div className="flex items-center">
                         <Phone className="w-4 h-4 mr-1" />
                         <span>{hospital.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hospital Detail View */}
          <div className={`transition-all duration-500 ease-in-out ${isDetailVisible ? 'opacity-100' : 'opacity-0'}`}>
            {selectedHospital ? (
              <HospitalDetailCard hospital={selectedHospital} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center h-full text-center">
                <Search className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-700">병원을 선택해주세요</h3>
                <p className="text-gray-500 mt-2">지도나 목록에서 병원을 클릭하여<br/>상세 정보와 후기를 확인하세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalsPage;
