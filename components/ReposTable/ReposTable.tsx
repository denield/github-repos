'use client';

import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { Group, Table, UnstyledButton, Text, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import useQueryState from '@/hooks/set-query-state';

type ThProps = {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
};

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <Group>
          <Text fz="sm">{children}</Text>
          <Icon style={{ width: rem(16), height: rem(16) }} />
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

type Props = {
  data: RestEndpointMethodTypes['repos']['listForUser']['response']['data'];
  sortBy?: 'created' | 'updated' | 'pushed' | 'full_name' | undefined;
  sortDirection?: 'asc' | 'desc' | undefined;
};

export default function ReposTable({ data, sortBy, sortDirection }: Props) {
  const setQueryState = useQueryState();

  const createSortableHeaderProps = (columnId: string) => ({
    sorted: sortBy === columnId,
    reversed: sortDirection === 'desc',
    onSort: () => {
      setQueryState([
        {
          name: 'sortBy',
          value: sortBy === columnId && sortDirection === 'desc' ? '' : columnId,
        },
        {
          name: 'sortDirection',
          value: sortBy === columnId && sortDirection === 'asc' ? 'desc' : 'asc',
        },
      ]);
    },
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Th {...createSortableHeaderProps('full_name')}>Name</Th>
          <Table.Td w={200}>Description</Table.Td>
          <Table.Td>Stars</Table.Td>
          <Table.Td>Watchers</Table.Td>
          <Th {...createSortableHeaderProps('created')}>Created at</Th>
          <Th {...createSortableHeaderProps('pushed')}>Last pushed at</Th>
          <Th {...createSortableHeaderProps('updated')}>Last updated at</Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>
              <a href={item.html_url} target="blank">
                {item.full_name}
              </a>
            </Table.Td>
            <Table.Td>{item.description}</Table.Td>
            <Table.Td>{item.stargazers_count}</Table.Td>
            <Table.Td>{item.watchers_count}</Table.Td>
            <Table.Td>
              {item.created_at ? new Date(item.created_at).toLocaleString() : 'N/A'}
            </Table.Td>
            <Table.Td>
              {item.updated_at ? new Date(item.updated_at).toLocaleString() : 'N/A'}
            </Table.Td>
            <Table.Td>
              {item.pushed_at ? new Date(item.pushed_at).toLocaleString() : 'N/A'}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
