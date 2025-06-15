
import Layout from '@/components/Layout';
import WhispersWall from '@/components/whispers/WhispersWall';

const Whispers = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-6xl">
        <WhispersWall />
      </div>
    </Layout>
  );
};

export default Whispers;
