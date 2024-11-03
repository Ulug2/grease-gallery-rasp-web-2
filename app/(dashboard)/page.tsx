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
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl font-bold flex justify-center'>Grease Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center space-x-4'>
        <Link href="/upload">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 flex items-center group transition-transform duration-200 hover:scale-105">
          Upload <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">📤</span>
          </button>
        </Link>
        <Link href="/analysis">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 ml-5 flex items-center group transition-transform duration-200 hover:scale-105">
            Analyze <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">📊</span>
          </button>
        </Link>
        </div>
      </CardContent>
    </Card>
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

