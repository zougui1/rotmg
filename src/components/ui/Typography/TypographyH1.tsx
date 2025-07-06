import { cn } from '~/utils'

export const TypographyH1 = ({ className, ...props }: TypographyH1Props) => {
  return (
    <h1
      className={cn('scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance', className)}
      {...props}
    />
  );
}

export interface TypographyH1Props extends React.ComponentProps<'h1'> {

}
