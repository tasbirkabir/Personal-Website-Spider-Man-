"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Tasbir delivered exactly what we needed. The website was fast, professional, and helped us generate more inquiries than before.",
    name: "Client 01",
    role: "Business Owner"
  },
  {
    text: "The automation system saved our team hours every week. Everything now runs much more efficiently.",
    name: "Client 02",
    role: "Operations Manager"
  },
  {
    text: "Working with Tasbir was smooth from start to finish. Communication was excellent and delivery exceeded expectations.",
    name: "Client 03",
    role: "Startup Founder"
  },
  {
    text: "Our new website looks modern, loads fast, and performs significantly better than our previous version.",
    name: "Client 04",
    role: "Company Director"
  },
  {
    text: "The AI integration helped automate repetitive tasks and improved our workflow immediately.",
    name: "Client 05",
    role: "Agency Owner"
  },
  {
    text: "Professional service, attention to detail, and great support throughout the entire project.",
    name: "Client 06",
    role: "Marketing Manager"
  },
  {
    text: "One of the best developers we've worked with. Reliable, knowledgeable, and focused on results.",
    name: "Client 07",
    role: "Entrepreneur"
  },
  {
    text: "The project was delivered on time and the final result exceeded our expectations.",
    name: "Client 08",
    role: "Business Consultant"
  },
  {
    text: "From website development to automation, everything was handled professionally and efficiently.",
    name: "Client 09",
    role: "Small Business Owner"
  }
];

const Row = ({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) => {
  // Double the items to make the seamless infinite wrap possible
  const doubleItems = [...items, ...items];
  
  return (
    <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] w-full my-4">
      <motion.div
        animate={{
          x: reverse ? [ "-50%", "0%" ] : [ "0%", "-50%" ]
        }}
        transition={{
          ease: "linear",
          duration: 38,
          repeat: Infinity
        }}
        className="flex gap-8 pr-8 py-3 min-w-full"
      >
        {doubleItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[340px] flex flex-col justify-between p-6 rounded-2xl border-[3px] border-[#15151C] bg-[#FBFAF5] shadow-[5px_5px_0_#15151C] transition-all duration-300 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_#15151C] hover:bg-white cursor-pointer"
          >
            <p className="text-[#4A4A58] italic text-[15px] leading-relaxed mb-6 flex-grow">
              "{item.text}"
            </p>
            <div className="h-[2px] bg-[rgba(21,21,28,0.16)] mb-4" />
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-full border-2 border-[#15151C] bg-[#F2EFE6] flex items-center justify-center text-[#E0202F]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-['Bangers'] text-lg tracking-wider text-[#15151C] leading-none mb-1">
                  {item.name}
                </h4>
                <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#4A4A58] font-semibold">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  // Divide data into 2 separate rows to make a dual direction marquee
  const row1 = testimonials.slice(0, 5);
  const row2 = [...testimonials.slice(5, 9), testimonials[0]]; // 5 items

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#FBFAF5] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="font-['JetBrains_Mono'] text-xs tracking-[0.4em] uppercase text-[#2342D6] flex items-center gap-3 mb-6 font-semibold before:content-[''] before:w-9 before:h-[3px] before:bg-[#E0202F]">
          Testimonials
        </div>
        <h2 className="font-['Bangers'] text-[clamp(40px,6.5vw,86px)] font-normal text-[#15151C] leading-none uppercase tracking-wide mb-6">
          What Clients <span className="text-[#E0202F] [text-shadow:3px_3px_0_#15151C]">Say</span>
        </h2>
        <p className="max-w-[560px] text-lg text-[#4A4A58] font-medium leading-relaxed">
          Real feedback from clients and businesses I've helped through websites, automation, AI solutions, and digital growth systems.
        </p>
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <Row items={row1} reverse={false} />
        <Row items={row2} reverse={true} />
      </div>
    </section>
  );
}
