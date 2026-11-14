import React from 'react';
import { Download } from 'lucide-react';
import {
  proyeccionesQuinquenales,
  variablesOperacionales,
} from '../data/anteproyectoData';
import {
  ConsumoAnualBarChart,
  PueEvolutionLineChart,
  ModelMetricsComparisonChart,
  Telemetry24hChart,
} from './ProjectCharts';

export const ProjectionsTab: React.FC = () => {
  const handleDownloadProyeccionCsv = () => {
    const csvHeader =
      'anio,consumo_bau_mwh,consumo_opt_mwh,ahorro_anual_mwh,reduccion_porcentual,pue_inercial,pue_predictivo_ia,opex_acumulado_usd,co2_evitado_toneladas\n';
    const csvRows = proyeccionesQuinquenales
      .map(
        (p) =>
          `${p.year},${p.bauMWh},${p.optMWh},${p.savingsMWh},${p.savingsPct.toFixed(2)},${p.pueInertial},${p.pueOptimized},${p.opexAccumulatedUSD},${p.co2AvoidedTons}`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'proyeccion_energetica_2026_2030.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTelemetryCsv = () => {
    const link = document.createElement('a');
    link.href = '/data/telemetria_data_center_2025.csv';
    link.setAttribute('download', 'telemetria_data_center_2025.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Visualización Cuantitativa · Figuras 2, 3 y Telemetría SNMP
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            Gráficas Oficiales y Proyecciones Quinquenales (2026–2030)
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadProyeccionCsv}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>CSV Proyección (Anexo A.3)</span>
          </button>
          <button
            onClick={handleDownloadTelemetryCsv}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>CSV Telemetría 2025 (8,760 reg)</span>
          </button>
        </div>
      </div>

      {/* Figura 2 */}
      <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
        <ConsumoAnualBarChart />
      </section>

      {/* Figura 3 */}
      <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
        <PueEvolutionLineChart />
      </section>

      {/* Comparativa LSTM vs GRU */}
      <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
        <ModelMetricsComparisonChart />
      </section>

      {/* Telemetría SNMP 24h */}
      <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
        <Telemetry24hChart />
      </section>

      {/* Consolidado Quinquenal Tabular */}
      <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-base font-semibold text-slate-100">
          Tabla Consolidada de Proyección Quinquenal (2026–2030)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-3 text-left">Año</th>
                <th className="py-3 px-3 text-right">Consumo BAU (MWh)</th>
                <th className="py-3 px-3 text-right">Optimizado IA (MWh)</th>
                <th className="py-3 px-3 text-right">Ahorro (MWh)</th>
                <th className="py-3 px-3 text-right">% Reducción</th>
                <th className="py-3 px-3 text-right">PUE Inercial</th>
                <th className="py-3 px-3 text-right">PUE IA Meta</th>
                <th className="py-3 px-3 text-right">OPEX Acumulado (USD)</th>
                <th className="py-3 px-3 text-right">CO₂ Evitado (t)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-mono">
              {proyeccionesQuinquenales.map((p) => (
                <tr key={p.year} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-100 text-left">
                    {p.year}
                  </td>
                  <td className="py-2.5 px-3 text-right text-orange-400">
                    {p.bauMWh.toLocaleString('es-CO')}
                  </td>
                  <td className="py-2.5 px-3 text-right text-indigo-300 font-semibold">
                    {p.optMWh.toLocaleString('es-CO')}
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">
                    {p.savingsMWh.toLocaleString('es-CO')}
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-300">
                    {p.savingsPct.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400">
                    {p.pueInertial.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">
                    {p.pueOptimized.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-200">
                    ${p.opexAccumulatedUSD.toLocaleString('en-US')}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300">
                    {p.co2AvoidedTons.toLocaleString('es-CO')}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-800/30 font-semibold text-slate-100 border-t border-slate-700">
                <td className="py-3 px-3 font-sans text-left">Total / Meta</td>
                <td className="py-3 px-3 text-right text-orange-400">64,408</td>
                <td className="py-3 px-3 text-right text-indigo-300">51,490</td>
                <td className="py-3 px-3 text-right text-emerald-400">12,921</td>
                <td className="py-3 px-3 text-right text-emerald-300">22.1% (2030)</td>
                <td className="py-3 px-3 text-right text-slate-400">1.86 prom.</td>
                <td className="py-3 px-3 text-right text-emerald-400">1.38 final</td>
                <td className="py-3 px-3 text-right text-emerald-300">$2,490,000</td>
                <td className="py-3 px-3 text-right text-emerald-400">1,628.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Correlaciones de Variables (Tabla 1 resumida) */}
      <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-base font-semibold text-slate-100">
          Correlación Estadística de Variables Operacionales con el Consumo (Tabla 1)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {variablesOperacionales.map((v) => (
            <div
              key={v.code}
              className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-slate-100">{v.name}</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  r = +{v.correlationWithPower.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {v.code} · {v.type} · Unidad: {v.unit}
              </p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${v.correlationWithPower * 100}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <p className="text-[11px] font-mono text-slate-400 pt-1">
                Rango típico: {v.minTypical}–{v.maxTypical} {v.unit} (Media: {v.meanTypical})
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
