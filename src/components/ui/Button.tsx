import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'umber';
type Size = 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  full?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink/95',
  secondary: 'bg-cream text-ink hover:bg-sand',
  ghost: 'bg-transparent text-ink hover:bg-cream',
  umber: 'bg-umber text-paper hover:bg-umber/95',
};

const sizeClasses: Record<Size, string> = {
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-12 px-6 text-[15px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', full, className = '', children, ...rest }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.12 }}
        className={`no-tap inline-flex select-none items-center justify-center rounded-btn font-medium transition-colors disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${full ? 'w-full' : ''} ${className}`}
        {...rest}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = 'Button';
