/**
 * AuthLayout Component
 * Layout untuk halaman autentikasi (login, register, forgot password)
 * Menampilkan form di tengah layar dengan background branded
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-50 via-brew-50 to-espresso-100">
      {/* Coffee Shop Branding - Top Left */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">☕</span>
          <span className="text-2xl font-bold font-display text-coffee-900">Format Ganjil</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-md px-6 py-8 space-y-6">
        {/* Decorative Coffee Elements */}
        <div className="absolute top-12 right-12 text-brew-300 opacity-40 animate-float">
          <svg
            className="w-32 h-32"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
        </div>

        {/* Main Form Container */}
        <div className="relative bg-white rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur-sm bg-opacity-95">
          {children}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center text-sm text-espresso-600">
          <p>☕ Kelola kafe Anda dengan lebih efisien</p>
        </div>
      </div>

      {/* Decorative Coffee Elements Bottom Left */}
      <div className="absolute bottom-12 left-12 text-coffee-300 opacity-30 animate-float animation-delay-2000">
        <svg
          className="w-40 h-40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>
    </div>
  );
}
