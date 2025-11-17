'use client';

import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const codeSnippet = `{
  "address": "0x1234...5678",
  "include_factors": true
}`;

export function ApiUsageGuide() {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-primary" />
          API for Developers
        </CardTitle>
        <CardDescription>
          Integrate decentralized credit scores into your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Query Endpoint</h4>
            <div className="mt-1 rounded-md bg-secondary p-3 font-mono text-sm text-secondary-foreground">
              <p>POST /api/v1/credit-score</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Request Body</h4>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                {hasCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            <pre className="mt-1 w-full overflow-x-auto rounded-md bg-secondary p-4">
              <code className="text-sm text-secondary-foreground">
                {codeSnippet}
              </code>
            </pre>
          </div>
          <div>
            <h4 className="font-semibold">Learn More</h4>
            <p className="text-sm text-muted-foreground">
              Check out our full{' '}
              <a
                href="#"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                API documentation
              </a>{' '}
              for more details on response formats and authentication.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
