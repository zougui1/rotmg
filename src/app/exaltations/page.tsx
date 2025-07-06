import { cookies } from 'next/headers';

import { ClassesExaltations } from '~/features/exaltation/components/ClassesExaltations';
import { HydrateClient } from '~/trpc/server';

export default async function Home() {
  await cookies();

  return (
    <HydrateClient>
      <ClassesExaltations />
    </HydrateClient>
  );
}
