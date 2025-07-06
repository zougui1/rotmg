import { cn } from '~/utils'

export const TypographyP = ({ className, ...props }: TypographyPProps) => {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  );
}

export interface TypographyPProps extends React.ComponentProps<'p'> {

}
