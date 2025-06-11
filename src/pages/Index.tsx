
import React, { useState, useMemo } from 'react';
import { Search, Grid, List, FileText, Shield, Scissors, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PDFTool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  route: string;
}

const pdfTools: PDFTool[] = [
  { id: '1', name: 'Word to PDF', description: 'Convert Word documents to PDF format', category: 'Convert', icon: '📄', route: '/word-to-pdf' },
  { id: '2', name: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF', category: 'Convert', icon: '📊', route: '/excel-to-pdf' },
  { id: '3', name: 'PowerPoint to PDF', description: 'Convert PowerPoint presentations to PDF', category: 'Convert', icon: '📽️', route: '/powerpoint-to-pdf' },
  { id: '4', name: 'JPG to PDF', description: 'Convert JPG images to PDF documents', category: 'Convert', icon: '🖼️', route: '/jpg-to-pdf' },
  { id: '5', name: 'PNG to PDF', description: 'Convert PNG images to PDF documents', category: 'Convert', icon: '🖼️', route: '/png-to-pdf' },
  { id: '6', name: 'HTML to PDF', description: 'Convert HTML pages to PDF documents', category: 'Convert', icon: '🌐', route: '/html-to-pdf' },
  { id: '7', name: 'Text to PDF', description: 'Convert plain text files to PDF', category: 'Convert', icon: '📝', route: '/text-to-pdf' },
  { id: '8', name: 'PDF to Word', description: 'Convert PDF documents to Word format', category: 'Convert', icon: '📄', route: '/pdf-to-word' },
  { id: '9', name: 'PDF to Excel', description: 'Convert PDF documents to Excel format', category: 'Convert', icon: '📊', route: '/pdf-to-excel' },
  { id: '10', name: 'PDF to PPT', description: 'Convert PDF documents to PowerPoint', category: 'Convert', icon: '📽️', route: '/pdf-to-ppt' },
  { id: '11', name: 'PDF to JPG', description: 'Convert PDF pages to JPG images', category: 'Convert', icon: '🖼️', route: '/pdf-to-jpg' },
  { id: '12', name: 'PDF to PNG', description: 'Convert PDF pages to PNG images', category: 'Convert', icon: '🖼️', route: '/pdf-to-png' },
  { id: '13', name: 'Split PDF', description: 'Split PDF into separate pages or sections', category: 'Edit', icon: '✂️', route: '/split-pdf' },
  { id: '14', name: 'Merge PDF', description: 'Combine multiple PDFs into one', category: 'Edit', icon: '🔗', route: '/merge-pdf' },
  { id: '15', name: 'Compress PDF', description: 'Reduce PDF file size', category: 'Optimize', icon: '🗜️', route: '/compress-pdf' },
  { id: '16', name: 'Unlock PDF', description: 'Remove password protection from PDF', category: 'Security', icon: '🔓', route: '/unlock-pdf' },
  { id: '17', name: 'Protect PDF', description: 'Add password protection to PDF', category: 'Security', icon: '🔒', route: '/protect-pdf' },
  { id: '18', name: 'Rotate PDF', description: 'Rotate PDF pages in any direction', category: 'Edit', icon: '🔄', route: '/rotate-pdf' },
  { id: '19', name: 'Add Watermark to PDF', description: 'Add text or image watermarks', category: 'Edit', icon: '💧', route: '/add-watermark' },
  { id: '20', name: 'Add Page Numbers', description: 'Add page numbers to PDF documents', category: 'Edit', icon: '🔢', route: '/add-page-numbers' },
  { id: '21', name: 'Reorder Pages', description: 'Rearrange PDF pages in custom order', category: 'Edit', icon: '📑', route: '/reorder-pages' },
  { id: '22', name: 'Extract Images from PDF', description: 'Extract all images from PDF documents', category: 'Extract', icon: '🖼️', route: '/extract-images' },
  { id: '23', name: 'Image to PDF (OCR)', description: 'Convert images to searchable PDF with OCR', category: 'Convert', icon: '👁️', route: '/image-to-pdf-ocr' },
  { id: '24', name: 'Grayscale PDF', description: 'Convert PDF to grayscale', category: 'Edit', icon: '⚫', route: '/grayscale-pdf' },
  { id: '25', name: 'PDF to Text', description: 'Extract text content from PDF', category: 'Extract', icon: '📝', route: '/pdf-to-text' },
  { id: '26', name: 'PDF to HTML', description: 'Convert PDF documents to HTML format', category: 'Convert', icon: '🌐', route: '/pdf-to-html' },
  { id: '27', name: 'ZIP to PDF', description: 'Convert ZIP archive contents to PDF', category: 'Convert', icon: '📦', route: '/zip-to-pdf' },
  { id: '28', name: 'EPUB to PDF', description: 'Convert EPUB ebooks to PDF format', category: 'Convert', icon: '📚', route: '/epub-to-pdf' },
  { id: '29', name: 'MOBI to PDF', description: 'Convert MOBI ebooks to PDF format', category: 'Convert', icon: '📚', route: '/mobi-to-pdf' },
  { id: '30', name: 'RTF to PDF', description: 'Convert Rich Text Format to PDF', category: 'Convert', icon: '📄', route: '/rtf-to-pdf' },
  { id: '31', name: 'XML to PDF', description: 'Convert XML documents to PDF', category: 'Convert', icon: '📋', route: '/xml-to-pdf' },
  { id: '32', name: 'Markdown to PDF', description: 'Convert Markdown files to PDF', category: 'Convert', icon: '⬇️', route: '/markdown-to-pdf' },
  { id: '33', name: 'Email to PDF', description: 'Convert email messages to PDF', category: 'Convert', icon: '📧', route: '/email-to-pdf' },
  { id: '34', name: 'CSV to PDF', description: 'Convert CSV data to PDF tables', category: 'Convert', icon: '📊', route: '/csv-to-pdf' },
  { id: '35', name: 'Crop PDF', description: 'Crop PDF pages to specific dimensions', category: 'Edit', icon: '✂️', route: '/crop-pdf' },
  { id: '36', name: 'Remove PDF Background', description: 'Remove background from PDF pages', category: 'Edit', icon: '🎨', route: '/remove-background' },
  { id: '37', name: 'Edit PDF Metadata', description: 'Edit PDF title, author, and properties', category: 'Edit', icon: 'ℹ️', route: '/edit-metadata' },
  { id: '38', name: 'Annotate PDF', description: 'Add comments and annotations to PDF', category: 'Edit', icon: '✏️', route: '/annotate-pdf' },
  { id: '39', name: 'Basic PDF Editor', description: 'Edit PDF content with basic tools', category: 'Edit', icon: '✏️', route: '/basic-editor' },
  { id: '40', name: 'Redact PDF', description: 'Permanently remove sensitive information', category: 'Security', icon: '⬛', route: '/redact-pdf' },
  { id: '41', name: 'PDF Reader', description: 'View and read PDF documents online', category: 'View', icon: '👁️', route: '/pdf-reader' },
  { id: '42', name: 'Merge Images to PDF', description: 'Combine multiple images into one PDF', category: 'Create', icon: '🖼️', route: '/merge-images-pdf' },
  { id: '43', name: 'Delete Pages from PDF', description: 'Remove specific pages from PDF', category: 'Edit', icon: '🗑️', route: '/delete-pages' },
  { id: '44', name: 'Edit PDF Bookmarks', description: 'Add or edit PDF bookmarks and navigation', category: 'Edit', icon: '🔖', route: '/edit-bookmarks' },
  { id: '45', name: 'Fill PDF Form', description: 'Fill interactive PDF forms', category: 'Edit', icon: '📝', route: '/fill-form' },
  { id: '46', name: 'Convert PDF Page to SVG', description: 'Convert PDF pages to SVG format', category: 'Convert', icon: '🎨', route: '/pdf-to-svg' },
  { id: '47', name: 'Web URL to PDF', description: 'Convert web pages to PDF documents', category: 'Convert', icon: '🌐', route: '/url-to-pdf' },
  { id: '48', name: 'Batch Convert PDFs', description: 'Convert multiple PDFs at once', category: 'Convert', icon: '📦', route: '/batch-convert' },
  { id: '49', name: 'Compare PDFs', description: 'Compare two PDF documents for differences', category: 'Analyze', icon: '🔍', route: '/compare-pdfs' },
  { id: '50', name: 'Translate PDF', description: 'Translate PDF content to different languages', category: 'Convert', icon: '🌍', route: '/translate-pdf' },
];

const categories = ['All', 'Convert', 'Edit', 'Security', 'Extract', 'Optimize', 'Create', 'View', 'Analyze'];

const categoryIcons: Record<string, React.ReactNode> = {
  Convert: <FileText className="w-4 h-4" />,
  Edit: <Scissors className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
  Extract: <ImageIcon className="w-4 h-4" />,
  Optimize: <Grid className="w-4 h-4" />,
  Create: <List className="w-4 h-4" />,
  View: <FileText className="w-4 h-4" />,
  Analyze: <Search className="w-4 h-4" />,
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTools = useMemo(() => {
    return pdfTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Ad Space */}
      <div className="w-full bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
            <p className="text-sm text-gray-500">Advertisement Space - Top Banner (728x90 or Responsive)</p>
            <div className="h-20 bg-gray-50 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">AdSense Code Here</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              PDF Tools Suite
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 px-2">
              Complete collection of 50 professional PDF tools
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-4 sm:mb-6 px-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 pr-4 py-2 sm:py-3 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            {/* Category Filter & View Toggle */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6 px-2">
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full overflow-x-auto">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                  >
                    {category !== 'All' && categoryIcons[category]}
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6 px-2">
          <p className="text-sm sm:text-base text-gray-600">
            Showing {filteredTools.length} of {pdfTools.length} tools
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredTools.map((tool) => (
            <Link key={tool.id} to={tool.route} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-gray-200 hover:border-blue-300">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{tool.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-2">
            <div className="text-gray-400 text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No tools found</h3>
            <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Bottom Ad Space */}
      <div className="w-full bg-gray-100 border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
            <p className="text-sm text-gray-500">Advertisement Space - Bottom Banner (728x90 or Responsive)</p>
            <div className="h-20 bg-gray-50 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">AdSense Code Here</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2024 PDF Tools Suite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
