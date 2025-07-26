import React from 'react';

const LoggedInHome = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">냥커뮤에 오신 것을 환영합니다!</h1>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">고양이 용품 추천</h3>
          <p className="text-gray-600">쿠팡 파트너스를 통해 인기 있는 고양이 용품을 카테고리별로 추천해드립니다. 사료부터 장난감까지 모든 것을 한 곳에서!</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-4">🏥</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">동물병원 찾기</h3>
          <p className="text-gray-600">지역별 동물병원 정보와 실제 이용자 후기를 확인하세요. 우리 고양이에게 가장 좋은 병원을 찾아보세요.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">집사 커뮤니티</h3>
          <p className="text-gray-600">인스타그램 스타일로 고양이 사진을 공유하고, 다른 집사들과 소통하며 정보를 나누세요. 해시태그로 쉽게 찾아보세요!</p>
        </div>
      </div>
    </div>
  );
};

export default LoggedInHome;
