
import { Globe, Users, Lock } from 'lucide-react';

type PrivacyOption = 'public' | 'community' | 'anonymous';

interface PrivacySelectorProps {
  value: PrivacyOption;
  onChange: (value: PrivacyOption) => void;
}

const privacyOptions = [
  {
    value: 'public' as PrivacyOption,
    label: 'Public',
    description: 'Visible to everyone, including search engines',
    icon: Globe,
  },
  {
    value: 'community' as PrivacyOption,
    label: 'Community Only',
    description: 'Only visible to registered WombVerse members',
    icon: Users,
  },
  {
    value: 'anonymous' as PrivacyOption,
    label: 'Anonymous',
    description: 'Your identity is completely hidden',
    icon: Lock,
  },
];

const PrivacySelector = ({ value, onChange }: PrivacySelectorProps) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-womb-warmgrey">
        Choose who can see your story:
      </p>
      <div className="space-y-2">
        {privacyOptions.map(option => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                w-full p-4 rounded-lg border text-left transition-all duration-200
                ${value === option.value
                  ? 'border-womb-crimson bg-womb-crimson/10'
                  : 'border-womb-deepgrey bg-womb-deepgrey hover:border-womb-warmgrey'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  flex-shrink-0 p-1 rounded-md
                  ${value === option.value ? 'text-womb-crimson' : 'text-womb-warmgrey'}
                `}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium mb-1 ${
                    value === option.value ? 'text-womb-crimson' : 'text-womb-softwhite'
                  }`}>
                    {option.label}
                  </h4>
                  <p className="text-sm text-womb-warmgrey">
                    {option.description}
                  </p>
                </div>
                <div className={`
                  w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1
                  ${value === option.value
                    ? 'border-womb-crimson bg-womb-crimson'
                    : 'border-womb-warmgrey'
                  }
                `}>
                  {value === option.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacySelector;
