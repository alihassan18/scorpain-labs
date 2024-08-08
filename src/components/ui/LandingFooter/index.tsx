import { Button, Container } from "@/components/common";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaMediumM } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";

const contacts = [
  { name: "Contact", href: "#apply" },
  { name: "About Us", href: "#testimonial" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
];

const LandingFooter = () => {
  return (
    <div className="bg-[url('/assets/images/landing-page/footerimg.svg')] bg-cover p-1 pb-12">
      <Container size="xl">
        <div className="sm:mt-[140px] mt-[60px]">
          <h2 className="max-w-[464.18px] tracking-[0.96px] leading-[48px] text-white md:text-5xl text-2xl font-slussen font-bold uppercase">
            Work only with the best
          </h2>
          <p className="md:text-2xl text-base font-slussen leading-[38.4px] font-normal sm:mt-16 mt-10 text-white max-w-[854px]">
            Scopian Labs is a trusted advisor and crypto market maker for
            digital asset issuers. Backed by decades of combined expertise from
            premier financial institutions, we offer institutional-grade
            liquidity solutions and bespoke trading strategies powered by our
            proprietary trading software.
          </p>
        </div>

        <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-9 sm:mt-[124px] mt-[50px] h-max">
          <div className="flex gap-5 w-full items-center sm:flex-row flex-col">
            <Link href="/#apply">
              <Button className="bg-secondary sm:w-max w-full font-slussen whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
                Get Started <BsArrowUpRight className="text-sm" />
              </Button>
            </Link>
            <p className="text-white text-xs font-slussen font-normal">
              © 2024 - Scorpian Labs
            </p>
          </div>
          <div className="flex items-center sm:flex-row flex-col gap-8">
            <ul className="flex text-white text-[13px] font-slussen font-normal">
              {contacts.map((contact, index) => {
                const lastChild = contacts.length - 1 === index;
                const firstChild = index === 0;
                return (
                  <li
                    key={index}
                    className={`border-r border-white whitespace-nowrap sm:px-2 px-1 py-0 leading-1 ${
                      lastChild ? "border-r-0" : ""
                    } ${firstChild ? "!pl-0" : ""}`}
                  >
                    <a href={contact.href}>{contact.name}</a>
                  </li>
                );
              })}
            </ul>
            <div className="flex text-[18px] text-white font-bold gap-3 cursor-pointer">
              <FaLinkedinIn />
              <FaXTwitter />
              <FaMediumM />
              <SiYoutubemusic />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingFooter;
