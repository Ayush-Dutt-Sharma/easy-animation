// Vercel Web Analytics' queue, set up in Base.astro (only in the build, so it may be missing).
interface Window {
  va?: (kind: 'event', event: { name: string }) => void;
}
