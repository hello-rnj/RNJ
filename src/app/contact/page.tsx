import { metadata } from './metadata';
import ContactPageClient from './ContactPageClient';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export { metadata };

type ContactPageSearchParams = Promise<{
  mode?: string | string[];
  subject?: string | string[];
  payment?: string | string[];
}>;

type ContactPageProps = {
  searchParams: ContactPageSearchParams;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const mode = Array.isArray(resolvedSearchParams.mode)
    ? resolvedSearchParams.mode[0]
    : resolvedSearchParams.mode;
  const subject = Array.isArray(resolvedSearchParams.subject)
    ? resolvedSearchParams.subject[0]
    : resolvedSearchParams.subject;
  const payment = Array.isArray(resolvedSearchParams.payment)
    ? resolvedSearchParams.payment[0]
    : resolvedSearchParams.payment;
  const initialMode = mode === 'message' || mode === 'booking' ? mode : null;
  const initialPaymentState =
    payment === 'success' || payment === 'cancelled' ? payment : null;

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Contact', item: 'https://rnj-advisory.be/contact' },
        ]}
      />
      <ContactPageClient
        initialMode={initialMode}
        initialSubject={subject ?? ''}
        initialPaymentState={initialPaymentState}
      />
    </>
  );
}
