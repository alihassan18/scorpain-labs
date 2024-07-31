"use client";
import React, { Fragment, useState } from "react";
import { Button, Container } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const navData = [
  { name: "Home", href: "/" },
  { name: "Feature & Pricing", href: "/" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-main">
      <Container size="xl" className="sm:py-7 py-4">
        <div className="flex justify-between items-center">
          <Image
            src="/assets/images/landing-page/logo.svg"
            alt="ScropionLab Logo"
            height={47}
            width={250}
          />
          {/* For Laptop View */}
          <div className="hidden sm:block">
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

          {/* For Mobile view */}
          <div className="sm:hidden block">
            {isOpen === true ? (
              <Button
                className="!p-0 !bg-transparent !border-none"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 className="text-2xl" />
              </Button>
            ) : (
              <Button
                className="!p-0 !bg-none !bg-transparent !border-none"
                onClick={() => setIsOpen(true)}
              >
                <HiOutlineMenuAlt3 className="text-2xl" />
              </Button>
            )}
          </div>
        </div>
        <div className="relative w-full sm:hidden block">
          <div className="absolute w-full">
            {isOpen === true && (
              <ul className="flex gap-8 flex-col bg-blue-dark p-5 w-full">
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
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
