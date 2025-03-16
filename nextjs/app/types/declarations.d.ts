// Déclaration pour lucide-react
declare module 'lucide-react';

// Déclaration pour next/link
declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    children?: ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  const Link: ComponentType<LinkProps>;
  export default Link;
}

// Déclaration pour next/image
declare module 'next/image' {
  import { ComponentType, ReactElement } from 'react';
  
  export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    loader?: any;
    quality?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  
  const Image: ComponentType<ImageProps>;
  export default Image;
} 