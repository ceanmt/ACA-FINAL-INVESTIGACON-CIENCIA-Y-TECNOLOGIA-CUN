/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SidebarNav, TopBreadcrumbBar } from './components/SidebarNav';
import { AuthorsModal } from './components/AuthorsModal';
import { PdfViewModal } from './components/PdfViewModal';
import { ExecutiveOverviewTab } from './components/ExecutiveOverviewTab';
import { ProjectionsTab } from './components/ProjectionsTab';
import { SimulacionTab } from './components/SimulacionTab';
import { ProjectChaptersTab } from './components/ProjectChaptersTab';
import { PythonRunnerTab } from './components/PythonRunnerTab';
import { metadataAnteproyecto } from './data/anteproyectoData';
import { generateFullApaMarkdown } from './utils/markdownGenerator';
import { exportAcaProjectZip } from './utils/zipExporter';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAuthorsModalOpen, setIsAuthorsModalOpen] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [isExportingZip, setIsExportingZip] = useState<boolean>(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleCopyMarkdown = () => {
    const md = generateFullApaMarkdown();
    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const handleExportZip = async () => {
    try {
      setExportError(null);
      setIsExportingZip(true);
      await exportAcaProjectZip();
    } catch (err) {
      console.error('Error generando archivo ZIP:', err);
      setExportError('No se pudo generar el archivo ZIP. Intente nuevamente.');
    } finally {
      setIsExportingZip(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Left Navigation Sidebar */}
      <SidebarNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenAuthorsModal={() => setIsAuthorsModalOpen(true)}
        onCopyMarkdown={handleCopyMarkdown}
        copiedMarkdown={copiedMarkdown}
      />

      {/* Workspace Column */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <TopBreadcrumbBar
          activeTab={activeTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenPdfModal={() => setIsPdfModalOpen(true)}
          onExportZip={handleExportZip}
          isExportingZip={isExportingZip}
        />

        {exportError && (
          <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 px-4 py-2.5 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-200 flex items-center justify-between">
            <span>{exportError}</span>
            <button
              onClick={() => setExportError(null)}
              className="text-red-300 hover:text-white font-medium ml-4"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
          {activeTab === 'resumen' && (
            <ExecutiveOverviewTab onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'graficas' && <ProjectionsTab />}

          {activeTab === 'simulacion' && <SimulacionTab />}

          {activeTab === 'apartes' && (
            <ProjectChaptersTab
              onCopyMarkdown={handleCopyMarkdown}
              copiedMarkdown={copiedMarkdown}
              onExportZip={handleExportZip}
              isExportingZip={isExportingZip}
            />
          )}

          {activeTab === 'python' && <PythonRunnerTab />}
        </main>

        {/* Minimal Institutional Footer */}
        <footer className="mt-auto border-t border-slate-800/80 py-5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>
              {metadataAnteproyecto.institution} · {metadataAnteproyecto.program}
            </span>
            <span>
              Directora: {metadataAnteproyecto.director} · {metadataAnteproyecto.date}
            </span>
          </div>
        </footer>
      </div>

      {/* Authors and Academic Direction Modal */}
      <AuthorsModal
        isOpen={isAuthorsModalOpen}
        onClose={() => setIsAuthorsModalOpen(false)}
      />

      {/* Original PDF Document Viewer Modal */}
      <PdfViewModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
