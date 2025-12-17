'use client';

import { useEffect } from 'react';

import { Card } from '@/components/core/Card';
import { Button } from '@postbee/postbee-ui-lib';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-lg m-auto max-w-100 text-center">
          <Card className="!px-sm">
            <div className="space-y-lg">
              {/* Error Message */}
              <div className="space-y-md">
                <h1 className="text-2xl font-bold text-secondary-900">Critical Error</h1>
                <p className="text-secondary-600">{error.message || 'A critical error occurred. Please contact support.'}</p>
              </div>

              {/* Error ID (if available) */}
              {error.digest && <p className="text-xs text-secondary-500">Error ID: {error.digest}</p>}

              {/* Action Button */}
              <div className="pt-md">
                <Button fullWidth onClick={reset}>
                  Try again
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </body>
    </html>
  );
}
