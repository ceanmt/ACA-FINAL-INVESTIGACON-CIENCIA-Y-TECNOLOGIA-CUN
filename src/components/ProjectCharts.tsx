import React, { useState } from 'react';
import {
  proyeccionesQuinquenales,
  ecuacionesEvaluacion,
  muestraTelemetria24Horas,
} from '../data/anteproyectoData';

/* -------------------------------------------------------------------------- */
/* FIGURA 2: Consumo Eléctrico Anual 2026-2030 (BAU vs Optimizado IA)         */
/* -------------------------------------------------------------------------- */
export const ConsumoAnualBarChart: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(2030);

  const width = 760;
  const height = compact ? 310 : 360;
  const margin = { top: 36, right: 24, bottom: 56, left: 64 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const maxVal = 18000;
  const yTicks = [0, 3000, 6000, 9000, 12000, 15000, 18000];

  const yPos = (val: number) => margin.top + plotH - (val / maxVal) * plotH;
  const barH = (val: number) => (val / maxVal) * plotH;

  const selected =
    proyeccionesQuinquenales.find((p) => p.year === selectedYear) ??
    proyeccionesQuinquenales[4];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Figura 2 · Fuente: Modelo Sintético de Telemetría (Proyecto CUN 2026–2030)
          </p>
          <h3 className="text-base font-semibold text-slate-100 mt-0.5">
            Consumo Eléctrico Anual Proyectado (MWh): Inercial BAU vs. Optimizado IA
          </h3>
        </div>
        <div className="flex items-center gap-5 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-orange-500 inline-block" />
            Inercial / BAU
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-indigo-500 inline-block" />
            Optimizado (Modelo IA)
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[540px] h-auto select-none"
          role="img"
          aria-label="Gráfica comparativa de consumo eléctrico anual 2026-2030"
        >
          {/* Y-axis Gridlines and Labels */}
          {yTicks.map((tick) => {
            const y = yPos(tick);
            return (
              <g key={tick}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={width - margin.right}
                  y2={y}
                  stroke={tick === 0 ? '#334155' : '#1e293b'}
                  strokeWidth={tick === 0 ? 1.5 : 1}
                />
                <text
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {tick.toLocaleString('es-CO')}
                </text>
              </g>
            );
          })}

          {/* Y-axis unit label */}
          <text
            x={16}
            y={margin.top + plotH / 2}
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
            transform={`rotate(-90, 16, ${margin.top + plotH / 2})`}
          >
            Consumo Anual (MWh)
          </text>

          {/* Bars per year */}
          {proyeccionesQuinquenales.map((p, idx) => {
            const groupW = plotW / proyeccionesQuinquenales.length;
            const centerX = margin.left + groupW * idx + groupW / 2;
            const barWidth = 38;
            const gap = 8;

            const xBau = centerX - barWidth - gap / 2;
            const xOpt = centerX + gap / 2;

            const yBau = yPos(p.bauMWh);
            const hBau = barH(p.bauMWh);

            const yOpt = yPos(p.optMWh);
            const hOpt = barH(p.optMWh);

            const isSelected = selectedYear === p.year;

            return (
              <g
                key={p.year}
                onClick={() => setSelectedYear(p.year)}
                className="cursor-pointer"
              >
                {/* Subtle column highlight */}
                {isSelected && (
                  <rect
                    x={centerX - groupW * 0.44}
                    y={margin.top - 10}
                    width={groupW * 0.88}
                    height={plotH + 54}
                    rx={6}
                    fill="#1e293b"
                    opacity={0.35}
                  />
                )}

                {/* BAU Bar */}
                <rect
                  x={xBau}
                  y={yBau}
                  width={barWidth}
                  height={hBau}
                  rx={3}
                  fill="#ea580c"
                />
                <text
                  x={xBau + barWidth / 2}
                  y={yBau - 7}
                  textAnchor="middle"
                  fill="#fdba74"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {p.bauMWh.toLocaleString('es-CO')}
                </text>

                {/* Optimized IA Bar */}
                <rect
                  x={xOpt}
                  y={yOpt}
                  width={barWidth}
                  height={hOpt}
                  rx={3}
                  fill="#6366f1"
                />
                <text
                  x={xOpt + barWidth / 2}
                  y={yOpt - 7}
                  textAnchor="middle"
                  fill="#a5b4fc"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {p.optMWh.toLocaleString('es-CO')}
                </text>

                {/* Year label */}
                <text
                  x={centerX}
                  y={margin.top + plotH + 20}
                  textAnchor="middle"
                  fill={isSelected ? '#f8fafc' : '#cbd5e1'}
                  fontSize="12"
                  fontWeight={isSelected ? '700' : '600'}
                >
                  {p.year}
                </text>

                {/* Savings callout */}
                <text
                  x={centerX}
                  y={margin.top + plotH + 36}
                  textAnchor="middle"
                  fill="#34d399"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="JetBrains Mono, monospace"
                >
                  -{p.savingsMWh.toLocaleString('es-CO')} MWh ({p.savingsPct.toFixed(1)}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Contextual summary line for selected year */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div>
          Año seleccionado: <strong className="text-slate-100 tabular-nums">{selected.year}</strong>
          <span className="mx-2 text-slate-600">·</span>
          Ahorro anual: <strong className="text-emerald-400 font-mono">{selected.savingsMWh.toLocaleString('es-CO')} MWh</strong>
          <span className="mx-2 text-slate-600">·</span>
          Reducción: <strong className="text-emerald-400 font-mono">{selected.savingsPct.toFixed(1)}%</strong>
        </div>
        <div className="font-mono text-slate-300">
          OPEX acumulado: <strong className="text-slate-100">${selected.opexAccumulatedUSD.toLocaleString('en-US')} USD</strong>
          <span className="mx-2 text-slate-600">·</span>
          CO₂ evitado: <strong className="text-emerald-400">{selected.co2AvoidedTons.toLocaleString('es-CO')} t</strong>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* FIGURA 3: Curva de Evolución Interanual del Indicador PUE                  */
/* -------------------------------------------------------------------------- */
export const PueEvolutionLineChart: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const width = 760;
  const height = compact ? 300 : 340;
  const margin = { top: 30, right: 32, bottom: 44, left: 56 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;

  const minPue = 1.1;
  const maxPue = 2.0;
  const yTicks = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];

  const xPos = (idx: number) =>
    margin.left + 48 + (idx * (plotW - 96)) / (proyeccionesQuinquenales.length - 1);
  const yPos = (val: number) =>
    margin.top + ((maxPue - val) / (maxPue - minPue)) * plotH;

  const pathInercial = proyeccionesQuinquenales
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i)} ${yPos(p.pueInertial)}`)
    .join(' ');

  const pathOpt = proyeccionesQuinquenales
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i)} ${yPos(p.pueOptimized)}`)
    .join(' ');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Figura 3 · Fuente: Modelo de Simulación Prospectiva — Ingeniería de Sistemas CUN
          </p>
          <h3 className="text-base font-semibold text-slate-100 mt-0.5">
            Evolución Interanual del Indicador PUE Convergiendo hacia 1.38
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-orange-500 inline-block" />
            Inercial (Prom. ~1.86)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
            Predictivo IA (Meta ~1.38)
          </span>
          <span className="flex items-center gap-2 text-slate-400">
            <span className="w-3 border-b border-dashed border-slate-500 inline-block" />
            Límite Óptimo (1.20)
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[540px] h-auto select-none"
          role="img"
          aria-label="Curva de evolución interanual del indicador PUE 2026-2030"
        >
          {/* Y-axis ticks */}
          {yTicks.map((tick) => {
            const y = yPos(tick);
            return (
              <g key={tick}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={width - margin.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth={1}
                />
                <text
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {tick.toFixed(1)}
                </text>
              </g>
            );
          })}

          <text
            x={16}
            y={margin.top + plotH / 2}
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
            transform={`rotate(-90, 16, ${margin.top + plotH / 2})`}
          >
            Power Usage Effectiveness (PUE)
          </text>

          {/* Reference Lines */}
          <line
            x1={margin.left}
            y1={yPos(1.4)}
            x2={width - margin.right}
            y2={yPos(1.4)}
            stroke="#3b82f6"
            strokeWidth={1}
            strokeDasharray="4,4"
            opacity={0.7}
          />
          <text
            x={width - margin.right - 4}
            y={yPos(1.4) - 6}
            textAnchor="end"
            fill="#60a5fa"
            fontSize="10"
            fontWeight="500"
          >
            Norma CNDCP 2025 (1.40)
          </text>

          <line
            x1={margin.left}
            y1={yPos(1.3)}
            x2={width - margin.right}
            y2={yPos(1.3)}
            stroke="#06b6d4"
            strokeWidth={1}
            strokeDasharray="3,5"
            opacity={0.55}
          />
          <text
            x={width - margin.right - 4}
            y={yPos(1.3) - 6}
            textAnchor="end"
            fill="#22d3ee"
            fontSize="10"
            fontWeight="500"
          >
            Meta CNDCP 2030 (1.30)
          </text>

          <line
            x1={margin.left}
            y1={yPos(1.2)}
            x2={width - margin.right}
            y2={yPos(1.2)}
            stroke="#64748b"
            strokeWidth={1.25}
            strokeDasharray="6,4"
          />
          <text
            x={width - margin.right - 4}
            y={yPos(1.2) - 6}
            textAnchor="end"
            fill="#94a3b8"
            fontSize="10"
          >
            Límite Teórico Óptimo (1.20)
          </text>

          {/* Curves */}
          <path d={pathInercial} fill="none" stroke="#ea580c" strokeWidth={2.75} />
          <path d={pathOpt} fill="none" stroke="#10b981" strokeWidth={2.75} />

          {/* Data Points & Explicit Values */}
          {proyeccionesQuinquenales.map((p, i) => {
            const x = xPos(i);
            const yB = yPos(p.pueInertial);
            const yO = yPos(p.pueOptimized);

            return (
              <g key={p.year}>
                {/* Vertical Subtle Guide */}
                <line
                  x1={x}
                  y1={margin.top}
                  x2={x}
                  y2={margin.top + plotH}
                  stroke="#1e293b"
                  strokeWidth={1}
                  opacity={0.45}
                />

                {/* Inercial Point */}
                <circle cx={x} cy={yB} r={4.5} fill="#ea580c" stroke="#090d16" strokeWidth={1.5} />
                <text
                  x={x}
                  y={yB - 11}
                  textAnchor="middle"
                  fill="#fdba74"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {p.pueInertial.toFixed(2)}
                </text>

                {/* Optimized IA Point */}
                <rect
                  x={x - 4}
                  y={yO - 4}
                  width={8}
                  height={8}
                  rx={1.5}
                  fill="#10b981"
                  stroke="#090d16"
                  strokeWidth={1.5}
                />
                <text
                  x={x}
                  y={yO + 18}
                  textAnchor="middle"
                  fill="#34d399"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {p.pueOptimized.toFixed(2)}
                </text>

                {/* X-axis Year */}
                <text
                  x={x}
                  y={margin.top + plotH + 22}
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize="12"
                  fontWeight="600"
                >
                  {p.year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* GRÁFICA 3: Comparativa Cuantitativa LSTM vs GRU (Sección 6.5)              */
/* -------------------------------------------------------------------------- */
export const ModelMetricsComparisonChart: React.FC = () => {
  const errorMetrics = ecuacionesEvaluacion.filter((eq) => eq.id !== 'eq-pue');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Sección 6.5 · Evaluación Cuantitativa de Arquitecturas Recurrentes
          </p>
          <h3 className="text-base font-semibold text-slate-100 mt-0.5">
            Comparativa de Margen de Error: LSTM (Seleccionada) vs. GRU (Benchmark)
          </h3>
        </div>
        <div className="flex items-center gap-5 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" />
            LSTM (Menor Error)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-slate-500 inline-block" />
            GRU (Benchmark)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
        {errorMetrics.map((m) => {
          const maxScale = Math.max(m.obtainedValueLSTM, m.obtainedValueGRU) * 1.2;
          const pctLstm = (m.obtainedValueLSTM / maxScale) * 100;
          const pctGru = (m.obtainedValueGRU / maxScale) * 100;
          const diffPct = (((m.obtainedValueGRU - m.obtainedValueLSTM) / m.obtainedValueGRU) * 100).toFixed(1);

          return (
            <div
              key={m.id}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">{m.name}</span>
                  <span className="text-[11px] font-mono text-emerald-400">-{diffPct}% error</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{m.benchmarkGoal}</p>
              </div>

              <div className="space-y-2.5 pt-1">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">LSTM</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {m.obtainedValueLSTM} {m.unit}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pctLstm}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">GRU</span>
                    <span className="font-mono font-semibold text-slate-300">
                      {m.obtainedValueGRU} {m.unit}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pctGru}%` }}
                      className="h-full bg-slate-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* GRÁFICA 4: Telemetría Horaria SNMP 24h con Valores Explícitos              */
/* -------------------------------------------------------------------------- */
export const Telemetry24hChart: React.FC = () => {
  const [hoverHour, setHoverHour] = useState<number>(10);

  const width = 760;
  const height = 270;
  const margin = { top: 30, right: 54, bottom: 38, left: 60 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;

  const minPow = 800;
  const maxPow = 1700;
  const powTicks = [800, 1025, 1250, 1475, 1700];

  const minTemp = 6;
  const maxTemp = 22;
  const tempTicks = [6, 10, 14, 18, 22];

  const xPos = (h: number) => margin.left + (h * plotW) / 23;
  const yPow = (kw: number) => margin.top + plotH - ((kw - minPow) / (maxPow - minPow)) * plotH;
  const yTemp = (c: number) => margin.top + plotH - ((c - minTemp) / (maxTemp - minTemp)) * plotH;

  const powPath = muestraTelemetria24Horas
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${xPos(s.hourOfDay)} ${yPow(s.powerKwh)}`)
    .join(' ');

  const tempPath = muestraTelemetria24Horas
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${xPos(s.hourOfDay)} ${yTemp(s.ambientTempC)}`)
    .join(' ');

  const current =
    muestraTelemetria24Horas.find((s) => s.hourOfDay === hoverHour) ??
    muestraTelemetria24Horas[10];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Muestra Telemetría SNMP 2025 · 1 Instalación (DC-BOG-01) · Ciclo 24 Horas
          </p>
          <h3 className="text-base font-semibold text-slate-100 mt-0.5">
            Curva Horaria: Consumo Total (kWh) vs. Temperatura Ambiental Bogotá (°C)
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-indigo-400 inline-block" />
            Potencia Total (kWh)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 border-b-2 border-dashed border-amber-400 inline-block" />
            Temperatura Bogotá (°C)
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[540px] h-auto select-none"
          role="img"
          aria-label="Curva horaria de telemetría SNMP 24 horas"
        >
          {/* Left Y-axis (Power kWh) */}
          {powTicks.map((tick) => {
            const y = yPow(tick);
            return (
              <g key={tick}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={width - margin.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth={1}
                />
                <text
                  x={margin.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#818cf8"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {tick.toLocaleString('es-CO')}
                </text>
              </g>
            );
          })}

          {/* Right Y-axis (Temp °C) */}
          {tempTicks.map((t) => {
            const y = yTemp(t);
            return (
              <text
                key={t}
                x={width - margin.right + 8}
                y={y + 4}
                textAnchor="start"
                fill="#fbbf24"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                {t}°C
              </text>
            );
          })}

          {/* Curves */}
          <path d={powPath} fill="none" stroke="#818cf8" strokeWidth={2.5} />
          <path d={tempPath} fill="none" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5,4" />

          {/* Key explicit callouts: 03:00 (min), 10:00 (max power), 13:00 (max temp) */}
          {[3, 10, 13, 20].map((hr) => {
            const pt = muestraTelemetria24Horas[hr];
            const x = xPos(hr);
            const yP = yPow(pt.powerKwh);
            const yT = yTemp(pt.ambientTempC);
            return (
              <g key={hr}>
                <circle cx={x} cy={yP} r={3.5} fill="#818cf8" />
                <text
                  x={x}
                  y={yP - 9}
                  textAnchor="middle"
                  fill="#c7d2fe"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {pt.powerKwh.toFixed(0)} kWh
                </text>
                {hr === 13 && (
                  <>
                    <circle cx={x} cy={yT} r={3.5} fill="#f59e0b" />
                    <text
                      x={x + 6}
                      y={yT - 8}
                      textAnchor="start"
                      fill="#fcd34d"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {pt.ambientTempC}°C
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Active hour vertical guide & interactive hotspots */}
          <line
            x1={xPos(hoverHour)}
            y1={margin.top}
            x2={xPos(hoverHour)}
            y2={margin.top + plotH}
            stroke="#10b981"
            strokeWidth={1.5}
          />
          <circle
            cx={xPos(hoverHour)}
            cy={yPow(current.powerKwh)}
            r={5}
            fill="#10b981"
            stroke="#090d16"
            strokeWidth={1.5}
          />

          {/* X-axis ticks */}
          {muestraTelemetria24Horas
            .filter((s) => s.hourOfDay % 3 === 0)
            .map((s) => (
              <text
                key={s.hourOfDay}
                x={xPos(s.hourOfDay)}
                y={margin.top + plotH + 20}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                {String(s.hourOfDay).padStart(2, '0')}:00
              </text>
            ))}

          {/* Invisible hit columns for smooth hover/click */}
          {muestraTelemetria24Horas.map((s) => (
            <rect
              key={s.hourOfDay}
              x={xPos(s.hourOfDay) - plotW / 48}
              y={margin.top}
              width={plotW / 24}
              height={plotH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverHour(s.hourOfDay)}
              onClick={() => setHoverHour(s.hourOfDay)}
            />
          ))}
        </svg>
      </div>

      {/* Inspected Hour Values Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-3 border-t border-slate-800/80 text-xs">
        <div>
          <span className="text-slate-400 block">Hora</span>
          <span className="font-mono font-semibold text-emerald-400">
            {String(current.hourOfDay).padStart(2, '0')}:00 h
          </span>
        </div>
        <div>
          <span className="text-slate-400 block">Uso CPU</span>
          <span className="font-mono font-semibold text-slate-100">{current.cpuPct}%</span>
        </div>
        <div>
          <span className="text-slate-400 block">RAM</span>
          <span className="font-mono font-semibold text-slate-100">{current.ramGb} GB</span>
        </div>
        <div>
          <span className="text-slate-400 block">Tráfico Red</span>
          <span className="font-mono font-semibold text-slate-100">{current.networkGbps} Gbps</span>
        </div>
        <div>
          <span className="text-slate-400 block">Temp. Bogotá</span>
          <span className="font-mono font-semibold text-amber-400">{current.ambientTempC} °C</span>
        </div>
        <div>
          <span className="text-slate-400 block">Consumo / PUE</span>
          <span className="font-mono font-semibold text-indigo-300">
            {current.powerKwh} kWh · {current.pueRatio}
          </span>
        </div>
      </div>
    </div>
  );
};
