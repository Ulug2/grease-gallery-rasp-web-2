import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link'; // Import Link from next/link
import { NavItem } from './nav-item';



export default function Homepage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl font-bold flex justify-center'>Grease Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center space-x-4'>
          <Link href="/upload">
            <button className="bg-blue-500 hover:bg-blue-650 text-white py-2 px-4 rounded mt-4">
              Upload
            </button>
          </Link>
          <Link href="/upload">
            <button className="bg-blue-500 hover:bg-blue-650 text-white py-2 px-4 rounded mt-4 ml-5">
              Analyze
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
