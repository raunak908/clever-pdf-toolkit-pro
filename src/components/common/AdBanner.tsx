
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  position: 'top' | 'bottom';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // AdSense script injection logic
    // Replace this with actual AdSense implementation
    console.log(`Ad banner loaded for ${position} position`);
  }, [position]);

  return (
    <div className={`w-full bg-gray-100 border-gray-200 ${position === 'top' ? 'border-b' : 'border-t'} ${className}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
            Advertisement Space - {position === 'top' ? 'Top' : 'Bottom'} Banner
          </p>
          <div 
            ref={adRef}
            className="h-12 sm:h-20 bg-gray-50 rounded flex items-center justify-center"
          >
            {/* Replace this div with actual AdSense code */}
            <span className="text-xs text-gray-400">
              AdSense Code Here - Size: 320x50 (Mobile) / 728x90 (Desktop)
            </span>
          </div>
          
          {/* Example AdSense integration structure */}
          {/* 
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true">
          </ins>
          */}
        </div>
      </div>
    </div>
  );
};
