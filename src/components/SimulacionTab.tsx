import React, { useState, useMemo } from 'react';
import { Download } from 'lucide-react';

interface PresetConfig {
  name: string;
  description: string;
  dcName: string;
  tier: 'Tier III' | 'Tier IV';
  baseItKw: number;
  cpuPct: number;
  ramGb: number;
  netGbps: number;
  tempBogota: number;
  setPointCooling: number;
  anticipationHours: number;
}

export const SimulacionTab: React.FC = () => {
  const presets: PresetConfig[] = [
    {
      name: 'Operación Típica',
      description: 'Línea base promedio de la Sabana de Bogotá (telemetría 2025).',
      dcName: 'DC-BOG-02 (Zona Franca)',
      tier: 'Tier III',
      baseItKw: 1000,
      cpuPct: 58.4,
      ramGb: 310,
      netGbps: 45,
      tempBogota: 14.2,
      setPointCooling: 21.0,
      anticipationHours: 6,
    },
    {
      name: 'Pico Diurno (14:00h)',
      description: 'Alta concurrencia laboral y pico térmico exterior en Bogotá.',
      dcName: 'DC-BOG-01 (Sabana Norte)',
      tier: 'Tier IV',
      baseItKw: 1200,
      cpuPct: 86.5,
      ramGb: 470,
      netGbps: 82,
      tempBogota: 19.8,
      setPointCooling: 21.0,
      anticipationHours: 6,
    },
    {
      name: 'Nocturno Free-Cooling',
      description: 'Aire exterior frío (8.8 °C) para reducir compresores mecánicos.',
      dcName: 'DC-BOG-03 (Calle 26)',
      tier: 'Tier IV',
      baseItKw: 850,
      cpuPct: 24.5,
      ramGb: 185,
      netGbps: 14,
      tempBogota: 8.8,
      setPointCooling: 20.0,
      anticipationHours: 6,
    },
    {
      name: 'Cargas IA (+14% anual)',
      description: 'Alta densidad térmica por entrenamiento de modelos de IA.',
      dcName: 'DC-BOG-04 (Autopista Norte)',
      tier: 'Tier IV',
      baseItKw: 1500,
      cpuPct: 94.0,
      ramGb: 512,
      netGbps: 92,
      tempBogota: 17.5,
      setPointCooling: 20.5,
      anticipationHours: 6,
    },
  ];

  const [dcName, setDcName] = useState<string>('DC-BOG-02 (Zona Franca)');
  const [tier, setTier] = useState<'Tier III' | 'Tier IV'>('Tier III');
  const [baseItKw, setBaseItKw] = useState<number>(1000);
  const [cpuPct, setCpuPct] = useState<number>(58.4);
  const [ramGb, setRamGb] = useState<number>(310);
  const [netGbps, setNetGbps] = useState<number>(45);
  const [tempBogota, setTempBogota] = useState<number>(14.2);
  const [setPointCooling, setSetPointCooling] = useState<number>(21.0);
  const [anticipationHours, setAnticipationHours] = useState<number>(6);
  const [energyTariffUsd, setEnergyTariffUsd] = useState<number>(0.18);
  const [simulationHorizon, setSimulationHorizon] = useState<'1h' | '24h' | '30d' | '1yr'>('24h');
  const [activePreset, setActivePreset] = useState<string>('Operación Típica');
  const [inspectedHour, setInspectedHour] = useState<number>(14);

  const applyPreset = (preset: PresetConfig) => {
    setDcName(preset.dcName);
    setTier(preset.tier);
    setBaseItKw(preset.baseItKw);
    setCpuPct(preset.cpuPct);
    setRamGb(preset.ramGb);
    setNetGbps(preset.netGbps);
    setTempBogota(preset.tempBogota);
    setSetPointCooling(preset.setPointCooling);
    setAnticipationHours(preset.anticipationHours);
    setActivePreset(preset.name);
  };

  const sim = useMemo(() => {
    const eItUsefulKw =
      baseItKw *
      (0.45 + (cpuPct / 100) * 0.4 + (ramGb / 1024) * 0.1 + (netGbps / 100) * 0.05);

    const deltaTempExterior = Math.max(0, tempBogota - 13.5);
    const coolingKwBau = eItUsefulKw * 0.76 + deltaTempExterior * 7.5;
    const lossesKwBau = (eItUsefulKw + coolingKwBau) * 0.05;
    const totalKwBau = eItUsefulKw + coolingKwBau + lossesKwBau;
    const pueBau = totalKwBau / eItUsefulKw;

    const freeCoolingBonus = tempBogota < 15.0 ? (15.0 - tempBogota) * 5.2 : 0;
    const coolingKwAi = Math.max(
      eItUsefulKw * 0.28,
      eItUsefulKw * 0.35 + Math.max(0, tempBogota - 15.0) * 5.0 - freeCoolingBonus
    );
    const lossesKwAi = (eItUsefulKw + coolingKwAi) * 0.045;
    const totalKwAi = eItUsefulKw + coolingKwAi + lossesKwAi;
    const pueAi = totalKwAi / eItUsefulKw;

    const hoursMultiplier =
      simulationHorizon === '1h'
        ? 1
        : simulationHorizon === '24h'
        ? 24
        : simulationHorizon === '30d'
        ? 720
        : 8760;

    const totalKwhBau = totalKwBau * hoursMultiplier;
    const totalKwhAi = totalKwAi * hoursMultiplier;
    const savingsKwh = totalKwhBau - totalKwhAi;
    const savingsPercent = (savingsKwh / totalKwhBau) * 100;

    const costBauUsd = totalKwhBau * energyTariffUsd;
    const costAiUsd = totalKwhAi * energyTariffUsd;
    const savingsUsd = costBauUsd - costAiUsd;
    const co2TonsAvoided = (savingsKwh * 0.126) / 1000;

    const hourly24Series = Array.from({ length: 24 }, (_, h) => {
      const hourTemp = tempBogota + 4.5 * Math.sin(((h - 6) * Math.PI) / 12);
      const hourCpu = 8 <= h && h <= 18 ? cpuPct : cpuPct * 0.55;
      const hourIt = baseItKw * (0.45 + (hourCpu / 100) * 0.4);
      const hCoolingBau = hourIt * 0.76 + Math.max(0, hourTemp - 13.5) * 7.5;
      const hTotalBau = hourIt + hCoolingBau + (hourIt + hCoolingBau) * 0.05;

      const hFreeCooling = hourTemp < 15.0 ? (15.0 - hourTemp) * 5.2 : 0;
      const hCoolingAi = Math.max(
        hourIt * 0.28,
        hourIt * 0.35 + Math.max(0, hourTemp - 15.0) * 5.0 - hFreeCooling
      );
      const hTotalAi = hourIt + hCoolingAi + (hourIt + hCoolingAi) * 0.045;

      return {
        hour: h,
        temp: Number(hourTemp.toFixed(1)),
        cpu: Number(hourCpu.toFixed(1)),
        totalBau: Number(hTotalBau.toFixed(1)),
        totalAi: Number(hTotalAi.toFixed(1)),
        savings: Number((hTotalBau - hTotalAi).toFixed(1)),
        pueAi: Number((hTotalAi / hourIt).toFixed(2)),
      };
    });

    const maxSeriesKw = Math.max(...hourly24Series.map((d) => d.totalBau)) * 1.15;
    const minSeriesKw = Math.max(0, Math.min(...hourly24Series.map((d) => d.totalAi)) * 0.8);

    return {
      eItUsefulKw: Number(eItUsefulKw.toFixed(1)),
      totalKwBau: Number(totalKwBau.toFixed(1)),
      totalKwAi: Number(totalKwAi.toFixed(1)),
      pueBau: Number(pueBau.toFixed(2)),
      pueAi: Number(pueAi.toFixed(2)),
      totalKwhBau: Number(totalKwhBau.toFixed(1)),
      totalKwhAi: Number(totalKwhAi.toFixed(1)),
      savingsKwh: Number(savingsKwh.toFixed(1)),
      savingsPercent: Number(savingsPercent.toFixed(1)),
      costBauUsd: Number(costBauUsd.toFixed(2)),
      costAiUsd: Number(costAiUsd.toFixed(2)),
      savingsUsd: Number(savingsUsd.toFixed(2)),
      co2TonsAvoided: Number(co2TonsAvoided.toFixed(2)),
      coolingKwBau: Number(coolingKwBau.toFixed(1)),
      coolingKwAi: Number(coolingKwAi.toFixed(1)),
      lossesKwBau: Number(lossesKwBau.toFixed(1)),
      lossesKwAi: Number(lossesKwAi.toFixed(1)),
      hourly24Series,
      maxSeriesKw,
      minSeriesKw,
    };
  }, [
    baseItKw,
    cpuPct,
    ramGb,
    netGbps,
    tempBogota,
    setPointCooling,
    anticipationHours,
    energyTariffUsd,
    simulationHorizon,
  ]);

  const handleExportSimulationCsv = () => {
    const csvHeader =
      'parametro,valor_entrada,unidad\n' +
      `centro_datos,"${dcName}",texto\n` +
      `categoria_tier,"${tier}",categoria\n` +
      `potencia_base_it,${baseItKw},kW\n` +
      `cpu_utilization,${cpuPct},%\n` +
      `ram_usage,${ramGb},GB\n` +
      `network_traffic,${netGbps},Gbps\n` +
      `temperatura_bogota,${tempBogota},°C\n` +
      `anticipacion_modelo,${anticipationHours},horas\n` +
      `horizonte_simulacion,"${simulationHorizon}",periodo\n\n` +
      'metrica_resultado,escenario_bau,escenario_opt_ia,unidad,diferencia\n' +
      `potencia_total_kw,${sim.totalKwBau},${sim.totalKwAi},kW,-${(sim.totalKwBau - sim.totalKwAi).toFixed(1)}\n` +
      `pue_indicador,${sim.pueBau},${sim.pueAi},ratio,-${(sim.pueBau - sim.pueAi).toFixed(2)}\n` +
      `energia_consumida_kwh,${sim.totalKwhBau},${sim.totalKwhAi},kWh,-${sim.savingsKwh}\n` +
      `costo_facturado_usd,${sim.costBauUsd},${sim.costAiUsd},USD,-${sim.savingsUsd}\n` +
      `emisiones_co2_evitadas,0,${sim.co2TonsAvoided},toneladas_co2,${sim.co2TonsAvoided}\n`;

    const blob = new Blob([csvHeader], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `simulacion_${dcName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Chart scaling
  const svgW = 720;
  const svgH = 260;
  const pad = { top: 28, right: 24, bottom: 36, left: 60 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const yScale = (val: number) => {
    const range = Math.max(100, sim.maxSeriesKw - sim.minSeriesKw);
    return pad.top + plotH - ((val - sim.minSeriesKw) / range) * plotH;
  };
  const xScale = (h: number) => pad.left + (h * plotW) / 23;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) =>
    Math.round(sim.minSeriesKw + f * (sim.maxSeriesKw - sim.minSeriesKw))
  );

  const inspectedData = sim.hourly24Series[inspectedHour] ?? sim.hourly24Series[14];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Calculadora Paramétrica · Ecuaciones Cuantitativas (Sección 6.5)
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            Simulación del Consumo Energético y PUE con Datos Específicos
          </h1>
        </div>

        <button
          onClick={handleExportSimulationCsv}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exportar Simulación (CSV)</span>
        </button>
      </div>

      {/* Presets Segmented Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((preset) => {
          const isActive = activePreset === preset.name;
          return (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={`p-3.5 rounded-xl text-left border transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-slate-100'
                  : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-baseline justify-between gap-2 text-xs font-semibold">
                <span className={isActive ? 'text-emerald-300' : 'text-slate-100'}>
                  {preset.name}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{preset.tier}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{preset.description}</p>
            </button>
          );
        })}
      </div>

      {/* Main Split: Parameters (4 cols) | Results + Chart (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Parameters Panel */}
        <div className="lg:col-span-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-5 text-xs">
          <div className="space-y-3 pb-4 border-b border-slate-800/80">
            <h2 className="text-sm font-semibold text-slate-100">Parámetros de Entrada</h2>
            <div>
              <label className="text-slate-400 block mb-1">Instalación / Sede</label>
              <input
                type="text"
                value={dcName}
                onChange={(e) => {
                  setDcName(e.target.value);
                  setActivePreset('Personalizado');
                }}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Categoría</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as 'Tier III' | 'Tier IV')}
                  className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
                >
                  <option value="Tier IV">Tier IV</option>
                  <option value="Tier III">Tier III</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Capacidad TI (kW)</label>
                <input
                  type="number"
                  min="200"
                  max="5000"
                  step="50"
                  value={baseItKw}
                  onChange={(e) => setBaseItKw(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">CPU_Utilization</span>
                <span className="font-mono font-semibold text-slate-100">{cpuPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="0.5"
                value={cpuPct}
                onChange={(e) => {
                  setCpuPct(Number(e.target.value));
                  setActivePreset('Personalizado');
                }}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">RAM_Usage</span>
                <span className="font-mono font-semibold text-slate-100">{ramGb} GB</span>
              </div>
              <input
                type="range"
                min="64"
                max="1024"
                step="8"
                value={ramGb}
                onChange={(e) => {
                  setRamGb(Number(e.target.value));
                  setActivePreset('Personalizado');
                }}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Network_Traffic</span>
                <span className="font-mono font-semibold text-slate-100">{netGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={netGbps}
                onChange={(e) => {
                  setNetGbps(Number(e.target.value));
                  setActivePreset('Personalizado');
                }}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Ambient_Temp (Bogotá)</span>
                <span className="font-mono font-semibold text-amber-400">{tempBogota} °C</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="24.0"
                step="0.2"
                value={tempBogota}
                onChange={(e) => {
                  setTempBogota(Number(e.target.value));
                  setActivePreset('Personalizado');
                }}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Horizonte</label>
              <select
                value={simulationHorizon}
                onChange={(e) => setSimulationHorizon(e.target.value as '1h' | '24h' | '30d' | '1yr')}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              >
                <option value="1h">1 Hora</option>
                <option value="24h">24 Horas</option>
                <option value="30d">30 Días</option>
                <option value="1yr">1 Año (8,760h)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Tarifa (USD/kWh)</label>
              <input
                type="number"
                min="0.05"
                max="0.60"
                step="0.01"
                value={energyTariffUsd}
                onChange={(e) => setEnergyTariffUsd(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* 4-metric readout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">PUE Tradicional</span>
              <span className="text-2xl font-bold font-mono text-orange-400 mt-1 block">
                {sim.pueBau.toFixed(2)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/40">
              <span className="text-xs text-slate-300 block">PUE Optimizado IA</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                {sim.pueAi.toFixed(2)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">Ahorro Energético</span>
              <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">
                {sim.savingsPercent}%
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                -{sim.savingsKwh.toLocaleString('es-CO')} kWh
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">Ahorro OPEX / CO₂</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                ${sim.savingsUsd.toLocaleString('en-US')}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                -{sim.co2TonsAvoided} t CO₂eq
              </span>
            </div>
          </div>

          {/* 24-Hour Curve with Explicit Values */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Perfil Horario Simulado (24 Horas · kW Totales)
                </h3>
                <p className="text-xs text-slate-400">
                  Pase el cursor sobre cualquier hora para inspeccionar los valores exactos
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-orange-500 inline-block" />
                  BAU ({sim.totalKwBau} kW)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
                  IA LSTM ({sim.totalKwAi} kW)
                </span>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[520px] h-auto select-none">
                {yTicks.map((tick) => {
                  const y = yScale(tick);
                  return (
                    <g key={tick}>
                      <line
                        x1={pad.left}
                        y1={y}
                        x2={svgW - pad.right}
                        y2={y}
                        stroke="#1e293b"
                        strokeWidth={1}
                      />
                      <text
                        x={pad.left - 8}
                        y={y + 4}
                        textAnchor="end"
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                <path
                  d={sim.hourly24Series
                    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.hour)} ${yScale(d.totalBau)}`)
                    .join(' ')}
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth={2.5}
                />

                <path
                  d={sim.hourly24Series
                    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.hour)} ${yScale(d.totalAi)}`)
                    .join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={2.5}
                />

                {/* Explicit numerical labels at 03:00 (min) and 14:00 (peak) */}
                {[3, 14].map((hr) => {
                  const d = sim.hourly24Series[hr];
                  const x = xScale(hr);
                  return (
                    <g key={hr}>
                      <circle cx={x} cy={yScale(d.totalBau)} r={3.5} fill="#ea580c" />
                      <text
                        x={x}
                        y={yScale(d.totalBau) - 8}
                        textAnchor="middle"
                        fill="#fdba74"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {d.totalBau.toFixed(0)} kW
                      </text>

                      <circle cx={x} cy={yScale(d.totalAi)} r={3.5} fill="#10b981" />
                      <text
                        x={x}
                        y={yScale(d.totalAi) + 15}
                        textAnchor="middle"
                        fill="#34d399"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {d.totalAi.toFixed(0)} kW
                      </text>
                    </g>
                  );
                })}

                {/* Inspected hour cursor */}
                <line
                  x1={xScale(inspectedHour)}
                  y1={pad.top}
                  x2={xScale(inspectedHour)}
                  y2={pad.top + plotH}
                  stroke="#64748b"
                  strokeWidth={1}
                  strokeDasharray="3,3"
                />

                {sim.hourly24Series
                  .filter((d) => d.hour % 3 === 0)
                  .map((d) => (
                    <text
                      key={d.hour}
                      x={xScale(d.hour)}
                      y={pad.top + plotH + 20}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {String(d.hour).padStart(2, '0')}:00
                    </text>
                  ))}

                {sim.hourly24Series.map((d) => (
                  <rect
                    key={d.hour}
                    x={xScale(d.hour) - plotW / 48}
                    y={pad.top}
                    width={plotW / 24}
                    height={plotH}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setInspectedHour(d.hour)}
                    onClick={() => setInspectedHour(d.hour)}
                  />
                ))}
              </svg>
            </div>

            {/* Inspected Hour Readout */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
              <span className="text-slate-300">
                Hora {String(inspectedData.hour).padStart(2, '0')}:00 · Temp: {inspectedData.temp}°C · CPU: {inspectedData.cpu}%
              </span>
              <span className="text-emerald-400">
                BAU: {inspectedData.totalBau} kW · IA: {inspectedData.totalAi} kW · Ahorro: {inspectedData.savings} kW (PUE {inspectedData.pueAi})
              </span>
            </div>
          </div>

          {/* Desglose de Potencia */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Desglose de Potencia por Componente
            </h3>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3 text-left">Componente</th>
                  <th className="py-2 px-3 text-right">Tradicional BAU</th>
                  <th className="py-2 px-3 text-right">Optimizado IA (6h)</th>
                  <th className="py-2 px-3 text-right">Diferencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 font-mono">
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-200">Cómputo Servidores (E_IT)</td>
                  <td className="py-2 px-3 text-right text-slate-300">{sim.eItUsefulKw} kW</td>
                  <td className="py-2 px-3 text-right text-slate-300">{sim.eItUsefulKw} kW</td>
                  <td className="py-2 px-3 text-right text-slate-500">0.0 kW</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-200">Climatización Chillers (E_Cooling)</td>
                  <td className="py-2 px-3 text-right text-orange-400">{sim.coolingKwBau} kW</td>
                  <td className="py-2 px-3 text-right text-emerald-400">{sim.coolingKwAi} kW</td>
                  <td className="py-2 px-3 text-right text-emerald-300">
                    -{(sim.coolingKwBau - sim.coolingKwAi).toFixed(1)} kW
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-200">Pérdidas Eléctricas (E_Losses)</td>
                  <td className="py-2 px-3 text-right text-slate-400">{sim.lossesKwBau} kW</td>
                  <td className="py-2 px-3 text-right text-slate-300">{sim.lossesKwAi} kW</td>
                  <td className="py-2 px-3 text-right text-emerald-300">
                    -{(sim.lossesKwBau - sim.lossesKwAi).toFixed(1)} kW
                  </td>
                </tr>
                <tr className="font-semibold text-slate-100 border-t border-slate-700">
                  <td className="py-2.5 px-3 font-sans">Potencia Total</td>
                  <td className="py-2.5 px-3 text-right text-orange-400">{sim.totalKwBau} kW</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">{sim.totalKwAi} kW</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">
                    -{(sim.totalKwBau - sim.totalKwAi).toFixed(1)} kW ({sim.savingsPercent}%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
