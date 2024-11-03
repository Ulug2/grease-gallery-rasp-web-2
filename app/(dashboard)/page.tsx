import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link'; // Import Link from next/link
import Providers from './providers';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import { SearchInput } from './search';

export default function Homepage() {
  return (
    <div className="flex justify-center items-center min-h-2xl bg-gray-100 p-4">
      <Card className="max-w-2xl w-full shadow-lg rounded-lg p-6 bg-white">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl font-bold text-gray-800">Grease Gallery</CardTitle>
          <CardDescription className="text-lg text-gray-500">
            Your solution for grease sample analysis and quality control.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center">
          <div className="flex justify-center space-x-4 mb-6">
            <Link href="/upload">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center group transition-transform duration-200 hover:scale-105">
                Upload <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">📤</span>
              </button>
            </Link>
            <Link href="/analysis">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center group transition-transform duration-200 hover:scale-105">
                Analyze <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">📊</span>
              </button>
            </Link>
          </div>
          
          <CardDescription className="text-center text-gray-600 text-base leading-relaxed">
            This application is designed for <strong>grease sample analysis and quality control</strong>. Users can upload files containing color data of grease samples, which include values like Delta E2000, RGB, CMYK, and CIELAB.
          </CardDescription>
          
          <div className="text-gray-600 text-sm leading-relaxed mt-4">
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>File Upload and Search</strong>: Upload multiple files and quickly search for specific samples using unique identifiers.</li>
              <li><strong>Color Analysis</strong>: Calculates and categorizes Delta E2000 values, which measure color differences and indicate potential changes in grease quality.</li>
              <li><strong>Trend and Contrast Analysis</strong>: Visualizes Delta E2000 values by categorizing them into low, slight, moderate, and high contrast levels, helping users monitor grease condition.</li>
              <li><strong>User-Triggered Analysis</strong>: Analyze samples by clicking the "Analyze" button, generating interactive charts to provide insights into grease stability and quality.</li>
            </ul>
            <p className="mt-4">
              The app assists in <strong>quality control and maintenance</strong> by monitoring the condition of grease samples over time, providing insights into color consistency and potential degradation, and assisting in early detection of quality issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SearchInput />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

