import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchTable} from './search-table';
import { getSearches } from '@/lib/db';

export default async function SearchPage(
  props: {
    searchParams: Promise<{ q: number; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? 0;
  const offset = searchParams.offset ?? 0;
  const { searches, newOffset, totalSearches } = await getSearches(
    search,
    Number(offset)
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
      </div>
      <TabsContent value="all">
        <SearchTable
          searches={searches}
          offset={newOffset ?? 0}
          totalSearches={totalSearches}
        />
      </TabsContent>
    </Tabs>
  );
}
