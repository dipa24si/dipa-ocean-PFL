import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

/**
 * ErrorPage Component
 * Komponen halaman error yang reusable untuk berbagai jenis error
 * @param {number} errorCode - Kode error (400, 401, 403, 404, dll)
 * @param {string} errorDescription - Deskripsi error
 * @param {string} errorImage - Emoji atau gambar untuk error
 */
export default function ErrorPage({ errorCode = 404, errorDescription = "Halaman tidak ditemukan", errorImage = "🚫" }) {
  const getErrorTitle = (code) => {
    switch (code) {
      case 400: return "Bad Request";
      case 401: return "Unauthorized";
      case 403: return "Forbidden";
      case 404: return "Not Found";
      case 500: return "Internal Server Error";
      default: return "Error";
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 400:
        return "Permintaan yang Anda kirim tidak valid. Silakan periksa kembali data yang dimasukkan.";
      case 401:
        return "Anda tidak memiliki izin untuk mengakses halaman ini. Silakan login terlebih dahulu.";
      case 403:
        return "Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.";
      case 404:
        return "Halaman yang Anda cari tidak ada atau telah dipindahkan.";
      case 500:
        return "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
      default:
        return errorDescription;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-brew-50 flex items-center justify-center px-4">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-coffee-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-brew-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-espresso-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative text-center space-y-8 max-w-md">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-coffee-600 to-brew-500 bg-clip-text text-transparent">
            {errorCode}
          </h1>
        </div>

        {/* Error Image */}
        <div className="text-8xl animate-bounce">
          {errorImage}
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold font-display text-espresso-900">
            {getErrorTitle(errorCode)}
          </h2>
          <p className="text-lg text-espresso-600">
            {getErrorMessage(errorCode)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-espresso-300 text-espresso-700 hover:bg-espresso-50 transition-all duration-200 font-medium"
          >
            <FiArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          {/* Home Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-coffee-600 text-white hover:bg-coffee-700 transition-all duration-200 font-medium"
          >
            <FiHome className="w-5 h-5" />
            Beranda
          </Link>

          {/* Retry Button for server errors */}
          {(errorCode >= 500) && (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-coffee-300 text-coffee-700 hover:bg-coffee-50 transition-all duration-200 font-medium"
            >
              <FiRefreshCw className="w-5 h-5" />
              Coba Lagi
            </button>
          )}
        </div>

        {/* Additional Help */}
        <div className="pt-6 border-t border-espresso-200">
          <p className="text-sm text-espresso-500">
            Jika masalah berlanjut, hubungi tim support kami di{" "}
            <a href="mailto:support@ngopieuy.com" className="text-coffee-600 hover:underline">
              support@ngopieuy.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}