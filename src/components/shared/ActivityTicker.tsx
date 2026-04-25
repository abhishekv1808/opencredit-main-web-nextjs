"use client";

const ITEMS = [
  { name: "Rahul S.", location: "Koramangala", action: "got approved for", highlight: "₹10 Lakhs at 11.2%", time: "2 min ago", dot: "#16a34a" },
  { name: "Priya M.", location: "Whitefield", action: "applied for", highlight: "₹5L personal loan", time: "5 min ago", dot: "#2563eb" },
  { name: "Deepak R.", location: "HSR Layout", action: "received disbursement of", highlight: "₹8L in 18 hrs", time: "12 min ago", dot: "#16a34a" },
  { name: "Ananya K.", location: "Indiranagar", action: "approved for", highlight: "₹25L at 10.5% p.a.", time: "18 min ago", dot: "#16a34a" },
  { name: "Suresh P.", location: "Electronic City", action: "received", highlight: "5 loan offers in 10 min", time: "26 min ago", dot: "#7c3aed" },
  { name: "Meera J.", location: "Jayanagar", action: "CIBIL score improved by", highlight: "87 points", time: "34 min ago", dot: "#7c3aed" },
  { name: "Vijay N.", location: "Banashankari", action: "received", highlight: "₹3L in just 6 hours", time: "41 min ago", dot: "#16a34a" },
  { name: "Shreya T.", location: "Marathahalli", action: "applied for", highlight: "₹7L home renovation", time: "49 min ago", dot: "#2563eb" },
  { name: "Kiran B.", location: "JP Nagar", action: "approved for", highlight: "₹12L at 11.8% p.a.", time: "55 min ago", dot: "#16a34a" },
  { name: "Lakshmi R.", location: "Hebbal", action: "got", highlight: "₹6L for medical — same day", time: "1 hr ago", dot: "#16a34a" },
  { name: "Arjun V.", location: "Yelahanka", action: "approved for", highlight: "₹4L in just 4 hours", time: "1 hr ago", dot: "#16a34a" },
  { name: "Divya S.", location: "Rajajinagar", action: "refinanced at", highlight: "10.8% p.a. — saved ₹12K/yr", time: "2 hrs ago", dot: "#d97706" },
];

export default function ActivityTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "#fff",
        borderTop: "3px solid #16a34a",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 4px 20px rgba(22,163,74,0.08)",
      }}
    >
      <style>{`
        @keyframes oc-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes oc-live-ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>

      <div className="flex items-center" style={{ height: "60px" }}>
        {/* LIVE badge — left overlay */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-4 pr-12"
          style={{ background: "linear-gradient(to right, #fff 68%, transparent)" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "#f0fdf4", border: "1.5px solid rgba(22,163,74,0.3)" }}
          >
            <span
              className="relative flex h-2.5 w-2.5 flex-shrink-0"
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: "#16a34a",
                  animation: "oc-live-ping 1.4s ease-in-out infinite",
                }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: "#16a34a" }}
              />
            </span>
            <span
              className="text-[11px] font-extrabold uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ color: "#15803d" }}
            >
              Live
            </span>
          </div>
        </div>

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 w-16"
          style={{ background: "linear-gradient(to left, #fff, transparent)" }}
        />

        {/* Scrolling track */}
        <div
          className="flex items-center"
          style={{
            animation: "oc-ticker 60s linear infinite",
            width: "max-content",
            willChange: "transform",
          }}
        >
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center flex-shrink-0 pl-24 pr-6">
              {/* Colored dot */}
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 mr-2.5"
                style={{ background: item.dot }}
              />

              {/* Name */}
              <span className="text-sm font-bold mr-1.5" style={{ color: "#111827" }}>
                {item.name}
              </span>

              {/* Location */}
              <span className="text-sm mr-1.5" style={{ color: "#9ca3af" }}>
                from {item.location}
              </span>

              {/* Action */}
              <span className="text-sm mr-1.5" style={{ color: "#4b5563" }}>
                {item.action}
              </span>

              {/* Highlight amount */}
              <span className="text-sm font-bold mr-3" style={{ color: item.dot }}>
                {item.highlight}
              </span>

              {/* Time pill */}
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ background: "#f3f4f6", color: "#9ca3af" }}
              >
                {item.time}
              </span>

              {/* Separator */}
              <span
                className="w-px h-5 mx-7 flex-shrink-0"
                style={{ background: "#e5e7eb" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
