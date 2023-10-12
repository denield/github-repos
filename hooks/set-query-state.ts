import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Params = Array<{ name: string; value: string }>;

export default function useQueryState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (newParams: Params) => {
      const params = new URLSearchParams(searchParams);
      newParams.forEach(({ name, value }) => params.set(name, value));

      return params.toString();
    },
    [searchParams]
  );

  const setQueryState = (newParams: Params) => {
    router.push(`${pathname}?${createQueryString(newParams)}`);
  };

  return setQueryState;
}
