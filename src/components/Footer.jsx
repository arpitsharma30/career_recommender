export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #ede8df', padding: '32px 24px', background: '#f8f5f0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>CP</div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 600, color: '#1a1814' }}>CareerPath <span style={{ color: '#f97316' }}>India</span></span>
        </div>
        <p style={{ fontSize: 12, color: '#b8b0a4', margin: 0 }}>© 2025 CareerPath India · Made with ♥ for Indian students</p>
      </div>
    </footer>
  )
}