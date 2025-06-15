
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface StoryData {
  title: string;
  content: string;
  emotionTags: string[];
  privacy: string;
  category: string;
  isAnonymous: boolean;
}

interface StoryPreviewProps {
  story: StoryData;
}

const StoryPreview = ({ story }: StoryPreviewProps) => {
  const getEmotionTagColor = (tag: string) => {
    const colorMap: Record<string, string> = {
      'empowering': 'text-green-400 bg-green-400/20',
      'challenging': 'text-orange-400 bg-orange-400/20',
      'educational': 'text-blue-400 bg-blue-400/20',
      'supportive': 'text-womb-plum bg-womb-plum/20',
      'funny': 'text-yellow-400 bg-yellow-400/20',
      'scary': 'text-red-400 bg-red-400/20',
      'relieving': 'text-cyan-400 bg-cyan-400/20',
      'frustrating': 'text-pink-400 bg-pink-400/20',
    };
    return colorMap[tag] || 'text-womb-warmgrey bg-womb-warmgrey/20';
  };

  return (
    <div className="space-y-6">
      <div className="bg-womb-deepgrey/50 border border-womb-plum/30 rounded-lg p-6">
        <h3 className="text-lg font-medium text-womb-plum mb-4">Story Preview</h3>
        
        {/* Story Card Preview */}
        <div className="story-card">
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-womb-crimson to-womb-plum rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {story.isAnonymous ? '?' : 'U'}
              </span>
            </div>
            <div>
              <p className="text-womb-softwhite font-medium">
                {story.isAnonymous ? 'Anonymous' : 'Your Username'}
              </p>
              <p className="text-womb-warmgrey text-sm">Just now</p>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-playfair font-semibold text-womb-softwhite">
              {story.title || 'Your story title will appear here'}
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-womb-softwhite whitespace-pre-wrap">
                {story.content || 'Your story content will appear here...'}
              </p>
            </div>

            {/* Emotion Tags */}
            {story.emotionTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {story.emotionTags.map(tag => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getEmotionTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Category Badge */}
            {story.category && (
              <div className="inline-block">
                <span className="px-3 py-1 bg-womb-warmgrey/20 text-womb-warmgrey text-sm rounded-full">
                  {story.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            )}
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-womb-deepgrey">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-womb-warmgrey hover:text-womb-crimson transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">0</span>
              </button>
              <button className="flex items-center space-x-2 text-womb-warmgrey hover:text-womb-plum transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">0</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-womb-warmgrey hover:text-womb-softwhite transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Privacy Info */}
        <div className="mt-4 p-3 bg-womb-charcoal rounded-lg">
          <p className="text-sm text-womb-warmgrey">
            <strong>Privacy:</strong> {story.privacy.replace(/^\w/, c => c.toUpperCase())}
            {story.isAnonymous && ' • Posted anonymously'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPreview;
