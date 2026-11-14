import JSZip from 'jszip';
import { generateFullApaMarkdown } from './markdownGenerator';
import {
  metadataAnteproyecto,
  proyeccionesQuinquenales,
  variablesOperacionales,
  ecuacionesEvaluacion,
  antecedentes15Referentes,
} from '../data/anteproyectoData';

export async function exportAcaProjectZip(): Promise<void> {
  const zip = new JSZip();

  // 1. INFORME_ANTEPROYECTO_APA_7_CUN.md
  const markdownContent = generateFullApaMarkdown();
  zip.file('1_ANTEPROYECTO_CUN_APA7.md', markdownContent);

  // 2. Standalone HTML version ready to print/save as PDF with APA 7 styling
  const meta = metadataAnteproyecto;
  const authorsListHtml = meta.authors
    .map((a) => `<li><strong>${a.name}</strong> — ${a.role}</li>`)
    .join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Anteproyecto CUN - ${meta.title}</title>
  <style>
    @page { size: letter; margin: 2.54cm; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 2; color: #111; margin: 2.54cm; }
    h1, h2, h3, h4 { font-weight: bold; }
    h1 { font-size: 14pt; text-align: center; margin-top: 60px; margin-bottom: 20px; line-height: 1.6; }
    h2 { font-size: 13pt; text-align: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
    h3 { font-size: 12pt; text-align: left; margin-top: 20px; }
    p { text-indent: 1.27cm; margin: 0 0 1em 0; text-align: justify; }
    .no-indent { text-indent: 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 10pt; line-height: 1.5; }
    th, td { border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 8px; text-align: left; }
    th { font-weight: bold; background: #f8fafc; }
    .page-break { page-break-before: always; }
    .reference-item { padding-left: 1.27cm; text-indent: -1.27cm; margin-bottom: 15px; font-size: 11pt; line-height: 1.8; }
    .title-page { min-height: 85vh; text-align: center; display: flex; flex-direction: column; justify-content: space-between; }
    .meta-box { background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 15px 0; font-size: 11pt; }
  </style>
</head>
<body>
  <div class="title-page">
    <div>
      <p class="no-indent" style="text-align: center; font-weight: bold; font-size: 14pt;">${meta.institution.toUpperCase()}</p>
      <p class="no-indent" style="text-align: center;">${meta.faculty} • ${meta.program}</p>
    </div>
    <div>
      <h1>${meta.title}</h1>
      <p class="no-indent" style="text-align: center; font-style: italic;">Anteproyecto de Grado — Ingeniería de Sistemas</p>
    </div>
    <div style="text-align: center;">
      <p class="no-indent" style="font-weight: bold;">Presentado por:</p>
      <ul style="list-style: none; padding: 0;">
        ${authorsListHtml}
      </ul>
      <p class="no-indent" style="margin-top: 15px;"><strong>Bajo la dirección de:</strong> ${meta.director}</p>
      <p class="no-indent">${meta.city}, ${meta.date}</p>
    </div>
  </div>

  <div class="page-break"></div>

  <h2>1. Resumen Ejecutivo y Diagnóstico</h2>
  <p>El presente anteproyecto aborda la ineficiencia energética en centros de datos corporativos de la Sabana de Bogotá, caracterizados actualmente por un indicador PUE de 1.85, donde el 40% del consumo corresponde a climatización mecánica reactiva.</p>
  <p>La investigación plantea el diseño e implementación de una capa de software analítico basada en redes neuronales recurrentes LSTM con telemetría SNMP en tiempo real y anticipación térmica a 6 horas vista.</p>

  <h2>2. Metas Cuantitativas y Proyección Quinquenal (2026 - 2030)</h2>
  <table>
    <thead>
      <tr>
        <th>Año</th>
        <th>Consumo BAU (MWh)</th>
        <th>Optimizado IA (MWh)</th>
        <th>Ahorro Anual (MWh)</th>
        <th>% Reducción</th>
        <th>PUE Inercial</th>
        <th>PUE Meta IA</th>
      </tr>
    </thead>
    <tbody>
      ${proyeccionesQuinquenales
        .map(
          (p) => `<tr>
          <td>${p.year}</td>
          <td>${p.bauMWh.toLocaleString()}</td>
          <td>${p.optMWh.toLocaleString()}</td>
          <td>${p.savingsMWh.toLocaleString()}</td>
          <td>${p.savingsPct.toFixed(1)}%</td>
          <td>${p.pueInertial.toFixed(2)}</td>
          <td>${p.pueOptimized.toFixed(2)}</td>
        </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <p><strong>Resultados Consolidados:</strong> Ahorro acumulado de 12.921 MWh, beneficio económico acumulado de $2.49 millones de dólares estadounidenses (USD), 1.628 toneladas de CO2eq evitadas y retorno de inversión (ROI) inferior a 8 meses.</p>

  <h2>3. Matriz de Variables de Telemetría (Tabla 1)</h2>
  <table>
    <thead>
      <tr>
        <th>Variable</th>
        <th>Tipo</th>
        <th>Unidad</th>
        <th>Definición Operacional</th>
      </tr>
    </thead>
    <tbody>
      ${variablesOperacionales
        .map(
          (v) => `<tr>
          <td><strong>${v.name}</strong> (<code>${v.code}</code>)</td>
          <td>${v.type}</td>
          <td>${v.unit}</td>
          <td>${v.operationalDefinition}</td>
        </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <h2>4. Referencias Bibliográficas (Normas APA 7ma Edición)</h2>
  ${antecedentes15Referentes.map((r) => `<p class="reference-item">${r.apaFullCitation}</p>`).join('')}

</body>
</html>`;
  zip.file('2_ANTEPROYECTO_CUN_APA7.html', htmlContent);

  // 3. validacionproyecto.py (Official Python 3.12 Script)
  try {
    const pyResp = await fetch('/validacionproyecto.py');
    if (pyResp.ok) {
      const pyCode = await pyResp.text();
      zip.file('3_validacionproyecto.py', pyCode);
    }
  } catch {
    // fallback if fetch not reachable
  }

  // 4. dashboard_streamlit.py
  try {
    const stResp = await fetch('/dashboard_streamlit.py');
    if (stResp.ok) {
      const stCode = await stResp.text();
      zip.file('4_dashboard_streamlit.py', stCode);
    }
  } catch {
    // fallback
  }

  // 5. CSV Datasets
  try {
    const csv1Resp = await fetch('/data/proyeccion_energetica_2026_2030.csv');
    if (csv1Resp.ok) {
      zip.file('5_proyeccion_energetica_2026_2030.csv', await csv1Resp.text());
    }
    const csv2Resp = await fetch('/data/telemetria_data_center_2025.csv');
    if (csv2Resp.ok) {
      zip.file('6_telemetria_data_center_2025.csv', await csv2Resp.text());
    }
  } catch {
    // fallback
  }

  // 6. LEEME_ENTREGA_ANTEPROYECTO_CUN.txt
  const readmeText = `======================================================================
CORPORACION UNIFICADA NACIONAL DE EDUCACION SUPERIOR (CUN)
PROGRAMA DE INGENIERIA DE SISTEMAS - ANTEPROYECTO DE GRADO
======================================================================
TITULO:
Modelo predictivo de inteligencia artificial para pronosticar el consumo energetico en 
centros de datos de Bogota hacia el ano 2030.

INVESTIGADORES:
${meta.authors.map((a) => `- ${a.name} (${a.role})`).join('\n')}

DIRECTORA: ${meta.director}
FECHA: ${meta.city}, ${meta.date}

REPOSITORIO EN LA NUBE INSTITUCIONAL / AUDITORIA:
${meta.driveAuditLink}

CONTENIDO DEL PAQUETE:
1. 1_ANTEPROYECTO_CUN_APA7.md: Documento tecnico integral con las 12 secciones, figuras, tablas y 15 referencias APA 7ma edicion.
2. 2_ANTEPROYECTO_CUN_APA7.html: Documento imprimible con estilos academicos APA listo para exportar a PDF (Ctrl + P).
3. 3_validacionproyecto.py: Script algoritmico en Python 3.12 con la arquitectura predictiva LSTM/GRU y calculo de RMSE, MAE, MAPE y PUE (Anexo A.1).
4. 4_dashboard_streamlit.py: Dashboard interactivo en Python Streamlit ejecutable localmente.
5. 5_proyeccion_energetica_2026_2030.csv: Dataset con las proyecciones quinquenales y ahorro acumulado de 12.921 MWh (Anexo A.3).
6. 6_telemetria_data_center_2025.csv: Dataset sintetico de 8.760 registros horarios de telemetria SNMP v3 (Anexo A.2).

INSTRUCCIONES DE EJECUCION DEL SCRIPT PYTHON:
    python3 3_validacionproyecto.py

INSTRUCCIONES DE EJECUCION DEL DASHBOARD STREAMLIT:
    pip install streamlit pandas plotly scikit-learn
    streamlit run 4_dashboard_streamlit.py
`;
  zip.file('LEEME_ENTREGA_ANTEPROYECTO_CUN.txt', readmeText);

  // Generate and download ZIP
  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = `ANTEPROYECTO_IA_CENTROS_DATOS_BOGOTA_2030_CUN.zip`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}
