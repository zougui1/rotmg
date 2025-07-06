import { cn } from '~/utils'

export const TypographyH2 = ({ className, ...props }: TypographyH2Props) => {
  return (
    <h2
      className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  );
}

export interface TypographyH2Props extends React.ComponentProps<'h2'> {

}
