import { getCurrentUser, getUserById } from '@/lib/data';
import UserProfile from '@/components/dashboard/profile/user';

export default async function ProfilePage() {

  const user = await getCurrentUser()

  const profile = await getUserById(user?.id as string)

  return (
    <div className="mx-auto">
      <h1 className="text-4xl font-bold text-regal-700 mb-10">Mon Profil</h1>

      <UserProfile initialData={profile} />
    </div>
  );
}