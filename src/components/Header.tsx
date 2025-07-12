import Link from 'next/link';

import { cn } from '~/utils';

import { Button } from './ui/Button';

export const Header = () => {
  return (
    <header
      className={cn(
        'w-screen',
        'h-[var(--header-height)]',
        'fixed',
        'z-50',
        'left-0',
        'top-0',
        'shadow-md',
      )}
    >
      <div className="container mx-auto px-4 py-1 bg-background">
        <Link href="/exaltations">
          <Button variant="flat">Exaltations</Button>
        </Link>
        <Link href="/characters">
          <Button variant="flat">Characters</Button>
        </Link>
        <Link href="/hoard">
          <Button variant="flat">Hoard</Button>
        </Link>
      </div>
    </header>
  );
}
