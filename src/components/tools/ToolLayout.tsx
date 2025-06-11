
import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  category,
  icon,
  children
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Ad Space */}
      <div className="w-full bg-gray-100 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-500">Advertisement Space - Top Banner</p>
            <div className="h-12 sm:h-20 bg-gray-50 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">AdSense Code Here</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Back to Tools</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl">{icon}</span>
              <div className="text-center sm:text-left">
                <Badge variant="secondary" className="mb-1 sm:mb-2 text-xs">
                  {category}
                </Badge>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
              </div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              {description}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Upload and Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {children}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Ad Space */}
      <div className="w-full bg-gray-100 border-t border-gray-200 mt-4 sm:mt-8">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-500">Advertisement Space - Bottom Banner</p>
            <div className="h-12 sm:h-20 bg-gray-50 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">AdSense Code Here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
