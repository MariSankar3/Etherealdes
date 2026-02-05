import React, { useEffect, useRef, useState } from 'react';
import MidSecContent from '../../_menu/components/MidSecContent';
import RightSecContent from '../../_menu/components/RightSecContent';

// Sidebar/Overlay version of the menu
const MenuSidebar = ({ className = "", onClose }) => {
  const sidebarRef = useRef(null);
  const [sidebarOffset, setSidebarOffset] = useState(80);

  useEffect(() => {
    const updateOffset = () => {
      if (typeof window !== 'undefined') {
        setSidebarOffset(window.innerWidth <= 770 ? 60 : 80);
      }
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close when clicking outside the sidebar
  const handleOverlayClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      onClose && onClose();
    }
  };

  return (
    <div
      className="fixed top-0 h-full w-full overflow-x-hidden"
      style={{ left: `${sidebarOffset}px`, width: `calc(100vw - ${sidebarOffset}px)`, zIndex: 50, position: 'fixed' }}
      onClick={handleOverlayClick}
    >
      <aside
        ref={sidebarRef}
        className={`w-full h-full bg-[#FF4E21] flex flex-col md:flex-row overflow-auto overflow-x-hidden ${className}`}
        style={{ boxShadow: 'none' }}
      >
        <MidSecContent onClose={onClose} />
        <RightSecContent />
      </aside>
    </div>
  );
};

export default MenuSidebar; 