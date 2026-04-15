import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Services | RNJ Advisory',
  description:
    'Decouvrez les services RNJ Advisory: analyse institutionnelle, conseil strategique, etudes reglementaires et accompagnement des projets.',
};

const services = [
  {
    title: 'Analyse institutionnelle',
    description:
      'Comprendre les dynamiques publiques, politiques et reglementaires pour securiser vos decisions.',
    href: '/services/analyse-institutionnelle',
  },
  {
    title: 'Conseil strategique',
    description:
      "Construire une trajectoire claire et realiste pour vos projets d'investissement et de transformation.",
    href: '/services',
  },
  {
    title: 'Etudes reglementaires',
    description:
      'Identifier les obligations juridiques et anticiper les changements de cadre applicables a vos activites.',
    href: '/services',
  },
  {
    title: 'Accompagnement des projets',
    description:
      'Structurer vos initiatives de bout en bout avec une approche operationnelle et conforme.',
    href: '/services',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F7FCFF]">
      <Navbar />

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
        <h1 className="font-[EB_Garamond] text-5xl font-bold text-[#003300] md:text-6xl">Services</h1>
        <p className="mt-4 max-w-3xl font-[Geist] text-base text-[#003300]/70 md:text-lg">
          RNJ Advisory accompagne les acteurs publics, les entreprises et les investisseurs dans des environnements
          institutionnels complexes.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-[#003300]/10 bg-white p-6 transition hover:border-[#BBCB2E] hover:shadow-[0_8px_28px_rgba(0,51,0,0.12)]"
            >
              <h2 className="font-[Geist] text-xl font-bold text-[#003300]">{service.title}</h2>
              <p className="mt-3 font-[Geist] text-sm leading-6 text-[#003300]/70">{service.description}</p>
              <span className="mt-5 inline-flex font-[Geist] text-sm font-semibold text-[#839705] group-hover:text-[#6d7f00]">
                En savoir plus
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
