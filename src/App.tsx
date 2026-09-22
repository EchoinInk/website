import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/system/PageTransition';

const HomePage = lazy(() => import('@/pages/HomePage').then((module) => ({ default: module.HomePage })));
const IdentityPage = lazy(() => import('@/pages/IdentityPage').then((module) => ({ default: module.IdentityPage })));
const SessionsPage = lazy(() => import('@/pages/SessionsPage').then((module) => ({ default: module.SessionsPage })));
const BookingPage = lazy(() => import('@/pages/BookingPage').then((module) => ({ default: module.BookingPage })));
const WorldsPage = lazy(() => import('@/pages/WorldsPage').then((module) => ({ default: module.WorldsPage })));
const WorksPage = lazy(() => import('@/pages/WorksPage').then((module) => ({ default: module.WorksPage })));
const LumoPage = lazy(() => import('@/pages/LumoPage').then((module) => ({ default: module.LumoPage })));
const StudioPage = lazy(() => import('@/pages/StudioPage').then((module) => ({ default: module.StudioPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const SystemsPage = lazy(() => import('@/pages/SystemsPage').then((module) => ({ default: module.SystemsPage })));
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((module) => ({ default: module.ServicesPage })));
const ArchivePage = lazy(() => import('@/pages/ArchivePage').then((module) => ({ default: module.ArchivePage })));
const ArchiveEssayPage = lazy(() => import('@/pages/ArchiveEssayPage').then((module) => ({ default: module.ArchiveEssayPage })));
const ArchiveNotesPage = lazy(() => import('@/pages/ArchiveNotesPage').then((module) => ({ default: module.ArchiveNotesPage })));
const ArchiveIndexPage = lazy(() => import('@/pages/ArchiveIndexPage').then((module) => ({ default: module.ArchiveIndexPage })));
const OrbitalsPage = lazy(() =>
  import('@/pages/OrbitalsPage').then((module) => ({
    default: module.OrbitalsPage,
  })),
);
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/identity" element={<IdentityPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/worlds" element={<WorldsPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/lumo" element={<LumoPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/systems" element={<SystemsPage />} />
          <Route path="/insights" element={<ArchivePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/atmosphere-is-information" element={<ArchiveEssayPage />} />
          <Route path="/archive/notes" element={<ArchiveNotesPage />} />
          <Route path="/archive/map" element={<ArchiveIndexPage />} />
          <Route path="/internal/orbitals" element={<OrbitalsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <a
          href="#main-content"
          className="ei-type-color-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-[var(--ei-theme-surface)] focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ei-theme-focus)]"
        >
          Skip to main content
        </a>
        <Layout>
          <PageTransition>
            <AppRoutes />
          </PageTransition>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
