
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
    <div className="flex flex-col space-y-3 pt-6 border-t border-womb-deepgrey md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          className="w-full md:w-auto border-womb-plum text-womb-plum hover:bg-womb-plum hover:text-white text-sm md:text-base h-10 md:h-12"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onTogglePreview}
          className="w-full md:w-auto border-womb-warmgrey text-womb-warmgrey hover:bg-womb-warmgrey hover:text-womb-charcoal text-sm md:text-base h-10 md:h-12"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>
      
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 md:ml-auto">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/')}
          className="w-full md:w-auto text-womb-warmgrey hover:text-womb-softwhite text-sm md:text-base h-10 md:h-12"
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          disabled={isSaving}
          className="w-full md:w-auto btn-primary text-sm md:text-base h-10 md:h-12"
        >
          <Send className="w-4 h-4 mr-2" />
          {isSaving ? 'Sharing...' : 'Share Story'}
        </Button>
      </div>
    </div>
  );
};

export default StoryFormActions;
