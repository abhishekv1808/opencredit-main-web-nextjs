interface RupeeCoinProps {
  size?: number;
  opacity?: number;
  uid: string;
  className?: string;
}

export default function RupeeCoin({ size = 80, opacity = 1, uid, className = "" }: RupeeCoinProps) {
  const gOuter = `rco-${uid}`;
  const gInner = `rci-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gOuter} cx="35%" cy="28%" r="68%">
          <stop offset="0%"   stopColor="#F7DE7A" />
          <stop offset="52%"  stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#7A5A10" />
        </radialGradient>
        <radialGradient id={gInner} cx="38%" cy="32%" r="64%">
          <stop offset="0%"   stopColor="#EDD060" />
          <stop offset="65%"  stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
      </defs>

      {/* Outer rim */}
      <circle cx="40" cy="40" r="38" fill={`url(#${gOuter})`} />
      {/* Bottom shadow on rim */}
      <path d="M 8 52 A 38 38 0 0 0 72 52" fill="rgba(0,0,0,0.13)" />
      {/* Inner face */}
      <circle cx="40" cy="40" r="30" fill={`url(#${gInner})`} />
      {/* Specular highlight */}
      <ellipse cx="30" cy="27" rx="9" ry="5.5" fill="rgba(255,255,255,0.30)" />
      {/* ₹ symbol */}
      <text
        x="40"
        y="54"
        textAnchor="middle"
        fill="rgba(255,255,255,0.93)"
        fontSize="28"
        fontWeight="700"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        ₹
      </text>
    </svg>
  );
}
