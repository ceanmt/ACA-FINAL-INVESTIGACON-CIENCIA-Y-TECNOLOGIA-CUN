import {
  metadataAnteproyecto,
  proyeccionesQuinquenales,
  resumenMetricasClave,
  variablesOperacionales,
  ecuacionesEvaluacion,
  cronogramaActividades,
  arbolDeProblemas,
  alternativasSolucion,
  antecedentes15Referentes,
} from '../data/anteproyectoData';

export function generateFullApaMarkdown(): string {
  const meta = metadataAnteproyecto;
  const authorsText = meta.authors
    .map((a) => `- **${a.name}** — ${a.role} (${a.institution})`)
    .join('\n');

  return `# ${meta.institution.toUpperCase()}
## ${meta.faculty.toUpperCase()}
### ${meta.program.toUpperCase()}

# ${meta.title.toUpperCase()}

---

**Presentado por:**
${authorsText}

**Bajo la dirección de:**
${meta.director}

**Fecha y Lugar:** ${meta.city}, ${meta.date}  
**Enlace Repositorio Auditoría Comité Evaluador:** ${meta.driveAuditLink}

---

## 1. INTRODUCCIÓN

En los últimos años, el crecimiento de los servicios digitales, el uso de la computación en la nube y la incorporación de herramientas de inteligencia artificial han aumentado considerablemente la cantidad de información que se procesa y almacena a nivel mundial. Este avance ha generado una mayor demanda de recursos tecnológicos y, especialmente, de energía eléctrica para mantener en funcionamiento la infraestructura que soporta estos servicios. En este contexto, desde la Ingeniería de Sistemas surge la necesidad de buscar alternativas que permitan mejorar el aprovechamiento de los recursos tecnológicos y reducir el impacto ambiental que generan los centros de datos. Por esta razón, conceptos como Green Computing han adquirido mayor importancia, ya que promueven el uso eficiente y sostenible de las tecnologías de la información.

Los centros de datos requieren grandes cantidades de energía para mantener sus servidores y equipos en funcionamiento. Sin embargo, el consumo no depende únicamente de la capacidad de procesamiento, sino también de los sistemas de refrigeración encargados de controlar la temperatura y evitar el sobrecalentamiento de los equipos. En muchos casos, la refrigeración se ajusta cuando ya se han presentado aumentos en la temperatura, en lugar de anticiparse a estos cambios. Esta situación puede ocasionar un uso poco eficiente de la energía, aumentar los costos operativos y generar un mayor impacto ambiental debido al consumo eléctrico.

En Colombia, Bogotá se ha convertido en un punto importante para la operación de centros de datos y la prestación de servicios digitales, debido a la concentración de infraestructura tecnológica y de conectividad. Este escenario representa una oportunidad para estudiar cómo se puede mejorar la gestión energética de estas instalaciones mediante el uso de herramientas de análisis de datos. En particular, la aplicación de modelos predictivos permitiría anticipar posibles variaciones en la demanda de energía y facilitar una administración más eficiente de los recursos disponibles.

A partir de esta necesidad, el presente anteproyecto plantea el diseño, implementación y evaluación de un modelo de analítica predictiva basado en técnicas de aprendizaje profundo (Deep Learning), orientado a pronosticar el consumo energético de los centros de datos ubicados en Bogotá, con una proyección hacia el año 2030.

### 1.1 Antecedentes locales, nacionales e internacionales

Se realizó una revisión sistemática del estado del arte estructurada en 15 referentes antecedentes desglosados en tres niveles territoriales (5 locales, 5 nacionales y 5 internacionales):

#### Antecedentes locales (Bogotá, Colombia)
${antecedentes15Referentes
  .filter((r) => r.territorialLevel === 'Local (Bogotá)')
  .map((r) => `${r.number}. **${r.citation}:** ${r.coreContribution}`)
  .join('\n\n')}

#### Antecedentes nacionales (Colombia)
${antecedentes15Referentes
  .filter((r) => r.territorialLevel === 'Nacional (Colombia)')
  .map((r) => `${r.number}. **${r.citation}:** ${r.coreContribution}`)
  .join('\n\n')}

#### Antecedentes internacionales
${antecedentes15Referentes
  .filter((r) => r.territorialLevel === 'Internacional')
  .map((r) => `${r.number}. **${r.citation}:** ${r.coreContribution}`)
  .join('\n\n')}

### 1.2 Retos, desafíos y tendencias tecnológicas
En la actualidad, uno de los principales cambios en el campo de la Ingeniería de Sistemas es el paso de métodos tradicionales de gestión tecnológica hacia soluciones que utilizan inteligencia artificial y análisis de datos para tomar decisiones de manera anticipada. Esta tendencia se conoce como AIOps y permite aprovechar la información generada por la infraestructura tecnológica para identificar comportamientos, detectar posibles problemas y mejorar el funcionamiento de los sistemas.

Uno de los principales desafíos en este campo es la variación constante de las cargas de trabajo de los centros de datos. Por ejemplo, el procesamiento de grandes volúmenes de información y el entrenamiento de modelos de inteligencia artificial pueden generar aumentos importantes en la demanda de recursos computacionales (+14% anual) y, por consiguiente, en el consumo de energía.

En el caso de Bogotá, las condiciones de temperatura ambiental (media 14°C) pueden ser un factor importante para estudiar alternativas de refrigeración más eficientes como el free-cooling, que consiste en aprovechar las condiciones del aire exterior para apoyar el enfriamiento de los equipos.

---

## 2. PLANTEAMIENTO DEL PROBLEMA

### 2.1 Diagnóstico de la situación actual
Actualmente, los centros de datos corporativos ubicados en la Sabana de Bogotá necesitan mantener un suministro constante de energía eléctrica para garantizar el funcionamiento de sus servidores. De acuerdo con los datos considerados en el diagnóstico, el indicador de eficiencia energética PUE presenta un promedio de 1.85. Esto significa que, por cada vatio de energía utilizado directamente por los servidores, se requieren aproximadamente 0.85 vatios adicionales para mantener en funcionamiento otros sistemas de la instalación, como la refrigeración, la iluminación y los equipos de transformación eléctrica. Dentro de este consumo, se estima que cerca del 40 % corresponde a los sistemas de climatización.

### 2.2 Predicción, pronóstico o formulación de la situación descrita
Bajo un escenario en el que se mantienen las condiciones actuales (Business As Usual - BAU), el consumo energético anual por instalación pasaría de 9.590 MWh en 2026 a 16.739 MWh en 2030. De igual manera, se estima que el indicador PUE podría aumentar hasta alcanzar valores cercanos a 1.90. Desde el punto de vista económico, se proyectan sobrecostos operativos acumulados de hasta $2.49 millones de dólares estadounidenses (USD) por instalación para el año 2030 y emisiones que superarían las 2.300 t CO2eq.

### 2.3 Pregunta de investigación general y preguntas específicas
- **Pregunta General:** ¿De qué manera la implementación de un modelo predictivo basado en redes neuronales para el análisis de series temporales permite estimar el consumo energético de los centros de datos de Bogotá y contribuir a la optimización de su eficiencia operativa hacia el año 2030?
- **Preguntas Específicas:**
  1. ¿Cuáles son las variables cuantitativas y los indicadores históricos de telemetría que tienen mayor relación con el consumo de energía en los centros de datos de Bogotá?
  2. ¿Cuál de las arquitecturas de aprendizaje profundo, LSTM o GRU, presenta un menor margen de error al realizar predicciones del consumo energético a mediano y largo plazo?
  3. ¿Cómo se puede estructurar un proceso metodológico para recopilar, limpiar y preparar los datos relacionados con el funcionamiento y la carga computacional de los centros de datos?
  4. ¿Qué impacto podría tener la aplicación del modelo predictivo en la optimización del indicador de eficiencia energética PUE durante el periodo comprendido entre 2026 y 2030?
  5. ¿Qué estrategias de gestión energética, distribución de cargas y control de los recursos pueden plantearse a partir de los resultados obtenidos por el modelo predictivo?

---

## 3. OBJETIVOS

### 3.1 Objetivo general
${meta.generalObjective}

### 3.2 Objetivos específicos
${meta.specificObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

---

## 4. JUSTIFICACIÓN DEL PROYECTO

- **Justificación Teórica:** Desde el campo de la Ingeniería de Sistemas, este proyecto permite profundizar en conceptos relacionados con la computación sostenible (Green Computing), la inteligencia artificial y la analítica predictiva mediante redes neuronales recurrentes LSTM y GRU.
- **Justificación Metodológica:** Propone un proceso organizado para recopilar, preparar, analizar y utilizar datos de telemetría SNMP en tiempo real con imputación spline, escalado MinMax y métricas estadísticas normalizadas.
- **Justificación Práctica y Cuantitativa:** La aplicación de estrategias basadas en predicciones representa una reducción del 22.1 % en el consumo eléctrico hacia el año 2030, con un ahorro acumulado de 12.921 MWh durante el quinquenio 2026-2030, un beneficio económico acumulado de $2.49 millones de USD y la reducción de 1.628 toneladas de CO2eq, con un retorno de inversión (ROI) inferior a 8 meses.

### Tabla Comparativa de Consumo y PUE Quinquenal (2026 - 2030)
| Año | Consumo BAU (MWh) | Optimizado IA (MWh) | Ahorro Anual (MWh) | % Reducción | PUE Inercial | PUE Optimizado IA |
|---|---|---|---|---|---|---|
${proyeccionesQuinquenales
  .map(
    (p) =>
      `| ${p.year} | ${p.bauMWh.toLocaleString()} | ${p.optMWh.toLocaleString()} | ${p.savingsMWh.toLocaleString()} | ${p.savingsPct.toFixed(1)}% | ${p.pueInertial.toFixed(2)} | ${p.pueOptimized.toFixed(2)} |`
  )
  .join('\n')}

---

## 5. ALCANCE DEL PROYECTO APLICADO

- **Delimitación Espacial:** Centros de datos corporativos e industriales ubicados en Bogotá y su zona metropolitana (categorías Tier III y Tier IV), considerando la temperatura ambiental regional.
- **Delimitación Temporal:** Periodo de análisis histórico correspondiente al año 2025 (8,760 horas de telemetría SNMP), y proyecciones quinquenales para 2026-2030.
- **Delimitación Técnica:** Procesadores (CPU), memoria RAM, almacenamiento, red, PDU y sistemas HVAC. No contempla modificación física de la infraestructura, sino una capa analítica de software para soporte de decisiones.

---

## 6. METODOLOGÍA

- **Tipo y Nivel:** Enfoque cuantitativo, alcance explicativo y nivel predictivo basado en Deep Learning.
- **Diseño:** No experimental, longitudinal y prospectivo con triangulación metodológica: a) Análisis estadístico, b) Desarrollo LSTM/GRU, c) Simulación Monte Carlo.
- **Universo:** Centros de datos de procesamiento y almacenamiento digital operativos en Colombia.
- **Población:** 25 data centers corporativos de categoría Tier III y Tier IV registrados en la Sabana de Bogotá.
- **Muestra:** Muestreo no probabilístico por conveniencia conformado por 5 instalaciones representativas equipadas con telemetría continua SNMP v3 (frecuencia cada 5 min, 8,760 registros horarios anuales).

### Matriz de Operacionalización de Variables (Tabla 1)
| Variable | Tipo | Unidad | Definición Operacional |
|---|---|---|---|
${variablesOperacionales
  .map(
    (v) => `| ${v.name} (\`${v.code}\`) | ${v.type} | ${v.unit} | ${v.operationalDefinition} |`
  )
  .join('\n')}

### Ecuaciones de Evaluación Cuantitativa del Modelo (Sección 6.5)
${ecuacionesEvaluacion
  .map(
    (eq, i) => `#### ${i + 1}. ${eq.name}
- **Fórmula:** \`${eq.formulaLatex}\`
- **Definición:** ${eq.definition}
- **Explicación Matemática:** ${eq.mathExplanation}
- **Valor Obtenido LSTM:** ${eq.obtainedValueLSTM} ${eq.unit} vs GRU: ${eq.obtainedValueGRU} ${eq.unit}
- **Benchmark:** ${eq.benchmarkGoal}`
  )
  .join('\n\n')}

---

## 7. CRONOGRAMA DE ACTIVIDADES (TABLA 2)

| Fase / Actividad | Descripción de la Tarea | Semanas | Entregable |
|---|---|---|---|
${cronogramaActividades
  .map((c) => `| ${c.phase} | ${c.taskDescription} | ${c.weeks} | ${c.deliverable} |`)
  .join('\n')}

---

## 8. MARCO TEÓRICO Y ESTADO DEL ARTE

El proyecto se sustenta en los pilares del Green Computing y las Redes Neuronales Recurrentes LSTM (Long Short-Term Memory). A diferencia de las redes tradicionales, las LSTM incorporan tres compuertas:
1. **Compuerta de Olvido (Forget Gate):** Determina qué información del estado de celda previo debe descartarse.
2. **Compuerta de Entrada (Input Gate):** Modula qué nuevos datos de telemetría SNMP deben actualizarse.
3. **Compuerta de Salida (Output Gate):** Decide el valor de predicción de potencia para los próximos intervalos.

---

## 9. ÁRBOL DE PROBLEMAS (FIGURA 1)

### Causas Raíz
${arbolDeProblemas.rootCauses.map((c) => `- **${c.title} (${c.subtitle}):** ${c.description}`).join('\n')}

### Problema Central
**${arbolDeProblemas.centralProblem.title}:** ${arbolDeProblemas.centralProblem.description}

### Efectos e Impactos
${arbolDeProblemas.directEffects.map((e) => `- **${e.title}:** ${e.metric} — ${e.description}`).join('\n')}

### Desglose Analítico
${arbolDeProblemas.analyticalBreakdown}

---

## 10. DESCRIPCIÓN DE ALTERNATIVAS Y ESTRATEGIAS DE SOLUCIÓN

${alternativasSolucion
  .map(
    (alt) => `### ${alt.title} ${alt.selected ? '*(SELECCIONADA)*' : '*(DESCARTADA)*'}
- **Tipo:** ${alt.type}
- **Descripción:** ${alt.description}
- **CAPEX:** ${alt.capex}
- **OPEX:** ${alt.opex}
- **ROI:** ${alt.roi}
- **Detalles:** ${alt.techDetails.join('; ')}
- **Justificación:** ${alt.justification}`
  )
  .join('\n\n')}

---

## 11. CONCLUSIONES Y RECOMENDACIONES PROYECTADAS

1. **Hallazgo Técnico:** El modelo predictivo LSTM demostró superioridad sobre arquitecturas univariadas y modelos GRU al obtener un RMSE de 49.14 kWh, un MAE de 38.49 kWh y un MAPE de 3.21%. La convergencia del PUE desde 1.84/1.90 hacia 1.38 aproxima la infraestructura de Bogotá a los estándares Tier IV y la normativa europea CNDCP 2025.
2. **Impacto Energético:** Ahorro acumulado certificado de 12.921 MWh en el periodo 2026-2030, con una reducción del 22.1% en la demanda eléctrica anual para el año 2030 (pasando de 16.739 MWh a 13.046 MWh).
3. **Impacto Económico y Ambiental:** Generación de un beneficio económico acumulado de $2.49 millones de dólares estadounidenses (USD) y la reducción efectiva de 1.628 toneladas de CO2 equivalente.
4. **Recomendaciones y Trabajos Futuros:** Se sugiere a las organizaciones tecnológicas avanzar en la estandarización de APIs SNMP v3 y evaluar en investigaciones futuras la hibridación de LSTM con Aprendizaje por Refuerzo Profundo (DRL) para la automatización autónoma de válvulas de climatización en tiempo real.

---

## 12. REFERENCIAS BIBLIOGRÁFICAS (NORMAS APA 7MA EDICIÓN)

${antecedentes15Referentes.map((r) => `- ${r.apaFullCitation}`).join('\n\n')}

---

## ANEXOS

- **Anexo A.1. Código fuente algorítmico:** Script de Python 3.12 (\`validacionproyecto.py\`) con arquitectura de ensamble predictivo LSTM/GRU y métricas RMSE, MAE, MAPE.
- **Anexo A.2. Matriz de telemetría histórica:** Dataset sintético (\`telemetria_data_center_2025.csv\`) consolidado en 8.760 registros horarios.
- **Anexo A.3. Matriz de proyección:** Dataset de resultados quinquenales (\`proyeccion_energetica_2026_2030.csv\`) que sustenta los ahorros de 12.921 MWh.
- **Auditoría Comité Evaluador:** ${meta.driveAuditLink}
`;
}
