'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Send, Plus } from 'lucide-react';

// Type definitions for our data structures
interface Comment {
  user: string;
  text: string;
}

interface Post {
  id: number;
  user: string;
  userImage: string;
  postImage: string;
  caption: string;
  initialLikes: number;
  initialComments: Comment[];
}

// Sample data for community posts
const initialPosts: Post[] = [
  { id: 1, user: '냥집사123', userImage: '/placeholder.svg', postImage: '/placeholder.svg', caption: '우리집 첫째 솜뭉치 🐱 #고양이 #냥스타그램', initialLikes: 125, initialComments: [{user: '고양이언니', text: '너무 귀여워요!'}] },
  { id: 2, user: '고양이언니', userImage: '/placeholder.svg', postImage: '/placeholder.svg', caption: '햇살 좋은 오후 ☀️', initialLikes: 230, initialComments: [] },
  { id: 3, user: '집사생활', userImage: '/placeholder.svg', postImage: '/placeholder.svg', caption: '새 장난감 사줬더니 신났어요! #캣토이', initialLikes: 98, initialComments: [{user: '치즈태비', text: '어디서 사셨나요?'}] },
  { id: 4, user: '치즈태비', userImage: '/placeholder.svg', postImage: '/placeholder.svg', caption: '꾹꾹이 장인', initialLikes: 542, initialComments: [] },
];

// Component for a single post card
const PostCard = ({ post }: { post: Post }) => {
  const [likes, setLikes] = useState(post.initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.initialComments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { user: '나', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      {/* Post Header */}
      <div className="p-4 flex items-center">
        <Link href={`/profile/${post.user}`} className="flex items-center group">
          <Image src={post.userImage} alt={post.user} width={40} height={40} className="rounded-full mr-3 bg-gray-200" />
          <span className="font-semibold text-gray-700 group-hover:text-pink-500 transition-colors">{post.user}</span>
        </Link>
      </div>

      {/* Post Image */}
      <div className="relative w-full aspect-square">
        <Image src={post.postImage} alt={post.caption} layout="fill" objectFit="cover" />
      </div>

      {/* Post Actions & Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={handleLike}>
            <Heart className={`w-7 h-7 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
          </button>
          <MessageCircle className="w-7 h-7 text-gray-500" />
        </div>
        <p className="font-bold mb-2">{likes.toLocaleString()}명이 좋아합니다</p>
        <p className="text-gray-800 mb-4">
          <span className="font-semibold">{post.user}</span> {post.caption}
        </p>

        {/* Comments */}
        <div className="space-y-2 mb-4 overflow-y-auto max-h-24">
          {comments.map((comment: Comment, index: number) => (
            <div key={index}>
              <span className="font-semibold">{comment.user}</span> {comment.text}
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글 달기..."
            className="w-full bg-transparent focus:outline-none"
          />
          <button type="submit" className="text-pink-500 font-semibold disabled:text-gray-300" disabled={!newComment.trim()}>
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  return (
    <div className="bg-yellow-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">냥이 자랑 커뮤니티</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {initialPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Floating Upload Button */}
      <button className="fixed bottom-8 right-8 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300 z-50">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
};

export default CommunityPage;
