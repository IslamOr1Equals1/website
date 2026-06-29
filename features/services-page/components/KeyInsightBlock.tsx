/**
 * Per-service variant for the key insight line inside ServiceDeepDive.
 * Each service has a distinct visual treatment to avoid repetition across 5 sequential sections.
 */
export function KeyInsightBlock({ text, slug }: { text: string; slug: string }) {
  // network-ad: pull-quote style — authority through restraint
  if (slug === 'network-ad') {
    return (
      <blockquote
        style={{ borderLeft: '2px solid var(--blue)', paddingLeft: '14px', margin: '0 0 16px' }}
      >
        <p
          style={{
            fontSize: '0.97rem',
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--txt)',
            lineHeight: 1.55,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          {text}
        </p>
      </blockquote>
    )
  }

  // red-team: heavy weight — this is the most consequential service
  if (slug === 'red-team') {
    return (
      <p
        style={{
          fontSize: '1.02rem',
          fontWeight: 700,
          color: 'var(--txt)',
          lineHeight: 1.45,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}
      >
        {text}
      </p>
    )
  }

  // cloud: muted italic — the insight is about invisible, accumulating risk
  if (slug === 'cloud') {
    return (
      <p
        style={{
          fontSize: '0.94rem',
          fontWeight: 500,
          color: 'var(--txt2)',
          lineHeight: 1.6,
          marginBottom: '16px',
          letterSpacing: '-0.005em',
          fontStyle: 'italic',
        }}
      >
        {text}
      </p>
    )
  }

  // code-review: monospace accent on the word 'assumption' — ties to the code metaphor
  if (slug === 'code-review') {
    const parts = text.split('assumption')
    return (
      <p
        style={{
          fontSize: '0.96rem',
          fontWeight: 500,
          color: 'var(--txt)',
          lineHeight: 1.55,
          marginBottom: '16px',
          letterSpacing: '-0.01em',
        }}
      >
        {parts.flatMap((part, i) =>
          i === parts.length - 1
            ? [part]
            : [
                part,
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88em',
                    color: 'var(--blue)',
                    opacity: 0.85,
                  }}
                >
                  assumption
                </span>,
              ]
        )}
      </p>
    )
  }

  // web-app (default): standard weight
  return (
    <p
      style={{
        fontSize: '0.96rem',
        fontWeight: 500,
        color: 'var(--txt)',
        lineHeight: 1.55,
        marginBottom: '16px',
        letterSpacing: '-0.01em',
      }}
    >
      {text}
    </p>
  )
}
