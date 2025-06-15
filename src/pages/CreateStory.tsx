
import Layout from '@/components/Layout';
import EnhancedStoryForm from '@/components/story/EnhancedStoryForm';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStory = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-6xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-womb-warmgrey">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-6xl">
        <div className="mb-6 lg:mb-8 bg-gradient-to-r from-indigo-900 via-womb-plum to-womb-charcoal rounded-xl p-6 shadow-lg border border-womb-plum/20">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3 leading-tight">
            Share Your Story <span className="text-red-600">✨</span>
          </h1>
          <p className="text-base md:text-lg text-womb-warmgrey font-medium">
            Your experience matters. Share your story to help others feel less alone on their journey.
          </p>
        </div>
        <EnhancedStoryForm />
      </div>
    </Layout>
  );
};

export default CreateStory;
