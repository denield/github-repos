'use client';

import { FormEvent, useState } from 'react';
import { Button, Group, TextInput, Select } from '@mantine/core';
import useQueryState from '@/hooks/set-query-state';

type Props = {
  type: string;
  searchTerm?: string;
};

export default function SearchBox({ type, searchTerm: defaultSearchTerm = '' }: Props) {
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const setQueryState = useQueryState();

  const onTypeChange = (value: string) => {
    if (type === value) {
      return;
    }
    setSearchTerm('');
    setQueryState([
      { name: 'type', value },
      { name: 'searchTerm', value: '' },
      { name: 'page', value: '1' },
      { name: 'sortBy', value: '' },
      { name: 'sortDirection', value: '' },
      { name: 'filterFor', value: '' },
    ]);
  };

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQueryState([
      { name: 'type', value: type },
      { name: 'searchTerm', value: searchTerm },
      { name: 'page', value: '1' },
      { name: 'sortBy', value: '' },
      { name: 'sortDirection', value: '' },
      { name: 'filterFor', value: type === 'org' ? 'all' : 'owner' },
    ]);
  };

  return (
    <form onSubmit={onSubmit}>
      <Group align="end">
        <Select
          allowDeselect={false}
          label="Search by"
          onChange={onTypeChange}
          data={[
            { label: 'Org', value: 'org' },
            { label: 'User', value: 'user' },
          ]}
          value={type}
        />
        <TextInput
          label="Search term"
          type="text"
          placeholder="Type your term here..."
          onChange={onSearchTermChange}
          value={searchTerm}
        />
        <Button type="submit">Search</Button>
      </Group>
    </form>
  );
}
