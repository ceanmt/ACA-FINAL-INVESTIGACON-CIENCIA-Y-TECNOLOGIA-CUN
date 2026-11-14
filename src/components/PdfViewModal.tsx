import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Eye,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Layers,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { metadataAnteproyecto } from '../data/anteproyectoData';

interface PdfViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewModal: React.FC<PdfViewModalProps> = ({ isOpen, onClose }) => {
  const [selectedDoc, setSelectedDoc] = useState<'anteproyecto' | 'guia-actividad'>('anteproyecto');
  const [viewMode, setViewMode] = useState<'reader' | 'embed'>('reader');
  const [activeSection, setActiveSection] = useState<string>('intro');

  if (!isOpen) return null;

  const doc1Path = '/ACA_Final_54415_Cesar_Andres_Mu_oz_Toro_cc9448fe.pdf';
  const doc2Path = '/ACTIVIDAD_ACA_FINAL_db931ee1.pdf';

  const currentPath = selectedDoc === 'anteproyecto' ? doc1Path : doc2Path;
  const currentTitle =
    selectedDoc === 'anteproyecto'
      ? 'ACA Final: Modelo Predictivo IA para Consumo Energético en Data Centers Bogotá 2030 (34 Págs)'
      : 'Guía Oficial ACA CUN: Diseño y Elaboración de Pruebas de Software y Métricas de Calidad';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[92vh] bg-[#0c1222] border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Visor Oficial de Documentos ACA CUN
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">Cargado y Verificado</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 truncate max-w-lg">
                {currentTitle}
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 text-xs">
            {/* View Mode Toggle */}
            <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setViewMode('reader')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  viewMode === 'reader'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Visor estructurado de texto y tablas (100% compatible sin plugins)"
              >
                Visor Rápido
              </button>
              <button
                onClick={() => setViewMode('embed')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  viewMode === 'embed'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Incrustación directa del archivo PDF"
              >
                PDF Nativo
              </button>
            </div>

            <a
              href={currentPath}
              download
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition shadow-sm"
              title="Descargar archivo PDF directamente a su equipo"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descargar PDF</span>
            </a>

            <a
              href={currentPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Abrir en pestaña nueva del navegador"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Selector Tabs */}
        <div className="px-5 py-2 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Seleccionar Documento ACA:</span>
            <button
              onClick={() => setSelectedDoc('anteproyecto')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                selectedDoc === 'anteproyecto'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              1. Anteproyecto Final ACA (34 Págs - César Muñoz et al.)
            </button>
            <button
              onClick={() => setSelectedDoc('guia-actividad')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                selectedDoc === 'guia-actividad'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              2. Guía Oficial de Actividad ACA (Semanas 3, 4, 5 y 6)
            </button>
          </div>

          <span className="text-slate-500 text-[11px] font-mono hidden md:inline">
            {selectedDoc === 'anteproyecto' ? 'ACA_Final_54415.pdf' : 'ACTIVIDAD_ACA_FINAL.pdf'}
          </span>
        </div>

        {/* Body View */}
        <div className="flex-1 overflow-hidden bg-slate-950 relative">
          {viewMode === 'embed' ? (
            <div className="w-full h-full flex flex-col">
              <div className="px-4 py-2 bg-amber-950/20 border-b border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                <span>
                  Si su navegador bloquea la vista embebida de PDFs dentro de iframes, use la pestaña <strong>"Visor Rápido"</strong> arriba o pulse <strong>"Descargar PDF"</strong>.
                </span>
                <a
                  href={currentPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-amber-200 ml-2"
                >
                  Abrir directamente en navegador
                </a>
              </div>
              <iframe
                src={currentPath}
                title="Visor PDF"
                className="w-full flex-1 border-0"
              />
            </div>
          ) : (
            /* Fast Text & Table Reader (Zero Plugin Failure) */
            <div className="w-full h-full overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 max-w-4xl mx-auto">
              {selectedDoc === 'anteproyecto' ? (
                /* Anteproyecto Content */
                <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Corporación Unificada Nacional de Educación Superior (CUN)
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-100">
                      Modelo predictivo de inteligencia artificial para pronosticar el consumo energético en centros de datos de Bogotá hacia el año 2030
                    </h3>
                    <p className="text-xs text-slate-400">
                      Autores: Angie Tatiana Orozco Barrios, Fabio Andrés Naranjo Morales, Diana Marcela Moreno Mosquera, Cesar Andres Muñoz Toro (Cód. 54415).
                    </p>
                    <p className="text-xs text-slate-400">
                      Dirección: Dra. Angélica María Jiménez Coronado, Ph.D. • Bogotá D.C., 15 de noviembre de 2026
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase border-b border-slate-800 pb-1">
                      1. Introducción y Antecedentes
                    </h4>
                    <p className="text-justify text-slate-300">
                      En los últimos años, el crecimiento de los servicios digitales y la computación en la nube han incrementado la demanda eléctrica en centros de datos. En Bogotá, la infraestructura tecnológica se concentra de forma estratégica. Este anteproyecto plantea el diseño de un modelo de Deep Learning basado en redes LSTM para pronosticar el consumo energético hacia el año 2030, integrando 15 referentes antecedentes en tres niveles territoriales (5 locales, 5 nacionales y 5 internacionales).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase border-b border-slate-800 pb-1">
                      2. Diagnóstico del Problema y Cifras Oficiales
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">PUE Actual</span>
                        <strong className="text-base text-amber-400">1.85</strong>
                      </div>
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">Ahorro 2026-2030</span>
                        <strong className="text-base text-emerald-400">12,921 MWh</strong>
                      </div>
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">Reducción en 2030</span>
                        <strong className="text-base text-emerald-400">22.1%</strong>
                      </div>
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">Ahorro OPEX</span>
                        <strong className="text-base text-emerald-400">$2.49 M USD</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase border-b border-slate-800 pb-1">
                      3. Ecuaciones Cuantitativas Evaluadas (Sección 6.5)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-200 block mb-1">RMSE = √( (1/N) Σ (Y_i - Ŷ_i)² )</strong>
                        <span className="text-emerald-400">LSTM: 49.14 kWh | GRU: 57.44 kWh</span>
                      </div>
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-200 block mb-1">MAE = (1/N) Σ |Y_i - Ŷ_i|</strong>
                        <span className="text-emerald-400">LSTM: 38.49 kWh | GRU: 45.79 kWh</span>
                      </div>
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-200 block mb-1">MAPE = (100%/N) Σ |(Y_i - Ŷ_i)/Y_i|</strong>
                        <span className="text-emerald-400">LSTM: 3.21% | GRU: 3.82%</span>
                      </div>
                      <div className="p-3 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-200 block mb-1">PUE = E_Total / E_IT</strong>
                        <span className="text-emerald-400">Convergencia hacia 1.38 (Tier IV)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase border-b border-slate-800 pb-1">
                      4. Anexos de Trazabilidad y Simulación (Anexo A)
                    </h4>
                    <p className="text-slate-300">
                      - <strong>A.1 Código fuente algorítmico:</strong> Script de Python 3.12 (<code>validacionproyecto.py</code>).<br />
                      - <strong>A.2 Matriz de telemetría histórica:</strong> Dataset sintético (<code>telemetria_data_center_2025.csv</code> con 8.760 registros horarios).<br />
                      - <strong>A.3 Matriz de proyección:</strong> Dataset quinquenal (<code>proyeccion_energetica_2026_2030.csv</code>).
                    </p>
                  </div>
                </div>
              ) : (
                /* Guía Actividad ACA Content */
                <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Corporación Unificada Nacional de Educación Superior (CUN) - Educación Virtual
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-100">
                      Actividades de Aprendizaje de la Semana No 3, 4, 5 y 6 (Guía Oficial)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Nombre de la actividad: Diseño y elaboración de dos pruebas de software y tres métricas de calidad.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase border-b border-slate-800 pb-1">
                      Estructura de Pasos Exigidos en la Guía
                    </h4>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-100">Paso 1:</strong> Revisión de conceptos de testing de software, SQA y tipos de pruebas (funcionales, seguridad, usabilidad, rendimiento).
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-100">Paso 2:</strong> Selección del sistema de información o software de proyectos ya realizados / GitHub.
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-100">Paso 3 y 4:</strong> Diseño técnico de 2 pruebas de software diferentes con requerimientos, escenarios, 2 casos de prueba (IEEE 829), entradas, resultados esperados y simulados.
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-100">Paso 5:</strong> Formulación y cálculo de 3 métricas de calidad del software (nombre, objetivo, fórmula, unidad, resultado e interpretación).
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-100">Paso 6:</strong> Análisis crítico (fallos encontrados, matriz de riesgos, recomendaciones de mejora).
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                        <strong className="text-slate-100">Paso 7:</strong> Informe final bajo normas APA 7.0 con portada, introducción, desarrollo, video pitch de máx. 5 min en YouTube, repositorio, capturas, conclusiones y referencias.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
