import { useState } from "react";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface GoogleReview {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const ReviewCard = ({ review }: { review: GoogleReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120;
  const isLongText = review.text.length > maxLength;
  const displayText = isExpanded ? review.text : review.text.slice(0, maxLength);

  return (
    <div className="group relative flex-shrink-0 w-[380px] p-30 rounded-15 bg-white border border-off-black/10 hover:border-off-black/20 hover:shadow-lg transition-all duration-slow">
      {/* Quote icon */}
      <Quote className="absolute top-20 right-20 w-[32px] h-[32px] text-off-black/10 rotate-180" />
      
      {/* Stars */}
      <div className="flex gap-2 mb-15">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-[16px] h-[16px] text-yellow fill-yellow" />
        ))}
      </div>

      {/* Review text */}
      <p className="text-off-black font-light leading-relaxed mb-10 text-small">
        "{displayText}{isLongText && !isExpanded && '...'}"
      </p>
      
      {isLongText && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-small text-off-black/60 hover:text-off-black underline mb-15"
        >
          {isExpanded ? 'Vis mindre' : 'Les mer'}
        </button>
      )}
      {!isLongText && <div className="mb-15" />}

      {/* Author */}
      <div className="pt-15 border-t border-off-black/10">
        <p className="font-normal text-off-black text-small">{review.name}</p>
        <p className="text-[12px] text-off-black/40 font-light">{review.date}</p>
      </div>
    </div>
  );
};

export const GoogleReviewsSection = () => {
  const googleReviews: GoogleReview[] = [
    {
      id: 1,
      name: "Trude Pedersen",
      rating: 5,
      text: "Fantastisk opplevelse- hyggelig og dyktig lege. Fikk meg til å føle meg veldig trygg og fikk nyttig informasjon. Legen heter Siri Kløkstad",
      date: "5 måneder siden",
    },
    {
      id: 2,
      name: "Kaja Kollsgård",
      rating: 5,
      text: "Har hatt en veldig behagelig og fin opplevelse med eggfrys på CMedical. Min lege Jackson var svært dyktig og betryggende. Ved selve egguttaket var Birgitte og Jeanett så gode til å få meg til å slappe av og føle med trygg, at opplevelsen var tilnærmet smertefri. Sykepleier Line fulgte meg opp og hele veien og ga meg all informasjon jeg trengte. Anbefaler CMedical på det sterkeste.",
      date: "7 måneder siden",
    },
    {
      id: 3,
      name: "Børge Thue",
      rating: 5,
      text: "God servise, gjennomføringsevne. Fantastisk personale og flotte lokaler og god meny.",
      date: "1 måned siden",
    },
    {
      id: 4,
      name: "Basse Grefsrud",
      rating: 5,
      text: "Fra start til etter operasjonen har alt gått på skinner veldig fornøyd",
      date: "2 uker siden",
    },
    {
      id: 5,
      name: "Thor Gustavsen",
      rating: 5,
      text: "Etter robotassistert kirurgi for prostatakreft av kirurg Nicolai Wessel, er jeg utrolig fornøyd. Både før og etter operasjonen. Fikk helt super informasjon om alt jeg lurte på og Nicolai Wessel var utrolig sympatisk og brukte god tid med meg etter operasjonen. Hele teamet rundt meg med anestesilege og sykepleier var profesjonelle og jeg følte meg så godt ivaretatt. Tusen takk til alle sammen",
      date: "2 måneder siden",
    },
    {
      id: 6,
      name: "Kjell Olav Rebne",
      rating: 5,
      text: "Full score på alle punkter fra mottakelse, forberedelse til operasjon, operasjon, oppvåkning, etterbehandling, mat, service og kompetanse hele veien. Ansvalig lege var Trond Jørgensen",
      date: "1 måned siden",
    },
    {
      id: 7,
      name: "Anders Engh",
      rating: 5,
      text: "Jeg fikk påvist artrose i håndleddet mitt og ble henvist til Jan Ragnar Haugstvedt! Ekstremt dyktig håndkirurg og en usedvanlig hyggelig kar! Hele opplevelsen fra ankomst operasjonsdag av Anne Emilie, til teamet med Margrethe i spissen gjorde en litt skummel dag til det motsatte! De første 14 dagene etter inngrepet har vært tilnærmet smertefritt. Kan anbefale klinikken på det sterkeste og takker for opplevelsen. Keep up the good work!",
      date: "4 måneder siden",
    },
    {
      id: 8,
      name: "Tiril Charlotte Ulrichsen",
      rating: 5,
      text: "Jeg hadde en veldig fin opplevelse hos CMedical. Ble tatt godt imot, og følte meg både hørt og forstått gjennom hele timen. Gynekologen Ida var nøye i arbeidet og fikk meg til å føle meg trygg og godt ivaretatt. Jeg kommer absolutt til å anbefale CMedical og kommer tilbake!",
      date: "1 måned siden",
    },
    {
      id: 9,
      name: "Cato Ingebretsen",
      rating: 5,
      text: "Jeg hadde en særskilt god opplevelse ved bruk av CMedical i fm. en kompleks, større skulderoperasjon i november 2024. CMedical var svært imøtekommende og profesjonelle. Spesielt må jeg fremheve overlege Kristian Marstrand Warholm som så min motivasjon og ga meg muligheten til operasjonen på tross av min høye alder (60). Allerede etter to måneder var jeg i gang med styrketrening og ett år senere er jeg sterkere i skulderen enn noen gang. En stor og hjertelig takk til Kristian og Team CMedical.",
      date: "2 måneder siden",
    },
    {
      id: 10,
      name: "Martine Widing",
      rating: 5,
      text: "Hyggelig og god opplevelse. Følte meg godt ivaretatt :)",
      date: "3 måneder siden",
    },
    {
      id: 11,
      name: "Line Toft Sæther",
      rating: 5,
      text: "Nydelig sted med fantastiske mennesker. Fikk veldig god hjelp av legene og sykepleierne. Super opplevelse med nedfrysning av egg.",
      date: "6 måneder siden",
    },
    {
      id: 12,
      name: "Mari Nilsen",
      rating: 5,
      text: "Utførte IVF her i 2023 og endte opp med en nydelig gutt etter 3 forsøk. Kan ikke garantere andre å være så heldig, men kan garantere at C-Medical vil ta godt vare på deg i gjennom hele prosessen. Har ingen ting å klage på.",
      date: "11 måneder siden",
    },
    {
      id: 13,
      name: "Terje Schults",
      rating: 5,
      text: "Veldig prof behandling, veldig hyggelig og seriøse medarbeidere. Rommet var fantastisk",
      date: "3 måneder siden",
    },
    {
      id: 14,
      name: "Sunniva Hage",
      rating: 5,
      text: "Ingvild Aanerud er en dyktig osteopat med stor kunnskap. Hun er varm, lyttende, trygg og har et stort engasjement for pasientene sine. Ingvild er spesielt god på kvinnehelse, men i tillegg til dette er hun en svært dyktig osteopat som kan behandle de fleste former for plager. Jeg kan virkelig anbefale Ingvild.",
      date: "7 måneder siden",
    },
  ];
  
  const googleRatingData = {
    averageRating: 4.6,
  };

  const { averageRating } = googleRatingData;

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...googleReviews, ...googleReviews];

  return (
    <section className="py-80 md:py-100 bg-skin1 relative overflow-hidden">
      <div className="container mx-auto px-20 md:px-60 relative">
        {/* Header with Google rating */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-30 mb-50">
          <div className="max-w-[600px]">
            <p className="text-small text-off-black/50 font-medium mb-10 tracking-wide uppercase">
              Våre pasienter forteller
            </p>
            <h2 className="text-large md:text-xlarge font-light text-off-black leading-tight">
              Trygghet, omsorg og helsehjelp i livets ulike faser
            </h2>
          </div>

          {/* Google Rating Card */}
          <div className="flex items-center gap-20 p-20 rounded-15 bg-white border border-off-black/10">
            {/* Google logo styled */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#4285F4] font-semibold text-[18px]">G</span>
                <span className="text-[#EA4335] font-semibold text-[18px]">o</span>
                <span className="text-[#FBBC05] font-semibold text-[18px]">o</span>
                <span className="text-[#4285F4] font-semibold text-[18px]">g</span>
                <span className="text-[#34A853] font-semibold text-[18px]">l</span>
                <span className="text-[#EA4335] font-semibold text-[18px]">e</span>
              </div>
              <span className="text-[12px] text-off-black/50">Anmeldelser</span>
            </div>
            <div className="w-[1px] h-[48px] bg-off-black/10" />
            <div>
              <div className="flex items-center gap-10">
                <span className="text-[36px] font-normal text-off-black">{averageRating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-[20px] h-[20px] ${i < Math.floor(averageRating) ? 'text-yellow fill-yellow' : i < averageRating ? 'text-yellow fill-yellow opacity-50' : 'text-off-black/20'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-scrolling Reviews */}
      <div className="relative mt-30">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-[96px] bg-gradient-to-r from-skin1 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[96px] bg-gradient-to-l from-skin1 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex gap-20 animate-scroll-left hover:[animation-play-state:paused]">
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-20 md:px-60 mt-60 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-15 p-20 rounded-15 bg-off-black">
          <div className="text-center sm:text-left">
            <p className="text-white font-normal mb-4 text-small">
              Over 150 000 fornøyde pasienter siden 2002
            </p>
            <p className="text-white/50 text-[14px] font-light">
              Bli en del av vår historie
            </p>
          </div>
          <Button 
            size="lg" 
            className="rounded-full px-30 bg-yellow text-off-black hover:bg-yellow/90 flex-shrink-0"
          >
            Bestill time
            <ArrowRight className="ml-10 w-[16px] h-[16px]" />
          </Button>
        </div>
      </div>
    </section>
  );
};