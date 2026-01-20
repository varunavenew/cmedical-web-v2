import { FC } from "react";
import Script from "next/script";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";
import { CookieDeclaration } from "./CookieDeclaration";

interface Props {
  data: PrivacyPolicyPage;
}

const PrivacyPolicyContent: FC<Props> = ({ data }) => (
  <main>
    <div className="px-50 pb-115">
      <h1 className="text-large md:text-xlarge hyphens-auto text-center md:py-115 py-50">
        {data.title}
      </h1>
      {data.body && (
        <div className="prose mx-auto">
          <PortableTextComponent value={data.body} />
        </div>
      )}
      {data.cookiebotKey && (
        <>
          {/* <style>
            {`.CookieDeclarationTable {
                width: calc(100vw - 100px);
                margin-left: calc(50% - 50vw + 50px);
            }
            .CookieDeclarationTypeHeader {
                margin: 0;
                font-weight: 610;
            }`}
          </style> */}
          <CookieDeclaration
            cookiebotKey={data.cookiebotKey}
            language={data.language}
          />
        </>
      )}
    </div>
  </main>
);

export default PrivacyPolicyContent;
