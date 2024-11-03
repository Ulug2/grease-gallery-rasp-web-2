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
      <CardHeader style={{ textAlign: 'center' }}> {/* Center the text in CardHeader */}
        <CardTitle>Upload</CardTitle>
        <CardDescription>Upload your images</CardDescription>
      </CardHeader>
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}> {/* Center the content in CardContent */}
        <CustomDropzone />
      </CardContent>
    </Card>
  );
}
