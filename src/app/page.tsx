import Image from 'next/image';
import Navbar from '@/components/Navbar';

const glowShapes = [
  {
    width: '404.34px',
    height: '423.25px',
    left: '798.7px',
    top: '208.27px',
    background: '#BBCB2E',
    filter: 'blur(160.282px)',
  },
  {
    width: '743.57px',
    height: '572.38px',
    left: '8.93px',
    top: '231.38px',
    background: '#BBCB2E',
    filter: 'blur(160.282px)',
  },
  {
    width: '534.82px',
    height: '411.69px',
    left: '-113.95px',
    top: '9.78px',
    background: '#BBCB2E',
    filter: 'blur(115.285px)',
  },
  {
    width: '881.15px',
    height: '889.55px',
    left: '246.28px',
    top: '-37.48px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '742.52px',
    height: '726.76px',
    left: '246.28px',
    top: '-37.48px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '467.35px',
    height: '457.9px',
    left: '591.81px',
    top: '339.55px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '502.01px',
    height: '437.95px',
    left: '928.93px',
    top: '353.2px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '350.78px',
    height: '350.78px',
    left: '-115px',
    top: '125.3px',
    background: '#BBCB2E',
    filter: 'blur(306.248px)',
  },
  {
    width: '412.74px',
    height: '425.34px',
    left: '-75.09px',
    top: '476.08px',
    background: '#839705',
    filter: 'blur(318.798px)',
  },
  {
    width: '673.2px',
    height: '693.15px',
    left: '813.41px',
    top: '-54.29px',
    background: '#003300',
    filter: 'blur(413.257px)',
  },
  {
    width: '834.94px',
    height: '859.09px',
    left: '848.06px',
    top: '975.99px',
    background: '#F5FFA1',
    filter: 'blur(413.257px)',
  },
  {
    width: '599.68px',
    height: '617.54px',
    left: '-79.29px',
    top: '1224.9px',
    background: '#BBCB2E',
    filter: 'blur(413.257px)',
  },
  {
    width: '673.2px',
    height: '693.15px',
    left: '15.23px',
    top: '582.15px',
    background: '#003300',
    filter: 'blur(413.257px)',
  },
  {
    width: '412.74px',
    height: '425.34px',
    left: '1180.99px',
    top: '126.35px',
    background: '#839705',
    filter: 'blur(318.798px)',
  },
  {
    width: '169.09px',
    height: '174.34px',
    left: '1368.98px',
    top: '208.27px',
    background: '#839705',
    filter: 'blur(158.533px)',
  },
];

const entrepreneurshipCards = [
  {
    title: 'Choix du statut juridique adapte',
    icon: '/Mask group (11).svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Faisabilite & plan financier',
    icon: '/Vector (19).svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 140.59,
  },
  {
    title: 'Demarches administratives',
    icon: '/Vector (18).svg',
    iconWidth: 65.55,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Conformite reglementaire',
    icon: '/Mask group (12).svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
];

const serviceCards = [
  {
    title: "Creation d'entreprise Demarches administratives",
    description:
      "RNJ Advisory accompagne les entrepreneurs et PME de l'idee a la creation, en prenant en charge le plan d'affaires, le plan financier, la carte professionnelle, les autorisations et toutes les demarches administratives.",
    icon: '/Mask group (13).svg',
    iconWidth: 141.41,
    iconHeight: 141.41,
  },
  {
    title: 'Conseils juridiques',
    description:
      "Etudes institutionnelles et reglementaires, conformite, et accompagnement de projets d'infrastructure avec expertise en marches publics, PPP, concessions et delegations de service public.",
    icon: '/Mask group (14).svg',
    iconWidth: 92.93,
    iconHeight: 92.93,
  },
  {
    title: 'Accompagnement en durabilite',
    description:
      "Accompagnement pour integrer la durabilite et les criteres ESG dans la strategie, en transformant les exigences reglementaires en leviers de performance et de credibilite.",
    icon: '/Mask group (15).svg',
    iconWidth: 140.4,
    iconHeight: 140.4,
  },
];

const whyChooseStripCards = [
  {
    title: 'Accompagnement humain, multilingue & engag\u00E9',
    description:
      "Proximit\u00E9, \u00E9coute active et respect de votre rythme : chez RNJ Advisory, nous mettons l'humain au c\u0153ur de chaque projet. Nous intervenons en fran\u00E7ais, anglais et arabe.",
    titleWidth: '301px',
    boxLeft: '-13.09%',
    boxRight: '92.99%',
  },
  {
    title: 'Expertise juridique & strat\u00E9gique',
    description:
      "Notre accompagnement repose sur la rigueur d'un pool d'experts sp\u00E9cialis\u00E9 en droit public, \u00E9nergie, strat\u00E9gie entrepreneuriale, gestion de projet et transformation op\u00E9rationnelle et digitale.",
    titleWidth: '259px',
    boxLeft: '8.13%',
    boxRight: '71.78%',
  },
  {
    title: 'Performances & fiabilit\u00E9',
    description:
      'Nous nous engageons \u00E0 vous offrir un service professionnel, rapide et s\u00E9curis\u00E9. Nos outils sont con\u00E7us pour r\u00E9duire les temps morts, fluidifier les d\u00E9marches administratives et optimiser vos r\u00E9sultats.',
    titleWidth: '259px',
    boxLeft: '29.35%',
    boxRight: '50.56%',
  },
  {
    title: 'M\u00E9thodologie et durabilit\u00E9',
    description:
      "Notre cadre d'accompagnement structur\u00E9 permet de clarifier les priorit\u00E9s, de construire une base solide, et de d\u00E9ployer votre activit\u00E9 avec agilit\u00E9, automatisation et vision long terme.",
    titleWidth: '259px',
    boxLeft: '50.56%',
    boxRight: '29.35%',
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description:
      'Bas\u00E9s \u00E0 Bruxelles et \u00E0 Tunis, nous accompagnons les porteurs de projet install\u00E9s en Belgique, les entrepreneurs hors UE, les institutions souhaitant structurer ou \u00E9tendre leur impact.',
    titleWidth: '285px',
    boxLeft: '71.78%',
    boxRight: '8.13%',
  },
  {
    title: 'Partenariats strat\u00E9giques avec des acteurs reconnus',
    description:
      "Nous collaborons avec un r\u00E9seau solide d'acteurs publics, priv\u00E9s et associatifs, en Belgique comme en Tunisie.",
    titleWidth: '303px',
    boxLeft: '92.99%',
    boxRight: '-13.09%',
  },
];

const faqItems = [
  "A qui s'adressent les services de RNJ Advisory ?",
  'Dans quels pays intervenez-vous ?',
  'Quels types de projets accompagnez-vous ?',
  "Comment se deroule une mission d'analyse reglementaire ?",
];

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7FCFF] to-white">
      <Navbar />

      <div className="relative w-full">
        <div className="relative w-full" style={{ aspectRatio: '1518 / 1009' }}>
          <Image
            src="/windmill-turbines-and-solar-battery-panels-in-gree-2026-01-08-22-51-23-utc 1 (2).svg"
            alt="Background"
            width={1518}
            height={1009}
            priority
            className="h-full w-full object-contain"
          />

          <div
            className="absolute left-1/2 h-[295px] w-[746px] -translate-x-1/2"
            style={{ top: '249px' }}
          >
            <div className="flex h-full flex-col items-center gap-10">
              <div className="flex w-[814px] flex-col items-center gap-[31px]">
                <h1
                  className="h-[114px] w-[715.21px] text-center font-[EB_Garamond] text-white"
                  style={{ fontSize: '68.6467px', fontWeight: 600, lineHeight: '57px' }}
                >
                  Conseil strategique pour une performance durable
                </h1>

                <p
                  className="mt-12 h-10 w-[814px] text-center font-[Geist] text-white"
                  style={{ fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}
                >
                  RNJ Advisory s&apos;associe a des organisations visionnaires pour
                  resoudre des defis critiques, optimiser leurs operations et creer
                  une valeur durable dans un environnement mondial en constante
                  evolution.
                </p>
              </div>

              <div className="flex h-[70px] w-[746px] flex-row items-start justify-center gap-[7.1px]">
                <button
                  className="flex h-[70px] w-[230px] items-center justify-center rounded-full bg-[#F7FCFF] shadow-lg transition hover:opacity-90"
                  style={{ boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)' }}
                >
                  <span
                    className="h-[19px] w-[161px] text-center font-[Geist] font-semibold text-[#003300]"
                    style={{ fontSize: '16px', lineHeight: '18px' }}
                  >
                    Explore Our Services
                  </span>
                </button>

                <button
                  className="flex h-[69px] w-[285px] items-center gap-[21px] rounded-full bg-[#BBCB2E] px-[6px] shadow-lg transition hover:opacity-90"
                  style={{
                    boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)',
                    padding: '10px 30px 10px 6px',
                  }}
                >
                  <div className="relative h-[56px] w-[56px] flex-shrink-0">
                    <div
                      className="absolute h-[56px] w-[56px] rounded-full bg-white"
                      style={{ left: '6px', top: '1.5px' }}
                    />
                    <div
                      className="absolute flex h-[56px] w-[56px] items-center justify-center"
                      style={{ left: '6px', top: '1.5px' }}
                    >
                      <Image
                        src="/Vector (17).svg"
                        alt="Arrow icon"
                        width={22}
                        height={22}
                      />
                    </div>
                  </div>

                  <span
                    className="h-[19px] w-[149px] text-center font-[Geist] text-[#003300]"
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      lineHeight: '18px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Contact an Advisor
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full" style={{ height: '113.43px' }}>
          <Image
            src="/Frame 16.png"
            alt="Frame 16"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative w-full overflow-hidden" style={{ height: '1609px' }}>
          <div
            className="absolute left-0 w-full"
            style={{
              height: '1611.06px',
              top: '-1.78px',
              background: '#003300',
            }}
          >
            <Image
              src="/Rectangle 4.svg"
              alt="Rectangle 4"
              fill
              className="object-cover"
            />
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: '1798px',
              height: '1896.72px',
              top: '-54.29px',
              pointerEvents: 'none',
            }}
          >
            {glowShapes.map((shape, index) => (
              <div
                key={`${shape.left}-${shape.top}-${index}`}
                className="absolute rounded-full"
                style={shape}
              />
            ))}
          </div>

          <div className="absolute left-1/2 top-0 h-full w-[1510px] -translate-x-1/2">
            <div
              className="absolute flex flex-col items-center gap-[35.5px]"
              style={{
                padding: '0px',
                width: '922px',
                height: '319.5px',
                left: 'calc(50% - 922px/2 - 1px)',
                top: '208px',
              }}
            >
              <h2
                className="h-[197px] w-[964px] text-center text-[#003300]"
                style={{
                  fontFamily: "'EB Garamond'",
                  fontStyle: 'normal',
                  fontSize: '117.641px',
                  fontWeight: 500,
                  lineHeight: '98px',
                }}
              >
                Expertise Reconnue. Résultats Prouvés.
              </h2>

              <p
                className="h-[87px] w-[906px] text-center text-[#003300]"
                style={{
                  marginTop: '90px',
                  fontFamily: "'Geist'",
                  fontStyle: 'normal',
                  fontSize: '25.803px',
                  fontWeight: 500,
                  lineHeight: '29px',
                  opacity: 0.7,
                }}
              >
                RNJ Advisory s&apos;associe à des organisations visionnaires pour
                résoudre des défis critiques, optimiser leurs opérations et créer
                une valeur durable dans un environnement mondial en constante
                évolution.
              </p>
            </div>

            <div
              className="absolute flex flex-row items-start justify-center gap-[19.21px]"
              style={{
                padding: '0px',
                width: '1392px',
                height: '524.38px',
                left: '58px',
                top: '706.81px',
                filter: 'drop-shadow(0px 3.84163px 30.4449px rgba(0, 0, 0, 0.25))',
              }}
            >
              <div
                className="relative flex h-[524.38px] w-[451.19px] flex-col items-center justify-center"
                style={{
                  padding: '75.6489px 39.366px',
                  gap: '10.09px',
                  isolation: 'isolate',
                  flex: 'none',
                  order: 0,
                  flexGrow: 0,
                }}
              >
                <div
                  className="absolute rounded-[50.4692px]"
                  style={{
                    width: '451.39px',
                    height: '524.38px',
                    left: '0.11px',
                    top: '0px',
                    background: 'rgba(0, 0, 0, 0.004)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute invisible"
                  style={{
                    width: '450.85px',
                    height: '418.57px',
                    left: '0px',
                    top: '0px',
                    background: '#F7FCFF',
                    borderRadius: '30.2584px',
                  }}
                />

                <div
                  className="relative z-[1] flex h-[278.58px] w-[372.18px] flex-col items-center gap-[46.43px]"
                  style={{ flex: 'none', order: 1, flexGrow: 0 }}
                >
                  <div className="relative" style={{ width: '88.05px', height: '101px' }}>
                    <Image
                      src="/Layer 1 (7).svg"
                      alt="Expertise icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div
                    className="flex h-[131.15px] w-[372.18px] flex-col items-center gap-[17.15px]"
                    style={{ padding: '0px', alignSelf: 'stretch', flex: 'none', order: 1, flexGrow: 0 }}
                  >
                    <h3
                      className="text-center font-[Geist] text-white"
                      style={{
                        width: '291.71px',
                        height: '29px',
                        fontFamily: "'Geist'",
                        fontStyle: 'normal',
                        fontSize: '29.0222px',
                        fontWeight: 800,
                        lineHeight: '29px',
                      }}
                    >
                      Expertise Certifi&eacute;e
                    </h3>

                    <p
                      className="w-[372.18px] text-center font-[Geist] text-white"
                      style={{
                        height: '85px',
                        fontFamily: "'Geist'",
                        fontStyle: 'normal',
                        fontSize: '22.7451px',
                        fontWeight: 500,
                        lineHeight: '21px',
                        opacity: 0.5,
                      }}
                    >
                      Une ma&icirc;trise approfondie des enjeux financiers,
                      r&eacute;glementaires et ESG pour des d&eacute;cisions
                      s&eacute;curis&eacute;es et conformes.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="relative flex h-[524.38px] w-[451.19px] flex-col items-center justify-center"
                style={{
                  padding: '75.6489px 39.366px',
                  gap: '10.09px',
                  isolation: 'isolate',
                  flex: 'none',
                  order: 1,
                  flexGrow: 0,
                }}
              >
                <div
                  className="absolute rounded-[50.4692px]"
                  style={{
                    width: '450.43px',
                    height: '524.38px',
                    left: '0.31px',
                    top: '0px',
                    background: 'rgba(0, 0, 0, 0.004)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute invisible"
                  style={{
                    width: '450.85px',
                    height: '418.57px',
                    left: '0px',
                    top: '0px',
                    background: '#F7FCFF',
                    borderRadius: '30.2584px',
                  }}
                />

                <div
                  className="relative z-[1] flex h-[286.58px] w-[372.18px] flex-col items-center gap-[46.43px]"
                  style={{ flex: 'none', order: 1, flexGrow: 0 }}
                >
                  <div className="relative" style={{ width: '101px', height: '101px' }}>
                    <Image
                      src="/Mask group (9).svg"
                      alt="Approche icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div
                    className="flex h-[139.15px] w-[372.18px] flex-col items-center gap-[17.15px]"
                    style={{ padding: '0px', alignSelf: 'stretch', flex: 'none', order: 1, flexGrow: 0 }}
                  >
                    <h3
                      className="text-center font-[Geist] text-white"
                      style={{
                        width: '189.63px',
                        height: '58px',
                        fontFamily: "'Geist'",
                        fontStyle: 'normal',
                        fontSize: '29.0222px',
                        fontWeight: 800,
                        lineHeight: '29px',
                      }}
                    >
                      Approche Sur-Mesure
                    </h3>

                    <p
                      className="w-[372.18px] text-center font-[Geist] text-white"
                      style={{
                        height: '64px',
                        fontFamily: "'Geist'",
                        fontStyle: 'normal',
                        fontSize: '22.7451px',
                        fontWeight: 500,
                        lineHeight: '21px',
                        opacity: 0.5,
                      }}
                    >
                      Des strat&eacute;gies adapt&eacute;es &agrave; chaque
                      entreprise, orient&eacute;es performance et r&eacute;sultats
                      mesurables.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="relative flex h-[524.38px] w-[451.19px] flex-col items-center justify-center"
                style={{
                  padding: '75.6489px 39.366px',
                  gap: '10.09px',
                  isolation: 'isolate',
                  flex: 'none',
                  order: 2,
                  flexGrow: 0,
                }}
              >
                <div
                  className="absolute rounded-[50.4692px]"
                  style={{
                    width: '451.39px',
                    height: '524.38px',
                    left: '-0.45px',
                    top: '0px',
                    background: 'rgba(0, 0, 0, 0.004)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute invisible"
                  style={{
                    width: '450.85px',
                    height: '418.57px',
                    left: '0px',
                    top: '0px',
                    background: '#F7FCFF',
                    borderRadius: '30.2584px',
                  }}
                />

                <div
                  className="relative z-[1] flex h-[278.58px] w-[372.18px] flex-col items-center gap-[46.43px]"
                  style={{ flex: 'none', order: 1, flexGrow: 0 }}
                >
                  <div className="relative" style={{ width: '101px', height: '101px' }}>
                    <Image
                      src="/Mask group (10).svg"
                      alt="Vision icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div
                    className="flex h-[131.15px] w-[372.18px] flex-col items-center gap-[17.15px]"
                    style={{ padding: '0px', alignSelf: 'stretch', flex: 'none', order: 1, flexGrow: 0 }}
                  >
                    <h3
                      className="text-center font-[Geist] text-white"
                      style={{
                        width: '291.71px',
                        height: '29px',
                        fontFamily: "'Geist'",
                        fontStyle: 'normal',
                        fontSize: '29.0222px',
                        fontWeight: 800,
                        lineHeight: '29px',
                      }}
                    >
                      Vision Durable
                    </h3>

                    <p
                      className="w-[372.18px] text-center font-[Geist] text-white"
                      style={{
                        height: '85px',
                        fontFamily: "'Geist'",
                        fontStyle: 'normal',
                        fontSize: '22.7451px',
                        fontWeight: 500,
                        lineHeight: '21px',
                        opacity: 0.5,
                      }}
                    >
                      Une ma&icirc;trise approfondie des enjeux financiers,
                      r&eacute;glementaires et ESG pour des d&eacute;cisions
                      s&eacute;curis&eacute;es et conformes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p
              className="absolute text-white"
              style={{
                width: '1193px',
                height: '76px',
                left: '157px',
                top: '1369px',
                fontFamily: "'Geist'",
                fontSize: '23.6828px',
                fontWeight: 400,
                lineHeight: '25px',
                opacity: 0.5,
              }}
            >
              RNJ Advisory combines certified expertise, tailored strategy, and a
              long-term sustainable vision to deliver secure, high-impact
              decisions. Our approach ensures regulatory compliance, measurable
              performance, and responsible growth aligned with each
              organization&apos;s strategic objectives.
            </p>
          </div>
        </div>

        <section
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '1513 / 1009' }}
        >
          <Image
            src="/happy-black-businessman-shaking-hands-with-his-col-2026-01-09-10-34-53-utc 1 (1).svg"
            alt="Business meeting background"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />

          <div
            className="absolute flex flex-col items-start justify-center"
            style={{
              width: '905.3px',
              height: '347.16px',
              left: '64px',
              top: '800.22px',
              padding: '0px',
              gap: '23.37px',
            }}
          >
            <div className="relative" style={{ width: '905.3px', height: '252.37px' }}>
              <h2
                className="absolute text-white"
                style={{
                  width: '905.3px',
                  height: '164px',
                  left: '0px',
                  top: '0px',
                  fontFamily: "'EB Garamond'",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '70.3562px',
                  lineHeight: '55px',
                  letterSpacing: '-0.03em',
                }}
              >
                Concr&eacute;tisez vos id&eacute;es avec un cabinet de conseils
                juridiques &amp; strat&eacute;giques &agrave; Bruxelles
              </h2>

              <p
                className="absolute text-white"
                style={{
                  width: '615.44px',
                  height: '65px',
                  left: '0px',
                  top: '187.37px',
                  fontFamily: "'Geist'",
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '19.2112px',
                  lineHeight: '21px',
                  opacity: 0.7,
                }}
              >
                RNJ Advisory partners with forward-thinking organizations to solve
                critical challenges, optimize operations, and create sustainable
                value in an evolving global environment.
              </p>
            </div>

            <div
              className="flex flex-row items-start"
              style={{ width: '471.55px', height: '71.42px', padding: '0px', gap: '10.5px' }}
            >
              <button
                type="button"
                className="flex items-center justify-center text-white"
                style={{
                  boxSizing: 'border-box',
                  width: '155.43px',
                  height: '71.42px',
                  padding: '24.1554px 93.4708px 25.2056px',
                  gap: '10.5px',
                  border: '2.10047px solid #F7FCFF',
                  borderRadius: '9.4521px',
                  fontFamily: "'Geist'",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '21.3092px',
                  lineHeight: '21px',
                }}
              >
                About
              </button>

              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  width: '305.62px',
                  height: '70.31px',
                  padding: '24.1554px 10.5023px',
                  gap: '10.5px',
                  background: '#BBCB2E',
                  borderRadius: '9.4521px',
                  fontFamily: "'Geist'",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '21.3092px',
                  lineHeight: '21px',
                  color: '#003300',
                }}
              >
                Request a Consultation
              </button>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#F7FCFF] py-24">
          <div className="mx-auto flex w-full max-w-[1513px] flex-col items-center gap-[180px] px-4">
            <div className="relative w-full max-w-[1392px]">
              <div className="flex flex-col gap-[90px]">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                    <span
                      className="font-[Geist] font-bold text-[#003300]"
                      style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                    >
                      Entrepreneuriat
                    </span>
                  </div>

                  <button
                    type="button"
                    className="rounded-full bg-[#BBCB2E] px-[43px] py-4 font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                  >
                    Contact
                  </button>
                </div>

                <div className="flex flex-col items-center gap-[41px] text-center">
                  <h2
                    className="max-w-[824.16px] font-[EB_Garamond] font-extrabold text-[#003300]"
                    style={{ fontSize: '100.3px', lineHeight: '91px' }}
                  >
                    Independants &amp; Porteurs de Projet
                  </h2>

                  <p
                    className="max-w-[998.43px] font-[Geist] font-medium text-[#003300]"
                    style={{ fontSize: '23.6774px', lineHeight: '26px', opacity: 0.5 }}
                  >
                    Vous etes independant ou envisagez de lancer votre activite ?
                    Vous souhaitez structurer votre projet sur des bases solides,
                    securisees et durables ? RNJ Advisory vous accompagne dans la
                    transformation de votre idee en une activite juridiquement
                    conforme, economiquement viable et prete a se developper.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-[18px]">
                  {entrepreneurshipCards.map((card) => (
                    <div
                      key={card.title}
                      className="group flex h-[281.33px] w-[217px] cursor-pointer flex-col items-center text-center"
                    >
                      <div
                        className="relative h-[217px] w-[217px] rounded-[40px] border-[4px] border-transparent bg-[rgba(187,203,46,0.5)] transition-all duration-300 ease-out group-hover:border-[#D1D98B] group-hover:bg-[#003300] group-active:border-[#D1D98B] group-active:bg-[#003300]"
                      >
                        <div
                          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: `${card.iconWidth}px`,
                            height: `${card.iconHeight}px`,
                          }}
                        >
                          <Image
                            src={card.icon}
                            alt={card.title}
                            fill
                            className="object-contain transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)] group-active:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)]"
                          />
                        </div>
                      </div>

                      <p
                        className="mt-[24.03px] h-[40px] font-[Geist] font-semibold text-[#003300]"
                        style={{
                          width: `${card.titleWidth}px`,
                          fontSize: '20px',
                          lineHeight: '20px',
                        }}
                      >
                        {card.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-[1393.44px]">
              <div className="mb-12 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                  <span
                    className="font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                  >
                    Services
                  </span>
                </div>

                <button
                  type="button"
                  className="rounded-full bg-[#BBCB2E] px-6 py-3 font-[Geist] font-semibold text-[#003300]"
                  style={{ fontSize: '23.6828px', lineHeight: '20px' }}
                >
                  contact
                </button>
              </div>

              <div className="grid grid-cols-1 gap-[17px] xl:grid-cols-3">
                {serviceCards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-[39.3941px] bg-[#F7FCFF] px-8 py-[60px] text-center"
                    style={{ boxShadow: '1.92358px 1.92358px 20.8708px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div
                      className="relative mx-auto mb-10"
                      style={{ width: `${card.iconWidth}px`, height: `${card.iconHeight}px` }}
                    >
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h3
                      className="mx-auto mb-6 max-w-[387px] font-[Geist] font-bold text-[#003300]"
                      style={{ fontSize: '28.7287px', lineHeight: '29px' }}
                    >
                      {card.title}
                    </h3>

                    <p
                      className="mx-auto max-w-[386px] font-[Geist] font-medium text-[#003300]"
                      style={{ fontSize: '15.295px', lineHeight: '15px' }}
                    >
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid w-full max-w-[1157px] grid-cols-1 gap-[19px] xl:grid-cols-2">
              <article className="relative overflow-hidden rounded-[35px]">
                <div className="relative h-[816px] w-full">
                  <Image
                    src="/Mask group (16).svg"
                    alt="Strategie et conformite"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 flex flex-col items-center px-[32px] pb-[56px] pt-[77px]">
                  <div className="flex h-[680.73px] w-[505px] flex-col items-center gap-[17px]">
                    <div className="flex h-[563.73px] w-[505px] flex-col items-center gap-[19px]">
                      <div
                        className="relative h-[533px] w-[505px] overflow-hidden rounded-[18px] text-white"
                        style={{
                          background: 'rgba(255, 255, 255, 0.14)',
                          boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(180deg, #FFFFFF 65.38%, rgba(255, 255, 255, 0) 100%)',
                            opacity: 0.16,
                          }}
                        />

                        <h3
                          className="absolute left-[41px] top-[127px] w-[381px] font-[Geist] font-normal text-white"
                          style={{ fontSize: '61.04px', lineHeight: '60px' }}
                        >
                          Strategie &amp; Conformite
                        </h3>

                        <p
                          className="absolute left-[41px] top-[283px] w-[439px] font-[Geist] font-normal text-white"
                          style={{ fontSize: '16px', lineHeight: '18px' }}
                        >
                          RNJ Advisory est un cabinet de conseil strategique
                          specialise dans l&apos;analyse institutionnelle, la
                          conformite reglementaire et le developpement economique
                          durable. Nous accompagnons les acteurs publics, les
                          entreprises privees, les investisseurs et les bailleurs
                          de fonds dans la comprehension d&apos;environnements
                          juridiques et reglementaires complexes, en Europe et en
                          Afrique du Nord. Notre approche repose sur trois piliers :
                          rigueur analytique, vision strategique et securisation des
                          projets. Nous aidons nos clients a anticiper les
                          evolutions legales, structurer leurs activites, maitriser
                          leurs risques et saisir les opportunites liees aux
                          transitions economiques, energetiques et reglementaires.
                        </p>
                      </div>

                      <div className="flex h-[11.73px] w-[48.05px] items-center gap-[8px]">
                        <span className="h-[11.73px] w-[11.73px] rounded-full bg-[#ECECEC]" />
                        <span className="h-[10.16px] w-[10.16px] rounded-full bg-white/30" />
                        <span className="h-[10.16px] w-[10.16px] rounded-full bg-white/30" />
                      </div>
                    </div>

                    <div className="flex h-[100px] w-[317px] flex-col items-center gap-[26px]">
                      <button
                        type="button"
                        className="flex h-[53px] w-[225px] items-center justify-center rounded-[18px] bg-white font-[Geist] font-bold text-black"
                        style={{ fontSize: '16px', lineHeight: '16px' }}
                      >
                        Securiser mon projet
                      </button>

                      <p
                        className="w-[317px] text-center font-[Geist] font-medium text-white/50"
                        style={{ fontSize: '15.3706px', lineHeight: '21px' }}
                      >
                        &copy; 2026 RNJ Advisory. Tous droits reserves.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[35px]">
                <div className="relative h-[816px] w-full">
                  <Image
                    src="/Mask group (17).svg"
                    alt="Decision strategique"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 text-white">
                  <div
                    className="absolute flex items-center gap-[7px]"
                    style={{ left: '32px', top: '31px', width: '178.93px', height: '18px' }}
                  >
                    <span className="h-[7.11px] w-[7.11px] rounded-full bg-white" />
                    <span
                      className="font-[Geist] font-bold"
                      style={{ fontSize: '16.8333px', lineHeight: '18px' }}
                    >
                      Conseil Strategique
                    </span>
                  </div>

                  <div
                    className="absolute rounded-[18px]"
                    style={{
                      left: '32px',
                      top: '77px',
                      width: '505px',
                      height: '533px',
                      background: 'rgba(255, 255, 255, 0.14)',
                      boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <div className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-white/20 to-white/0" />

                    <div
                      className="absolute"
                      style={{ left: '21px', top: '16px', width: '463px', height: '349px' }}
                    >
                      <Image
                        src="/Group 65.svg"
                        alt="Performance chart"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h3
                      className="absolute font-[EB_Garamond] font-normal text-white"
                      style={{
                        left: '21px',
                        top: '387px',
                        width: '417px',
                        height: '62px',
                        fontSize: '31.25px',
                        lineHeight: '31px',
                      }}
                    >
                      Des projets accompagnes securises des la phase de
                      structuration
                    </h3>

                    <p
                      className="absolute text-white/60"
                      style={{
                        left: '21px',
                        top: '464px',
                        width: '439px',
                        height: '32px',
                        fontSize: '16px',
                        lineHeight: '16px',
                      }}
                    >
                      Nous analysons, structurons et securisons vos projets dans
                      des environnements reglementaires complexes.
                    </p>
                  </div>

                  <p
                    className="absolute text-white/60"
                    style={{
                      left: '32px',
                      top: '651px',
                      width: '439px',
                      height: '32px',
                      fontSize: '16px',
                      lineHeight: '16px',
                    }}
                  >
                    Une expertise independante au service de decisions
                    strategiques securisees.
                  </p>

                  <button
                    type="button"
                    className="absolute flex items-center justify-center rounded-full border-2 border-white font-[Geist] font-medium text-white"
                    style={{
                      left: '32px',
                      top: '605px',
                      width: '114px',
                      height: '53px',
                      fontSize: '16px',
                      lineHeight: '16px',
                    }}
                  >
                    About
                  </button>

                  <button
                    type="button"
                    className="absolute flex items-center justify-center rounded-full bg-white font-[Geist] font-bold text-black"
                    style={{
                      left: '156px',
                      top: '605px',
                      width: '225px',
                      height: '53px',
                      fontSize: '16px',
                      lineHeight: '16px',
                    }}
                  >
                    Securiser mon projet
                  </button>
                </div>
              </article>
            </div>

            <section className="w-full max-w-[1392.5px]">
              <div className="mb-[62px] flex w-full flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-[11px]">
                  <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                  <span
                    className="font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                  >
                    Trustworthy
                  </span>
                </div>

                <button
                  type="button"
                  className="flex h-[47px] w-[159px] items-center justify-center rounded-[200px] bg-[#BBCB2E] px-[23px] py-[10px] font-[Geist] font-semibold text-[#003300]"
                  style={{ fontSize: '23.6828px', lineHeight: '20px' }}
                >
                  contact
                </button>
              </div>

              <div className="flex w-full flex-col items-start gap-[62px] xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-[792px]">
                  <p
                    className="mb-8 max-w-[473px] font-[Geist] font-semibold text-[#003300]"
                    style={{ fontSize: '16px', lineHeight: '18px', opacity: 0.49 }}
                  >
                    Nous analysons votre environnement institutionnel et
                    reglementaire afin de securiser vos decisions et garantir la
                    conformite de vos projets.
                  </p>

                  <h2
                    className="font-[EB_Garamond] font-medium text-[#003300]"
                    style={{ fontSize: '72.215px', lineHeight: '57px' }}
                  >
                    Vous portez un projet. Nous securisons son environnement.
                  </h2>
                </div>

                <div className="relative h-[322px] w-[257px] overflow-hidden rounded-[28px]">
                  <Image src="/Frame 65.svg" alt="2026 insight" fill className="object-cover" />
                </div>
              </div>
            </section>

            <article
              className="grid w-full max-w-[1392px] grid-cols-1 gap-[40px] rounded-[40px] bg-[#F7FCFF] p-[15px] xl:grid-cols-[672px_minmax(0,1fr)]"
              style={{ boxShadow: '2px 4px 28.3px rgba(0, 0, 0, 0.17)' }}
            >
              <div className="relative min-h-[781px] overflow-hidden rounded-[25px]">
                <Image
                  src="/Mask group (18).svg"
                  alt="Entrepreneurs hors Union Europeenne"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col items-start gap-[42.12px] px-6 py-10">
                <div className="flex items-center gap-3">
                  <span className="h-[9.33px] w-[9.33px] rounded-full bg-[#003300]" />
                  <span
                    className="font-[Geist] font-semibold text-[#003300]"
                    style={{ fontSize: '20px', lineHeight: '24px' }}
                  >
                    Entrepreneuriat
                  </span>
                </div>

                <div className="flex flex-col gap-[61px]">
                  <div className="flex flex-col gap-[19px]">
                    <h3
                      className="max-w-[613px] font-[EB_Garamond] font-semibold text-[#003300]"
                      style={{
                        fontSize: '64px',
                        lineHeight: '51px',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      Entrepreneurs Hors Union Europeenne Installation en Belgique
                    </h3>

                    <p
                      className="max-w-[572px] font-[Geist] font-medium text-[#003300]"
                      style={{ fontSize: '16px', lineHeight: '19px', opacity: 0.7 }}
                    >
                      Vous etes ressortissant hors Union europeenne et souhaitez
                      developper votre activite en Belgique ? RNJ Advisory vous
                      accompagne a chaque etape de votre installation afin de
                      securiser votre projet sur les plans juridique, strategique
                      et administratif.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-[9.8px]">
                    <button
                      type="button"
                      className="rounded-full border-[1.96016px] border-[#003300] px-[87px] py-[22px] font-[Geist] font-semibold text-[#003300]"
                      style={{ fontSize: '16px', lineHeight: '20px' }}
                    >
                      About
                    </button>

                    <button
                      type="button"
                      className="rounded-full bg-[#003300] px-[26px] py-[22px] font-[Geist] font-semibold text-[#F7FCFF]"
                      style={{ fontSize: '16px', lineHeight: '20px' }}
                    >
                      Planifier un entretien confidentiel
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <section className="w-full max-w-[1533px]">
              <div className="xl:hidden">
                <div className="mb-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                    <span
                      className="font-[Geist] font-bold text-[#003300]"
                      style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                    >
                      Pourquoi choisir RNJ Advisory ?
                    </span>
                  </div>

                  <p
                    className="font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: '20px', lineHeight: '18px', opacity: 0.65 }}
                  >
                    Une expertise rigoureuse au service de vos décisions
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-[16.16px] md:grid-cols-2">
                  {whyChooseStripCards.map((card) => (
                    <article
                      key={card.title}
                      className="rounded-[24px] bg-[#003300] px-6 py-8 text-center text-[#F7FCFF]"
                      style={{ boxShadow: '0px 4px 22.4px rgba(0, 0, 0, 0.19)' }}
                    >
                      <h3
                        className="mx-auto mb-5 font-[EB_Garamond] font-bold"
                        style={{
                          width: card.titleWidth,
                          maxWidth: card.titleWidth,
                          fontSize: '32px',
                          lineHeight: '27px',
                        }}
                      >
                        {card.title}
                      </h3>

                      <p
                        className="mx-auto max-w-[262.42px] font-[Geist] font-normal"
                        style={{ fontSize: '14px', lineHeight: '16px' }}
                      >
                        {card.description}
                      </p>
                    </article>
                  ))}
                </div>

                <p
                  className="mt-8 font-[Geist] font-semibold text-[#003300]"
                  style={{ fontSize: '16px', lineHeight: '18px', opacity: 0.5 }}
                >
                  Choisir RNJ Advisory, c&apos;est bénéficier d&apos;une approche
                  structurée, indépendante et orientée résultats. Nous combinons
                  analyse juridique, compréhension institutionnelle et vision
                  stratégique afin de vous aider à anticiper les risques, assurer
                  la conformité de vos projets et prendre des décisions éclairées.
                </p>
              </div>

              <div
                className="relative hidden xl:block"
                style={{ width: '1533px', height: '512px' }}
              >
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: '11.52%',
                    bottom: '10.55%',
                    background:
                      'linear-gradient(90deg, rgba(217, 217, 217, 0.25) 0%, #A6A6A6 19.71%, #8D8D8D 80%, rgba(115, 115, 115, 0.25) 100%)',
                  }}
                />

                <div
                  className="absolute flex flex-col items-start gap-3"
                  style={{ left: '3.97%', top: 0 }}
                >
                  <div className="flex items-center gap-[11px]">
                    <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                    <span
                      className="font-[Geist] font-bold text-[#003300]"
                      style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                    >
                      Pourquoi choisir RNJ Advisory ?
                    </span>
                  </div>

                  <p
                    className="font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: '20px', lineHeight: '18px', opacity: 0.65 }}
                  >
                    {'Une expertise rigoureuse au service de vos d\u00E9cisions'}
                  </p>
                </div>

                {whyChooseStripCards.map((card) => (
                  <article
                    key={card.title}
                    className="absolute overflow-hidden rounded-[10px] bg-[#003300] text-center text-[#F7FCFF]"
                    style={{
                      left: card.boxLeft,
                      right: card.boxRight,
                      top: '20.9%',
                      bottom: '19.73%',
                      boxShadow: '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                    }}
                  >
                    <div className="absolute left-1/2 top-1/2 flex w-[303px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5">
                      <h3
                        className="font-[EB_Garamond] font-bold"
                        style={{
                          width: card.titleWidth,
                          maxWidth: card.titleWidth,
                          fontSize: '32px',
                          lineHeight: '27px',
                        }}
                      >
                        {card.title}
                      </h3>

                      <p
                        className="w-[262.42px] font-[Geist] font-normal"
                        style={{ fontSize: '14px', lineHeight: '16px' }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </article>
                ))}

                <p
                  className="absolute font-[Geist] font-semibold text-[#003300]"
                  style={{
                    left: '3.97%',
                    right: '37.81%',
                    top: '89.45%',
                    fontSize: '16px',
                    lineHeight: '18px',
                    opacity: 0.5,
                  }}
                >
                  {'Choisir RNJ Advisory, c’est bénéficier d’une approche structurée, indépendante et orientée résultats. Nous combinons analyse juridique, compréhension institutionnelle et vision stratégique afin de vous aider à anticiper les risques, assurer la conformité de vos projets et prendre des décisions éclairées.'}
                </p>
              </div>
            </section>

            <div className="flex w-full max-w-[994px] flex-col items-center gap-[56px]">
              <div
                className="w-full rounded-[25px] bg-white px-[18px] pb-[61px] pt-[107px]"
                style={{ boxShadow: '2px 4px 33.5px rgba(0, 0, 0, 0.12)' }}
              >
                <div className="mx-auto flex w-full max-w-[922px] flex-col items-center gap-[81px]">
                  <div className="flex max-w-[721px] flex-col items-center gap-[45px] text-center">
                    <h2
                      className="w-full font-[EB_Garamond] font-normal text-[#003300]"
                      style={{ fontSize: '61.04px', lineHeight: '25px' }}
                    >
                      Questions frequentes
                    </h2>

                    <p
                      className="w-full font-[Geist] font-normal text-[#003300]"
                      style={{ fontSize: '16px', lineHeight: '25px' }}
                    >
                      Retrouvez ici les reponses aux interrogations les plus
                      courantes concernant nos services, notre methodologie et
                      notre accompagnement strategique.
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-[10px]">
                    {faqItems.map((item) => (
                      <div
                        key={item}
                        className="flex w-full items-center justify-between rounded-[22px] bg-[#BBCB2E]/50 px-[57px] py-[37px]"
                      >
                        <span
                          className="font-[Geist] font-normal text-[#003300]"
                          style={{ fontSize: '20px', lineHeight: '25px' }}
                        >
                          {item}
                        </span>

                        <span className="relative h-[11px] w-[22px]">
                          <Image
                            src="/Vector (19).svg"
                            alt="Expand"
                            fill
                            className="object-contain opacity-50"
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-[14px]">
                <div
                  className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-white"
                  style={{ boxShadow: '2px 4px 33.5px rgba(0, 0, 0, 0.12)' }}
                >
                  <div className="relative h-[26px] w-[26px]">
                    <Image src="/Vector (18).svg" alt="Question icon" fill className="object-contain" />
                  </div>
                </div>

                <p
                  className="font-[Geist] font-medium text-[#003300]"
                  style={{ fontSize: '15px', lineHeight: '17px', opacity: 0.2 }}
                >
                  a un question?
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


