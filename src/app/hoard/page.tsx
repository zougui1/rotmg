import { cookies } from 'next/headers';
import { HydrateClient } from '~/trpc/server';

export default async function Home() {
  await cookies();

  return (
    <HydrateClient>
      <main></main>
    </HydrateClient>
  );
}
