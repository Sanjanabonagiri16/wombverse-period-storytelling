
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RotateCcw, Search, Clock, User, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DeletedItem {
  id: string;
  content_type: 'story' | 'comment';
  original_id: string;
  title?: string;
  content: string;
  author_name: string;
  deleted_by: string;
  deleted_at: string;
  deletion_reason: string;
  version_history: any[];
}

const RollbackSystem = () => {
  const { toast } = useToast();
  const [deletedItems, setDeletedItems] = useState<DeletedItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<'all' | 'story' | 'comment'>('all');

  useEffect(() => {
    fetchDeletedItems();
  }, []);

  const fetchDeletedItems = async () => {
    setLoading(true);
    try {
      // Simulate deleted items data
      const mockDeletedItems: DeletedItem[] = [
        {
          id: '1',
          content_type: 'story',
          original_id: 'story-123',
          title: 'Finding Hope After Loss',
          content: 'Today I want to share my journey through grief and how I found hope again...',
          author_name: 'anonymous_user_1',
          deleted_by: 'moderator_1',
          deleted_at: new Date(Date.now() - 3600000).toISOString(),
          deletion_reason: 'Flagged content - false positive',
          version_history: [
            { version: 1, content: 'Original content...', edited_at: new Date().toISOString() },
            { version: 2, content: 'Edited content...', edited_at: new Date().toISOString() }
          ]
        },
        {
          id: '2',
          content_type: 'comment',
          original_id: 'comment-456',
          content: 'Thank you for sharing this, it really helped me feel less alone.',
          author_name: 'supportive_reader',
          deleted_by: 'auto_moderation',
          deleted_at: new Date(Date.now() - 7200000).toISOString(),
          deletion_reason: 'Auto-flagged for review',
          version_history: [
            { version: 1, content: 'Thank you for sharing...', edited_at: new Date().toISOString() }
          ]
        },
        {
          id: '3',
          content_type: 'story',
          original_id: 'story-789',
          title: 'My Battle with Anxiety',
          content: 'Anxiety has been my constant companion for years, but I\'m learning to manage it...',
          author_name: 'brave_warrior',
          deleted_by: 'user_request',
          deleted_at: new Date(Date.now() - 86400000).toISOString(),
          deletion_reason: 'User regretted sharing - requested restoration',
          version_history: [
            { version: 1, content: 'Anxiety has been...', edited_at: new Date().toISOString() }
          ]
        }
      ];

      setDeletedItems(mockDeletedItems);
    } catch (error) {
      console.error('Error fetching deleted items:', error);
    } finally {
      setLoading(false);
    }
  };

  const restoreItem = async (item: DeletedItem) => {
    try {
      // Simulate restoration logic
      if (item.content_type === 'story') {
        // Restore to stories table
        console.log('Restoring story:', item.original_id);
      } else {
        // Restore to comments table
        console.log('Restoring comment:', item.original_id);
      }

      // Remove from deleted items
      setDeletedItems(prev => prev.filter(i => i.id !== item.id));

      toast({
        title: "Item restored",
        description: `${item.content_type} has been successfully restored.`,
      });
    } catch (error) {
      console.error('Error restoring item:', error);
      toast({
        title: "Restoration failed",
        description: "Failed to restore the item.",
        variant: "destructive",
      });
    }
  };

  const permanentlyDelete = async (itemId: string) => {
    try {
      setDeletedItems(prev => prev.filter(i => i.id !== itemId));
      toast({
        title: "Item permanently deleted",
        description: "The item has been permanently removed.",
      });
    } catch (error) {
      console.error('Error permanently deleting item:', error);
    }
  };

  const filteredItems = deletedItems.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || item.content_type === selectedType;
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-800 rounded w-1/3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-gray-800 rounded"></div>
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
            <RotateCcw className="w-5 h-5 text-green-400" />
            Rollback System for Stories & Comments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search deleted content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Types</option>
              <option value="story">Stories</option>
              <option value="comment">Comments</option>
            </select>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
              <div className="text-xl font-bold text-blue-300">
                {deletedItems.filter(i => i.content_type === 'story').length}
              </div>
              <div className="text-sm text-blue-400">Deleted Stories</div>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
              <div className="text-xl font-bold text-purple-300">
                {deletedItems.filter(i => i.content_type === 'comment').length}
              </div>
              <div className="text-sm text-purple-400">Deleted Comments</div>
            </div>
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
              <div className="text-xl font-bold text-green-300">
                {deletedItems.filter(i => i.deletion_reason.includes('false positive')).length}
              </div>
              <div className="text-sm text-green-400">Restoration Candidates</div>
            </div>
          </div>

          {/* Deleted Items List */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No deleted items found matching your criteria.
              </div>
            ) : (
              filteredItems.map((item) => (
                <Card key={item.id} className="bg-black/50 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={
                            item.content_type === 'story' 
                              ? 'bg-blue-900/30 text-blue-200 border-blue-700/50'
                              : 'bg-purple-900/30 text-purple-200 border-purple-700/50'
                          }>
                            {item.content_type}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <User className="w-3 h-3" />
                            {item.author_name}
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Clock className="w-3 h-3" />
                            {new Date(item.deleted_at).toLocaleString()}
                          </div>
                        </div>
                        
                        {item.title && (
                          <h5 className="text-white font-medium mb-2">{item.title}</h5>
                        )}
                        
                        <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                          {item.content}
                        </p>
                        
                        <div className="text-gray-400 text-xs mb-2">
                          <strong>Deletion reason:</strong> {item.deletion_reason}
                        </div>
                        
                        <div className="text-gray-400 text-xs">
                          <strong>Deleted by:</strong> {item.deleted_by} | 
                          <strong> Versions:</strong> {item.version_history.length}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => restoreItem(item)}
                          className="border-green-700 text-green-400 hover:bg-green-900/20"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-400 hover:bg-gray-900/20"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          View History
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => permanentlyDelete(item.id)}
                          className="border-red-700 text-red-400 hover:bg-red-900/20"
                        >
                          Permanent Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RollbackSystem;
