
import { useState, useRef } from 'react';
import { Bold, Italic, List, Quote, Image, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const insertEmoji = (emoji: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = value.substring(0, start) + emoji + value.substring(start);
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, action: () => insertText('**', '**'), tooltip: 'Bold' },
    { icon: Italic, action: () => insertText('*', '*'), tooltip: 'Italic' },
    { icon: List, action: () => insertText('\n- '), tooltip: 'List' },
    { icon: Quote, action: () => insertText('\n> '), tooltip: 'Quote' },
  ];

  const emojis = ['❤️', '😊', '😢', '💪', '🙏', '✨', '🌙', '🌸', '💝', '🤗'];

  return (
    <div className="border border-womb-deepgrey rounded-lg bg-womb-deepgrey">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-womb-warmgrey/20">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={button.action}
            className="h-8 w-8 p-0 hover:bg-womb-warmgrey/20 text-womb-warmgrey hover:text-womb-softwhite"
            title={button.tooltip}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
        
        <div className="w-px h-6 bg-womb-warmgrey/20 mx-2" />
        
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-womb-warmgrey/20 text-womb-warmgrey hover:text-womb-softwhite"
          >
            <Smile className="h-4 w-4" />
          </Button>
          {emojis.map((emoji, index) => (
            <button
              key={index}
              type="button"
              onClick={() => insertEmoji(emoji)}
              className="text-lg hover:scale-110 transition-transform p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[300px] p-4 bg-transparent text-womb-softwhite placeholder-womb-warmgrey resize-none focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
