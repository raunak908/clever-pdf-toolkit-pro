
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUpload } from '@/components/common/FileUpload';
import { ProcessingStatus } from '@/components/common/ProcessingStatus';
import { DownloadButton } from '@/components/common/DownloadButton';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const MergePDF = () => {
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

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please select at least 2 PDF files to merge",
        variant: "destructive"
      });
      return;
    }

    setStatus('processing');
    setProgress(0);

    // Simulate merging process
    const intervals = [20, 40, 60, 80, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(intervals[i]);
    }

    // Create a dummy merged PDF blob for demonstration
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
/Length 55
>>
stream
BT
/F1 12 Tf
100 700 Td
(Merged PDF from ${files.length} documents) Tj
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
315
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setStatus('success');

    toast({
      title: "Merge completed!",
      description: `${files.length} PDF files merged successfully`,
    });
  };

  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF documents into a single PDF file. Upload files in the order you want them to appear in the final document"
      category="Edit"
      icon="🔗"
    >
      <FileUpload
        accept=".pdf,application/pdf"
        multiple={true}
        maxSize={50}
        onFilesSelected={handleFilesSelected}
        files={files}
        onRemoveFile={handleRemoveFile}
        disabled={status === 'processing'}
      />

      <ProcessingStatus
        status={status}
        progress={progress}
        message={`Merging ${files.length} PDF files...`}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Button
          onClick={handleMerge}
          disabled={files.length < 2 || status === 'processing'}
          size="lg"
          className="w-full sm:w-auto"
        >
          Merge PDFs
        </Button>

        {status === 'success' && downloadUrl && (
          <DownloadButton
            downloadUrl={downloadUrl}
            filename="merged-document.pdf"
            size="lg"
            showPreview={true}
          />
        )}
      </div>
    </ToolLayout>
  );
};

export default MergePDF;
