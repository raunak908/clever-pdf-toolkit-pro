
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  progress?: number;
  message?: string;
  error?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  status,
  progress = 0,
  message,
  error
}) => {
  if (status === 'idle') return null;

  return (
    <div className="w-full space-y-4 p-4 bg-gray-50 rounded-lg">
      {status === 'processing' && (
        <>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span className="font-medium text-gray-700">
              {message || 'Processing your file...'}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="text-sm text-gray-500">{progress}% complete</div>
        </>
      )}

      {status === 'success' && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">
            {message || 'Processing completed successfully!'}
          </span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">
            {error || 'An error occurred during processing'}
          </span>
        </div>
      )}
    </div>
  );
};
