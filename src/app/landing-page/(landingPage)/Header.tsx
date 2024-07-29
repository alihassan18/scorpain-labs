import { Button, Container } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const navData = [
  { name: "Home", href: "/" },
  { name: "Feature & Pricing", href: "/" },
];

const Header: React.FC = () => {
  return (
    <div className="bg-main">
      <Container size="xl" className="py-7">
        <div className="flex justify-between items-center">
          <Image
            src="/assets/images/landing-page/logo.svg"
            alt="ScropionLab Logo"
            height={47}
            width={250}
          />
          <div className="">
            <ul className="flex gap-8 items-center">
              {navData.length > 0 &&
                navData.map((item, index) => {
                  return (
                    <li
                      className="text-white uppercase text-sm font-slussen"
                      key={index}
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  );
                })}
              <li>
                <Button className="bg-secondary !text-black-100 font-slussen flex items-center !py-2 !px-3 rounded-none gap-2 text-sm">
                  Login <BsArrowUpRight />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
