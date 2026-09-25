"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import GradientFlowText from "../ui/GradientFlowText";
import SubmitSuccessExpand from "../ui/SubmitSuccessExpand";

export default function UpcomingClientContent() {
  const [subscribed, setSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-void hover:opacity-90 transition-opacity text-center shadow-lg"
          data-cursor="explore"
        >
          STAY UPDATED ↗
        </button>

        <Link
          href="/contact"
          className="border border-hairline-gold bg-brand-charcoal/80 px-8 py-4 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold/10 hover:border-brand-gold transition-colors text-center"
          data-cursor="view"
        >
          CONTACT US ↗
        </Link>
      </div>

      {/* Stay Updated Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-void/90 p-6 backdrop-blur-md">
          <div className="bg-brand-charcoal border border-hairline-gold p-8 sm:p-10 max-w-md w-full relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-brand-gold/60 hover:text-brand-gold text-xs font-syne tracking-caps"
            >
              [ CLOSE ]
            </button>

            <SubmitSuccessExpand show={subscribed}>
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle2 className="h-12 w-12 text-brand-gold mb-4" />
                <h3 className="font-serif-display text-xl text-brand-off-white mb-2">
                  NOTIFICATION REGISTERED
                </h3>
                <p className="font-sans text-xs text-brand-platinum font-light mb-6">
                  You will receive verified announcements regarding FashAI Lifestyle 2026.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSubscribed(false);
                    setEmail("");
                  }}
                  className="bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] px-6 py-2.5 text-xs font-syne text-brand-void font-bold"
                >
                  <GradientFlowText variant="primary">DONE</GradientFlowText>
                </button>
              </div>
            </SubmitSuccessExpand>

            {!subscribed && (
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div>
                  <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-2">
                    DUBAI 2026 NOTIFICATIONS
                  </span>
                  <h3 className="font-serif-display text-2xl text-brand-off-white font-light">
                    RECEIVE OFFICIAL UPDATES
                  </h3>
                  <p className="font-sans text-xs text-brand-platinum font-light mt-2">
                    Leave your email to receive direct notifications when dates and venue specifications are announced.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-syne text-brand-gold mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-transparent border-b border-hairline-gold py-2 text-sm text-brand-off-white placeholder:text-brand-platinum/40 focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] py-3 text-xs font-syne tracking-caps font-bold text-brand-void hover:opacity-90 transition-opacity"
                >
                  <GradientFlowText variant="primary">NOTIFY ME ↗</GradientFlowText>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

