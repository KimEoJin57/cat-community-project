'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HomePageProps {
  handleLogin: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ handleLogin }) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    if (!email) return '이메일을 입력해주세요.';
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return '비밀번호를 입력해주세요.';
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;
    if (!passwordRegex.test(password)) return '영문, 숫자, 특수문자를 포함하여 8~16자로 입력해주세요.';
    return '';
  };

  useEffect(() => {
    const fullEmail = isDirectInput && emailDomain.trim() === '' ? '' : `${emailUser}@${emailDomain}`;
    setEmail(fullEmail);
    if (emailUser || emailDomain) {
      setEmailError(validateEmail(fullEmail));
    } else {
      setEmailError('');
    }
  }, [emailUser, emailDomain, isDirectInput]);

  const handleEmailUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    setEmailUser(newUser);
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDomain = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    setEmailDomain(newDomain);
  };

  const handleDomainSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value;
    if (selectedDomain === 'direct') {
      setIsDirectInput(true);
      setEmailDomain('');
    } else {
      setIsDirectInput(false);
      setEmailDomain(selectedDomain);
    }
  };

  const handleEmailBlur = () => {
    const fullEmail = `${emailUser}@${emailDomain}`;
    setEmailError(validateEmail(fullEmail));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 한글 입력 방지
    let newPassword = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    // 16자 이상 입력 방지
    if (newPassword.length > 16) {
      newPassword = newPassword.slice(0, 16);
    }
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentEmailError = validateEmail(email);
    const currentPasswordError = validatePassword(password);
    setEmailError(currentEmailError);
    setPasswordError(currentPasswordError);

    if (!currentEmailError && !currentPasswordError) {
      console.log('Login form submitted. Calling handleLogin from props.');
      handleLogin();
    }
  };

  const isFormInvalid = useMemo(() => {
    return !!validateEmail(email) || !!validatePassword(password);
  }, [email, password]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🐱</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            당신의 고양이 생활을<br />
            <span className="text-pink-600">더욱 풍요롭게</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            쿠팡 인기 고양이 용품 + 집사 커뮤니티를 한 곳에!
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">로그인</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email-user">
                아이디
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    id="email-user"
                    type="text"
                    value={emailUser}
                    onChange={handleEmailUserChange}
                    onBlur={handleEmailBlur}
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors',
                      emailError ? 'border-red-500' : 'border-gray-300'
                    )}
                    placeholder="아이디 (이메일 형식)"
                    required
                  />
                </div>
                <span className="text-gray-500">@</span>
                <div className="flex-1">
                  {isDirectInput ? (
                    <input
                      id="email-domain"
                      type="text"
                      value={emailDomain}
                      onChange={handleDomainChange}
                      onBlur={handleEmailBlur}
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors',
                        emailError ? 'border-red-500' : 'border-gray-300'
                      )}
                      placeholder="도메인 입력"
                      required
                    />
                  ) : (
                    <select
                      id="email-domain-select"
                      value={emailDomain}
                      onChange={handleDomainSelect}
                      onBlur={handleEmailBlur}
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors bg-white',
                        emailError ? 'border-red-500' : 'border-gray-300'
                      )}
                    >
                      <option value="naver.com">naver.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="nate.com">nate.com</option>
                      <option value="direct">직접입력</option>
                    </select>
                  )}
                </div>
              </div>
              {emailError ? (
                <p className="text-red-500 text-xs mt-2">{emailError}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-2">올바른 이메일 형식으로 입력해주세요.</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">비밀번호</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8~16자)"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  className={cn(
                    'w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 outline-none transition text-gray-800',
                    passwordError ? 'border-red-500 focus:ring-red-300 focus:border-red-500' : 'border-gray-200 focus:ring-pink-300 focus:border-pink-300'
                  )}
                  required
                />
              </div>
              {passwordError ? (
                <p className="text-red-500 text-xs mt-2">{passwordError}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-2">영문, 숫자, 특수문자를 포함하여 8~16자로 입력해주세요.</p>
              )}
            </div>

            <button
              type="submit"
              className={cn(
                'w-full font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md',
                isFormInvalid ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg'
              )}
              disabled={isFormInvalid}
            >
              <LogIn className="mr-2" size={20} />
              로그인
            </button>
          </form>
          <div className="text-center mt-6 text-sm text-gray-600">
            <a href="#" className="hover:text-pink-600 transition-colors">회원가입</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-pink-600 transition-colors">비밀번호 찾기</a>
          </div>
        </div>

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

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🎯 사용법</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-pink-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <span className="text-2xl">1️⃣</span> </div>
              <h4 className="font-semibold text-gray-800 mb-2">용품 둘러보기</h4>
              <p className="text-sm text-gray-600">카테고리별로 인기 상품을 확인하세요</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <span className="text-2xl">2️⃣</span> </div>
              <h4 className="font-semibold text-gray-800 mb-2">병원 찾기</h4>
              <p className="text-sm text-gray-600">우리 동네 좋은 병원을 찾아보세요</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <span className="text-2xl">3️⃣</span> </div>
              <h4 className="font-semibold text-gray-800 mb-2">사진 공유</h4>
              <p className="text-sm text-gray-600">귀여운 고양이 사진을 업로드하세요</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> <span className="text-2xl">4️⃣</span> </div>
              <h4 className="font-semibold text-gray-800 mb-2">소통하기</h4>
              <p className="text-sm text-gray-600">다른 집사들과 정보를 나누세요</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-3xl p-6 text-center shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🤝 쿠팡 파트너스 안내</h3>
          <p className="text-gray-600 text-sm">본 사이트는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다. 하지만 구매자에게는 추가 비용이 발생하지 않으며, 양질의 정보 제공을 위해 노력하고 있습니다.</p>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20">
        <label className="cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <div className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </label>
      </div>
    </div>
  )
}

export default HomePage
