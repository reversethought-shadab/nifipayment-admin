import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirecting to '/admin/default'
  useEffect(() => {
    redirect('/admin/default');
  }, []);

  // Disable right-click, certain keyboard shortcuts, and developer tools
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined' && navigator.userAgent) {
      // Require disable-devtool and initialize it to block dev tools
      const disableDevtool = require('disable-devtool');
      disableDevtool();

      // Disable right-click
      const handleContextMenu = (e) => e.preventDefault();
      document.addEventListener('contextmenu', handleContextMenu);

      // Disable specific keyboard shortcuts
      const handleKeydown = (e) => {
        if (
          (e.ctrlKey && (e.key === 'I' || e.key === 'C' || e.key === 'J' || e.key === 'U')) ||
          (e.metaKey && (e.key === 'I' || e.key === 'C' || e.key === 'J' || e.key === 'U'))
        ) {
          e.preventDefault();
        }
      };
      document.addEventListener('keydown', handleKeydown);

      // Cleanup listeners on unmount
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  }, []);

  return null; // Since we are redirecting, there's no need to render anything
}
