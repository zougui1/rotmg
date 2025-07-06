import { cn } from '~/utils'

export const TypographyH4 = ({ className, ...props }: TypographyH4Props) => {
  return (
    <h4
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

export interface TypographyH4Props extends React.ComponentProps<'h4'> {

}
