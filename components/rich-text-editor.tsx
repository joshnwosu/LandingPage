import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import styles from './rich-text-editor.module.css';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Code,
  Heading,
  Undo,
  Redo,
  Palette,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Start writing...',
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline cursor-pointer',
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextStyle,
      Color,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[200px] p-3 focus:outline-none',
      },
    },
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const validUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: validUrl })
      .run();
  };

  const addImage = () => {
    const url = window.prompt('Image URL');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className='border rounded-md bg-input/30'>
      {/* Toolbar */}
      <div className='flex flex-wrap gap-1 p-2 border-b'>
        {/* Text Formatting */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-active={editor.isActive('bold')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('bold') ? 'bg-background' : ''
                }`}
              >
                <Bold className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-active={editor.isActive('italic')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('italic') ? 'bg-background' : ''
                }`}
              >
                <Italic className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                data-active={editor.isActive('underline')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('underline') ? 'bg-background' : ''
                }`}
              >
                <UnderlineIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Lists */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                data-active={editor.isActive('bulletList')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('bulletList') ? 'bg-background' : ''
                }`}
              >
                <List className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                data-active={editor.isActive('orderedList')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('orderedList') ? 'bg-background' : ''
                }`}
              >
                <ListOrdered className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Headings */}
          <Select
            value={
              editor.isActive('heading', { level: 1 })
                ? 'h1'
                : editor.isActive('heading', { level: 2 })
                ? 'h2'
                : editor.isActive('heading', { level: 3 })
                ? 'h3'
                : 'p'
            }
            onValueChange={(value) => {
              if (value === 'p') {
                editor.chain().focus().setParagraph().run();
              } else {
                const level = parseInt(value[1]) as 1 | 2 | 3;
                editor.chain().focus().toggleHeading({ level }).run();
              }
            }}
          >
            <SelectTrigger className='h-8 w-[130px]'>
              <Heading className='h-4 w-4 mr-2' />
              <SelectValue placeholder='Paragraph' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='p'>Paragraph</SelectItem>
              <SelectItem value='h1'>Heading 1</SelectItem>
              <SelectItem value='h2'>Heading 2</SelectItem>
              <SelectItem value='h3'>Heading 3</SelectItem>
            </SelectContent>
          </Select>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Alignment */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                data-active={editor.isActive({ textAlign: 'left' })}
                className={`h-8 w-8 p-0 ${
                  editor.isActive({ textAlign: 'left' }) ? 'bg-background' : ''
                }`}
              >
                <AlignLeft className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
                data-active={editor.isActive({ textAlign: 'center' })}
                className={`h-8 w-8 p-0 ${
                  editor.isActive({ textAlign: 'center' })
                    ? 'bg-background'
                    : ''
                }`}
              >
                <AlignCenter className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                data-active={editor.isActive({ textAlign: 'right' })}
                className={`h-8 w-8 p-0 ${
                  editor.isActive({ textAlign: 'right' }) ? 'bg-background' : ''
                }`}
              >
                <AlignRight className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() =>
                  editor.chain().focus().setTextAlign('justify').run()
                }
                data-active={editor.isActive({ textAlign: 'justify' })}
                className={`h-8 w-8 p-0 ${
                  editor.isActive({ textAlign: 'justify' })
                    ? 'bg-background'
                    : ''
                }`}
              >
                <AlignJustify className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Justify</TooltipContent>
          </Tooltip>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Special Blocks */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                data-active={editor.isActive('blockquote')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('blockquote') ? 'bg-background' : ''
                }`}
              >
                <Quote className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                data-active={editor.isActive('codeBlock')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('codeBlock') ? 'bg-background' : ''
                }`}
              >
                <Code className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Code Block</TooltipContent>
          </Tooltip>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Links and Images */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={setLink}
                data-active={editor.isActive('link')}
                className={`h-8 w-8 p-0 ${
                  editor.isActive('link') ? 'bg-background' : ''
                }`}
              >
                <LinkIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={addImage}
                className='h-8 w-8 p-0'
              >
                <ImageIcon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Image</TooltipContent>
          </Tooltip>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Undo/Redo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().undo().run()}
                className='h-8 w-8 p-0'
              >
                <Undo className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => editor.chain().focus().redo().run()}
                className='h-8 w-8 p-0'
              >
                <Redo className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>

          <div className='w-px h-6 bg-border mx-1' />

          {/* Color Picker */}
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                  >
                    <Palette className='h-4 w-4' />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Text Color</TooltipContent>
            </Tooltip>
            <PopoverContent className='w-64'>
              <div className='grid grid-cols-8 gap-1'>
                {[
                  '#000000',
                  '#343434',
                  '#666666',
                  '#999999',
                  '#FF0000',
                  '#FF8000',
                  '#FFFF00',
                  '#008000',
                  '#0000FF',
                  '#4B0082',
                  '#9400D3',
                  '#FF1493',
                  '#A52A2A',
                  '#800000',
                  '#008080',
                  '#000080',
                ].map((color) => (
                  <Button
                    key={color}
                    type='button'
                    variant='ghost'
                    className='w-6 h-6 p-0'
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                    }}
                  >
                    <div
                      className='w-4 h-4 rounded-sm'
                      style={{ backgroundColor: color }}
                    />
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </TooltipProvider>
      </div>

      {/* Editor Content */}
      <div className={styles.editor}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
