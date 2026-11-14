import React, { useState } from 'react';
import { Copy, CheckCircle2, Download, ExternalLink } from 'lucide-react';
import {
  metadataAnteproyecto,
  antecedentes15Referentes,
  proyeccionesQuinquenales,
  variablesOperacionales,
  ecuacionesEvaluacion,
  cronogramaActividades,
  arbolDeProblemas,
  alternativasSolucion,
} from '../data/anteproyectoData';

interface ProjectChaptersTabProps {
  onCopyMarkdown: () => void;
  copiedMarkdown: boolean;
  onExportZip: () => void;
  isExportingZip: boolean;
}

type ChapterId =
  | '01-intro'
  | '02-problema'
  | '03-objetivos'
  | '04-justificacion'
  | '05-alcance'
  | '06-metodologia'
  | '07-cronograma'
  | '08-marco'
  | '09-arbol'
  | '10-alternativas'
  | '11-conclusiones'
  | '12-referencias';

export const ProjectChaptersTab: React.FC<ProjectChaptersTabProps> = ({
  onCopyMarkdown,
  copiedMarkdown,
  onExportZip,
  isExportingZip,
}) => {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('01-intro');
  const [refFilter, setRefFilter] = useState<'all' | 'Local' | 'Nacional' | 'Internacional'>('all');

  const chapters: { id: ChapterId; num: string; title: string }[] = [
    { id: '01-intro', num: '1.', title: 'Introducción y Antecedentes (15)' },
    { id: '02-problema', num: '2.', title: 'Planteamiento del Problema' },
    { id: '03-objetivos', num: '3.', title: 'Objetivos (General y Específicos)' },
    { id: '04-justificacion', num: '4.', title: 'Justificación del Proyecto' },
    { id: '05-alcance', num: '5.', title: 'Alcance del Proyecto Aplicado' },
    { id: '06-metodologia', num: '6.', title: 'Metodología, Variables y Ecuaciones' },
    { id: '07-cronograma', num: '7.', title: 'Cronograma de Actividades (Tabla 2)' },
    { id: '08-marco', num: '8.', title: 'Marco Teórico y Estado del Arte' },
    { id: '09-arbol', num: '9.', title: 'Situación de Caso y Árbol de Problemas' },
    { id: '10-alternativas', num: '10.', title: 'Alternativas y Estrategia de Solución' },
    { id: '11-conclusiones', num: '11.', title: 'Conclusiones y Recomendaciones' },
    { id: '12-referencias', num: '12.', title: 'Referencias APA 7 y Anexos' },
  ];

  const filteredRefs =
    refFilter === 'all'
      ? antecedentes15Referentes
      : antecedentes15Referentes.filter((r) => r.territorialLevel.includes(refFilter));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Tabla de Contenido Completa · Normas CUN / APA 7.ª Edición
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            Apartes del Proyecto (Capítulos 1 al 12 y Anexos)
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCopyMarkdown}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors whitespace-nowrap"
          >
            {copiedMarkdown ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Texto APA copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar APA 7</span>
              </>
            )}
          </button>

          <button
            onClick={onExportZip}
            disabled={isExportingZip}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors whitespace-nowrap disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingZip ? 'Exportando...' : 'Descargar Paquete ZIP'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Clean Reader Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Chapter Index */}
        <aside className="lg:col-span-4 xl:col-span-3 rounded-xl bg-slate-900/60 border border-slate-800 p-2 lg:sticky lg:top-20">
          <p className="px-3 py-2 text-xs font-semibold text-slate-400">
            Índice de Apartes Oficiales
          </p>
          <nav className="space-y-0.5">
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-baseline gap-2 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="font-mono text-[11px] shrink-0 w-5">{ch.num}</span>
                  <span className="truncate">{ch.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content Pane */}
        <article className="lg:col-span-8 xl:col-span-9 rounded-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* 1. INTRODUCCIÓN */}
          {activeChapter === '01-intro' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-100">1. Introducción</h2>
                <div className="mt-3 space-y-3 text-justify">
                  <p>
                    En los últimos años, el crecimiento de los servicios digitales, el uso de la computación en la nube y la incorporación de herramientas de inteligencia artificial han aumentado considerablemente la cantidad de información que se procesa y almacena a nivel mundial. Este avance ha generado una mayor demanda de recursos tecnológicos y, especialmente, de energía eléctrica para mantener en funcionamiento la infraestructura que soporta estos servicios. En este contexto, desde la Ingeniería de Sistemas surge la necesidad de buscar alternativas que permitan mejorar el aprovechamiento de los recursos tecnológicos y reducir el impacto ambiental que generan los centros de datos, promoviendo conceptos como <em>Green Computing</em>.
                  </p>
                  <p>
                    En Colombia, Bogotá se ha convertido en un punto importante para la operación de centros de datos y la prestación de servicios digitales. El presente anteproyecto plantea el diseño, implementación y evaluación de un modelo de analítica predictiva basado en técnicas de aprendizaje profundo (<em>Deep Learning</em>), orientado a pronosticar el consumo energético de los centros de datos ubicados en Bogotá hacia el año 2030, analizando CPU, memoria RAM, tráfico de red y temperatura ambiental para apoyar la optimización del indicador PUE.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-100">
                    1.1 Antecedentes locales, nacionales e internacionales (15 referentes)
                  </h3>
                  <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    {(['all', 'Local', 'Nacional', 'Internacional'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setRefFilter(level)}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          refFilter === level
                            ? 'bg-slate-800 text-slate-100 font-medium'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {level === 'all' ? 'Todos (15)' : level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {filteredRefs.map((r) => (
                    <div key={r.id} className="py-3 space-y-1">
                      <p className="text-xs text-slate-400">
                        {r.number}. {r.territorialLevel} · <strong className="text-slate-200">{r.citation}</strong>
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300">{r.coreContribution}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <h3 className="text-base font-semibold text-slate-100">
                  1.2 Retos, desafíos y tendencias tecnológicas
                </h3>
                <p className="text-justify">
                  El paso hacia soluciones basadas en <strong>AIOps</strong> permite tomar decisiones anticipadas frente a la variación constante de las cargas de trabajo (como el entrenamiento de modelos de IA). En Bogotá, las condiciones de temperatura ambiental permiten implementar estrategias de <em>free-cooling</em>, aprovechando el aire exterior para apoyar el enfriamiento y reducir el uso de refrigeración mecánica.
                </p>
              </div>
            </div>
          )}

          {/* 2. PLANTEAMIENTO DEL PROBLEMA */}
          {activeChapter === '02-problema' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">2. Planteamiento del Problema</h2>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-100">
                  2.1 Diagnóstico de la situación actual
                </h3>
                <p className="text-justify">
                  Los centros de datos corporativos en la Sabana de Bogotá operan con configuraciones energéticas preestablecidas que no responden de forma eficiente a cambios en la demanda de cómputo o temperatura. El indicador <strong>PUE promedio es de 1.85</strong>: por cada vatio usado directamente por servidores, se requieren 0.85 vatios adicionales para refrigeración, iluminación y transformación eléctrica. Cerca del <strong>40%</strong> corresponde a los sistemas de climatización HVAC, que suelen reaccionar después de presentarse aumentos térmicos.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                <h3 className="text-base font-semibold text-slate-100">
                  2.2 Predicción, pronóstico o formulación (Escenario BAU)
                </h3>
                <p className="text-justify">
                  Bajo el escenario <em>Business As Usual (BAU)</em>, el consumo energético anual por instalación pasaría de <strong>9,590 MWh en 2026 a 16,739 MWh en 2030</strong>, con un PUE aumentando hacia <strong>1.90</strong>. Económicamente, se proyectan sobrecostos operativos acumulados de hasta <strong>1.74 millones de USD</strong> por instalación hacia 2030 (y $2.49 millones USD en afectación global acumulada en el árbol de problemas) y emisiones superiores a <strong>2,300 t CO₂eq</strong>.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-base font-semibold text-slate-100">
                  2.3 Pregunta de investigación general y preguntas específicas
                </h3>
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                  <p className="text-xs text-emerald-400 font-semibold mb-1">Pregunta General</p>
                  <p className="text-slate-100 font-medium">
                    ¿De qué manera la implementación de un modelo predictivo basado en redes neuronales para el análisis de series temporales permite estimar el consumo energético de los centros de datos de Bogotá y contribuir a la optimización de su eficiencia operativa hacia el año 2030?
                  </p>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>¿Cuáles son las variables cuantitativas y los indicadores históricos de telemetría que tienen mayor relación con el consumo de energía en los centros de datos de Bogotá?</li>
                  <li>¿Cuál de las arquitecturas de aprendizaje profundo, LSTM o GRU, presenta un menor margen de error al realizar predicciones del consumo energético a mediano y largo plazo?</li>
                  <li>¿Cómo se puede estructurar un proceso metodológico para recopilar, limpiar y preparar los datos relacionados con el funcionamiento y la carga computacional de los centros de datos?</li>
                  <li>¿Qué impacto podría tener la aplicación del modelo predictivo en la optimización del indicador de eficiencia energética PUE durante el periodo comprendido entre 2026 y 2030?</li>
                  <li>¿Qué estrategias de gestión energética, distribución de cargas y control de los recursos pueden plantearse a partir de los resultados obtenidos por el modelo predictivo?</li>
                </ol>
              </div>
            </div>
          )}

          {/* 3. OBJETIVOS */}
          {activeChapter === '03-objetivos' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">3. Objetivos</h2>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-100">3.1 Objetivo general</h3>
                <p className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-100">
                  {metadataAnteproyecto.generalObjective}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-base font-semibold text-slate-100">3.2 Objetivos específicos</h3>
                <ol className="space-y-3">
                  {metadataAnteproyecto.specificObjectives.map((obj, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="font-mono text-xs font-bold text-emerald-400 mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* 4. JUSTIFICACIÓN */}
          {activeChapter === '04-justificacion' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">4. Justificación del Proyecto</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <h3 className="text-sm font-semibold text-slate-100">Justificación teórica</h3>
                  <p className="text-xs text-slate-300">
                    Profundiza en <em>Green Computing</em>, IA y analítica predictiva aplicando redes neuronales recurrentes LSTM y GRU sobre series de tiempo de consumo energético.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <h3 className="text-sm font-semibold text-slate-100">Justificación metodológica</h3>
                  <p className="text-xs text-slate-300">
                    Propone un proceso replicable de ingesta, limpieza, selección de variables, entrenamiento y evaluación con métricas estadísticas de precisión.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <h3 className="text-sm font-semibold text-slate-100">Justificación práctica y cuantitativa</h3>
                  <p className="text-xs text-slate-300">
                    Reducción del <strong>22.1%</strong> en consumo hacia 2030, ahorro acumulado de <strong>12,921 MWh</strong>, beneficio de <strong>$2.49M USD</strong> y reducción de <strong>1,628 t CO₂eq</strong>.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 overflow-x-auto">
                <h3 className="text-sm font-semibold text-slate-100 mb-3">
                  Resumen de Datos de la Figura 2 y Figura 3 (2026–2030)
                </h3>
                <table className="w-full text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-sans">
                      <th className="py-2 px-3 text-left">Año</th>
                      <th className="py-2 px-3 text-right">BAU (MWh)</th>
                      <th className="py-2 px-3 text-right">Optimizado IA (MWh)</th>
                      <th className="py-2 px-3 text-right">Ahorro (MWh)</th>
                      <th className="py-2 px-3 text-right">PUE Inercial</th>
                      <th className="py-2 px-3 text-right">PUE IA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {proyeccionesQuinquenales.map((p) => (
                      <tr key={p.year}>
                        <td className="py-2 px-3 font-sans font-semibold text-slate-100">{p.year}</td>
                        <td className="py-2 px-3 text-right text-orange-400">{p.bauMWh.toLocaleString('es-CO')}</td>
                        <td className="py-2 px-3 text-right text-indigo-300">{p.optMWh.toLocaleString('es-CO')}</td>
                        <td className="py-2 px-3 text-right text-emerald-400">{p.savingsMWh.toLocaleString('es-CO')}</td>
                        <td className="py-2 px-3 text-right text-slate-400">{p.pueInertial.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right text-emerald-400">{p.pueOptimized.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. ALCANCE */}
          {activeChapter === '05-alcance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">5. Alcance del Proyecto Aplicado</h2>
              <p className="text-justify">
                Delimitación formal bajo la relación causal objetiva entre carga de cómputo y consumo de climatización (Arias-Castrillón, 2020; Elizondo Cortés & González Videgaray, 2021; Hernández Sampieri et al., 2014).
              </p>
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">Delimitación espacial</h3>
                  <p className="text-xs text-slate-300">
                    Centros de datos corporativos e industriales ubicados en Bogotá y su zona metropolitana con categorías <strong>Tier III y Tier IV</strong>, incorporando la temperatura ambiental regional.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">Delimitación temporal</h3>
                  <p className="text-xs text-slate-300">
                    Periodo histórico de análisis base correspondiente al año <strong>2025</strong> (entrenamiento) y proyecciones/simulaciones para el periodo <strong>2026–2030</strong>.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">Delimitación técnica</h3>
                  <p className="text-xs text-slate-300">
                    CPU, memoria RAM, almacenamiento, red, PDU y HVAC. No contempla modificación física directa de los sistemas eléctricos o de refrigeración, sino una solución analítica de apoyo a la toma de decisiones.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. METODOLOGÍA */}
          {activeChapter === '06-metodologia' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">6. Metodología</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <h3 className="text-sm font-semibold text-slate-100">6.1 – 6.2 Tipo, Nivel y Diseño</h3>
                  <p>Enfoque cuantitativo, alcance explicativo y nivel predictivo. Diseño no experimental, longitudinal y prospectivo con triangulación: a) Análisis estadístico, b) Modelos LSTM/GRU, c) Simulación Monte Carlo 2026–2030.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <h3 className="text-sm font-semibold text-slate-100">6.3 Universo, Población y Muestra</h3>
                  <p><strong>Universo:</strong> Data centers en Colombia. <strong>Población:</strong> 25 data centers Tier III/IV en la Sabana de Bogotá. <strong>Muestra:</strong> 5 instalaciones con telemetría SNMP v3 (cada 5 min, <strong>8,760 registros horarios anuales</strong>).</p>
                </div>
              </div>

              <div className="pt-2 overflow-x-auto">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  6.4 Tabla 1: Matriz de operacionalización de variables
                </h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3 text-left">Variable</th>
                      <th className="py-2 px-3 text-left">Tipo</th>
                      <th className="py-2 px-3 text-left">Unidad</th>
                      <th className="py-2 px-3 text-left">Definición Operacional</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {variablesOperacionales.map((v) => (
                      <tr key={v.code}>
                        <td className="py-2 px-3 font-medium text-slate-100">
                          {v.name} <span className="font-mono text-emerald-400 text-[11px]">({v.code})</span>
                        </td>
                        <td className="py-2 px-3 text-slate-300">{v.type}</td>
                        <td className="py-2 px-3 font-mono text-slate-300">{v.unit}</td>
                        <td className="py-2 px-3 text-slate-400">{v.operationalDefinition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-sm font-semibold text-slate-100">
                  6.5 Ecuaciones de evaluación cuantitativa del modelo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ecuacionesEvaluacion.map((eq) => (
                    <div key={eq.id} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-semibold text-slate-100 block">{eq.name}</span>
                      <code className="block text-[11px] font-mono text-emerald-400 break-all">
                        {eq.formulaLatex}
                      </code>
                      <p className="text-xs text-slate-400">{eq.definition}</p>
                      <p className="text-xs font-mono text-slate-200">
                        LSTM: <strong className="text-emerald-400">{eq.obtainedValueLSTM} {eq.unit}</strong> · GRU: {eq.obtainedValueGRU} {eq.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  6.6 Técnicas e instrumentos de recolección de datos
                </h3>
                <p className="text-xs text-slate-300">
                  Extracción automatizada mediante scripts de Python conectados a agentes SNMP v3 e interfaces API/REST. Limpieza, imputación mediante interpolación spline, escalado MinMax y entrenamiento con <strong>PyTorch y Scikit-Learn en Python 3.12</strong>.
                </p>
              </div>
            </div>
          )}

          {/* 7. CRONOGRAMA */}
          {activeChapter === '07-cronograma' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">
                7. Cronograma de Actividades (Tabla 2 · 16 Semanas)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3 text-left">Fase / Actividad</th>
                      <th className="py-2.5 px-3 text-left">Descripción de la Tarea</th>
                      <th className="py-2.5 px-3 text-left">Semanas</th>
                      <th className="py-2.5 px-3 text-left">Entregable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {cronogramaActividades.map((c) => (
                      <tr key={c.activityCode}>
                        <td className="py-2.5 px-3 font-medium text-slate-200">{c.phase}</td>
                        <td className="py-2.5 px-3 text-slate-300">
                          <span className="font-mono text-emerald-400 mr-1.5">{c.activityCode}</span>
                          {c.taskDescription}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-300 whitespace-nowrap">{c.weeks}</td>
                        <td className="py-2.5 px-3 text-slate-300">{c.deliverable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. MARCO TEÓRICO */}
          {activeChapter === '08-marco' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-100">
                8. Marco Teórico y Estado del Arte
              </h2>
              <h3 className="text-base font-semibold text-slate-100">
                8.1 Fundamentos teóricos en Green Computing y redes LSTM
              </h3>
              <p className="text-justify">
                La investigación se apoya en los principios del <strong>Green Computing</strong> (uso responsable y eficiente de recursos informáticos para disminuir consumo eléctrico e impacto ambiental) y en técnicas de aprendizaje profundo mediante redes neuronales recurrentes <strong>LSTM (Long Short-Term Memory)</strong>.
              </p>
              <p className="text-justify">
                A diferencia de las redes tradicionales, las LSTM cuentan con mecanismos internos de compuertas que permiten conservar, actualizar o descartar información secuencial:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li><strong>Puerta de olvido (<em>forget gate</em>):</strong> Filtra información irrelevante de secuencias anteriores.</li>
                <li><strong>Puerta de entrada (<em>input gate</em>):</strong> Actualiza el estado de celda con nueva telemetría operativa y térmica.</li>
                <li><strong>Puerta de salida (<em>output gate</em>):</strong> Genera la estimación de consumo eléctrico futuro respetando ciclos diarios y semanales.</li>
              </ul>
              <p className="text-xs text-slate-400 pt-2">
                Estructuración metodológica del estado del arte según Gómez Vargas et al. (2015) y Londoño Palacio et al. (2014).
              </p>
            </div>
          )}

          {/* 9. ÁRBOL DE PROBLEMAS */}
          {activeChapter === '09-arbol' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">
                9. Descripción de la Situación de Caso y Árbol de Problemas
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-2">
                    Efectos e Impactos (Figura 1)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {arbolDeProblemas.directEffects.map((e) => (
                      <div key={e.id} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                        <span className="text-xs font-semibold text-red-300 block">{e.title}</span>
                        <span className="text-sm font-mono font-bold text-slate-100 block">{e.metric}</span>
                        <p className="text-xs text-slate-400">{e.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-950/80 border border-amber-500/40">
                  <p className="text-xs font-semibold text-amber-400 mb-1">Problema Central</p>
                  <p className="text-sm font-semibold text-slate-100">
                    {arbolDeProblemas.centralProblem.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-emerald-400 mb-2">Causas Raíz</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {arbolDeProblemas.rootCauses.map((c) => (
                      <div key={c.id} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                        <span className="text-xs font-semibold text-emerald-300 block">{c.title}</span>
                        <span className="text-xs font-medium text-slate-200 block">{c.subtitle}</span>
                        <p className="text-xs text-slate-400">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">
                    9.2 Desglose analítico del problema
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">{arbolDeProblemas.analyticalBreakdown}</p>
                </div>
              </div>
            </div>
          )}

          {/* 10. ALTERNATIVAS */}
          {activeChapter === '10-alternativas' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-100">
                10. Descripción de Alternativas y Estrategias de Solución
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alternativasSolucion.map((alt) => (
                  <div
                    key={alt.id}
                    className={`p-5 rounded-xl border space-y-3 ${
                      alt.selected
                        ? 'bg-slate-950/70 border-emerald-500/50'
                        : 'bg-slate-950/40 border-slate-800'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-100">{alt.title}</h3>
                      <span
                        className={`text-xs font-semibold shrink-0 ${
                          alt.selected ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {alt.selected ? 'Seleccionada' : 'Descartada'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{alt.description}</p>
                    <div className="text-xs space-y-1 pt-2 border-t border-slate-800/80">
                      <p><strong className="text-slate-200">CAPEX:</strong> {alt.capex}</p>
                      <p><strong className="text-slate-200">OPEX:</strong> {alt.opex}</p>
                      <p><strong className="text-slate-200">ROI:</strong> {alt.roi}</p>
                    </div>
                    <p className="text-xs text-slate-400 pt-1">{alt.justification}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11. CONCLUSIONES */}
          {activeChapter === '11-conclusiones' && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-slate-100">
                11. Conclusiones y Recomendaciones Proyectadas
              </h2>

              <div className="space-y-4 text-justify">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Hallazgo técnico</h3>
                  <p>
                    Las redes LSTM permiten anticipar variaciones de la demanda eléctrica y mantener el indicador PUE en un valor aproximado de <strong>1.38 para el año 2030</strong>, frente a <strong>1.90</strong> en el escenario tendencial BAU.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Impacto energético</h3>
                  <p>
                    Ahorro energético acumulado de <strong>12,921 MWh</strong> por instalación en el periodo 2026–2030, pasando en 2030 de 16,739 MWh a 13,046 MWh (reducción aproximada del <strong>22.1%</strong>).
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Impacto económico y ambiental</h3>
                  <p>
                    Ahorro operativo acumulado de aproximadamente <strong>1.74 millones de USD</strong> por instalación hasta 2030 ($2.49 millones USD en valoración global del proyecto) y mitigación cercana a <strong>1,628 toneladas de CO₂eq</strong>.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-100">
                    11.2 Recomendaciones y trabajos futuros
                  </h3>
                  <p>
                    Avanzar en la estandarización de las APIs de telemetría SNMP v3 y evaluar en futuras investigaciones la hibridación de las redes LSTM con algoritmos de <strong>Aprendizaje por Refuerzo Profundo (DRL)</strong> para la automatización autónoma de válvulas de climatización en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 12. REFERENCIAS Y ANEXOS */}
          {activeChapter === '12-referencias' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-100">
                  12. Referencias Bibliográficas (Normas APA 7.ª Edición)
                </h2>
                <div className="mt-4 divide-y divide-slate-800/70">
                  {antecedentes15Referentes.map((ref) => (
                    <div key={ref.id} className="py-3 text-xs space-y-1">
                      <p className="font-apa text-slate-200 leading-relaxed">{ref.apaFullCitation}</p>
                      {ref.link && (
                        <a
                          href={ref.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-emerald-400 hover:text-emerald-300 break-all"
                        >
                          <span>{ref.link}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                <h3 className="text-base font-semibold text-slate-100">
                  Anexo A. Repositorio Digital de Trazabilidad y Simulación
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono">
                  <li>A.1. Código fuente algorítmico: validacionproyecto.py (Python 3.12).</li>
                  <li>A.2. Matriz de telemetría histórica: telemetria_data_center_2025.csv (8,760 registros horarios).</li>
                  <li>A.3. Matriz de proyección: proyeccion_energetica_2026_2030.csv (12,921 MWh).</li>
                </ul>
                <p className="pt-2 text-slate-400">
                  Repositorio en la nube institucional para auditoría:{' '}
                  <a
                    href={metadataAnteproyecto.driveAuditLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 underline font-mono break-all"
                  >
                    {metadataAnteproyecto.driveAuditLink}
                  </a>
                </p>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};
