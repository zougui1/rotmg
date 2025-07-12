import { cookies } from 'next/headers';

import { HoardSectionList } from '~/features/hoard/components/HoardSectionList';
import { HoardSidePanel } from '~/features/hoard/components/HoardSidePanel';
import { HydrateClient } from '~/trpc/server';

export default async function Home() {
  await cookies();

  return (
    <HydrateClient>
      <div className="h-[calc(100vh-56px-16px)] w-full flex justify-between gap-4">
        <div>
          <HoardSectionList />
        </div>
        <div>
          <HoardSidePanel />
        </div>
      </div>
    </HydrateClient>
  );
}
