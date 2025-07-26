import UserProfileClient from '@/components/UserProfileClient';

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  return <UserProfileClient username={params.username} />;
}
