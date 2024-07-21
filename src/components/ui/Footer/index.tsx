import { Container } from "@/components/common";
import Link from "next/link";

const Navigation = [
  // {
  //   name: "Terms",
  //   href: "",
  // },
  {
    name: "Privacy Policy | Terms & Conditions",
    // href: "javascript:void(0)",
  },
];
const Footer = () => {
  return (
    <div className="bg-black-dull">
      <Container className="py-5">
        <div className="flex items-center flex-wrap md:flex-nowrap md:justify-between justify-center gap-4 ">
          <span className="text-white sm:text-base text-xs">
            © 2024 Scorpion Lab. All rights reserved.
          </span>
          <div className="items-center justify-center flex space-x-3">
            {Navigation?.map((item, i) => (
              // <Link key={i}>
              <div key={i}>
                <span className="text-white font-normal sm:text-base text-xs">
                  {item.name}
                </span>
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
