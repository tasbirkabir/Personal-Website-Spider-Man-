"use client";

import React, { useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribed(true);
    console.log(`React Newsletter Subscription: ${email}`);
  };

  return (
    <div className="w-full max-w-[1040px] mx-auto my-[100px] px-5 relative z-10">
      {/* Self-contained jello keyframe animation styles */}
      <style>{`
        @keyframes jello-vertical-react {
          0% { transform: scale3d(1, 1, 1); }
          30% { transform: scale3d(0.75, 1.25, 1); }
          40% { transform: scale3d(1.25, 0.75, 1); }
          50% { transform: scale3d(0.85, 1.15, 1); }
          65% { transform: scale3d(1.05, 0.95, 1); }
          75% { transform: scale3d(0.95, 1.05, 1); }
          100% { transform: scale3d(1, 1, 1); }
        }
        .jello-hover-effect:hover .jello-target-icon {
          animation: jello-vertical-react 0.9s both;
          transform-origin: center;
        }
      `}</style>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 p-8 md:p-12 rounded-[20px] border-[3px] border-[#15151C] bg-[#F2EFE6] shadow-[6px_6px_0_#15151C] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_#15151C]">
        <div className="flex-grow text-left">
          <h3 className="font-['Bangers'] text-3xl md:text-4xl tracking-wider text-[#15151C] uppercase mb-2.5 leading-none">
            Stay in the loop
          </h3>
          <p className="font-['Inter'] text-sm md:text-[15px] font-medium text-[#4A4A58] max-w-[520px] leading-relaxed">
            Get actionable insights on AI agents, workflows, and automation direct to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[420px] h-[54px] rounded-2xl p-[5px] box-border flex items-center bg-[#FBFAF5] border-[3px] border-[#15151C] shadow-[4px_4px_0_#15151C] transition-all duration-300 focus-within:-translate-x-[2px] focus-within:-translate-y-[2px] focus-within:shadow-[6px_6px_0_#15151C] shrink-0"
        >
          {/* Envelope Icon */}
          <svg
            className="w-[22px] h-[22px] fill-[#15151C] ml-2.5 transition-transform duration-300 shrink-0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>

          <input
            className="flex-grow h-full border-none outline-none pl-3 pr-3 bg-transparent text-[#15151C] font-['Inter'] text-[15px] font-medium w-full disabled:opacity-85 disabled:text-[#E0202F]"
            type="email"
            placeholder="Your email address"
            value={isSubscribed ? "Awesome! You're subscribed. ⚡" : email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribed}
            required
            aria-label="Email Address"
          />

          <button
            className="h-full w-[120px] border-none rounded-lg text-white font-['Bangers'] text-lg tracking-wider overflow-hidden flex items-center justify-center relative cursor-pointer select-none shrink-0 transition-colors duration-300 bg-[#E0202F] hover:bg-[#FFC400] hover:text-[#15151C] active:scale-95 group disabled:pointer-events-none jello-hover-effect"
            type="submit"
            disabled={isSubscribed}
            aria-label="Subscribe to newsletter"
          >
            <span className="inline-block transition-all duration-250 group-hover:opacity-0 group-hover:scale-75">
              {isSubscribed ? "SUCCESS!" : "SUBSCRIBE"}
            </span>

            {/* Sliding Arrow for Hover */}
            <span className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
              <span className="flex items-center justify-center jello-target-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
