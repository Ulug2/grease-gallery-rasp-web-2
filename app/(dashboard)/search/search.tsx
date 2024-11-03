import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectSearches } from '@/lib/db';
import { deleteProduct } from '../actions';

export function Search({ search }: { search: SelectSearches }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Search image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={search.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{search.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {search.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${search.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{search.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {search.availableAt.toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
