import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface-50">
      <header className="border-b border-warmblack-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-display font-bold text-xl text-coral-500 tracking-tight">
                HereForward
              </Link>
              <nav className="hidden sm:flex items-center gap-4">
                <Link
                  to="/prototype-1"
                  className="text-sm text-warmblack-400 hover:text-warmblack-600 transition-colors"
                >
                  P1: Search
                </Link>
                <Link
                  to="/prototype-2"
                  className="text-sm text-warmblack-400 hover:text-warmblack-600 transition-colors"
                >
                  P2: Guided
                </Link>
                <Link
                  to="/prototype-3"
                  className="text-sm text-warmblack-400 hover:text-warmblack-600 transition-colors"
                >
                  P3: Staff
                </Link>
              </nav>
            </div>
            <p className="hidden sm:block text-sm italic text-warmblack-300">
              Every Kid Needs a Team
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
