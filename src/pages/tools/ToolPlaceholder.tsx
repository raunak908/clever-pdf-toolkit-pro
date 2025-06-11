
import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { FileUpload } from '@/components/common/FileUpload';
import { ProcessingStatus } from '@/components/common/ProcessingStatus';
import { DownloadButton } from '@/components/common/DownloadButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Wrench, Zap, Clock } from 'lucide-react';

interface ToolPlaceholderProps {
  toolName: string;
  category: string;
  icon: string;
}

const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({ toolName, category, icon }) => {
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

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to process",
        variant: "destructive"
      });
      return;
    }

    setStatus('processing');
    setProgress(0);

    // Simulate processing
    const intervals = [20, 40, 60, 80, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setProgress(intervals[i]);
    }

    // Create a dummy file for demonstration
    const demoContent = `Demo output for ${toolName}\nProcessed ${files.length} file(s)\nTimestamp: ${new Date().toISOString()}`;
    const blob = new Blob([demoContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setStatus('success');

    toast({
      title: "Processing completed!",
      description: `${toolName} operation completed successfully`,
    });
  };

  const getAcceptTypes = () => {
    if (toolName.includes('PDF to')) return '.pdf,application/pdf';
    if (toolName.includes('to PDF')) return '*/*';
    if (toolName.includes('Image')) return '.jpg,.jpeg,.png,.gif,.bmp,image/*';
    return '*/*';
  };

  const getDescription = () => {
    return `Transform your files with ${toolName}. This tool provides professional-grade processing with high-quality output.`;
  };

  return (
    <ToolLayout
      title={toolName}
      description={getDescription()}
      category={category}
      icon={icon}
    >
      {/* Demo Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Wrench className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Demo Tool</h3>
              <p className="text-blue-700 text-sm mb-3">
                This is a demonstration version of {toolName}. The tool simulates the processing workflow and generates a sample output file.
              </p>
              <div className="flex items-center gap-4 text-sm text-blue-600">
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>Fast Processing</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Real-time Progress</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FileUpload
        accept={getAcceptTypes()}
        multiple={true}
        maxSize={25}
        onFilesSelected={handleFilesSelected}
        files={files}
        onRemoveFile={handleRemoveFile}
        disabled={status === 'processing'}
      />

      <ProcessingStatus
        status={status}
        progress={progress}
        message={`Processing with ${toolName}...`}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Button
          onClick={handleProcess}
          disabled={files.length === 0 || status === 'processing'}
          size="lg"
          className="w-full sm:w-auto"
        >
          Process Files
        </Button>

        {status === 'success' && downloadUrl && (
          <DownloadButton
            downloadUrl={downloadUrl}
            filename={`${toolName.toLowerCase().replace(/\s+/g, '-')}-output.txt`}
            size="lg"
          />
        )}
      </div>
    </ToolLayout>
  );
};

export default ToolPlaceholder;
