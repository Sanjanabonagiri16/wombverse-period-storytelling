
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Plus, X, AlertTriangle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SafeWord {
  id: string;
  word: string;
  category: 'trigger' | 'warning' | 'supportive';
  severity: 'low' | 'medium' | 'high';
  action: 'flag' | 'warn' | 'block';
  created_at: string;
}

interface LanguageGuideline {
  id: string;
  term: string;
  preferred_alternative: string;
  explanation: string;
  category: string;
}

const SafeWordsPanel = () => {
  const { toast } = useToast();
  const [safeWords, setSafeWords] = useState<SafeWord[]>([]);
  const [guidelines, setGuidelines] = useState<LanguageGuideline[]>([]);
  const [newWord, setNewWord] = useState('');
  const [newCategory, setNewCategory] = useState<'trigger' | 'warning' | 'supportive'>('warning');
  const [newSeverity, setNewSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSafeWords();
    fetchLanguageGuidelines();
  }, []);

  const fetchSafeWords = async () => {
    try {
      // Simulate safe words data
      const mockSafeWords: SafeWord[] = [
        {
          id: '1',
          word: 'self-harm',
          category: 'trigger',
          severity: 'high',
          action: 'flag',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          word: 'suicide',
          category: 'trigger',
          severity: 'high',
          action: 'flag',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          word: 'abuse',
          category: 'warning',
          severity: 'high',
          action: 'warn',
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          word: 'trauma',
          category: 'warning',
          severity: 'medium',
          action: 'warn',
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          word: 'support',
          category: 'supportive',
          severity: 'low',
          action: 'flag',
          created_at: new Date().toISOString()
        }
      ];

      setSafeWords(mockSafeWords);
    } catch (error) {
      console.error('Error fetching safe words:', error);
    }
  };

  const fetchLanguageGuidelines = async () => {
    try {
      // Simulate language guidelines data
      const mockGuidelines: LanguageGuideline[] = [
        {
          id: '1',
          term: 'crazy',
          preferred_alternative: 'intense, overwhelming, or specific emotion',
          explanation: 'Avoid using mental health terms casually',
          category: 'Mental Health'
        },
        {
          id: '2',
          term: 'victim',
          preferred_alternative: 'survivor, person who experienced',
          explanation: 'Empowering language that recognizes resilience',
          category: 'Trauma-Informed'
        },
        {
          id: '3',
          term: 'normal',
          preferred_alternative: 'common, typical, or expected',
          explanation: 'Avoid implying abnormality in diverse experiences',
          category: 'Inclusive Language'
        }
      ];

      setGuidelines(mockGuidelines);
    } catch (error) {
      console.error('Error fetching language guidelines:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSafeWord = async () => {
    if (!newWord.trim()) return;

    try {
      const newSafeWord: SafeWord = {
        id: Date.now().toString(),
        word: newWord.trim().toLowerCase(),
        category: newCategory,
        severity: newSeverity,
        action: newSeverity === 'high' ? 'flag' : 'warn',
        created_at: new Date().toISOString()
      };

      setSafeWords(prev => [newSafeWord, ...prev]);
      setNewWord('');
      
      toast({
        title: "Safe word added",
        description: `"${newWord}" has been added to the monitoring system.`,
      });
    } catch (error) {
      console.error('Error adding safe word:', error);
      toast({
        title: "Error",
        description: "Failed to add safe word.",
        variant: "destructive",
      });
    }
  };

  const removeSafeWord = async (id: string) => {
    try {
      setSafeWords(prev => prev.filter(word => word.id !== id));
      toast({
        title: "Safe word removed",
        description: "The word has been removed from monitoring.",
      });
    } catch (error) {
      console.error('Error removing safe word:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trigger': return 'bg-red-900/30 text-red-200 border-red-700/50';
      case 'warning': return 'bg-yellow-900/30 text-yellow-200 border-yellow-700/50';
      case 'supportive': return 'bg-green-900/30 text-green-200 border-green-700/50';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-900/30 text-red-200 border-red-700/50';
      case 'medium': return 'bg-yellow-900/30 text-yellow-200 border-yellow-700/50';
      case 'low': return 'bg-blue-900/30 text-blue-200 border-blue-700/50';
      default: return 'bg-gray-900/30 text-gray-200 border-gray-700/50';
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-800 rounded w-1/3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Safe Words & Language Guidance Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Safe Word */}
          <div className="bg-black/50 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-4">Add New Safe Word</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Enter word or phrase"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
              >
                <option value="warning">Warning</option>
                <option value="trigger">Trigger</option>
                <option value="supportive">Supportive</option>
              </select>
              <select
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value as any)}
                className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <Button onClick={addSafeWord} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-1" />
                Add Word
              </Button>
            </div>
          </div>

          {/* Safe Words List */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Monitored Words & Phrases</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safeWords.map((word) => (
                <div key={word.id} className="bg-black/50 p-3 rounded-lg border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{word.word}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeSafeWord(word.id)}
                      className="border-red-700 text-red-400 hover:bg-red-900/20 h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(word.category)}>
                      {word.category}
                    </Badge>
                    <Badge className={getSeverityColor(word.severity)}>
                      {word.severity}
                    </Badge>
                    <Badge className="bg-gray-900/30 text-gray-200 border-gray-700/50">
                      {word.action}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Guidelines */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              <h4 className="text-white font-medium">Language Guidelines</h4>
            </div>
            
            <div className="space-y-3">
              {guidelines.map((guideline) => (
                <Card key={guideline.id} className="bg-black/50 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-red-300 font-medium">❌ {guideline.term}</span>
                          <Badge className="bg-red-900/30 text-red-200 border-red-700/50">
                            {guideline.category}
                          </Badge>
                        </div>
                        <div className="text-green-300 mb-2">
                          ✅ <span className="font-medium">Instead use:</span> {guideline.preferred_alternative}
                        </div>
                        <p className="text-gray-400 text-sm">{guideline.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
              <div className="text-xl font-bold text-red-300">
                {safeWords.filter(w => w.category === 'trigger').length}
              </div>
              <div className="text-sm text-red-400">Trigger Words</div>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
              <div className="text-xl font-bold text-yellow-300">
                {safeWords.filter(w => w.category === 'warning').length}
              </div>
              <div className="text-sm text-yellow-400">Warning Tags</div>
            </div>
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
              <div className="text-xl font-bold text-green-300">
                {guidelines.length}
              </div>
              <div className="text-sm text-green-400">Language Guidelines</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeWordsPanel;
