'use client';

import { Group, Button } from '@mantine/core';
import useQueryState from '@/hooks/set-query-state';

type Props = {
  currentPage: number;
};

export default function PageControl({ currentPage }: Props) {
  const setQueryState = useQueryState();
  return (
    <Group justify="center">
      {currentPage > 1 && (
        <Button onClick={() => setQueryState([{ name: 'page', value: String(currentPage - 1) }])}>
          Previous
        </Button>
      )}
      <Button onClick={() => setQueryState([{ name: 'page', value: String(currentPage + 1) }])}>
        Next
      </Button>
    </Group>
  );
}
