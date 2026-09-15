/**
 * CoverArt —— 确定性生成的封面图案
 * --------------------------------
 * 没有真实配图时用它占位。同一 seed 永远得到同一张图（不会每次刷新都变），
 * 不同项目之间又会明显区分开，视觉上不至于千篇一律。
 *
 * 有了真实截图后，把 <ProjectCard> 里的 <CoverArt /> 换成 <img src={coverImage} /> 即可。
 */

const PALETTES = [
  { bg: '#e8f0e9', fg: '#2f6f4f', mid: '#a3c7ad' },
  { bg: '#f6e8e2', fg: '#c2603f', mid: '#e2b9a4' },
  { bg: '#e6eef2', fg: '#3b6b8c', mid: '#a6c2d4' },
  { bg: '#f0ecf5', fg: '#6a5490', mid: '#bcaed2' },
  { bg: '#f2efe3', fg: '#8a7327', mid: '#d6c688' },
]

const PATTERNS = ['concentric', 'grid', 'diagonal', 'bars', 'dots'] as const

/** 稳定哈希：把字符串映射成非负整数 */
function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

interface Props {
  seed: string
  /** 卡片标题的首字符，做水印 */
  mark?: string
  className?: string
}

export default function CoverArt({ seed, mark, className = '' }: Props) {
  const h = hash(seed)
  const p = PALETTES[h % PALETTES.length]
  const pattern = PATTERNS[(h >> 3) % PATTERNS.length]

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: p.bg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {pattern === 'concentric' && (
          <g stroke={p.fg} fill="none" opacity="0.34">
            {[28, 52, 76, 100, 124, 148, 172].map((r) => (
              <circle key={r} cx="330" cy="40" r={r} strokeWidth="1.2" />
            ))}
          </g>
        )}

        {pattern === 'grid' && (
          <g stroke={p.fg} opacity="0.26" strokeWidth="1">
            {Array.from({ length: 13 }, (_, i) => (
              <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="225" />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 24} x2="400" y2={i * 24} />
            ))}
          </g>
        )}

        {pattern === 'diagonal' && (
          <g stroke={p.mid} strokeWidth="14" opacity="0.5">
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1={-140 + i * 46} y1="260" x2={60 + i * 46} y2="-40" />
            ))}
          </g>
        )}

        {pattern === 'bars' && (
          <g fill={p.mid} opacity="0.55">
            {[42, 92, 142, 192, 242, 292, 342].map((x, i) => (
              <rect key={x} x={x} y={225 - (30 + ((h >> (i + 1)) % 9) * 20)} width="26" height={30 + ((h >> (i + 1)) % 9) * 20} />
            ))}
          </g>
        )}

        {pattern === 'dots' && (
          <g fill={p.fg} opacity="0.4">
            {Array.from({ length: 90 }, (_, i) => {
              const col = i % 15
              const row = Math.floor(i / 15)
              const r = 1.6 + (((h >> (i % 7)) + i) % 4) * 1.4
              return <circle key={i} cx={14 + col * 27} cy={16 + row * 28} r={r} />
            })}
          </g>
        )}

        {/* 右下角的斜切色块，让图案有个重心 */}
        <path d="M400 225 L400 150 L250 225 Z" fill={p.fg} opacity="0.14" />
      </svg>

      {mark && (
        <span className="absolute bottom-3 right-4 font-serif text-5xl leading-none opacity-25" style={{ color: p.fg }}>
          {mark}
        </span>
      )}
    </div>
  )
}
