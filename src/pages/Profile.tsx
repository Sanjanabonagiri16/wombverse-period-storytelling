
import Layout from '@/components/Layout';
import EnhancedProfile from '@/components/profile/EnhancedProfile';

const Profile = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <EnhancedProfile />
      </div>
    </Layout>
  );
};

export default Profile;
