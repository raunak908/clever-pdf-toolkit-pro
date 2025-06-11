
import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DownloadButtonProps {
  downloadUrl?: string;
  filename?: string;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  showPreview?: boolean;
  onPreview?: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  downloadUrl,
  filename = 'download',
  disabled = false,
  variant = 'default',
  size = 'default',
  showPreview = false,
  onPreview
}) => {
  const handleDownload = () => {
    if (!downloadUrl) return;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleDownload}
        disabled={disabled || !downloadUrl}
        variant={variant}
        size={size}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Download {filename}
      </Button>
      
      {showPreview && downloadUrl && (
        <Button
          onClick={onPreview}
          variant="outline"
          size={size}
          className="flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Preview
        </Button>
      )}
    </div>
  );
};
