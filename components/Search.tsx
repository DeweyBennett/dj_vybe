"use client"

import {useState } from 'react'
// import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
// import { useRouter, useSearchParams } from 'next/navigation';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     let newUrl = '';

  //     if(query) {
  //       newUrl = formUrlQuery({
  //         params: searchParams.toString(),
  //         key: 'query',
  //         value: query
  //       })
  //     } else {
  //       newUrl = removeKeysFromQuery({
  //         params: searchParams.toString(),
  //         keysToRemove: ['query']
  //       })
  //     }

  //     router.push(newUrl, { scroll: false });
  //   }, 300)

  //   return () => clearTimeout(delayDebounceFn);
  // }, [query, searchParams, router])

  return (
    <div className="flex items-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <input 
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-[16px] font-normal leading-[24px] border bg-white border-primary outline-offset-0 placeholder:text-grey-500 focus:border-2 focus:border-secondary focus-visible:ring-0  w-full rounded-md  border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  )
}

export default Search