import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import CustomDropzone from 'app/(dashboard)/upload/drope-zone'; // Ensure this path is correct

export default function UploadPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomDropzone />
      </CardContent>
    </Card>
  );
}
