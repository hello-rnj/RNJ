import { metadata } from './metadata';
import HomePageStructuredData from '@/components/HomePageStructuredData';
import HomePageClient from './HomePageClient';

export { metadata };

export default function HomePage() {
  return (
    <>
      <HomePageStructuredData />
      <HomePageClient />
    </>
  );
}
