export default function ServicesLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading services"
      style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 62 }}
    >
      {/* Sticky nav skeleton */}
      <div
        style={{
          height: 50,
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
        }}
        aria-hidden="true"
      />

      {/* Hero skeleton */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 48px 64px' }}>
        <div className="animate-pulse">
          <div style={{ height: 12, width: 120, background: 'var(--card)', borderRadius: 4, marginBottom: 20 }} />
          <div style={{ height: 44, width: '60%', background: 'var(--card)', borderRadius: 6, marginBottom: 14 }} />
          <div style={{ height: 44, width: '45%', background: 'var(--card)', borderRadius: 6, marginBottom: 28 }} />
          <div style={{ height: 18, width: '50%', background: 'var(--card)', borderRadius: 4, marginBottom: 10 }} />
          <div style={{ height: 18, width: '40%', background: 'var(--card)', borderRadius: 4 }} />
        </div>
      </div>

      {/* Service cards skeleton */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 80px' }}>
        <div
          className="animate-pulse"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: 'var(--card)',
                borderRadius: 8,
                height: 280,
                border: '1px solid var(--border)',
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
