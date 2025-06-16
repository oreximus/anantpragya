import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading, 
  Quote, 
  List, 
  Link, 
  Image,
  Type,
  Languages
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isHindiMode, setIsHindiMode] = useState(true);
  const [selectedText, setSelectedText] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSelection = useCallback((e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    setSelectedText(selected);
  }, [value]);

  const insertText = (before: string, after: string = "") => {
    const textarea = document.querySelector('.editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newSelectionStart = start + before.length;
      const newSelectionEnd = newSelectionStart + selectedText.length;
      textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = document.querySelector('.editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newText = value.substring(0, start) + text + value.substring(end);
    onChange(newText);
    
    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPosition = start + text.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: Bold,
      title: "Bold",
      action: () => insertText("**", "**"),
    },
    {
      icon: Italic,
      title: "Italic", 
      action: () => insertText("*", "*"),
    },
    {
      icon: Underline,
      title: "Underline",
      action: () => insertText("<u>", "</u>"),
    },
    {
      icon: Heading,
      title: "Heading",
      action: () => insertAtCursor("\n## "),
    },
    {
      icon: Quote,
      title: "Quote",
      action: () => insertAtCursor("\n> "),
    },
    {
      icon: List,
      title: "List",
      action: () => insertAtCursor("\n- "),
    },
    {
      icon: Link,
      title: "Link",
      action: () => insertText("[", "](url)"),
    },
    {
      icon: Image,
      title: "Image",
      action: () => insertText("![alt](", ")"),
    },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-300 bg-gray-50 p-3 flex flex-wrap items-center gap-2">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={button.action}
            className="p-2 text-gray-600 hover:text-saffron-600 hover:bg-white rounded transition-colors"
            title={button.title}
          >
            <button.icon className="w-4 h-4" />
          </Button>
        ))}
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsHindiMode(!isHindiMode)}
          className={`px-3 py-1 text-sm border border-gray-300 rounded transition-colors ${
            isHindiMode 
              ? "bg-saffron-100 text-saffron-700 border-saffron-300" 
              : "bg-white hover:bg-gray-50"
          }`}
        >
          <Languages className="w-3 h-3 mr-1" />
          {isHindiMode ? "हिंदी" : "En"}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white transition-colors"
        >
          <Type className="w-3 h-3 mr-1" />
          प्रारूप
        </Button>
      </div>
      
      {/* Editor */}
      <div className="relative">
        <Textarea
          value={value}
          onChange={handleTextareaChange}
          onSelect={handleSelection}
          placeholder={placeholder || "यहाँ अपना लेख लिखना शुरू करें...\n\nआप हिंदी और अंग्रेजी दोनों में लिख सकते हैं।"}
          className={`w-full min-h-96 p-4 resize-none focus:outline-none border-0 editor-textarea editor-content ${
            isHindiMode ? "font-hindi" : "font-english"
          } text-lg leading-relaxed`}
          style={{ minHeight: "400px" }}
        />
        
        {/* Character count */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
          {value.length} वर्ण
        </div>
      </div>
      
      {/* Footer with tips */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <p className="text-xs text-gray-500 font-hindi">
          <strong>सुझाव:</strong> **बोल्ड**, *इटैलिक*, ## शीर्षक, {'>'} उद्धरण, - सूची के लिए इन प्रतीकों का उपयोग करें
        </p>
      </div>
    </div>
  );
}
