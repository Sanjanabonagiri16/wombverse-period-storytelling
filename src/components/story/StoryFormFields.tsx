
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { StoryFormData } from './StoryCreationForm';
import EmotionTags from './EmotionTags';
import PrivacySelector from './PrivacySelector';

interface StoryFormFieldsProps {
  form: UseFormReturn<StoryFormData>;
}

const StoryFormFields = ({ form }: StoryFormFieldsProps) => {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Story Title */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-womb-softwhite text-sm md:text-base">Story Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Give your story a meaningful title..."
                className="bg-womb-deepgrey border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson text-sm md:text-base h-10 md:h-12"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Category Selection */}
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-womb-softwhite text-sm md:text-base">Category</FormLabel>
            <FormControl>
              <select
                className="w-full h-10 md:h-12 rounded-md border border-womb-deepgrey bg-womb-deepgrey px-3 py-2 text-sm md:text-base text-womb-softwhite focus:border-womb-crimson focus:outline-none"
                {...field}
              >
                <option value="">Select a category</option>
                <option value="first-period">First Period Experience</option>
                <option value="period-pain">Managing Period Pain</option>
                <option value="period-products">Period Products & Tips</option>
                <option value="workplace-school">Period at Work/School</option>
                <option value="cultural-experience">Cultural Perspectives</option>
                <option value="support-advice">Support & Advice</option>
                <option value="celebration">Period Positivity</option>
                <option value="other">Other</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Story Content */}
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-womb-softwhite text-sm md:text-base">Your Story</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Share your experience, thoughts, or advice. Remember, your story matters and can help others feel less alone..."
                className="min-h-[250px] md:min-h-[300px] bg-womb-deepgrey border-womb-deepgrey text-womb-softwhite placeholder-womb-warmgrey focus:border-womb-crimson resize-none text-sm md:text-base"
                {...field}
              />
            </FormControl>
            <div className="flex justify-between text-xs md:text-sm text-womb-warmgrey">
              <span>{field.value.length}/5000 characters</span>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Emotion Tags */}
      <FormField
        control={form.control}
        name="emotionTags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-womb-softwhite text-sm md:text-base">How did this experience make you feel?</FormLabel>
            <FormControl>
              <EmotionTags
                selectedTags={field.value}
                onTagsChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Privacy Settings */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-womb-softwhite text-sm md:text-base">Privacy Settings</FormLabel>
              <FormControl>
                <PrivacySelector
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAnonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-womb-crimson bg-womb-deepgrey border-womb-deepgrey rounded focus:ring-womb-crimson focus:ring-2"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-womb-softwhite cursor-pointer text-sm md:text-base font-normal">
                Post anonymously (your username won't be shown)
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default StoryFormFields;
