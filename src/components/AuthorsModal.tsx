import React from 'react';
import { X, GraduationCap, UserCheck, Calendar, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { metadataAnteproyecto } from '../data/anteproyectoData';

interface AuthorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthorsModal: React.FC<AuthorsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Equipo de Investigación y Ficha Académica</h2>
              <p className="text-xs text-slate-400">{metadataAnteproyecto.institution}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Institutional Box */}
          <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/80 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-emerald-400">Programa Académico:</span>
              <span>{metadataAnteproyecto.program}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-emerald-400">Facultad:</span>
              <span>{metadataAnteproyecto.faculty}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-emerald-400">Dirección Académica:</span>
              <span className="font-medium text-slate-100">{metadataAnteproyecto.director}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-emerald-400">Lugar y Fecha Oficial:</span>
              <span>{metadataAnteproyecto.city}, {metadataAnteproyecto.date}</span>
            </div>
          </div>

          {/* Authors List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Autores del Anteproyecto (Presentado por)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {metadataAnteproyecto.authors.map((author, index) => (
                <div
                  key={author.id}
                  className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-emerald-400">0{index + 1}</span>
                    {author.code && (
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                        Cód: {author.code}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition">
                    {author.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{author.role}</p>
                  {author.email && (
                    <p className="text-[11px] text-emerald-500/80 mt-1 font-mono">{author.email}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Repositorio de Auditoría */}
          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-emerald-300">Auditoría del Comité Evaluador</p>
              <p className="text-slate-400 mt-0.5">
                Todos los datos, modelos, datasets (8,760 reg) y scripts se encuentran respaldados institucionalmente:
              </p>
              <a
                href={metadataAnteproyecto.driveAuditLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-medium underline break-all"
              >
                <span>Acceder a Carpeta Institucional Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
