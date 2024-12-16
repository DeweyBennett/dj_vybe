"use client"

import { useEffect, useState } from 'react'
import { Input } from './Input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])

  return (
    <div className="flex items-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Input 
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="text-[16px] font-normal leading-[24px] border bg-white border-primary outline-offset-0 placeholder:text-grey-500 focus:border-2 focus:border-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}

export default Search