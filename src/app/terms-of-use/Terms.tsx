import { Container } from "@/components/common";
import React from "react";

const Policies = () => {
  return (
    <>
      <Container size="xl" className="py-32 flex justify-center">
        <div className="max-w-[850px]">
          <div className="">
            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              This website (the “Site”) and the information available on this
              Site are provided by Kairon Labs solely for information purposes
              regarding Kairon Labs and the services and solutions offered by
              Kairon Labs.
            </p>

            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              By using this Site, you are agreeing to these Terms of Use. If you
              do not agree to these Terms of Use, then you are not allowed to
              use this Site and should immediately terminate such usage.
            </p>
          </div>

          <div className=" mt-16">
            <h2 className="text-[28px] font-slussen font-bold leading-[36.68px]">
              Site Content
            </h2>
            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              As stated before, the information available on this Site is
              provided solely for information purposes regarding Kairon Labs and
              the services offered by Kairon Labs. Kairon Labs makes all
              reasonable efforts to ensure that the information on this Site is
              accurate but at any time there may be inaccuracies, omissions, or
              information that is not up to date.
            </p>

            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              Kairon Labs reserves the right to add, delete, correct, or
              otherwise change any information on the Site without notice or
              liability. With respect to the information available on this Site
              Kairon Labs expressly excludes any representation or warranty
              (express or implied) to the fullest extent permitted by law.
              Kairon Labs accepts no liability for any direct or indirect
              damages.
            </p>
          </div>

          <div className=" mt-16">
            <h2 className="text-[28px] font-slussen font-bold leading-[36.68px]">
              Use of Content
            </h2>
            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              Unless otherwise indicated in the relevant content, Kairon Labs is
              the sole copyright holder of all information on this Site which
              may not be reproduced or transmitted without prior, express
              consent by Kairon Labs. Furthermore, you are not authorized to
              copy or use any software, proprietary processes, or technology
              embodied or described in this Site.
            </p>
          </div>

          <div className=" mt-16">
            <h2 className="text-[28px] font-slussen font-bold leading-[36.68px]">
              Privacy Statement
            </h2>
            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              You acknowledge that we may use your Personal Information and data
              according to our Privacy Policy and Cookie Policy, which are
              incorporated herein by this reference. You hereby agree to the
              terms of our Privacy Policy and Cookie Policy, including any
              obligations imposed on you therein.
            </p>

            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              Furthermore, Kairon Labs uses information about your use of our
              digital channels (the Site, newsletters…) to gain insight into
              which of our services may interest you. You can easily withdraw
              the consent you gave us at any time by unsubscribing from our
              newsletters or by sending us a message via contact@kaironlabs.com.
              Supplementary information on how Kairon Labs processes Personal
              Information can be found in our Privacy Policy.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-[28px] font-slussen font-bold leading-[36.68px]">
              Applicable Law
            </h2>
            <p className="text-xl font-medium font-slussen leading-[30px] tracking-[0.96px] mt-8 text-[#56718D]">
              In visiting this Site, you agree to accept the application of
              Belgian law to govern any related matters between Kairon Labs and
              yourself.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Policies;
