import { Container } from "@/components/common";
import Link from "next/link";

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
    <div className="bg-black-dull">
      <Container className="py-5">
        <div className="flex items-center flex-wrap md:flex-nowrap md:justify-between justify-center gap-4 ">
          <span className="text-white sm:text-base text-xs">
            © {new Date().getFullYear()} Scorpion Lab. All rights reserved.
          </span>
          {/* <div className="items-center justify-center flex space-x-3">
            {Navigation?.map((item, i) => (
              <>
               {i > 0 && <span className="text-white"> | </span>}
              <Link href={item.href} key={i}>
              <div key={i}>
                <span className="text-white font-normal sm:text-base text-xs">
                  {item.name}
                </span>
              </div>
              </Link>
              </>
            ))}
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
