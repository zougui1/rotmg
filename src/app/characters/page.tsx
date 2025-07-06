import { cookies } from 'next/headers';
import { CharacterList } from '~/features/character/components/CharacterList';
import { CharacterSidePanel } from '~/features/character/components/CharacterSidePanel';
import { HydrateClient } from '~/trpc/server';

export default async function Home() {
  await cookies();

  return (
    <HydrateClient>
      <div className="flex justify-between gap-4">
        <CharacterList />
        <CharacterSidePanel />
      </div>
    </HydrateClient>
  );
}
