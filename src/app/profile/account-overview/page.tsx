'use client'
import React, { Fragment, useEffect, useState } from "react";
import { Button, Container } from "@/components/common";
import { IUser } from "@/interfaces/user.interface";
import { getObjectFromLocalStorage } from "@/utils/storage";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { FaChevronCircleDown } from "react-icons/fa";


const activeExchangeData : any = [
  {
    'name': 'Volume Support',
    'rfc': '133334',
    'usdt': '1962.71',
    'bmx': '0',
  },
  {
    'name': 'Liquidity Support',
    'rfc': '293,587',
    'usdt': '5815.33',
    'bmx': '0.001508',
  },
  {
    'name': 'Cash-out',
    'rfc': '87577',
    'usdt': '2341.34',
    'bmx': '0',
  },
  {
    'name': 'Control Operation',
    'rfc': '324253',
    'usdt': '8706.49',
    'bmx': '0',
  },
  {
    'name': 'Uniswap Support',
    'rfc': '200000',
    'usdt': '6700.49',
    'bmx': '0',
  }
];

const bitmartExpDateCost : any = [
  {
    'name': 'Basic Services, expires on:',
    'remain': '2024/08/03 , 12 days remaining',
    'usdt': '2500',
    'term': 'montly',
  },
  {
    'name': 'Reference Price, expires on:',
    'remain': '2024/07/03 , Expired',
    'usdt': '1000',
    'term': 'montly',
  },
  {
    'name': 'Cash-out, expires on:',
    'remain': '2024/08/03 , 12 days remaining',
    'usdt': '1000',
    'term': 'montly',
  },
  {
    'name': 'Price Support, expires on:',
    'remain': '2024/08/03 , 12 days remaining',
    'usdt': '1000',
    'term': 'montly',
  }
];

const AccountOverview: React.FC = () => {
  const userLocal: IUser | null = getObjectFromLocalStorage("user");
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    userLocal && setUser(userLocal)
  }, [userLocal])

  return (
    <Fragment>
      <div className="md:py-20 min-h-[100vh] py-10 bg-black-dull border-b">
        <Container className="flex justify-center flex-col gap-10">
          <div className="p-10 bg-black-400 w-full flex flex-col rounded-lg">
            <h1 className="text-3xl textGradient font-semibold mb-3">Account Overview</h1>
            <h3 className="text-xl text-white mb-10">Account Name: rfc</h3>
            <h2 className="text-2xl text-white font-semibold mb-3">List of Active Exchanges</h2>
            <section className="w-full space-y-5">
              <Disclosure as="div" className="" style={{borderRadius:10}} defaultOpen={true}>
                <DisclosureButton className="group flex w-full items-center justify-between p-5"  style={{backgroundColor:'#1e2024', borderTopRightRadius:10, borderTopLeftRadius:10}}>
                  <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80 flex gap-10 items-center">
                    <span className="text-xl me-10">BITMART</span>
                    <span className="text-sm">RFC/USDT</span>
                  </span>
                  <FaChevronCircleDown className="text-xl text-white group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="p-5 text-sm/5 text-white/50" style={{backgroundColor:'#303339', borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
                  <table className="w-full master-table text-lg">
                    {activeExchangeData && activeExchangeData.map((item: any) => (
                      <tr className="text-normal">
                        <td>{item.name}</td>
                        <td>{item.rfc} <span className="text-white">RFC</span></td>
                        <td>{item.usdt} <span className="text-white">USDT</span></td>
                        <td>{item.mbx} <span className="text-white">BMX</span></td>
                        <td width={100}>
                          <Button variant={'outline'} color={'danger'} style={{color:'#ee5757', borderColor:'transparent', backgroundColor:'#4F393D', borderRadius:10, padding:'7px 15px'}}>Unbind</Button>
                        </td>
                      </tr>
                    ))}
                    
                  </table>
                </DisclosurePanel>
              </Disclosure>
            </section>
          </div>


          <div className="p-10 bg-black-400 w-full flex flex-col rounded-lg">
            <h1 className="text-3xl textGradient font-semibold mb-3">Expiration Date and Cost</h1>
            <h2 className="text-xl text-white font-semibold mb-3">BITMART</h2>
            <section className="w-full space-y-5">
              <Disclosure as="div" className="" style={{borderRadius:10}} defaultOpen={true}>
                <DisclosureButton className="group flex w-full items-center justify-between p-5"  style={{backgroundColor:'#1e2024', borderTopRightRadius:10, borderTopLeftRadius:10}}>
                  <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80 flex gap-10 items-center">
                    <span className="text-xl me-3">RFC/USDT</span>
                    <span className="text-xl">Expiration Dates:</span>
                  </span>
                  <FaChevronCircleDown className="text-xl text-white group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="p-5 text-sm/5 text-white/50" style={{backgroundColor:'#303339', borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
                  <table className="w-full master-table text-lg">
                    {bitmartExpDateCost && bitmartExpDateCost.map((item: any) => (
                      <tr className="text-normal">
                        <td style={{width:'calc(50% - 200px)'}}>{item.name}</td>
                        <td style={{width:'50%'}}>{item.remain}</td>
                        <td width={200} style={{textAlign:'right'}}><span className="text-white">{item.usdt}</span> USDT/<span style={{textTransform:'capitalize'}}>{item.term}</span> </td>
                      </tr>
                    ))}
                    
                  </table>
                </DisclosurePanel>
              </Disclosure>
            </section>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default AccountOverview;
