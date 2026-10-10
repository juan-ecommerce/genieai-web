export interface Metadata {
  title: string;
  description: string;
}
export const metadata: Record<string, Metadata>;
export const notFound: Metadata;
export function getMetadata(path: string): Metadata;
export function normalizePath(path: string): string;
