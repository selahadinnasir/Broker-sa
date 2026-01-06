import { Download } from 'lucide-react';
import usePWAInstall from '../hooks/usePWAInstall';

const InstallAppButton = () => {
  const { isInstallable, installApp } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <button
      onClick={installApp}
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
    >
      <Download size={16} />
      እንደ አፕ ለማውረድ
    </button>
  );
};

export default InstallAppButton;
