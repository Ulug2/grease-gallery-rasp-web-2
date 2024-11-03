'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Search } from './search';
import { useState } from 'react';
import { SelectSearches } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { NavItem } from '../nav-item';

export function SearchTable({
  searches,
  offset,
  totalSearches
}: {
  searches: SelectSearches[];
  offset: number;
  totalSearches: number;
}) {

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // State to handle modal visibility and selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle checkbox change
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setSelectedRows((prevSelected) =>
      isChecked
        ? [...prevSelected, id] // Add ID if checked
        : prevSelected.filter((rowId) => rowId !== id) // Remove ID if unchecked
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (isChecked: boolean) => {
    setSelectedRows(isChecked ? searches.map((s) => s.id) : []);
  };

  // Open modal and set the selected image
  const handleViewImage = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  let router = useRouter();
  let searchesPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader className='flex justify-between items-center w-full'>
        <CardTitle>Search</CardTitle>
        <CardDescription>
          Search for your files.
        </CardDescription>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search..." />
          <Button type="submit">Search</Button>
         </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead className="w-[50px]">
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={selectedRows.length === searches.length && searches.length > 0}
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < searches.length
                }
              />
            </TableHead>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Machine ID</TableHead>
              <TableHead className="hidden md:table-cell">Grease ID</TableHead>
              <TableHead className="hidden md:table-cell">
                Standard ID
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {searches.map((search) => (
            <TableRow key={search.id}>
              {/* Checkbox for each row */}
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(search.id)}
                  onChange={(e) =>
                    handleCheckboxChange(search.id, e.target.checked)
                  }
                />
              </td>
              {/* Render other table cells with data */}
              <td>{search.machine_id}</td>
              <td className="hidden md:table-cell">{search.grease_id}</td>
              <td className="hidden md:table-cell">{search.standard_id}</td>
              {/* View button */}
              <td>
                <Button
                  onClick={() => handleViewImage(search.imageSrc)}
                  variant="outline"
                >
                  View
                </Button>
              </td>
            </TableRow>
          ))}
          </TableBody>
          <TableBody>
            {searches.map((search) => (
              <Search key={search.id} search={search} />
            ))}
          </TableBody>
        </Table>
        {/* Display count of selected rows at the bottom */}
      <div className="flex justify-between items-center mt-4">
        <span>{selectedRows.length} files selected</span>
        <Button type="submit" className="flex ml-auto">
          Analyze Selected
        </Button>
      </div>

      {/* Modal to display the selected image */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Image Preview</h2>
            <img src={selectedImage} alt="Selected" className="w-full" />
            <Button onClick={closeModal} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - searchesPerPage, totalSearches) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalSearches}</strong> searches
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === searchesPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + searchesPerPage > totalSearches}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
