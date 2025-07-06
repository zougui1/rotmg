import { cn } from '~/utils'

export const TypographyH5 = ({ className, ...props }: TypographyH5Props) => {
  return (
    <h5
      className={cn('scroll-m-20 text-lg font-medium tracking-tight', className)}
      {...props}
    />
  );
}

export interface TypographyH5Props extends React.ComponentProps<'h4'> {

}
