import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | 'password'
  | 'birthday'
  | 'wish'
  | 'surprise'
  | 'gifts'
  | 'gift1'
  | 'gift2'
  | 'gift3'
  | 'final';

// ─── Editable Content ─────────────────────────────────────────────────────────
const RECIPIENT = 'Gaurav';
const UNLOCK_PIN = '0809';

const LETTER = {
  intro: 'A little something for you...',
  greeting: `Dear ${RECIPIENT},`,
  body: [
'               Happy Birthday Baby!. Its your day today and I hope you get all the happiness in the world. You are my friend, my love and my soulmate. You are the best thing that ever happened to me and today I miss you even more. Come soon baby. I love you the most.'

  ],
  closing: 'With love,',
  signature: '❤️',
};

const FINAL_MESSAGE = `You are one of the sweetest parts of my life. Happy Birthday! 💜`;

// ─── Palette ──────────────────────────────────────────────────────────────────
const T = {
  purple: '#7c3aed',
  purpleDark: '#4c1d95',
  purpleLight: '#c4b5fd',
  pink: '#ec4899',
  gold: '#d97706',
  bg: 'linear-gradient(135deg, #f3eeff 0%, #fdf4f9 45%, #fff8f0 100%)',
  darkBg: 'linear-gradient(180deg, #1e0a3c 0%, #4c1d95 52%, #6d28d9 100%)',
} as const;

const btnBase: React.CSSProperties = {
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 700,
  borderRadius: 50,
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  WebkitTapHighlightColor: 'transparent',
  transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// ─── Shared Buttons ────────────────────────────────────────────────────────────
function PrimaryBtn({
  children,
  onClick,
  style = {},
}: {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      onTouchStart={() => setP(true)}
      onTouchEnd={() => setP(false)}
      style={{
        ...btnBase,
        padding: '14px 36px',
        fontSize: 15,
        letterSpacing: '0.04em',
        background: p ? '#5b21b6' : T.purple,
        color: 'white',
        boxShadow: p ? 'none' : h ? '0 10px 28px rgba(124,58,237,0.45)' : '0 4px 16px rgba(124,58,237,0.28)',
        transform: p ? 'scale(0.93)' : h ? 'scale(1.05) translateY(-3px)' : 'scale(1)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick, dark = false }: { onClick: () => void; dark?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        ...btnBase,
        padding: '10px 26px',
        fontSize: 14,
        background: dark
          ? (h ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)')
          : (h ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.05)'),
        color: dark ? 'rgba(255,255,255,0.85)' : T.purple,
        border: `1.5px solid ${
          dark
            ? (h ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)')
            : (h ? T.purple : T.purpleLight)
        }`,
        transform: h ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      ← back
    </button>
  );
}

// ─── Background Decorations ────────────────────────────────────────────────────
function Stars({ count = 38 }: { count?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 43 + 7) % 100}%`,
            width: `${2 + (i * 2) % 3}px`,
            height: `${2 + (i * 2) % 3}px`,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#c4b5fd' : '#f9a8d4',
            animation: `twinkle ${2 + (i * 0.4) % 3}s ${(i * 0.35) % 4}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles({ count = 18 }: { count?: number }) {
  const colors = ['#c4b5fd', '#f9a8d4', '#fde68a', '#a78bfa', '#f0abfc'];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 19 + 5) % 100}%`,
            bottom: `${(i * 13) % 55}%`,
            width: `${4 + (i * 5) % 8}px`,
            height: `${4 + (i * 5) % 8}px`,
            borderRadius: '50%',
            background: colors[i % colors.length],
            opacity: 0.5,
            animation: `float-up ${5 + (i * 2) % 8}s ${(i * 1.1) % 7}s ease-in infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Confetti({ count = 28 }: { count?: number }) {
  const colors = ['#c4b5fd', '#f9a8d4', '#fbbf24', '#6d28d9', '#ec4899', '#f97316'];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 19 + 3) % 100}%`,
            top: '-12px',
            width: i % 3 === 0 ? `${6 + (i * 3) % 8}px` : `${10 + (i * 4) % 14}px`,
            height: `${6 + (i * 3) % 8}px`,
            background: colors[i % colors.length],
            borderRadius: i % 3 === 0 ? '50%' : '2px',
            opacity: 0.85,
            animation: `confetti-fall ${3 + (i * 1.3) % 4}s ${(i * 0.6) % 3}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts({ count = 10 }: { count?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 23 + 7) % 85}%`,
            bottom: `${(i * 11) % 30}%`,
            fontSize: `${12 + (i * 6) % 16}px`,
            animation: `float-heart ${4 + (i * 1.5) % 5}s ${(i * 0.9) % 7}s ease-out infinite`,
          }}
        >
          💜
        </div>
      ))}
    </div>
  );
}

// ─── Gift Box ──────────────────────────────────────────────────────────────────
function GiftBox({
  boxColor,
  ribbonColor,
  emoji,
  label,
  onClick,
}: {
  boxColor: string;
  ribbonColor: string;
  emoji: string;
  label: string;
  onClick: () => void;
}) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);

  const handleClick = () => {
    setP(true);
    setTimeout(() => { setP(false); onClick(); }, 300);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      style={{
        cursor: 'pointer',
        transform: p
          ? 'scale(0.87) translateY(8px)'
          : h
          ? 'scale(1.08) translateY(-16px)'
          : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        padding: '12px 8px',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div style={{ position: 'relative', width: 96, height: 98 }}>
        {/* Bow */}
        <div
          style={{
            position: 'absolute',
            top: -13,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: 46,
            height: 20,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 2,
              top: 3,
              width: 20,
              height: 15,
              background: ribbonColor,
              borderRadius: '50% 50% 30% 30%',
              transform: 'rotate(-22deg)',
              transformOrigin: 'right center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 2,
              top: 3,
              width: 20,
              height: 15,
              background: ribbonColor,
              borderRadius: '50% 50% 30% 30%',
              transform: 'rotate(22deg)',
              transformOrigin: 'left center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 13,
              height: 11,
              background: ribbonColor,
              borderRadius: '50%',
              zIndex: 11,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* Lid */}
        <div
          style={{
            position: 'absolute',
            top: 13,
            left: -5,
            right: -5,
            height: 22,
            background: boxColor,
            filter: 'brightness(0.82)',
            borderRadius: '7px 7px 0 0',
            overflow: 'hidden',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 13,
              top: 0,
              bottom: 0,
              background: ribbonColor,
              opacity: 0.9,
            }}
          />
        </div>

        {/* Box body */}
        <div
          style={{
            position: 'absolute',
            top: 35,
            left: 0,
            right: 0,
            bottom: 0,
            background: boxColor,
            borderRadius: '0 0 10px 10px',
            boxShadow: h
              ? '0 18px 44px rgba(0,0,0,0.2)'
              : '0 8px 20px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 13,
              top: 0,
              bottom: 0,
              background: ribbonColor,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '40%',
              transform: 'translateY(-50%)',
              left: 0,
              right: 0,
              height: 13,
              background: ribbonColor,
              opacity: 0.9,
            }}
          />
        </div>

        {/* Emoji */}
        <div
          style={{
            position: 'absolute',
            top: '66%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 22,
            zIndex: 5,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        >
          {emoji}
        </div>
      </div>

      <span
        style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 11,
          fontWeight: 800,
          color: T.purple,
          opacity: 0.5,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Screen 1: Password ────────────────────────────────────────────────────────
function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const [locked, setLocked] = useState(false);

  const verify = useCallback(
    (p: string) => {
      if (p === UNLOCK_PIN) {
        setTimeout(onUnlock, 220);
      } else {
        setShaking(true);
        setError('Hmm… wrong passcode 💜 Try again.');
        setTimeout(() => {
          setShaking(false);
          setPin('');
          setError('');
          setLocked(false);
        }, 1350);
      }
    },
    [onUnlock],
  );

  const addDigit = (d: string) => {
    if (locked) return;
    setPin((prev) => {
      if (prev.length >= 4) return prev;
      const next = prev + d;
      if (next.length === 4) {
        setLocked(true);
        setTimeout(() => verify(next), 260);
      }
      return next;
    });
  };

  const del = () => {
    if (!locked) {
      setPin((p) => p.slice(0, -1));
      setError('');
    }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '↵'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: T.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stars />

      {/* Decorative floaters */}
      {(['🌸', '✨', '💜', '🌙'] as const).map((em, i) => (
        <div
          key={em}
          style={{
            position: 'absolute',
            ...[
              { top: '12%', left: '6%' },
              { top: '16%', right: '8%' },
              { bottom: '16%', left: '7%' },
              { bottom: '19%', right: '9%' },
            ][i],
            fontSize: [36, 28, 32, 24][i],
            opacity: 0.17,
            animation: `bounce-gentle ${[3, 4, 3.5, 2.8][i]}s ease-in-out ${[0, 1, 0.7, 2][i]}s infinite`,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {em}
        </div>
      ))}

      {/* Card */}
      <div
        className={shaking ? 'animate-shake' : ''}
        style={{
          background: 'rgba(255,252,250,0.94)',
          backdropFilter: 'blur(20px)',
          borderRadius: 28,
          border: `2px solid ${T.purpleLight}`,
          padding: 'clamp(28px, 5vw, 44px) clamp(22px, 5vw, 38px)',
          maxWidth: 360,
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          boxShadow:
            '0 28px 80px rgba(124,58,237,0.14), 0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            fontSize: 48,
            lineHeight: 1,
            animation: 'bounce-gentle 2.5s ease-in-out infinite',
          }}
        >
          🔐
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 34,
              fontWeight: 600,
              color: T.purpleDark,
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
            }}
          >
            unlock
          </h1>
          <p
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 17,
              color: '#9b7fc4',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            there's a little surprise waiting for you
          </p>
        </div>

        {/* PIN dots */}
        <div style={{ display: 'flex', gap: 14 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: `2.5px solid ${T.purple}`,
                background: i < pin.length ? T.purple : 'transparent',
                transition: 'background 0.18s, transform 0.18s',
                transform: i < pin.length ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Keypad */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
            width: '100%',
          }}
        >
          {keys.map((k) => {
            const isDel = k === '⌫';
            const isEnter = k === '↵';
            return (
              <button
                key={k}
                onClick={() =>
                  isDel
                    ? del()
                    : isEnter
                    ? pin.length === 4 && verify(pin)
                    : addDigit(k)
                }
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 20,
                  fontWeight: 700,
                  padding: '14px 8px',
                  borderRadius: 14,
                  border: `1.5px solid ${isEnter ? T.purple : T.purpleLight}`,
                  background: isEnter
                    ? T.purple
                    : 'rgba(237,233,254,0.4)',
                  color: isEnter
                    ? 'white'
                    : isDel
                    ? '#b8a0d8'
                    : T.purpleDark,
                  cursor: 'pointer',
                  transition: 'transform 0.12s',
                  outline: 'none',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    'scale(0.87)';
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    'scale(1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    'scale(1)';
                }}
                onTouchStart={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    'scale(0.87)';
                }}
                onTouchEnd={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    'scale(1)';
                }}
              >
                {k}
              </button>
            );
          })}
        </div>

        {error && (
          <p
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 13,
              color: '#9b7fc4',
              margin: 0,
              textAlign: 'center',
              animation: 'fade-in-up 0.3s ease',
            }}
          >
            {error}
          </p>
        )}

        <p
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 15,
            color: '#c0add8',
            margin: 0,
          }}
        >
          hint: it's a special date 💌
        </p>
      </div>
    </div>
  );
}

// ─── Screen 2: Happy Birthday ──────────────────────────────────────────────────
function BirthdayScreen({ onNext }: { onNext: () => void }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: T.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Confetti count={34} />
      <FloatingParticles count={14} />

      <div
        style={{
          textAlign: 'center',
          padding: '24px 28px',
          maxWidth: 540,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 76,
            lineHeight: 1,
            marginBottom: 24,
            animation: 'bounce-gentle 2s ease-in-out infinite',
            filter: 'drop-shadow(0 8px 24px rgba(124,58,237,0.3))',
          }}
        >
          🎂
        </div>

        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(40px, 8vw, 76px)',
            fontWeight: 700,
            color: T.purpleDark,
            margin: '0 0 4px',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          Happy Birthday,
        </h1>
        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(40px, 8vw, 76px)',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${T.purple}, ${T.pink})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 24px',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          {RECIPIENT}! 💜
        </h1>

        <p
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 22,
            color: '#9b7fc4',
            margin: '0 0 44px',
            lineHeight: 1.5,
          }}
        >
          I have a little something for you...
        </p>

        <PrimaryBtn
          onClick={onNext}
          style={{ fontSize: 16, padding: '16px 40px' }}
        >
          Press me for your gift 🎁
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ─── Screen 3: Make a Wish ─────────────────────────────────────────────────────
function WishScreen({ onNext }: { onNext: () => void }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: T.darkBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stars count={64} />

      {/* Candle glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '28%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0.05) 55%, transparent 72%)',
          filter: 'blur(32px)',
          animation: 'pulse-glow 3.2s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          textAlign: 'center',
          padding: '24px 28px',
          maxWidth: 500,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 72,
            lineHeight: 1,
            marginBottom: 28,
            animation: 'bounce-gentle 2.5s ease-in-out infinite',
            filter: 'drop-shadow(0 0 28px rgba(251,191,36,0.75))',
          }}
        >
          🕯️
        </div>

        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(30px, 6vw, 58px)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.92)',
            margin: '0 0 4px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          How about you
        </h1>
        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(30px, 6vw, 58px)',
            fontWeight: 600,
            color: '#fde68a',
            margin: '0 0 28px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          make a wish?
        </h1>

        <p
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 20,
            color: 'rgba(255,255,255,0.62)',
            margin: '0 0 52px',
            lineHeight: 1.7,
          }}
        >
          Close your eyes for a second.
          <br />
          Make it a good one. ✨
        </p>

        <PrimaryBtn
          onClick={onNext}
          style={{
            background: '#fbbf24',
            color: T.purpleDark,
            boxShadow: '0 6px 24px rgba(251,191,36,0.48)',
          }}
        >
          next →
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ─── Screen 4: Little Surprise ─────────────────────────────────────────────────
function SurpriseScreen({ onYes }: { onYes: () => void }) {
  const [noClicks, setNoClicks] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleNo = () => {
    if (noClicks >= 2) {
      onYes();
      return;
    }
    setNoPos({
      x: noClicks === 0 ? 80 : -90,
      y: (Math.random() - 0.5) * 60,
    });
    setNoClicks((c) => c + 1);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: T.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingParticles count={14} />
      <Stars count={20} />

      <div
        style={{
          textAlign: 'center',
          padding: '24px 28px',
          maxWidth: 480,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 72,
            lineHeight: 1,
            marginBottom: 20,
            animation: 'bounce-gentle 2s ease-in-out infinite',
          }}
        >
          🐱
        </div>

        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(30px, 6vw, 54px)',
            fontWeight: 600,
            color: T.purpleDark,
            margin: '0 0 4px',
            lineHeight: 1.15,
          }}
        >
          I have a little
        </h1>
        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(30px, 6vw, 54px)',
            fontWeight: 600,
            background: `linear-gradient(135deg, ${T.purple}, ${T.pink})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 20px',
            lineHeight: 1.15,
          }}
        >
          surprise for you.
        </h1>

        <p
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 23,
            color: '#9b7fc4',
            margin: '0 0 40px',
          }}
        >
          Wanna see it?
        </p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            minHeight: 60,
            position: 'relative',
          }}
        >
          <PrimaryBtn
            onClick={onYes}
            style={{ fontSize: 16, padding: '14px 36px' }}
          >
            YES ✨
          </PrimaryBtn>

          <button
            onClick={handleNo}
            style={{
              ...btnBase,
              padding: '14px 30px',
              fontSize: 15,
              background:
                noClicks >= 2 ? T.pink : 'rgba(255,255,255,0.78)',
              color: noClicks >= 2 ? 'white' : '#9b7fc4',
              border: `2px solid ${noClicks >= 2 ? T.pink : T.purpleLight}`,
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              boxShadow:
                noClicks >= 2
                  ? '0 4px 16px rgba(236,72,153,0.38)'
                  : 'none',
              letterSpacing: '0.04em',
            }}
          >
            {noClicks === 0
              ? 'NO 🙈'
              : noClicks === 1
              ? 'still no 🙈'
              : 'YES 😭'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Gifts ───────────────────────────────────────────────────────────
function GiftsScreen({ onGift }: { onGift: (n: 1 | 2 | 3) => void }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: T.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingParticles count={12} />
      <Stars count={18} />

      <div
        style={{
          textAlign: 'center',
          padding: '24px 20px',
          zIndex: 1,
          width: '100%',
          maxWidth: 580,
        }}
      >
        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 5vw, 54px)',
            fontWeight: 400,
            color: T.purpleDark,
            margin: '0 0 44px',
            letterSpacing: '-0.02em',
          }}
        >
          select any
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(14px, 4vw, 48px)',
            flexWrap: 'wrap',
            marginBottom: 36,
          }}
        >
          <GiftBox
            boxColor="#ddd6fe"
            ribbonColor="#6d28d9"
            emoji="🎉"
            label="Gift 1"
            onClick={() => onGift(1)}
          />
          <GiftBox
            boxColor="#fce7f3"
            ribbonColor="#db2777"
            emoji="💌"
            label="Gift 2"
            onClick={() => onGift(2)}
          />
          <GiftBox
            boxColor="#fef3c7"
            ribbonColor="#b45309"
            emoji="📸"
            label="Gift 3"
            onClick={() => onGift(3)}
          />
        </div>

        <p
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 19,
            color: '#9b7fc4',
            margin: 0,
          }}
        >
          One of these has a tiny surprise inside 👀
        </p>
      </div>
    </div>
  );
}

// ─── Screen 6: Gift 1 — It's Your Day ─────────────────────────────────────────
function Gift1Screen({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1e0a3c 0%, #4c1d95 55%, #7c3aed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Confetti count={26} />

      <div
        style={{
          textAlign: 'center',
          padding: '24px 28px',
          maxWidth: 560,
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(11px, 2vw, 14px)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(196,181,253,0.7)',
            margin: '0 0 20px',
            fontWeight: 800,
          }}
        >
          TODAY IS ALL ABOUT...
        </p>

        <div style={{ margin: '0 0 28px' }}>
          <div
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(52px, 10vw, 96px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.88)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            IT'S
          </div>
          <div
            style={{
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(68px, 14vw, 136px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #fde68a, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            YOUR
          </div>
          <div
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(52px, 10vw, 96px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.88)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            DAY!
          </div>
        </div>

        <p
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: 'rgba(255,255,255,0.68)',
            margin: '0 0 48px',
            lineHeight: 1.65,
          }}
        >
          Because someone as special as you
          <br />
          deserves a day that feels just as special. 💜
        </p>

        <BackBtn onClick={onBack} dark />
      </div>
    </div>
  );
}

// ─── Screen 7: Gift 2 — Envelope Letter ───────────────────────────────────────
function Gift2Screen({ onBack }: { onBack: () => void }) {
  const [opened, setOpened] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setLetterVisible(true), 780);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(135deg, #fdf8f0 0%, #fef3e2 50%, #fff0f5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        gap: 24,
        padding: '20px',
      }}
    >
      <Stars count={22} />

      {/* Letter */}
      {letterVisible && (
        <div
          style={{
            width: 'min(300px, 88vw)',
            maxHeight: '40vh',
            overflowY: 'auto',
            background: 'linear-gradient(160deg, #fffbf0, #fef9ec)',
            border: '1px solid #e8d5a3',
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow:
              '0 24px 64px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.8)',
            animation: 'letter-emerge 0.7s ease-out forwards',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 19,
              color: '#9b7fc4',
              margin: '0 0 14px',
              textAlign: 'center',
            }}
          >
            {LETTER.intro}
          </p>
          <p
            style={{
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
              fontSize: 17,
              color: T.purpleDark,
              margin: '0 0 12px',
            }}
          >
            {LETTER.greeting}
          </p>
          {LETTER.body.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: 14,
                color: '#4a3728',
                margin: '0 0 10px',
                lineHeight: 1.75,
              }}
            >
              {para}
            </p>
          ))}
          <p
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 17,
              color: '#9b7fc4',
              margin: '12px 0 4px',
            }}
          >
            {LETTER.closing}
          </p>
          <p style={{ fontSize: 22, margin: 0 }}>{LETTER.signature}</p>
        </div>
      )}

      {/* Envelope */}
      <div
        style={{
          transition: 'opacity 0.85s ease, transform 0.85s ease',
          opacity: opened ? (letterVisible ? 0.48 : 0.82) : 1,
          transform: opened
            ? 'translateY(10px) scale(0.96)'
            : 'translateY(0) scale(1)',
        }}
      >
        <div style={{ perspective: '700px' }}>
          <div
            style={{
              position: 'relative',
              width: 'min(300px, 86vw)',
              height: 190,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Envelope body */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(175deg, #fefce8, #fef9d4)',
                borderRadius: '4px 4px 18px 18px',
                border: '1.5px solid #d4af37',
                boxShadow: '0 24px 64px rgba(0,0,0,0.13)',
                overflow: 'hidden',
              }}
            >
              {/* V-fold lines */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '90px 150px 0 0',
                  borderColor: `rgba(212,175,55,0.18) transparent transparent transparent`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '90px 0 0 150px',
                  borderColor: `transparent transparent transparent rgba(212,175,55,0.18)`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 0 95px 150px',
                  borderColor: `transparent transparent rgba(212,175,55,0.12) transparent`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 150px 95px 0',
                  borderColor: `transparent rgba(212,175,55,0.12) transparent transparent`,
                }}
              />
            </div>

            {/* Flap */}
            <div
              style={{
                position: 'absolute',
                top: '-1px',
                left: '-1.5px',
                right: '-1.5px',
                height: '58%',
                transformOrigin: 'top center',
                transform: opened
                  ? 'rotateX(-158deg)'
                  : 'rotateX(0deg)',
                transition:
                  'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(175deg, #fef3c7, #fde68a)',
                zIndex: 4,
                backfaceVisibility: 'hidden',
              }}
            />

            {/* Heart seal — outer wrapper positions, inner animates scale */}
            <div
              style={{
                position: 'absolute',
                top: '44%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 6,
                transition: 'opacity 0.45s ease',
                opacity: opened ? 0 : 1,
              }}
            >
              <div
                onClick={!opened ? handleOpen : undefined}
                style={{
                  fontSize: 36,
                  cursor: opened ? 'default' : 'pointer',
                  animation: !opened
                    ? 'heartbeat-scale 2s ease-in-out infinite'
                    : 'none',
                  filter: 'drop-shadow(0 2px 10px rgba(236,72,153,0.55))',
                  userSelect: 'none',
                  display: 'block',
                }}
              >
                ❤️
              </div>
            </div>
          </div>
        </div>

        {!opened && (
          <p
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 18,
              color: '#9b7fc4',
              textAlign: 'center',
              marginTop: 18,
              animation: 'bounce-gentle 3s ease-in-out infinite',
            }}
          >
            There's something waiting inside... 💌
          </p>
        )}
      </div>

      <BackBtn onClick={onBack} />
    </div>
  );
}

// ─── Screen 8: Gift 3 — Memory Lane ───────────────────────────────────────────
const PHOTOS = [
  {
    src: '/memory-lane/memory-1.jpg',
    label: 'always smiling',
    rot: -3,
  },
  {
    src: '/memory-lane/memory-2.jpg',
    label: 'that one day',
    rot: 2.2,
  },
  {
    src: '/memory-lane/memory-3.jpg',
    label: 'favourite memory',
    rot: -2,
  },
  {
    src: '/memory-lane/memory-4.jpg',
    label: 'best memories',
    rot: 3,
  },
];

function Gift3Screen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(135deg, #fdf8f0 0%, #f8f0ff 60%, #fff0f5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <FloatingParticles count={10} />

      <h1
        style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: 'clamp(26px, 5vw, 48px)',
          color: T.purpleDark,
          margin: '0 0 28px',
          zIndex: 1,
        }}
      >
        a little memory wall
      </h1>

      {/* Photo grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(12px, 3vw, 22px)',
          maxWidth: 440,
          width: '100%',
          zIndex: 1,
          marginBottom: 28,
        }}
      >
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            style={{
              background: 'white',
              borderRadius: 3,
              padding: '9px 9px 26px',
              boxShadow:
                '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              transform: `rotate(${photo.rot}deg)`,
              transition: 'transform 0.32s, box-shadow 0.32s, z-index 0s',
              animation: `fade-in-up 0.6s ${i * 0.13}s ease-out both`,
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'rotate(0deg) scale(1.05) translateY(-5px)';
              el.style.boxShadow =
                '0 18px 50px rgba(0,0,0,0.18), 0 4px 14px rgba(0,0,0,0.08)';
              el.style.zIndex = '10';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = `rotate(${photo.rot}deg)`;
              el.style.boxShadow =
                '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)';
              el.style.zIndex = '1';
            }}
          >
            {/* Tape */}
            <div
              style={{
                position: 'absolute',
                top: -9,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 38,
                height: 15,
                background: 'rgba(255,255,200,0.62)',
                borderRadius: 2,
                border: '1px solid rgba(200,190,100,0.3)',
              }}
            />

            {/* Photo */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <p
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: 13.5,
                color: '#7b5c7c',
                textAlign: 'center',
                margin: '7px 0 0',
                lineHeight: 1.3,
              }}
            >
              {photo.label}
            </p>
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <div
        style={{
          display: 'flex',
          gap: 14,
          zIndex: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <BackBtn onClick={onBack} />
        <PrimaryBtn onClick={onNext}>keep going →</PrimaryBtn>
      </div>
    </div>
  );
}

// ─── Screen 9: Final Message ───────────────────────────────────────────────────
function FinalScreen({ onReplay }: { onReplay: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 380);
    const t2 = setTimeout(() => setStage(2), 1250);
    const t3 = setTimeout(() => setStage(3), 2350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(160deg, #1e0a3c 0%, #4c1d95 38%, #7c3aed 68%, #c4b5fd 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '32px 24px',
      }}
    >
      <FloatingHearts count={12} />
      <Confetti count={22} />
      <Stars count={52} />

      {/* Soft glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(196,181,253,0.14) 0%, transparent 68%)',
          filter: 'blur(44px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          textAlign: 'center',
          zIndex: 1,
          maxWidth: 520,
        }}
      >
        {stage >= 1 && (
          <div
            style={{
              fontSize: 68,
              lineHeight: 1,
              marginBottom: 22,
              animation: 'fade-in-up 0.8s ease-out',
            }}
          >
            🎉
          </div>
        )}

        {stage >= 1 && (
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(36px, 7vw, 68px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.92)',
              margin: '0 0 4px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              animation: 'cinematic-in 1.2s ease-out',
            }}
          >
            Happy Birthday,
          </h1>
        )}

        {stage >= 2 && (
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 7vw, 68px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #fde68a, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 36px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              animation: 'cinematic-in 1.2s ease-out',
            }}
          >
            {RECIPIENT}! 💜
          </h1>
        )}

        {stage >= 3 && (
          <>
            <p
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: 'clamp(18px, 3.5vw, 26px)',
                color: 'rgba(255,255,255,0.8)',
                margin: '0 0 52px',
                lineHeight: 1.68,
                animation: 'fade-in-up 0.9s ease-out',
              }}
            >
              {FINAL_MESSAGE}
            </p>

            <button
              onClick={onReplay}
              style={{
                ...btnBase,
                padding: '12px 32px',
                fontSize: 14,
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.78)',
                border: '1.5px solid rgba(255,255,255,0.28)',
                letterSpacing: '0.06em',
                animation: 'fade-in-up 0.8s ease-out',
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = 'rgba(255,255,255,0.2)';
                b.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = 'rgba(255,255,255,0.1)';
                b.style.color = 'rgba(255,255,255,0.78)';
              }}
            >
              replay ↻
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Background Music ─────────────────────────────────────────────────────────
const SPOTIFY_TRACK_ID = '1bMkimTb47umgNP6xCi4A1';

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
  }
}

function MusicPlayer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function setup(IFrameAPI: any) {
      if (cancelled || !mountRef.current || controllerRef.current) return;
      const options = {
        uri: `spotify:track:${SPOTIFY_TRACK_ID}`,
        width: '1',
        height: '1',
      };
      IFrameAPI.createController(
        mountRef.current,
        options,
        (EmbedController: any) => {
          controllerRef.current = EmbedController;
          setReady(true);
          EmbedController.addListener('playback_update', (e: any) => {
            setPlaying(!e.data?.isPaused);
          });
        },
      );
    }

    const existingScript = document.getElementById('spotify-iframe-api');
    window.onSpotifyIframeApiReady = setup;
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'spotify-iframe-api';
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = () => {
    const controller = controllerRef.current;
    if (!controller) return;
    if (playing) {
      controller.pause();
      setPlaying(false);
    } else {
      controller.play();
      setPlaying(true);
    }
  };

  return (
    <>
      {/* Hidden Spotify embed — drives the audio, not shown on screen */}
      <div
        ref={mountRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
          bottom: 0,
          right: 0,
        }}
      />

      <button
        onClick={toggle}
        disabled={!ready}
        title={playing ? 'Mute music' : 'Play music'}
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: 'none',
          cursor: ready ? 'pointer' : 'default',
          background: 'rgba(76, 29, 149, 0.85)',
          color: 'white',
          fontSize: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(76,29,149,0.35)',
          backdropFilter: 'blur(4px)',
          transition: 'transform 0.2s, background 0.2s',
          opacity: ready ? 1 : 0.6,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
      >
        {playing ? '🔊' : '🔇'}
      </button>
    </>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('password');
  const [visible, setVisible] = useState(true);

  const go = useCallback((to: Screen) => {
    setVisible(false);
    setTimeout(() => {
      setScreen(to);
      setVisible(true);
    }, 380);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <MusicPlayer />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'scale(1) translateY(0)'
            : 'scale(0.975) translateY(12px)',
          transition: 'opacity 0.38s ease, transform 0.38s ease',
        }}
      >
        {screen === 'password' && (
          <PasswordScreen onUnlock={() => go('birthday')} />
        )}
        {screen === 'birthday' && (
          <BirthdayScreen onNext={() => go('wish')} />
        )}
        {screen === 'wish' && <WishScreen onNext={() => go('surprise')} />}
        {screen === 'surprise' && (
          <SurpriseScreen onYes={() => go('gifts')} />
        )}
        {screen === 'gifts' && (
          <GiftsScreen onGift={(n) => go(`gift${n}` as Screen)} />
        )}
        {screen === 'gift1' && <Gift1Screen onBack={() => go('gifts')} />}
        {screen === 'gift2' && <Gift2Screen onBack={() => go('gifts')} />}
        {screen === 'gift3' && (
          <Gift3Screen onBack={() => go('gifts')} onNext={() => go('final')} />
        )}
        {screen === 'final' && (
          <FinalScreen onReplay={() => go('password')} />
        )}
      </div>
    </div>
  );
}
