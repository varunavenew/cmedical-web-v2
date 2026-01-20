import { FC, PropsWithChildren } from "react";
import { Image } from "../Image";
import { PortableTextTypeComponent } from "@portabletext/react";
import { SubTopicsList } from "../SubTopicsList";
import classNames from "classnames";
import { ClinicsAndSpecialistsSection } from "../ClinicsAndSpecialistsSection";
import { SubTopicsSection } from "../SubTopicsSection";
import { LinkMarkComponent } from "../PortableText/LinkMarkComponent";
import { PortableTextComponent } from "../PortableText/PortableTextComponent";
import { YouTubeEmbed } from "../YouTubeEmbed";

interface Props {
  data: ArticlePage;
}

const ImageNonLocalized: PortableTextTypeComponent<
  ImageWithAlt & { _type: string }
> = ({ value }) => (
  <div className="md:prose md:mx-auto md:my-115 -mx-50 my-50 first:mt-0">
    <Image image={value.image} alt={value.alt} />
  </div>
);

const ProseContainer: FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => <div className={classNames("prose mx-auto", className)}>{children}</div>;

const ArticleContent: FC<Props> = ({ data }) => {
  return (
    <>
      <main>
        <div className="h-almost md:h-screen grid">
          {data.primaryImage && (
            <Image
              image={data.primaryImage.image}
              alt={data.primaryImage.alt}
              className="col-start-1 row-start-1 h-almost md:h-screen"
            />
          )}
          <h1 className="text-large md:text-xlarge hyphens-auto text-white col-start-1 row-start-1 place-self-center relative z-10 text-center p-30 md:p-50">
            {data.title}
          </h1>
        </div>
        <div className="px-50">
          <div className="prose mx-auto py-80 md:py-115">
            <PortableTextComponent
              value={data.body}
              components={{
                types: {
                  imageNotLocalized: ImageNonLocalized,
                  youtubeEmbed: YouTubeEmbed,
                },
                marks: {
                  link: LinkMarkComponent,
                },
              }}
            />
          </div>
        </div>
        {data.subTopics && (
          <SubTopicsList
            subTopics={data.subTopics}
            components={{
              types: { imageNotLocalized: ImageNonLocalized },
              marks: {
                link: LinkMarkComponent,
              },
            }}
          />
        )}
        <ClinicsAndSpecialistsSection
          className="bg-white"
          language={data.language}
          clinicList={data.clinicList}
          specialistList={data.specialistList}
        />
        {data.finance && <SubTopicsSection {...data.finance} />}
        {data.faq && <SubTopicsSection className="bg-white" {...data.faq} />}
      </main>
    </>
  );
};

export default ArticleContent;
