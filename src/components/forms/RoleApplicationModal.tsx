"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import RoleApplicationForm, { RoleSlug } from "./RoleApplicationForm";

export type ApplicationRole =
  | "Choreographer"
  | "Designer"
  | "Model"
  | "Makeup Artist"
  | "Stylist"
  | "Influencer"
  | "Celebrity"
  | "CSTP"
  | "Fashion Commentary"
  | "Nomination";

export type RoleType =
  | ApplicationRole
  | "choreographer"
  | "designer"
  | "model"
  | "makeup_artist"
  | "makeup-artist"
  | "stylist"
  | "fashion-stylist"
  | "influencer"
  | "influencer-creator"
  | "celebrity"
  | "cstp"
  | "fashion_commentary"
  | "fashion-commentary"
  | "nomination";

interface RoleApplicationModalProps {
  role: RoleType | null;
  isOpen?: boolean;
  onClose: () => void;
}

const roleToSlugMap: Record<string, RoleSlug> = {
  choreographer: "choreographer",
  Choreographer: "choreographer",
  designer: "designer",
  Designer: "designer",
  model: "model",
  Model: "model",
  makeup_artist: "makeup-artist",
  "makeup-artist": "makeup-artist",
  "Makeup Artist": "makeup-artist",
  stylist: "fashion-stylist",
  "fashion-stylist": "fashion-stylist",
  Stylist: "fashion-stylist",
  influencer: "influencer",
  "influencer-creator": "influencer",
  Influencer: "influencer",
  celebrity: "celebrity",
  Celebrity: "celebrity",
  cstp: "cstp",
  CSTP: "cstp",
  fashion_commentary: "fashion-commentary",
  "fashion-commentary": "fashion-commentary",
  "Fashion Commentary": "fashion-commentary",
  nomination: "nomination",
  Nomination: "nomination",
};

export default function RoleApplicationModal({ role: rawRole, isOpen = true, onClose }: RoleApplicationModalProps) {
  if (isOpen === false || !rawRole) return null;

  const slug: RoleSlug = roleToSlugMap[rawRole] || "designer";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/92 backdrop-blur-md z-[300]"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[310] w-full max-w-3xl bg-[#090909] border border-brand-yellow-golden/50 p-5 sm:p-8 rounded-3xl shadow-[0_0_80px_rgba(250,182,10,0.25)] text-brand-white my-auto max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        >
          {/* Header Close Bar */}
          <div className="flex items-center justify-end mb-2">
            <button
              onClick={onClose}
              className="p-2 bg-black border border-white/20 text-white/80 hover:text-brand-yellow-golden hover:border-brand-yellow-golden rounded-full transition-colors"
              aria-label="Close modal application form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Single Dedicated Role Form Component */}
          <RoleApplicationForm roleSlug={slug} onSuccess={() => {}} isModal={true} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
