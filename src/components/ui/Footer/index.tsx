import Container from "@/components/common/Container";
import React from "react";
import { FaLinkedinIn, FaMediumM } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiYoutubemusic } from "react-icons/si";

const contacts = [
  { name: "Contact", href: "/#apply" },
  { name: "About Us", href: "/#testimonial" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
];

const Footer = () => {
  return (
    <>
      <div className="bg-main py-10">
        <Container
          size="xl"
          className="flex items-center justify-between  sm:flex-row flex-col gap-8"
        >
          <h1 className=" text-white text-[13px] font-slussen font-normal">
            © 2024 - Scorpian Labs
          </h1>
          <ul className="flex text-white flex-wrap text-[13px] font-slussen font-normal">
            {contacts.map((contact, index) => {
              const lastChild = contacts.length - 1 === index;
              const firstChild = index === 0;
              return (
                <li
                  key={index}
                  className={`border-r border-white whitespace-nowrap mt-4 sm:px-2 px-1 py-0 leading-1 ${
                    lastChild ? "border-r-0" : ""
                  } ${firstChild ? "!pl-0" : ""}`}
                >
                  <a href={contact.href}>{contact.name}</a>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap text-[18px] text-white font-bold gap-3 cursor-pointer">
            <FaLinkedinIn />
            <FaXTwitter />
            <FaMediumM />
            <SiYoutubemusic />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
