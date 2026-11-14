import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Sliders,
  BookOpen,
  Terminal,
  Users,
  Copy,
  CheckCircle2,
  ExternalLink,
  FileText,
  Download,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { metadataAnteproyecto } from '../data/anteproyectoData';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'resumen', label: 'Resumen Ejecutivo', icon: LayoutDashboard },
  { id: 'graficas', label: 'Gráficas y Proyecciones', icon: BarChart3 },
  { id: 'simulacion', label: 'Simulación Específica', icon: Sliders },
  { id: 'apartes', label: 'Apartes del Proyecto', icon: BookOpen },
  { id: 'python', label: 'Entorno Python (Anexo A)', icon: Terminal },
];

interface SidebarNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenAuthorsModal: () => void;
  onCopyMarkdown: () => void;
  copiedMarkdown: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
  onOpenAuthorsModal,
  onCopyMarkdown,
  copiedMarkdown,
}) => {
  const handleSelect = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0c1220] border-r border-slate-800/90 text-slate-200 select-none">
      {/* Institutional Brand */}
      <div className="px-5 py-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-emerald-400 truncate">
              CUN · Ingeniería de Sistemas
            </p>
            <p className="text-sm font-semibold text-slate-100 truncate">
              Data Centers 2030
            </p>
          </div>
        </div>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          aria-label="Cerrar menú"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Workspace Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Navegación principal">
        <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
          Módulos
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                isActive
                  ? 'bg-emerald-500/12 text-emerald-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Secondary Academic Utilities */}
      <div className="px-3 py-4 border-t border-slate-800/80 space-y-1">
        <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
          Documentación
        </p>

        <button
          onClick={() => {
            onOpenAuthorsModal();
            onCloseMobile();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors text-left"
        >
          <Users className="w-4 h-4 shrink-0 text-slate-500" />
          <span className="truncate">Equipo Investigador (4)</span>
        </button>

        <button
          onClick={onCopyMarkdown}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors text-left"
        >
          {copiedMarkdown ? (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span className="text-emerald-400 truncate">Documento APA 7 Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 shrink-0 text-slate-500" />
              <span className="truncate">Copiar Documento APA 7</span>
            </>
          )}
        </button>

        <a
          href={metadataAnteproyecto.driveAuditLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-slate-500" />
          <span className="truncate">Drive Auditoría CUN</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 max-w-[85vw] h-full z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

interface TopBreadcrumbBarProps {
  activeTab: string;
  onOpenMobileMenu: () => void;
  onOpenPdfModal: () => void;
  onExportZip: () => void;
  isExportingZip: boolean;
}

export const TopBreadcrumbBar: React.FC<TopBreadcrumbBarProps> = ({
  activeTab,
  onOpenMobileMenu,
  onOpenPdfModal,
  onExportZip,
  isExportingZip,
}) => {
  const currentItem = NAV_ITEMS.find((item) => item.id === activeTab) || NAV_ITEMS[0];

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-md text-slate-300 hover:bg-slate-800 border border-slate-800"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
          <span className="text-slate-500 hidden sm:inline whitespace-nowrap">
            Anteproyecto CUN
          </span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="font-semibold text-slate-100 truncate">
            {currentItem.label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenPdfModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium transition-colors whitespace-nowrap"
        >
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Ver PDF Original</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <button
          onClick={onExportZip}
          disabled={isExportingZip}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExportingZip ? 'Exportando...' : 'Descargar ZIP'}</span>
        </button>
      </div>
    </header>
  );
};
