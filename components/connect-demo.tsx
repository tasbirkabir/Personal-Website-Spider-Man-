"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAnimate } from "framer-motion";

import { Button, buttonVariants } from "@/components/ui/button";
import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter";
import { Sparkles, Mail } from "lucide-react";

// Inline WhatsApp SVG Icon for portability
const WhatsAppIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12.012 2a9.97 9.97 0 0 0-8.575 15.147l-1.393 5.093 5.214-1.368A9.97 9.97 0 1 0 12.012 2zm5.72 14.28c-.244.686-1.21 1.258-1.748 1.341-.476.073-1.096.096-1.77-.123-.39-.126-.9-.304-1.57-.59a11.1 11.1 0 0 1-4.708-4.13c-.496-.667-.88-1.478-.88-2.31 0-1.597.83-2.428 1.13-2.731.3-.303.666-.379.88-.379.215 0 .43.007.618.016.197.009.462-.073.722.553.268.647.915 2.235.996 2.399.08.164.135.356.026.574-.109.218-.163.355-.326.545-.164.19-.344.425-.49.57-.164.164-.336.342-.144.672.19.33.844 1.393 1.81 2.257 1.246 1.114 2.298 1.459 2.622 1.624.325.164.516.136.708-.083.19-.218.823-.957 1.045-1.285.22-.328.44-.273.74-.164.3.11 1.902.898 2.228 1.062.325.164.542.246.623.383.08.136.08.793-.163 1.48z" />
  </svg>
);

export function Connect() {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      [
        ["#pointer", { left: 200, top: 60 }, { duration: 0 }],
        ["#javascript", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 50, top: 102 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#javascript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#react-js", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 224, top: 170 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#react-js", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#typescript", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 88, top: 198 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#typescript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#next-js", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 200, top: 60 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#next-js", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      },
    );
  }, [animate]);

  return (
    <section className="relative mx-auto mb-20 mt-6 max-w-5xl">
      <HighlightGroup className="group h-full">
        <div
          className="group/item h-full md:col-span-6 lg:col-span-12"
          data-aos="fade-down"
        >
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-black">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={200}
                color={"#555555"}
                vy={-0.2}
              />
              <div className="flex justify-center">
                <div className="flex h-full flex-col justify-center gap-10 p-4 md:h-[300px] md:flex-row">
                  <div
                    className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px]"
                    ref={scope}
                  >
                    <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-red-500" />
                    <div
                      id="next-js"
                      className="absolute bottom-12 left-14 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      AI Agents
                    </div>
                    <div
                      id="react-js"
                      className="absolute left-2 top-20 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Web Dev
                    </div>
                    <div
                      id="typescript"
                      className="absolute bottom-20 right-1 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Automation
                    </div>
                    <div
                      id="javascript"
                      className="absolute right-12 top-10 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Consulting
                    </div>

                    <div id="pointer" className="absolute">
                      <svg
                        width="16.8"
                        height="18.2"
                        viewBox="0 0 12 13"
                        className="fill-red-500"
                        stroke="white"
                        strokeWidth="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                        />
                      </svg>
                      <span className="bg-red-500 relative -top-1 left-3 rounded-3xl px-2 py-1 text-xs text-white">
                        Tasbir
                      </span>
                    </div>
                  </div>

                  <div className="-mt-20 flex h-full flex-col justify-center p-2 md:-mt-4 md:ml-10 md:w-[400px]">
                    <div className="flex flex-col items-center">
                      <h3 className="mt-6 pb-1 font-bold">
                        <span className="text-2xl md:text-4xl text-slate-900 dark:text-white">
                          Any questions about Systems?
                        </span>
                      </h3>
                    </div>
                    <p className="mb-4 text-slate-400 text-sm">
                      Feel free to reach out to me!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://www.linkedin.com/in/tasbirrkabir"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>Book a call</Button>
                      </a>
                      <a
                        href="mailto:tasbirrkabir@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <Mail className="h-5 w-5" />
                        </span>
                      </a>
                      <a
                        href="https://wa.me/8801640101399"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <WhatsAppIcon className="h-4 w-4" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
}
