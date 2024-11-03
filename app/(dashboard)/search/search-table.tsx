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
import { SelectSearches } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import * as Popover from '@radix-ui/react-popover';

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
  const router = useRouter();
  const searchesPerPage = 5;

  const handleAnalyze = () => {
    // Navigate to the analysis page, including selected row IDs as a query parameter
    const selectedQuery = selectedRows.join(",");
    router.push(`/analysis?ids=${selectedQuery}`);
  };

  useEffect(() => {
    const validSelectedRows = selectedRows.filter((id) =>
      searches.some((search) => search.id === id)
    );
    setSelectedRows(validSelectedRows);
  }, [searches]);

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setSelectedRows((prevSelected) =>
      isChecked ? [...prevSelected, id] : prevSelected.filter((rowId) => rowId !== id)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectedRows(isChecked ? searches.map((s) => s.id) : []);
  };

  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedRows.length > 0 && selectedRows.length < searches.length;
    }
  }, [selectedRows, searches]);

  const prevPage = () => {
    router.back();
  };

  const nextPage = () => {
    router.push(`/?offset=${offset + searchesPerPage}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center w-full">
        <CardTitle>Search</CardTitle>
        <CardDescription>Search for your files.</CardDescription>
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
                  ref={selectAllRef}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={selectedRows.length === searches.length}
                />
              </TableHead>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>Machine ID</TableHead>
              <TableHead className="hidden md:table-cell">Grease ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searches.map((search) => (
              <TableRow key={search.id}>
                <TableHead className="w-[50px]">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(search.id)}
                    onChange={(e) => handleCheckboxChange(search.id, e.target.checked)}
                  />
                </TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead className="hidden md:table-cell">{search.id}</TableHead>
                <TableHead>{search.machine_id}</TableHead>
                <TableHead className="hidden md:table-cell">{search.grease_id}</TableHead>
                <TableHead className="w-[50px]">
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        className="p-4 bg-white rounded-md shadow-lg border border-gray-200"
                        side="right"
                        align="center"
                      >
                        <div>
                          <p><strong>ID:</strong> {search.id}</p>
                          <p><strong>Machine ID:</strong> {search.machine_id}</p>
                          <p><strong>Grease ID:</strong> {search.grease_id}</p>
                        </div>
                        <Popover.Close asChild>
                          <Button variant="ghost" size="sm" className="mt-2">
                            Close
                          </Button>
                        </Popover.Close>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <span>{selectedRows.length} files selected</span>
          <Button onClick={handleAnalyze} className="ml-auto">
            Analyze Selected
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, offset + 1)} - {Math.min(offset + searchesPerPage, totalSearches)}
            </strong>{' '}
            of <strong>{totalSearches}</strong> searches
          </div>
          <div className="flex">
            <Button
              onClick={prevPage}
              variant="ghost"
              size="sm"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={nextPage}
              variant="ghost"
              size="sm"
              disabled={offset + searchesPerPage >= totalSearches}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
