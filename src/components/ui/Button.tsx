'use client';

import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

import { chainHandlers } from '~/utils';
import { useRipple } from '~/hooks';

import { Ripple } from './Ripple';

export const buttonStyles = tv({
  base: [
    'relative',
    'z-0',
    'cursor-pointer',

    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',

    'overflow-hidden',

    'rounded-md',
    'whitespace-nowrap',
    'text-base',
    'font-medium',

    'transition-all',
    'transform-gpu active:scale-[0.97]',
    'subpixel-antialiased',
    'disabled:pointer-events-none disabled:opacity-50',

    '[&_svg]:pointer-events-none',
    '[&_svg:not([class*="size-"])]:size-4',
    'shrink-0',
    '[&_svg]:shrink-0',

    'focus-visible:outline-solid',
    'focus-visible:outline focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2',

    'aria-invalid:ring-destructive/20',
    'aria-invalid:border-destructive',

    // target button only if it has an icon and nothing else
    // or an element meant for screen readers (used to describe icons)
  ],
  variants: {
    variant: {
      //solid: 'focus-visible:border-ring',
      solid: 'shadow-xs',
      outline: 'shadow-xs',
      //flat: 'focus-visible:border-ring',
      flat: '',
    },

    color: {
      primary: 'focus-visible:ring-ring/80',
      secondary: 'focus-visible:ring-secondary/50',
      success: 'focus-visible:ring-success/50',
      warning: 'focus-visible:ring-warning/50',
      destructive: 'focus-visible:ring-destructive/50',
    },

    size: {
      sm: [
        'h-8',
        'rounded-md',
        'gap-1.5',
        'px-3',
        'has-[>svg]:px-2.5',
      ],
      md: [
        'h-9',
        'px-4 py-2',
        'has-[>svg]:px-3',
      ],
      lg: [
        'h-10',
        'rounded-md',
        'px-6',
        'has-[>svg]:px-4',
      ],
    },

    icon: {
      true: 'rounded-full px-0',
    },
  },
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },

  compoundVariants: [
    {
      icon: true,
      size: 'sm',
      class: 'size-8',
    },
    {
      icon: true,
      size: 'md',
      class: 'size-9',
    },
    {
      icon: true,
      size: 'lg',
      class: 'size-10',
    },

    // solid/color
    {
      variant: 'solid',
      color: 'primary',
      class: [
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
      ],
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: [
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary/90',
      ],
    },
    {
      variant: 'solid',
      color: 'success',
      class: [
        'bg-success text-success-foreground',
        'hover:bg-success/90',
      ],
    },
    {
      variant: 'solid',
      color: 'warning',
      class: [
        'bg-warning text-warning-foreground',
        'hover:bg-warning/90',
      ],
    },
    {
      variant: 'solid',
      color: 'destructive',
      class: [
        'bg-destructive text-destructive-foreground',
        'hover:bg-destructive/90',
      ],
    },

    // outline/color
    {
      variant: 'outline',
      color: 'primary',
      class: [
        'border border-input bg-input/30 text-white',
        'hover:bg-input/50',
      ],
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: [
        'border-secondary text-secondary',
        'hover:border-secondary/90 hover:text-secondary/90',
        'hover:bg-secondary/30',
      ],
    },
    {
      variant: 'outline',
      color: 'success',
      class: [
        'border-success text-success',
        'hover:border-success/90 hover:text-success/90',
        'hover:bg-success/30',
      ],
    },
    {
      variant: 'outline',
      color: 'warning',
      class: [
        'border-warning text-warning',
        'hover:border-warning/90 hover:text-warning/90',
        'hover:bg-warning/30',
      ],
    },
    {
      variant: 'outline',
      color: 'destructive',
      class: [
        'border-destructive text-destructive',
        'hover:border-destructive/90 hover:text-destructive/90',
        'hover:bg-destructive/30',
      ],
    },

    // flat/color
    {
      variant: 'flat',
      color: 'primary',
      class: [
        'text-white',
        'hover:bg-white/30',
      ],
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: [
        'text-secondary',
        'hover:bg-secondary/30',
      ],
    },
    {
      variant: 'flat',
      color: 'success',
      class: [
        'text-success',
        'hover:bg-success/30',
      ],
    },
    {
      variant: 'flat',
      color: 'warning',
      class: [
        'text-warning',
        'hover:bg-warning/30',
      ],
    },
    {
      variant: 'flat',
      color: 'destructive',
      class: [
        'text-destructive',
        'hover:bg-destructive/30',
      ],
    },
  ],
});

export const Button = ({
  className,
  variant,
  size,
  color,
  icon,
  asChild,
  onClick,
  disableRipple,
  disabled,
  loading,
  children,
  as,
  ...props
}: ButtonProps) => {
  const ripple = useRipple();
  const Comp = as ?? (asChild ? Slot : 'button');

  return (
    <Comp
      data-slot="button"
      className={buttonStyles({ variant, color, size, icon, className })}
      onClick={chainHandlers(onClick, !disableRipple && ripple.onClick)}
      // @ts-expect-error disabled might not exist in the component passed by props
      disabled={disabled ?? loading}
      {...props}
    >
      {children}
      {!disableRipple && <Ripple {...ripple} />}
    </Comp>
  );
}

export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'color'>, VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  disableRipple?: boolean;
  loading?: boolean;
  as?: string;
}
