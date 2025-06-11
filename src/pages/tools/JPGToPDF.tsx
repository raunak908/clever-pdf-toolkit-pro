
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUpload } from '@/components/common/FileUpload';
import { ProcessingStatus } from '@/components/common/ProcessingStatus';
import { DownloadButton } from '@/components/common/DownloadButton';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setStatus('idle');
    setDownloadUrl('');
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select JPG images to convert",
        variant: "destructive"
      });
      return;
    }

    setStatus('processing');
    setProgress(0);

    // Simulate conversion process
    const intervals = [25, 50, 75, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(intervals[i]);
    }

    // Create a dummy PDF blob for demonstration
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 60
>>
stream
BT
/F1 12 Tf
100 700 Td
(PDF created from ${files.length} JPG image(s)) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
320
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setStatus('success');

    toast({
      title: "Conversion completed!",
      description: `${files.length} JPG image(s) converted to PDF`,
    });
  };

  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG images to PDF documents. You can upload multiple images to create a multi-page PDF"
      category="Convert"
      icon="🖼️"
    >
      <FileUpload
        accept=".jpg,.jpeg,image/jpeg"
        multiple={true}
        maxSize={10}
        onFilesSelected={handleFilesSelected}
        files={files}
        onRemoveFile={handleRemoveFile}
        disabled={status === 'processing'}
      />

      <ProcessingStatus
        status={status}
        progress={progress}
        message={`Converting ${files.length} image(s) to PDF...`}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Button
          onClick={handleConvert}
          disabled={files.length === 0 || status === 'processing'}
          size="lg"
          className="w-full sm:w-auto"
        >
          Convert to PDF
        </Button>

        {status === 'success' && downloadUrl && (
          <DownloadButton
            downloadUrl={downloadUrl}
            filename="images-converted.pdf"
            size="lg"
            showPreview={true}
          />
        )}
      </div>
    </ToolLayout>
  );
};

export default JPGToPDF;
