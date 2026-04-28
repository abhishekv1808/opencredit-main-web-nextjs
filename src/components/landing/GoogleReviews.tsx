"use client";

import { useMemo } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  { reviewer_name: "jai Guru jai", star_rating: 5, review_text: "I needed my CIBIL report fast, and Open Credit delivered! Simple steps, clear information. Thank you, Open Credit!" },
  { reviewer_name: "Anil Anil", star_rating: 5, review_text: "Open Credit exceeded my expectations with their CIBIL report service. Easy to use, quick delivery, and it provided valuable insights." },
  { reviewer_name: "manju bmoti", star_rating: 5, review_text: "Friendly staff and excellent service. I strongly recommend everyone to get loans from here." },
  { reviewer_name: "Mahesh Giri", star_rating: 5, review_text: "My Cibil Score was low and for some reason some negative account was there in my cibil which I was not knowing and I was not getting loans from any of the banks and then i contacted with Madhu sir from Sulekha. Actually he suggested me to go for Open credit and they helped me to clear all the negative accounts from my cibil. Now I am having very good score. Thanks to all the team members of Open Credit." },
  { reviewer_name: "Sharath", star_rating: 5, review_text: "They provide loans based on salary with reasonable rate of interest" },
  { reviewer_name: "PRK", star_rating: 5, review_text: "Thankh you so much for giving loan for me..before going here I went so many places to take loan and spent charges arround 20k that too we i didnt got loan anywhere but when I meat madhu sir just an half an hour I got loan around 2 lakh.. very transparent and quick service." },
  { reviewer_name: "Manjunatha H.B", star_rating: 5, review_text: "Open Credit's CIBIL report service is user-friendly. I got my report in no time, and it's been a game-changer for my financial decisions. Excellent job!" },
  { reviewer_name: "Hemanth Kumar", star_rating: 5, review_text: "Given me good advice for my existing financial crisis." },
  { reviewer_name: "shubha patil", star_rating: 5, review_text: "Open credit is one of the best loans service provider ever i seen. They guide us very well about our CIBIL score and how to improve it properly. Excellent staff behavior . Good going Open Credit" },
  { reviewer_name: "Vijay AHP", star_rating: 5, review_text: "Open credit Good loan services thanks to madhu sir" },
  { reviewer_name: "Mohammed Yaseen", star_rating: 5, review_text: "Give the good option and how can we use the banks Credit score and good explanation How to increase the credit limit ... thanks sir" },
  { reviewer_name: "Soundarya CS", star_rating: 5, review_text: "Very good response and good service" },
  { reviewer_name: "Mahesh M", star_rating: 5, review_text: "Good service" },
  { reviewer_name: "Nagendra K J", star_rating: 5, review_text: "Best service for credit correction" },
  { reviewer_name: "Srinivasa N", star_rating: 5, review_text: "Excellent guidance for financial problems" }
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-pink-100 text-pink-600",
  "bg-teal-100 text-teal-600",
];

const ReviewCard = ({ review }: { review: any }) => {
  const colorIndex = review.reviewer_name.charCodeAt(0) % avatarColors.length;
  const avatarClass = avatarColors[colorIndex];

  return (
    <div className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100/80 min-w-[360px] max-w-[360px] mx-3 flex flex-col gap-5 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(91,200,63,0.12)] hover:-translate-y-1 hover:border-brand-green/30 relative overflow-hidden group h-full">
      
      {/* Quotation watermark */}
      <div className="absolute top-5 right-6 text-gray-100 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-green/5 group-hover:scale-110 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
        </svg>
      </div>

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3.5">
          <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg ${avatarClass}`}>
            {review.reviewer_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-gray-900 text-[15px]">{review.reviewer_name}</h4>
              <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white" title="Verified Review">
                <svg viewBox="0 0 24 24" width="8" height="8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-0.5 mt-1">
              {[...Array(review.star_rating)].map((_, i) => (
                <Star key={i} size={12} className="fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-1 relative z-10">
          <GoogleIcon />
        </div>
      </div>
      <p className="text-gray-600 text-[14.5px] leading-relaxed whitespace-normal break-words overflow-hidden text-ellipsis line-clamp-4 relative z-10 flex-1">
        {review.review_text}
      </p>
    </div>
  );
};

export default function GoogleReviews() {
  const topRow = useMemo(() => reviews.slice(0, 8), []);
  const bottomRow = useMemo(() => reviews.slice(8, 15), []);

  return (
    <section className="py-20 md:py-24 overflow-hidden relative bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(91,200,63,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 bg-gray-50 border border-gray-100 text-gray-600">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] inline-block" />
          Verified Google Reviews
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-heading leading-tight font-display mb-4">
          Trusted by thousands of <br />
          <span className="text-brand-green">happy customers.</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto text-[15px]">
          Our commitment to transparent, fast, and reliable financial services is reflected in our leading regional Google rating.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6 py-4">
        {/* Gradients to hide edges */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-56 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 h-full w-24 md:w-56 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

        {/* Top Marquee */}
        <div className="flex w-max relative group items-stretch py-2">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex items-stretch w-max group-hover:[animation-play-state:paused]"
          >
            {[...topRow, ...topRow].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Bottom Marquee (Reverse) */}
        <div className="flex w-max relative group items-stretch py-2">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            className="flex items-stretch w-max group-hover:[animation-play-state:paused]"
          >
            {[...bottomRow, ...bottomRow].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
