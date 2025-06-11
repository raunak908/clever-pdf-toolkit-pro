
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import tool pages
import WordToPDF from "./pages/tools/WordToPDF";
import JPGToPDF from "./pages/tools/JPGToPDF";
import MergePDF from "./pages/tools/MergePDF";

// Import placeholder component for tools not yet implemented
import ToolPlaceholder from "./pages/tools/ToolPlaceholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Implemented Tools */}
          <Route path="/word-to-pdf" element={<WordToPDF />} />
          <Route path="/jpg-to-pdf" element={<JPGToPDF />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          
          {/* Placeholder routes for remaining tools */}
          <Route path="/excel-to-pdf" element={<ToolPlaceholder toolName="Excel to PDF" category="Convert" icon="📊" />} />
          <Route path="/powerpoint-to-pdf" element={<ToolPlaceholder toolName="PowerPoint to PDF" category="Convert" icon="📽️" />} />
          <Route path="/png-to-pdf" element={<ToolPlaceholder toolName="PNG to PDF" category="Convert" icon="🖼️" />} />
          <Route path="/html-to-pdf" element={<ToolPlaceholder toolName="HTML to PDF" category="Convert" icon="🌐" />} />
          <Route path="/text-to-pdf" element={<ToolPlaceholder toolName="Text to PDF" category="Convert" icon="📝" />} />
          <Route path="/pdf-to-word" element={<ToolPlaceholder toolName="PDF to Word" category="Convert" icon="📄" />} />
          <Route path="/pdf-to-excel" element={<ToolPlaceholder toolName="PDF to Excel" category="Convert" icon="📊" />} />
          <Route path="/pdf-to-ppt" element={<ToolPlaceholder toolName="PDF to PPT" category="Convert" icon="📽️" />} />
          <Route path="/pdf-to-jpg" element={<ToolPlaceholder toolName="PDF to JPG" category="Convert" icon="🖼️" />} />
          <Route path="/pdf-to-png" element={<ToolPlaceholder toolName="PDF to PNG" category="Convert" icon="🖼️" />} />
          <Route path="/split-pdf" element={<ToolPlaceholder toolName="Split PDF" category="Edit" icon="✂️" />} />
          <Route path="/compress-pdf" element={<ToolPlaceholder toolName="Compress PDF" category="Optimize" icon="🗜️" />} />
          <Route path="/unlock-pdf" element={<ToolPlaceholder toolName="Unlock PDF" category="Security" icon="🔓" />} />
          <Route path="/protect-pdf" element={<ToolPlaceholder toolName="Protect PDF" category="Security" icon="🔒" />} />
          <Route path="/rotate-pdf" element={<ToolPlaceholder toolName="Rotate PDF" category="Edit" icon="🔄" />} />
          <Route path="/add-watermark" element={<ToolPlaceholder toolName="Add Watermark to PDF" category="Edit" icon="💧" />} />
          <Route path="/add-page-numbers" element={<ToolPlaceholder toolName="Add Page Numbers" category="Edit" icon="🔢" />} />
          <Route path="/reorder-pages" element={<ToolPlaceholder toolName="Reorder Pages" category="Edit" icon="📑" />} />
          <Route path="/extract-images" element={<ToolPlaceholder toolName="Extract Images from PDF" category="Extract" icon="🖼️" />} />
          <Route path="/image-to-pdf-ocr" element={<ToolPlaceholder toolName="Image to PDF (OCR)" category="Convert" icon="👁️" />} />
          <Route path="/grayscale-pdf" element={<ToolPlaceholder toolName="Grayscale PDF" category="Edit" icon="⚫" />} />
          <Route path="/pdf-to-text" element={<ToolPlaceholder toolName="PDF to Text" category="Extract" icon="📝" />} />
          <Route path="/pdf-to-html" element={<ToolPlaceholder toolName="PDF to HTML" category="Convert" icon="🌐" />} />
          <Route path="/zip-to-pdf" element={<ToolPlaceholder toolName="ZIP to PDF" category="Convert" icon="📦" />} />
          <Route path="/epub-to-pdf" element={<ToolPlaceholder toolName="EPUB to PDF" category="Convert" icon="📚" />} />
          <Route path="/mobi-to-pdf" element={<ToolPlaceholder toolName="MOBI to PDF" category="Convert" icon="📚" />} />
          <Route path="/rtf-to-pdf" element={<ToolPlaceholder toolName="RTF to PDF" category="Convert" icon="📄" />} />
          <Route path="/xml-to-pdf" element={<ToolPlaceholder toolName="XML to PDF" category="Convert" icon="📋" />} />
          <Route path="/markdown-to-pdf" element={<ToolPlaceholder toolName="Markdown to PDF" category="Convert" icon="⬇️" />} />
          <Route path="/email-to-pdf" element={<ToolPlaceholder toolName="Email to PDF" category="Convert" icon="📧" />} />
          <Route path="/csv-to-pdf" element={<ToolPlaceholder toolName="CSV to PDF" category="Convert" icon="📊" />} />
          <Route path="/crop-pdf" element={<ToolPlaceholder toolName="Crop PDF" category="Edit" icon="✂️" />} />
          <Route path="/remove-background" element={<ToolPlaceholder toolName="Remove PDF Background" category="Edit" icon="🎨" />} />
          <Route path="/edit-metadata" element={<ToolPlaceholder toolName="Edit PDF Metadata" category="Edit" icon="ℹ️" />} />
          <Route path="/annotate-pdf" element={<ToolPlaceholder toolName="Annotate PDF" category="Edit" icon="✏️" />} />
          <Route path="/basic-editor" element={<ToolPlaceholder toolName="Basic PDF Editor" category="Edit" icon="✏️" />} />
          <Route path="/redact-pdf" element={<ToolPlaceholder toolName="Redact PDF" category="Security" icon="⬛" />} />
          <Route path="/pdf-reader" element={<ToolPlaceholder toolName="PDF Reader" category="View" icon="👁️" />} />
          <Route path="/merge-images-pdf" element={<ToolPlaceholder toolName="Merge Images to PDF" category="Create" icon="🖼️" />} />
          <Route path="/delete-pages" element={<ToolPlaceholder toolName="Delete Pages from PDF" category="Edit" icon="🗑️" />} />
          <Route path="/edit-bookmarks" element={<ToolPlaceholder toolName="Edit PDF Bookmarks" category="Edit" icon="🔖" />} />
          <Route path="/fill-form" element={<ToolPlaceholder toolName="Fill PDF Form" category="Edit" icon="📝" />} />
          <Route path="/pdf-to-svg" element={<ToolPlaceholder toolName="Convert PDF Page to SVG" category="Convert" icon="🎨" />} />
          <Route path="/url-to-pdf" element={<ToolPlaceholder toolName="Web URL to PDF" category="Convert" icon="🌐" />} />
          <Route path="/batch-convert" element={<ToolPlaceholder toolName="Batch Convert PDFs" category="Convert" icon="📦" />} />
          <Route path="/compare-pdfs" element={<ToolPlaceholder toolName="Compare PDFs" category="Analyze" icon="🔍" />} />
          <Route path="/translate-pdf" element={<ToolPlaceholder toolName="Translate PDF" category="Convert" icon="🌍" />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
