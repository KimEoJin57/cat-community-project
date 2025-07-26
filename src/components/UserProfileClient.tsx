'use client';

import Image from 'next/image';
import { useState } from 'react';

// Sample data for all posts across the community
const allPosts = [
  { id: 1, user: '냥집사123', postImage: '/placeholder.svg', caption: '우리집 첫째 솜뭉치 🐱' },
  { id: 2, user: '고양이언니', postImage: '/placeholder.svg', caption: '햇살 좋은 오후 ☀️' },
  { id: 3, user: '냥집사123', postImage: '/placeholder.svg', caption: '새 장난감!' },
  { id: 4, user: '치즈태비', postImage: '/placeholder.svg', caption: '꾹꾹이 장인' },
  { id: 5, user: '냥집사123', postImage: '/placeholder.svg', caption: '간식 내놔라 집사야' },
  { id: 6, user: '고양이언니', postImage: '/placeholder.svg', caption: '자는 모습도 천사' },
];

const UserProfileClient = ({ username }: { username: string }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Filter posts for the current user
  const userPosts = allPosts.filter(post => post.user === username);

  // In a real app, you would fetch user data based on the username
  const user = {
    name: username,
    image: '/placeholder.svg',
    bio: '고양이를 사랑하는 집사입니다. 우리 냥이들 보러오세요!',
    posts: userPosts.length,
    followers: 1254,
    following: 150,
  };

  return (
    <div className="bg-pink-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col items-center md:flex-row gap-8">
            <Image src={user.image} alt={user.name} width={150} height={150} className="rounded-full bg-gray-200 border-4 border-white shadow-md" />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <button 
                onClick={handleFollow}
                className={`w-full md:w-auto mt-4 font-bold py-2 px-6 rounded-lg transition-all duration-300 ${isFollowing ? 'bg-gray-300 text-gray-700' : 'bg-pink-500 text-white hover:bg-pink-600'}`}>
                {isFollowing ? '팔로잉' : '팔로우'}
              </button>
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-8 mt-8 text-center">
            <div>
              <p className="font-bold text-xl">{user.posts}</p>
              <p className="text-gray-500">게시물</p>
            </div>
            <div>
              <p className="font-bold text-xl">{user.followers.toLocaleString()}</p>
              <p className="text-gray-500">팔로워</p>
            </div>
            <div>
              <p className="font-bold text-xl">{user.following}</p>
              <p className="text-gray-500">팔로잉</p>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left">
            <p className="text-gray-700">{user.bio}</p>
          </div>
        </div>

        {/* User's Post Gallery */}
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {userPosts.map((post) => (
            <div key={post.id} className="relative aspect-square group bg-gray-100 rounded-md overflow-hidden">
              <Image src={post.postImage} alt={post.caption} fill style={{ objectFit: 'cover' }} className="transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center p-2">
                <p className="text-white text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default UserProfileClient;
