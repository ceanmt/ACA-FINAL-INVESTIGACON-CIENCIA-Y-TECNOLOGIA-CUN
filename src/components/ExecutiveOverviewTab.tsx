import React from 'react';
import { ArrowRight, Sliders, BookOpen, Terminal } from 'lucide-react';
import { metadataAnteproyecto } from '../data/anteproyectoData';
import { ConsumoAnualBarChart, PueEvolutionLineChart } from './ProjectCharts';

interface ExecutiveOverviewTabProps {
  onNavigate: (tab: string) => void;
}

export const ExecutiveOverviewTab: React.FC<ExecutiveOverviewTabProps> = ({
  onNavigate,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Clean Editorial Hero */}
      <section className="space-y-4 border-b border-slate-800/80 pb-8">
        <p className="text-xs font-medium text-slate-400">
          {metadataAnteproyecto.institution} · {metadataAnteproyecto.program} · {metadataAnteproyecto.city}
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight max-w-4xl leading-snug text-balance">
          {metadataAnteproyecto.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Modelo de analítica predictiva basado en redes neuronales recurrentes (LSTM) que procesa telemetría SNMP en tiempo real con 6 horas de anticipación para optimizar la climatización HVAC y reducir el indicador PUE en centros de datos Tier III y Tier IV de Bogotá hacia el año 2030.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('simulacion')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <Sliders className="w-4 h-4" />
            <span>Simulación Específica</span>
          </button>

          <button
            onClick={() => onNavigate('apartes')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-medium border border-slate-800 transition-colors whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Apartes del Proyecto (1–12)</span>
          </button>

          <button
            onClick={() => onNavigate('python')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-medium border border-slate-800 transition-colors whitespace-nowrap"
          >
            <Terminal className="w-4 h-4 text-slate-400" />
            <span>Validación Python 3.12</span>
          </button>
        </div>
      </section>

      {/* 4-Column KPI Strip (Single-level hairline surface, tabular numerals) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Meta PUE 2030</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">1.38</span>
            <span className="text-xs font-mono text-slate-500">vs 1.90 BAU</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Diagnóstico inicial 1.85 · Norma CNDCP ≤ 1.40
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Ahorro Acumulado (2026–2030)</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-100">12,921</span>
            <span className="text-xs font-mono text-slate-400">MWh</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Reducción del 22.1% al año 2030 (13,046 MWh)
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Beneficio Económico OPEX</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-100">$2.49M</span>
            <span className="text-xs font-mono text-slate-400">USD</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Retorno de inversión (ROI) &lt; 8 meses
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <p className="text-xs text-slate-400">Emisiones Evitadas</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">1,628</span>
            <span className="text-xs font-mono text-slate-400">t CO₂eq</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Muestra: 5 Data Centers · 8,760 reg/año
          </p>
        </div>
      </section>

      {/* Primary Charts Showcase (Figura 2 & Figura 3 with Exact Values) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">
            Resultados Prospectivos Principales (2026–2030)
          </h2>
          <button
            onClick={() => onNavigate('graficas')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Ver todas las gráficas y tablas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <ConsumoAnualBarChart compact />
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <PueEvolutionLineChart compact />
          </div>
        </div>
      </section>

      {/* Concise Ficha del Proyecto (Unboxed hairline grid) */}
      <section className="pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div>
          <span className="text-slate-400 block mb-1">Objetivo General</span>
          <p className="text-slate-200 leading-relaxed">
            {metadataAnteproyecto.generalObjective}
          </p>
        </div>
        <div>
          <span className="text-slate-400 block mb-1">Delimitación y Muestra</span>
          <p className="text-slate-200 leading-relaxed">
            Población de 25 data centers Tier III y Tier IV en la Sabana de Bogotá; muestra de 5 instalaciones con monitoreo SNMP v3 (8,760 registros horarios de 2025) y proyección 2026–2030.
          </p>
        </div>
        <div>
          <span className="text-slate-400 block mb-1">Arquitectura Seleccionada</span>
          <p className="text-slate-200 leading-relaxed">
            Capa analítica en Python 3.12 (PyTorch / Scikit-Learn) con redes neuronales recurrentes LSTM (MAPE 3.21% vs 3.82% en GRU) acoplada vía API al sistema DCIM para control de chillers.
          </p>
        </div>
      </section>
    </div>
  );
};
