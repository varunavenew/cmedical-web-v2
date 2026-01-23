"use client"
import { FC } from "react";
import { CategoryList } from "./Category/CategoryList";
import { SubTopicsSection } from "./SubTopicsSection";
import { ClinicsAndSpecialistsSection } from "./ClinicsAndSpecialistsSection";
import { Image } from "./Image";
import { Video } from "./Video";
import { GoogleReviewsSection } from "./GoogleReviewsSection";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BookingWidget } from "./BookingWidget";
import { TaglineBanner } from "./TaglineBanner";
import { ServiceCardList } from "./ServiceCardList";
import { FaqsSection } from "./FaqsSection";
interface Props {
  data: HomePage;
}


const HomeContent: FC<Props> = ({ data }) => {
  const heroCards = data.home?.heroSections?.slice(0, 2) ?? [];
  const services = data.home?.servicesSection?.services ?? [];

  return (
    <main>
      <TaglineBanner />
      <section className="bg-off-black min-h-[calc(100vh-120px)] flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
          {/* Two Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6 max-w-5xl mx-auto">
            {/* First Featured Card */}
            <motion.a
              href={heroCards[0]?.cta?.url ?? `/${data.language}/gynekologi`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {heroCards[0]?.backgroundVideoUrl ? (
                  <video
                    src={heroCards[0].backgroundVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : data.primaryVideo ? (
                  <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    <Video
                      video={data.primaryVideo}
                      className="w-full h-full"
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      controls={false}
                    />
                  </div>
                ) : (
                  <Image
                    image={data.primaryImage.image}
                    alt={data.primaryImage.alt}
                    className="w-full h-full"
                    imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                )}
                {/* Elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-7">
                    {heroCards[0]?.eyebrow ?? "NORGES STØRSTE PRIVATE SENTER"}
                  </p>
                  <h2 className="text-white text-xl md:text-2xl font-light mb-7 group-hover:translate-x-1 transition-transform duration-300">
                    {heroCards[0]?.headline ?? "Gynekologi og kvinnehelse"}
                  </h2>
                  <p className="text-white/50 text-sm font-light mb-15 hidden md:block">
                    {heroCards[0]?.description ??
                      "Erfarne spesialister for alle livsfaser."}
                  </p>
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                    <span className="text-sm font-light">
                      {heroCards[0]?.cta?.label ?? "Utforsk"}
                    </span>
                    <ArrowRight className="w-15 h-15 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Second Featured Card */}
            <motion.a
              href={heroCards[1]?.cta?.url ?? `/${data.language}/fertilitet`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {heroCards[1]?.backgroundVideoUrl ? (
                  <video
                    src={heroCards[1].backgroundVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : data.secondaryVideo ? (
                  <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                    <Video
                      video={data.secondaryVideo}
                      className="w-full h-full"
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      controls={false}
                    />
                  </div>
                ) : (
                  <Image
                    image={data.secondaryImage.image}
                    alt={data.secondaryImage.alt}
                    className="w-full h-full"
                    imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                )}
                {/* Elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-25 md:p-8 z-20">
                  <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2">
                    {heroCards[1]?.eyebrow ?? "HØY SUKSESSRATE"}
                  </p>
                  <h2 className="text-white text-xl md:text-2xl font-light mb-7 group-hover:translate-x-1 transition-transform duration-300">
                    {heroCards[1]?.headline ?? "IVF og fertilitetsbehandling"}
                  </h2>
                  <p className="text-white/50 text-sm font-light mb-15 hidden md:block">
                    {heroCards[1]?.description ??
                      "Moderne teknologi og ekte omsorg."}
                  </p>
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                    <span className="text-sm font-light">
                      {heroCards[1]?.cta?.label ?? "Utforsk"}
                    </span>
                    <ArrowRight className="w-15 h-15 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Service Category Cards - 5 cards with images */}
          {services.length > 0 ? (
            <ServiceCardList services={services} />
          ) : data.promotedCategories ? (
            <CategoryList categories={data.promotedCategories} />
          ) : null}
        </div>
      </section>

      {data.faq && (
        <FaqsSection faq={data.faq} language={data.language} />
      )}

      <ClinicsAndSpecialistsSection
        language={data.language}
        clinicList={data.clinicList}
        specialistList={data.specialistList}
        className="bg-white"
      />


      <GoogleReviewsSection />
      <BookingWidget />
    </main>
  );
};

export default HomeContent;
