import { Group, Stack } from '@mantine/core';
import ReposTable from '@/components/ReposTable/ReposTable';
import SearchBox from '@/components/SearchBox/SearchBox';
import getData from '@/lib/get-data';
import PageControl from '@/components/PageControl/PageControl';
import SettingsBox from '@/components/SettingsBox/SettingsBox';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    type?: string;
    searchTerm?: string;
    page?: string;
    sortBy?: 'created' | 'updated' | 'pushed' | 'full_name' | undefined;
    sortDirection?: 'asc' | 'desc' | undefined;
    itemsPerPage?: string;
    filterFor?: string;
  };
}) {
  const {
    type = 'org',
    searchTerm = '',
    page = '1',
    sortBy,
    sortDirection,
    itemsPerPage = '30',
    filterFor,
  } = searchParams;
  const parsedPage = Number.isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10);
  const parsedItemsPerPage = Number.isNaN(parseInt(itemsPerPage, 10))
    ? 1
    : parseInt(itemsPerPage, 10);
  const data =
    searchTerm.length !== 0
      ? await getData({
          type,
          searchTerm,
          page: parsedPage,
          sortBy,
          sortDirection,
          itemsPerPage: parsedItemsPerPage,
          filterFor,
        })
      : null;

  return (
    <main>
      <Group justify="space-between" align="end">
        <SearchBox type={type} searchTerm={searchTerm} />
        {data && <SettingsBox type={type} filterFor={filterFor} itemsPerPage={itemsPerPage} />}
      </Group>
      {data && (
        <Stack py="lg">
          <ReposTable data={data} sortBy={sortBy} sortDirection={sortDirection} />
          <PageControl currentPage={parsedPage} />
        </Stack>
      )}
    </main>
  );
}
