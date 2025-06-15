
import { Button } from '@/components/ui/button';
import { Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StoryFormActionsProps {
  isSaving: boolean;
  showPreview: boolean;
  onSaveDraft: () => void;
  onTogglePreview: () => void;
}

const StoryFormActions = ({ 
  isSaving, 
  showPreview, 
  onSaveDraft, 
  onTogglePreview,
}: StoryFormActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-womb-deepgrey">
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          className="border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onTogglePreview}
          className="border-womb-warmgrey text-womb-warmgrey hover:bg-womb-warmgrey hover:text-womb-charcoal"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>
      
      <div className="flex gap-3 sm:ml-auto">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-womb-warmgrey hover:text-womb-softwhite"
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          disabled={isSaving}
          className="btn-primary"
        >
          <Send className="w-4 h-4 mr-2" />
          {isSaving ? 'Sharing...' : 'Share Story'}
        </Button>
      </div>
    </div>
  );
};

export default StoryFormActions;
