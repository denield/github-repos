'use client';

import { Group, Select } from '@mantine/core';
import useQueryState from '@/hooks/set-query-state';

type Props = {
  type: string;
  itemsPerPage?: string;
  filterFor?: string;
};

export default function SettingsBox({ type, filterFor, itemsPerPage }: Props) {
  const setQueryState = useQueryState();

  const onFilterChange = (value: string) => setQueryState([{ name: 'filterFor', value }]);
  const onItemsPerPageChange = (value: string) => setQueryState([{ name: 'itemsPerPage', value }]);

  return (
    <form>
      <Group align="end">
        <Select
          allowDeselect={false}
          label="Filter by"
          onChange={onFilterChange}
          data={
            type === 'org'
              ? [
                  { label: 'All', value: 'all' },
                  { label: 'Public', value: 'public' },
                  { label: 'Private', value: 'private' },
                  { label: 'Forks', value: 'forks' },
                  { label: 'Sources', value: 'sources' },
                  { label: 'Member', value: 'member' },
                ]
              : [
                  { label: 'All', value: 'all' },
                  { label: 'Owner', value: 'owner' },
                  { label: 'Member', value: 'member' },
                ]
          }
          value={filterFor}
        />
        <Select
          label="Repositories per page"
          data={['10', '20', '30', '50', '75', '100']}
          onChange={onItemsPerPageChange}
          allowDeselect={false}
          value={itemsPerPage}
        />
      </Group>
    </form>
  );
}
