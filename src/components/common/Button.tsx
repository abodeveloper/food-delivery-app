import { Button as ShadcnButton, ButtonProps } from '@/components/ui/button';

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <ShadcnButton className="rounded-lg" {...props}>
      {children}
    </ShadcnButton>
  );
}
