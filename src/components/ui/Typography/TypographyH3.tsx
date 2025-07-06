import { cn } from '~/utils'

export const TypographyH3 = ({ className, ...props }: TypographyH3Props) => {
  return (
    <h3
      className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

export interface TypographyH3Props extends React.ComponentProps<'h3'> {

}
