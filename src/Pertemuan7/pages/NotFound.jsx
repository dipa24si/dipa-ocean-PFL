import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

/**
 * NotFound Page (404)
 * Menampilkan halaman saat user mengakses route yang tidak ada
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-brew-50 flex items-center justify-center px-4">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-coffee-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-brew-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Content */}
      <div className="relative text-center space-y-8 max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-coffee-600 to-brew-500 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Coffee Cup Illustration */}
        <div className="text-8xl animate-bounce">
          ☕
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold font-display text-espresso-900">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-espresso-600">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Seperti kopi yang hilang, mari kita cari yang lain!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-6">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-espresso-300 text-espresso-700 hover:bg-espresso-50 transition-all duration-200 font-medium"
          >
            <FiArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          {/* Home Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-coffee-600 to-brew-500 text-white hover:shadow-lg transition-all duration-200 font-medium"
          >
            <FiHome className="w-5 h-5" />
            Ke Dashboard
          </Link>
        </div>

        {/* Additional Info */}
        <div className="pt-8 text-sm text-espresso-500 space-y-2">
          <p>Kode Error: 404 Not Found</p>
          <p>Hubungi admin jika Anda pikir ini adalah kesalahan</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-20 left-10 text-4xl opacity-20 animate-float">☕</div>
      <div className="absolute top-32 right-20 text-5xl opacity-15 animate-float animation-delay-1000">☕</div>
    </div>
  );
}
