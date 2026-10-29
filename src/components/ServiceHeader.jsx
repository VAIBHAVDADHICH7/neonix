import Navbar from './Navbar';

/**
 * ServiceHeader Component
 * Unified wrapper around the state-of-the-art Neonix Navigation Bar
 * providing 100% feature and visual parity across all Service & Dedicated Landing Pages.
 */
export default function ServiceHeader({ currentService, onOpenConsultation }) {
  return (
    <Navbar
      currentService={currentService}
      isServicePage={true}
      onOpenConsultation={onOpenConsultation}
    />
  );
}
