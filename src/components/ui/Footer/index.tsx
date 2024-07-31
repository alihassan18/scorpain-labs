import { Button, Container } from "@/components/common";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaMediumM } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";

const contacts = [
  { name: "Contact", href: "/Contact" },
  { name: "About Us", href: "/About Us" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "KYC & AML Policy", href: "/KYC & AML Policy" },
  { name: "Terms of Use", href: "/Terms of Use" },
  { name: "FAQ", href: "/FAQ" },
];

const Navigation = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Terms & Conditions",
    href: "terms",
  },
];
const Footer = () => {
  return (
    <div className="bg-[url('/assets/images/landing-page/footerimg.svg')] bg-cover p-1 pb-12">
      <Container size="xl">
        <div className=" mt-[140px]">
          <h2 className="max-w-[464.18px] tracking-[0.96px] leading-[48px] text-white text-5xl font-slussen font-bold">
            Work only with the best
          </h2>
          <p className="text-2xl font-slussen leading-[38.4px] font-normal mt-16 text-white max-w-[854px]">
            Scopian Labs is a trusted advisor and crypto market maker for
            digital asset issuers. Backed by decades of combined expertise from
            premier financial institutions, we offer institutional-grade
            liquidity solutions and bespoke trading strategies powered by our
            proprietary trading software.
          </p>
        </div>

        <div className="flex items-center gap-9 mt-[124px] h-max">
          <Button className="bg-secondary font-slussen whitespace-nowrap !text-2xl tracking-[0.34px] !text-black-100 flex items-center !py-2 !px-6 rounded-none gap-8 ">
            Get Started <BsArrowUpRight className="text-sm" />
          </Button>
          <p className="text-white text-xs font-slussen font-normal">
            © 2024 - Scorpian Labs
          </p>
          <ul className="flex text-white text-[13px]  font-slussen font-normal">
            {contacts.map((contact, index) => (
              <li key={index} className="border-r border-white px-2">
                <a href={contact.href}>{contact.name}</a>
              </li>
            ))}
          </ul>
          <div className="flex text-[18px] text-white font-bold gap-3 cursor-pointer">
            <FaLinkedinIn />
            <FaXTwitter />
            <FaMediumM />
            <SiYoutubemusic />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
