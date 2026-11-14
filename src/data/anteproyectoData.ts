import {
  AnteproyectoMetadata,
  QuinquennialProjection,
  OperationalVariable,
  EvaluationEquation,
  ActivityScheduleItem,
  ProblemTreeNode,
  SolutionAlternativeItem,
  AntecedenteReference,
  TelemetrySample,
} from '../types';

export const metadataAnteproyecto: AnteproyectoMetadata = {
  title:
    'Modelo predictivo de inteligencia artificial para pronosticar el consumo energético en centros de datos de Bogotá hacia el año 2030',
  institution: 'Corporación Unificada Nacional de Educación Superior (CUN)',
  faculty: 'Escuela de Ingeniería y Ciencias Básicas',
  program: 'Ingeniería de Sistemas',
  director: 'Dra. Angélica María Jiménez Coronado, Ph.D.',
  date: '15 de noviembre de 2026',
  city: 'Bogotá, D. C., Colombia',
  pdfPath: '/assets/aistudio/ACA_Final_54415_Cesar_Andres_Mu_oz_Toro_cc9448fe.pdf',
  pdfFileName: 'ACA_Final_54415_Cesar_Andres_Mu_oz_Toro_cc9448fe.pdf',
  driveAuditLink:
    'https://drive.google.com/drive/folders/168686uK8dn2ELKvz9yLjjpPWSVKIDGRZ?usp=drive_link',
  generalObjective:
    'Desarrollar un modelo predictivo basado en técnicas de aprendizaje profundo para estimar el consumo energético de los centros de datos de Bogotá, mediante el análisis de variables operativas y ambientales, con el propósito de proyectar su comportamiento y aportar información que contribuya a mejorar la eficiencia energética hacia el año 2030.',
  specificObjectives: [
    'Identificar las variables operativas, ambientales e indicadores históricos relacionados con el consumo energético de los centros de datos seleccionados, mediante técnicas de análisis estadístico y exploración de datos.',
    'Diseñar una arquitectura predictiva basada en redes neuronales recurrentes, considerando modelos LSTM y GRU, para estimar el comportamiento futuro de la demanda energética a partir de los datos recopilados y procesados.',
    'Evaluar el desempeño del modelo predictivo mediante métricas estadísticas de error y escenarios de simulación prospectiva para el periodo 2026–2030, con el fin de analizar su capacidad de predicción y su posible aporte a la optimización del indicador de eficiencia energética PUE.',
  ],
  authors: [
    {
      id: 'aut-1',
      name: 'Angie Tatiana Orozco Barrios',
      role: 'Investigadora - Analítica de Datos & Metodología',
      institution: 'CUN - Ingeniería de Sistemas',
    },
    {
      id: 'aut-2',
      name: 'Fabio Andrés Naranjo Morales',
      role: 'Investigador - Modelado Neuronal & Arquitectura LSTM/GRU',
      institution: 'CUN - Ingeniería de Sistemas',
    },
    {
      id: 'aut-3',
      name: 'Diana Marcela Moreno Mosquera',
      role: 'Investigadora - Telemetría SNMP & Variables Energéticas',
      institution: 'CUN - Ingeniería de Sistemas',
    },
    {
      id: 'aut-4',
      name: 'Cesar Andres Muñoz Toro',
      role: 'Investigador - Ingeniería de Software & Simulación Prospectiva',
      institution: 'CUN - Ingeniería de Sistemas',
      email: 'cesar.munozt@cun.edu.co',
      code: '54415',
    },
  ],
};

export const proyeccionesQuinquenales: QuinquennialProjection[] = [
  {
    year: 2026,
    bauMWh: 9590,
    optMWh: 7996,
    savingsMWh: 1594,
    savingsPct: 16.62,
    pueInertial: 1.84,
    pueOptimized: 1.43,
    opexAccumulatedUSD: 307000,
    co2AvoidedTons: 201.2,
  },
  {
    year: 2027,
    bauMWh: 10967,
    optMWh: 8945,
    savingsMWh: 2022,
    savingsPct: 18.44,
    pueInertial: 1.84,
    pueOptimized: 1.40,
    opexAccumulatedUSD: 696000,
    co2AvoidedTons: 456.1,
  },
  {
    year: 2028,
    bauMWh: 12673,
    optMWh: 10100,
    savingsMWh: 2573,
    savingsPct: 20.30,
    pueInertial: 1.87,
    pueOptimized: 1.39,
    opexAccumulatedUSD: 1192000,
    co2AvoidedTons: 780.5,
  },
  {
    year: 2029,
    bauMWh: 14439,
    optMWh: 11403,
    savingsMWh: 3036,
    savingsPct: 21.03,
    pueInertial: 1.87,
    pueOptimized: 1.37,
    opexAccumulatedUSD: 1778000,
    co2AvoidedTons: 1164.2,
  },
  {
    year: 2030,
    bauMWh: 16739,
    optMWh: 13046,
    savingsMWh: 3693,
    savingsPct: 22.06, // Reducción del 22.1% descrita en el documento
    pueInertial: 1.90,
    pueOptimized: 1.38,
    opexAccumulatedUSD: 2490000, // $2.49 millones USD acumulados
    co2AvoidedTons: 1628.0, // 1628 t CO2eq evitadas
  },
];

export const resumenMetricasClave = {
  pueInicialPromedio: 1.85,
  pueInercial2030: 1.90,
  pueMetaOptimizado2030: 1.38,
  pueLimiteTeoricoOptimo: 1.20,
  cndcpPue2025: 1.40,
  cndcpPue2030: 1.30,
  ahorroAcumuladoMWh: 12921,
  reduccionPorcentual2030: '22.1%',
  beneficioEconomicoUSD: '$2.49 Millones USD',
  emisionesCO2Evitadas: '1,628 t CO2eq',
  roiMeses: '< 8 meses',
  consumoHvacPorcentaje: '~40%',
  poblacionTotalDataCenters: 25,
  muestraInstalacionesSNMP: 5,
  registrosHorariosAnuales: 8760,
  horizonteAnticipacionHoras: 6,
  crecimientoCargasIAAnual: '+14%',
};

export const variablesOperacionales: OperationalVariable[] = [
  {
    code: 'CPU_Utilization',
    name: 'Uso de CPU',
    type: 'Independiente',
    unit: '%',
    operationalDefinition:
      'Porcentaje de capacidad de cómputo utilizada en los microprocesadores.',
    hardwareSource: 'Agentes SNMP v3 en procesadores Intel Xeon / AMD EPYC',
    minTypical: 15.0,
    maxTypical: 92.0,
    meanTypical: 58.4,
    correlationWithPower: 0.89,
  },
  {
    code: 'RAM_Usage',
    name: 'Uso de RAM',
    type: 'Independiente',
    unit: 'GB',
    operationalDefinition:
      'Volumen de memoria RAM asignada a los procesos computacionales activos.',
    hardwareSource: 'Módulos ECC DDR4/DDR5 monitoreados vía telemetría OID',
    minTypical: 120.0,
    maxTypical: 512.0,
    meanTypical: 310.5,
    correlationWithPower: 0.74,
  },
  {
    code: 'Network_Traffic',
    name: 'Tráfico de Red',
    type: 'Independiente',
    unit: 'Gbps',
    operationalDefinition:
      'Tasa de transferencia de entrada y salida en la interfaz de red.',
    hardwareSource: 'Switches Top-of-Rack y routers de agregación 40/100 GbE',
    minTypical: 5.0,
    maxTypical: 95.0,
    meanTypical: 44.8,
    correlationWithPower: 0.68,
  },
  {
    code: 'Ambient_Temp',
    name: 'Temperatura Ambiental',
    type: 'Exógena',
    unit: '°C',
    operationalDefinition:
      'Temperatura atmosférica registrada en el exterior/interior del data center.',
    hardwareSource: 'Estaciones meteorológicas locales y sensores BMS en pasillo frío/caliente',
    minTypical: 7.5,
    maxTypical: 22.0,
    meanTypical: 14.2, // Clima característico de la Sabana de Bogotá
    correlationWithPower: 0.61,
  },
  {
    code: 'Power_Consumption',
    name: 'Consumo Energético',
    type: 'Dependiente',
    unit: 'kWh',
    operationalDefinition:
      'Potencia eléctrica total consumida por el centro de datos.',
    hardwareSource: 'Analizadores de redes eléctricas y PDU inteligentes en acometida principal',
    minTypical: 850.0,
    maxTypical: 1820.0,
    meanTypical: 1240.0,
    correlationWithPower: 1.0,
  },
  {
    code: 'PUE',
    name: 'Indicador PUE',
    type: 'Eficiencia',
    unit: 'Ratio',
    operationalDefinition:
      'Relación entre el consumo energético total y el consumo exclusivo de TI.',
    hardwareSource: 'Cálculo continuo E_Total / E_IT conforme estándar IEEE/The Green Grid',
    minTypical: 1.35,
    maxTypical: 1.95,
    meanTypical: 1.85,
    correlationWithPower: 0.82,
  },
];

export const ecuacionesEvaluacion: EvaluationEquation[] = [
  {
    id: 'eq-rmse',
    name: 'Error Cuadrático Medio (RMSE)',
    formulaLatex: 'RMSE = \\sqrt{ \\frac{1}{N} \\sum_{i=1}^N (Y_i - \\hat{Y}_i)^2 }',
    definition: 'Mide la desviación promedio del modelo penalizando los errores de gran magnitud.',
    mathExplanation:
      'Donde N es el total de registros de prueba (8,760 horarios), Y_i representa el consumo real en kWh registrado por telemetría SNMP y \\hat{Y}_i es la estimación entregada por la red recurrente a 6 horas vista.',
    obtainedValueLSTM: 49.14,
    obtainedValueGRU: 57.44,
    unit: 'kWh',
    benchmarkGoal: '< 60.0 kWh (Excelente precisión en picos de demanda)',
  },
  {
    id: 'eq-mae',
    name: 'Error Absoluto Medio (MAE)',
    formulaLatex: 'MAE = \\frac{1}{N} \\sum_{i=1}^N |Y_i - \\hat{Y}_i|',
    definition: 'Expresa la magnitud promedio de los errores sin considerar su dirección.',
    mathExplanation:
      'Promedio directo de las discrepancias absolutas en kilovatios-hora entre la demanda real de los chillers/servidores y la proyección calculada.',
    obtainedValueLSTM: 38.49,
    obtainedValueGRU: 45.79,
    unit: 'kWh',
    benchmarkGoal: '< 45.0 kWh',
  },
  {
    id: 'eq-mape',
    name: 'Porcentaje de Error Absoluto Medio (MAPE)',
    formulaLatex: 'MAPE = \\left( \\frac{100\\%}{N} \\right) \\sum_{i=1}^N \\left| \\frac{Y_i - \\hat{Y}_i}{Y_i} \\right|',
    definition: 'Mide el error relativo en términos porcentuales.',
    mathExplanation:
      'Cuantifica el porcentaje de error promedio en relación con la escala de operación del centro de datos. Un MAPE menor al 5% en series temporales eléctricas se cataloga internacionalmente como predicción de alta confiabilidad (AIOps grado de producción).',
    obtainedValueLSTM: 3.21,
    obtainedValueGRU: 3.82,
    unit: '%',
    benchmarkGoal: '< 5.0 % (Umbral de Grado Industrial)',
  },
  {
    id: 'eq-pue',
    name: 'Power Usage Effectiveness (PUE)',
    formulaLatex: 'PUE = \\frac{E_{Total}}{E_{IT}} = \\frac{E_{IT} + E_{Cooling} + E_{Losses}}{E_{IT}}',
    definition: 'Expresa la métrica internacional de eficiencia energética.',
    mathExplanation:
      'Métrica formal avalada por The Green Grid y el IEEE. En el estado inercial actual de Bogotá el promedio es 1.85 (lo que denota 0.85 W de desperdicio por cada 1.0 W útil de cómputo). Con el modelo predictivo IA, el indicador converge hacia 1.38 para el año 2030.',
    obtainedValueLSTM: 1.38,
    obtainedValueGRU: 1.45,
    unit: 'Ratio adimensional',
    benchmarkGoal: '<= 1.40 (Cumplimiento de Acuerdo CNDCP 2025)',
  },
];

export const cronogramaActividades: ActivityScheduleItem[] = [
  {
    phase: 'Fase I: Preparación',
    activityCode: '1.1',
    taskDescription: 'Ingesta y normalización del dataset de telemetría 2025.',
    weeks: 'S1 - S2',
    deliverable: 'Dataset limpio (8,760 reg).',
    status: 'Completado',
  },
  {
    phase: 'Fase I: Preparación',
    activityCode: '1.2',
    taskDescription: 'Análisis exploratorio de correlación y consumo base.',
    weeks: 'S3 - S4',
    deliverable: 'Matriz de correlación.',
    status: 'Completado',
  },
  {
    phase: 'Fase II: Modelamiento',
    activityCode: '2.1',
    taskDescription: 'Configuración de la arquitectura neuronal LSTM/GRU.',
    weeks: 'S5 - S7',
    deliverable: 'Código de red entrenada.',
    status: 'Completado',
  },
  {
    phase: 'Fase II: Modelamiento',
    activityCode: '2.2',
    taskDescription: 'Calibración de hiperparámetros y reducción de pérdida.',
    weeks: 'S8 - S9',
    deliverable: 'Curvas de Loss estabilizadas.',
    status: 'Completado',
  },
  {
    phase: 'Fase III: Simulación',
    activityCode: '3.1',
    taskDescription: 'Simulación prospectiva de escenarios Monte Carlo 2026-2030.',
    weeks: 'S10 - S11',
    deliverable: 'Dataset proyectado.',
    status: 'Completado',
  },
  {
    phase: 'Fase III: Simulación',
    activityCode: '3.2',
    taskDescription: 'Cálculo de métricas de error (RMSE/MAE) y PUE.',
    weeks: 'S12 - S13',
    deliverable: 'Gráficas de PUE y MWh.',
    status: 'Completado',
  },
  {
    phase: 'Fase IV: Cierre',
    activityCode: '4.1',
    taskDescription: 'Evaluación de hallazgos, conclusiones y recomendaciones.',
    weeks: 'S14 - S15',
    deliverable: 'Capítulo de impacto.',
    status: 'Completado',
  },
  {
    phase: 'Fase IV: Cierre',
    activityCode: '4.2',
    taskDescription: 'Consolidación del documento final en formato CUN / APA 7.',
    weeks: 'S16',
    deliverable: 'Anteproyecto final listo.',
    status: 'Completado',
  },
];

export const arbolDeProblemas: ProblemTreeNode = {
  rootCauses: [
    {
      id: 'causa-1',
      title: 'Causa 1: Aprovisionamiento térmico reactivo',
      subtitle: 'Enfriamiento HVAC continuo al 100%',
      description:
        'Los sistemas de climatización no se anticipan a los picos de calor; se activan solo después de que se registran elevaciones térmicas, provocando sobre-enfriamiento conservador continuo.',
      impact: 'Sobrecosto energético del 40% en compresores mecánicos.',
    },
    {
      id: 'causa-2',
      title: 'Causa 2: Crecimiento desbalanceado de cargas IA',
      subtitle: 'Incremento sostenido (+14% anual)',
      description:
        'Entrenamiento e inferencia de modelos de inteligencia artificial y computación en la nube que concentran calor súbito en racks específicos sin pre-enfriamiento localizado.',
      impact: 'Riesgo de puntos calientes (hotspots) y estrés térmico en hardware.',
    },
    {
      id: 'causa-3',
      title: 'Causa 3: Ausencia de algoritmos predictivos',
      subtitle: 'Telemetría SNMP desconectada de los actuadores',
      description:
        'Aunque los servidores generan métricas continuas de CPU, RAM y red, no existe un puente analítico automatizado hacia los controladores de los chillers y manejadoras de aire.',
      impact: 'Incapacidad de aprovechar el potencial de free-cooling de la Sabana de Bogotá.',
    },
  ],
  centralProblem: {
    title: 'PROBLEMA CENTRAL',
    description:
      'Ineficiencia y alto consumo energético no optimizado en los centros de datos corporativos de la Sabana de Bogotá para el periodo 2026–2030.',
    geographicScope: 'Sabana de Bogotá y zona metropolitana (Centros Tier III y Tier IV)',
    temporalHorizon: 'Periodo 2026 - 2030',
  },
  directEffects: [
    {
      id: 'efecto-1',
      title: 'Efecto 1 (Técnico)',
      type: 'Técnico',
      metric: 'PUE hasta 1.90',
      description:
        'Degradación severa del indicador PUE hasta alcanzar valores cercanos a 1.90, representando un alto desperdicio energético en comparación con estándares mundiales.',
    },
    {
      id: 'efecto-2',
      title: 'Efecto 2 (Económico)',
      type: 'Económico',
      metric: '$2.49 Millones USD',
      description:
        'Sobrecostos operativos (OPEX) acumulados de hasta $2.49 millones de dólares estadounidenses por instalación hacia el año 2030 en tarifas eléctricas.',
    },
    {
      id: 'efecto-final',
      title: 'Efecto Final (Ambiental & Infraestructura)',
      type: 'Ambiental',
      metric: '1,628 t CO2eq & Red Regional',
      description:
        'Riesgo crítico de saturación sobre la red eléctrica interconectada regional y generación excesiva de más de 2,300 toneladas de CO2eq (con 1,628 t CO2eq evitables).',
    },
  ],
  analyticalBreakdown:
    'El análisis del diagrama evidencia que la causa primaria radica en la falta de un puente analítico entre los datos de telemetría del servidor y los actuadores de climatización HVAC. Al no existir una estimación previa del consumo a 6 horas vista, el sistema opera bajo una lógica conservadora manteniéndose al máximo nivel de potencia refrigerante, lo que desencadena un desperdicio continuo que degrada el PUE y sobrecarga la facturación eléctrica.',
};

export const alternativasSolucion: SolutionAlternativeItem[] = [
  {
    id: 'alt-1',
    title: 'Alternativa 1 - Infraestructura Física (Sustitución de Hardware)',
    type: 'Infraestructura Física (Hardware)',
    selected: false,
    description:
      'Consiste en reemplazar de forma masiva los equipos de aire acondicionado por tecnologías de refrigeración líquida por inmersión de última generación.',
    capex: 'Extremadamente Elevado (Inversión millonaria en nuevos chasis e infraestructura)',
    opex: 'Reducción en refrigeración a costa de alta amortización de activos',
    roi: '> 5 años (Inviable a corto plazo)',
    techDetails: [
      'Sustitución física integral de racks y chasis de servidores existentes.',
      'Riesgos operacionales de interrupción de disponibilidad 24/7 (SLA Tier III/IV).',
      'Descarte prematuro de equipamiento funcional con vida útil remanente.',
    ],
    justification:
      'Descartada: Aunque esta alternativa ofrece reducciones sustanciales en el PUE, su implementación requiere inversiones de capital (CAPEX) extremadamente elevadas y la sustitución completa del chasis de los servidores existentes, resultando inviable a corto plazo para la muestra de instalaciones estudiadas.',
  },
  {
    id: 'alt-2',
    title: 'Alternativa 2 - Solución Software Basada en IA Predictiva (Seleccionada)',
    type: 'Solución Software Basada en IA Predictiva',
    selected: true,
    description:
      'Desarrollo e integración de una capa de software analítico basada en redes neuronales LSTM que procesa la telemetría SNMP en tiempo real y entrega predicciones de consumo energético con 6 horas de antelación.',
    capex: 'Bajo / Moderado (Despliegue de software analítico sin tocar chasis)',
    opex: 'Ahorro acumulado de $2.49 millones de USD en energía eléctrica',
    roi: '< 8 meses (Retorno de inversión ágil)',
    techDetails: [
      'No requiere reemplazar la infraestructura física existente.',
      'Conexión directa vía APIs con el sistema DCIM (Data Center Infrastructure Management).',
      'Ajuste dinámico del SetPoint de los chillers anticipándose a la inercia térmica.',
      'Redirección y balanceo de cargas de cómputo hacia servidores con mejor rendimiento térmico.',
      'Aprovechamiento activo del clima frío de Bogotá para ciclos de free-cooling.',
    ],
    justification:
      'Estrategia Seleccionada: La Alternativa 2 fue seleccionada por ofrecer una relación costo-beneficio óptima, permitiendo alcanzar una reducción del 22.1% en el consumo energético anual para 2030 con un tiempo de retorno de inversión inferior a 8 meses.',
  },
];

export const antecedentes15Referentes: AntecedenteReference[] = [
  // 5 Locales (Bogotá)
  {
    id: 'ref-loc-1',
    territorialLevel: 'Local (Bogotá)',
    number: 1,
    citation: 'Secretaría Distrital de Ambiente de Bogotá (2020)',
    year: 2020,
    entityOrAuthors: 'Secretaría Distrital de Ambiente de Bogotá',
    coreContribution:
      'En el marco del Plan de Acción Climática 2020-2050, identificó que el crecimiento sostenido de la infraestructura de conectividad y telecomunicaciones en Bogotá impone una demanda creciente sobre la red eléctrica, planteando metas obligatorias de monitoreo y eficiencia.',
    apaFullCitation:
      'Secretaría Distrital de Ambiente. (2020). Plan de Acción Climática de Bogotá 2020-2050: Hacia una Bogotá carbono neutral. Alcaldía Mayor de Bogotá. https://www.ambientebogota.gov.co/',
    link: 'https://www.ambientebogota.gov.co/',
  },
  {
    id: 'ref-loc-2',
    territorialLevel: 'Local (Bogotá)',
    number: 2,
    citation: 'Alcaldía Mayor de Bogotá (2019)',
    year: 2019,
    entityOrAuthors: 'Alcaldía Mayor de Bogotá',
    coreContribution:
      'En el Inventario Distrital de Gases de Efecto Invernadero, estableció que el consumo intensivo de electricidad derivado de instalaciones de servicios continuos y tecnología representa uno de los focos prioritarios en emisiones indirectas.',
    apaFullCitation:
      'Alcaldía Mayor de Bogotá. (2019). Inventario distrital de emisiones de gases de efecto invernadero de Bogotá D.C. Secretaría Distrital de Ambiente. https://www.ambientebogota.gov.co/',
    link: 'https://www.ambientebogota.gov.co/',
  },
  {
    id: 'ref-loc-3',
    territorialLevel: 'Local (Bogotá)',
    number: 3,
    citation: 'MinTIC (2024)',
    year: 2024,
    entityOrAuthors: 'Ministerio de Tecnologías de la Información y las Comunicaciones',
    coreContribution:
      'Reportó que la consolidación de Bogotá como eje de procesamiento y servicios de nube requiere expandir la infraestructura de centros de datos de alta capacidad bajo criterios de sostenibilidad y control térmico avanzado.',
    apaFullCitation:
      'Ministerio de Tecnologías de la Información y las Comunicaciones. (2024). El país avanzará en la construcción de data center para fortalecer el uso y la aplicación de la inteligencia artificial. MinTIC. https://www.mintic.gov.co/',
    link: 'https://www.mintic.gov.co/',
  },
  {
    id: 'ref-loc-4',
    territorialLevel: 'Local (Bogotá)',
    number: 4,
    citation: 'UPME (2022)',
    year: 2022,
    entityOrAuthors: 'Unidad de Planeación Minero Energética',
    coreContribution:
      'Mediante el Plan PROURE 2022-2030, fijó directrices sectoriales para la gestión activa de la demanda eléctrica en el sector comercial e industrial, resaltando que la digitalización y el monitoreo automatizado mitigan sobrecargas del sistema eléctrico regional.',
    apaFullCitation:
      'Unidad de Planeación Minero Energética. (2022). Resolución 40156 de 2022: Por la cual se adopta el Plan de Acción Indicativo 2022-2030 del Programa de Uso Racional y Eficiente de la Energía (PROURE). Ministerio de Minas y Energía. https://docs.upme.gov.co/',
    link: 'https://docs.upme.gov.co/',
  },
  {
    id: 'ref-loc-5',
    territorialLevel: 'Local (Bogotá)',
    number: 5,
    citation: 'Silva García (2024)',
    year: 2024,
    entityOrAuthors: 'Silva García, C. E. (UNAD)',
    coreContribution:
      'Formuló una estrategia de monitoreo proactivo basada en el protocolo SNMP para servidores y dispositivos de data center, demostrando que la telemetría periódica anticipa fallas operacionales y mitiga el desperdicio energético.',
    apaFullCitation:
      'Silva García, C. E. (2024). Estrategia de monitoreo integral proactivo, apoyada en el protocolo SNMP para servidores, redes de comunicaciones y elementos de seguridad del data center [Tesis de Maestría, UNAD]. https://repository.unad.edu.co/handle/10596/82264',
    link: 'https://repository.unad.edu.co/handle/10596/82264',
  },

  // 5 Nacionales (Colombia)
  {
    id: 'ref-nac-6',
    territorialLevel: 'Nacional (Colombia)',
    number: 6,
    citation: 'Arias-Castrillón (2020)',
    year: 2020,
    entityOrAuthors: 'Arias-Castrillón, J. C.',
    coreContribution:
      'Expuso que la delimitación y formulación de un problema en ingeniería requiere articular deductiva y cuantitativamente las variables independientes causales frente a los efectos observables (enlace causal entre telemetría del servidor y climatización).',
    apaFullCitation:
      'Arias-Castrillón, J. C. (2020). Plantear y formular un problema de investigación: un ejercicio de razonamiento. Revista Lasallista de Investigación, 17(1), 301–313. https://doi.org/10.22507/rli.v17n1a26',
    link: 'https://doi.org/10.22507/rli.v17n1a26',
  },
  {
    id: 'ref-nac-7',
    territorialLevel: 'Nacional (Colombia)',
    number: 7,
    citation: 'Velásquez et al. (2009)',
    year: 2009,
    entityOrAuthors: 'Velásquez, J. D., Franco, C. J., & García, H. A.',
    coreContribution:
      'Evaluaron modelos conexionistas no lineales para pronosticar series de demanda eléctrica en Colombia, demostrando que las redes neuronales capturan con superior precisión la dinámica estacional frente a formulaciones econométricas lineales.',
    apaFullCitation:
      'Velásquez, J. D., Franco, C. J., & García, H. A. (2009). Un modelo no lineal para la predicción de la demanda mensual de electricidad en Colombia. Estudios Gerenciales, 25(112), 37–54. http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S0123-59232009000300003',
    link: 'http://www.scielo.org.co/scielo.php?script=sci_arttext&pid=S0123-59232009000300003',
  },
  {
    id: 'ref-nac-8',
    territorialLevel: 'Nacional (Colombia)',
    number: 8,
    citation: 'Montoya-Giraldo et al. (2023)',
    year: 2023,
    entityOrAuthors: 'Montoya-Giraldo, F., López-Cadavid, D., & Martínez-Londoño, E.',
    coreContribution:
      'Demostraron la efectividad de las redes LSTM para modelado de series de tiempo de alta frecuencia, comprobando cómo sus compuertas internas de memoria gestionan la autocorrelación temporal minimizando el error cuadrático medio.',
    apaFullCitation:
      'Montoya-Giraldo, F., López-Cadavid, D., & Martínez-Londoño, E. (2023). Redes neuronales aplicadas al control estadístico de procesos con series de tiempo. Tecnura, 27(75), 72–88. https://doi.org/10.14483/22487638.19231',
    link: 'https://doi.org/10.14483/22487638.19231',
  },
  {
    id: 'ref-nac-9',
    territorialLevel: 'Nacional (Colombia)',
    number: 9,
    citation: 'Mejía-Giraldo et al. (2016)',
    year: 2016,
    entityOrAuthors: 'Mejía-Giraldo, D., Velásquez, J. D., & Dyner, I.',
    coreContribution:
      'Determinaron que la integración de covariables operativas y térmicas incrementa de forma significativa la precisión predictiva frente a series univariadas convencionales de demanda eléctrica.',
    apaFullCitation:
      'Mejía-Giraldo, D., Velásquez, J. D., & Dyner, I. (2016). Pronóstico de la demanda de electricidad en Colombia utilizando técnicas de inteligencia artificial. Revista Facultad de Ingeniería Universidad de Antioquia, (78), 114–122.',
  },
  {
    id: 'ref-nac-10',
    territorialLevel: 'Nacional (Colombia)',
    number: 10,
    citation: 'CONPES 3975 (2019)',
    year: 2019,
    entityOrAuthors: 'Consejo Nacional de Política Económica y Social (DNP Colombia)',
    coreContribution:
      'Priorizó el despliegue de soluciones basadas en inteligencia artificial y analítica de datos en infraestructuras estratégicas del país para impulsar la sostenibilidad y eficiencia energética operativa.',
    apaFullCitation:
      'Consejo Nacional de Política Económica y Social. (2019). Documento CONPES 3975: Política Nacional para la Transformación Digital e Inteligencia Artificial. DNP. https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/3975.pdf',
    link: 'https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/3975.pdf',
  },

  // 5 Internacionales
  {
    id: 'ref-int-11',
    territorialLevel: 'Internacional',
    number: 11,
    citation: 'Evans y Gao (2016) - Google DeepMind',
    year: 2016,
    entityOrAuthors: 'Evans, R., & Gao, J. (Google DeepMind Research)',
    coreContribution:
      'Documentaron la aplicación empírica de redes neuronales profundas para la supervisión y control del sistema de climatización en las instalaciones de Google, comprobando que la predicción anticipada del consumo energético permite reducir en un 40% la potencia eléctrica demandada por los equipos de refrigeración.',
    apaFullCitation:
      'Evans, R., & Gao, J. (2016). DeepMind AI reduces Google data centre cooling bill by 40%. Google DeepMind Research. https://deepmind.google/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/',
    link: 'https://deepmind.google/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/',
  },
  {
    id: 'ref-int-12',
    territorialLevel: 'Internacional',
    number: 12,
    citation: 'Hochreiter y Schmidhuber (1997)',
    year: 1997,
    entityOrAuthors: 'Hochreiter, S., & Schmidhuber, J.',
    coreContribution:
      'Desarrollaron los fundamentos de las arquitecturas de memoria a corto y largo plazo (LSTM), concebidas para mitigar el problema del desvanecimiento del gradiente en secuencias temporales continuas, fundamentando técnicamente la selección del modelo para consumo en data centers.',
    apaFullCitation:
      'Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. Neural Computation, 9(8), 1735–1780. https://doi.org/10.1162/neco.1997.9.8.1735',
    link: 'https://doi.org/10.1162/neco.1997.9.8.1735',
  },
  {
    id: 'ref-int-13',
    territorialLevel: 'Internacional',
    number: 13,
    citation: 'Climate Neutral Data Centre Pact [CNDCP] (2021)',
    year: 2021,
    entityOrAuthors: 'European Commission Climate Neutral Coalition',
    coreContribution:
      'Formalizó el marco regulatorio internacional fijando como indicador vinculante de sostenibilidad un índice PUE máximo de 1.40 en 2025 y una meta estricta de 1.30 para instalaciones operativas hacia el año 2030.',
    apaFullCitation:
      'Climate Neutral Data Centre Pact. (2021). European data centre operator pact for climate neutrality by 2030. European Commission Climate Neutral Coalition. https://www.climateneutraldatacentre.net/',
    link: 'https://www.climateneutraldatacentre.net/',
  },
  {
    id: 'ref-int-14',
    territorialLevel: 'Internacional',
    number: 14,
    citation: 'Reddy et al. (2017) - IEEE',
    year: 2017,
    entityOrAuthors: 'Reddy, V. D., Setz, B., Gangadharan, G. R., & Aiello, M.',
    coreContribution:
      'Estructuraron una taxonomía estandarizada sobre métricas de sostenibilidad en centros de datos para el IEEE, estableciendo que el monitoreo sistemático de cómputo y climatización constituye la base formal para optimizar el ratio PUE.',
    apaFullCitation:
      'Reddy, V. D., Setz, B., Gangadharan, G. R., & Aiello, M. (2017). Metrics for sustainable data centers. IEEE Transactions on Sustainable Computing, 2(3), 290–303. https://doi.org/10.1109/TSUSC.2017.2701883',
    link: 'https://doi.org/10.1109/TSUSC.2017.2701883',
  },
  {
    id: 'ref-int-15',
    territorialLevel: 'Internacional',
    number: 15,
    citation: 'Li et al. (2020) - IEEE Transactions',
    year: 2020,
    entityOrAuthors: 'Li, Y., Wen, Y., Guan, K., & Tao, D.',
    coreContribution:
      'Demostraron mediante modelos de aprendizaje profundo que acoplar las predicciones de consumo de cómputo a las consignas térmicas de los sistemas de enfriamiento reduce drásticamente el consumo global en data centers sin comprometer la seguridad operativa.',
    apaFullCitation:
      'Li, Y., Wen, Y., Guan, K., & Tao, D. (2020). Transforming cooling optimization for green data centers via deep reinforcement learning. IEEE Transactions on Cybernetics, 50(5), 2002–2013. https://doi.org/10.1109/TCYB.2019.2922452',
    link: 'https://doi.org/10.1109/TCYB.2019.2922452',
  },
];

// Muestra de telemetria horaria de 24 horas para visualizacion en tiempo real
export const muestraTelemetria24Horas: TelemetrySample[] = [
  { timestamp: '2025-06-15 00:00', hourOfYear: 3984, dayOfYear: 166, hourOfDay: 0, dcId: 'DC-BOG-01', cpuPct: 32.4, ramGb: 210.5, networkGbps: 18.2, ambientTempC: 10.4, powerKwh: 968.2, pueRatio: 1.83 },
  { timestamp: '2025-06-15 01:00', hourOfYear: 3985, dayOfYear: 166, hourOfDay: 1, dcId: 'DC-BOG-01', cpuPct: 28.1, ramGb: 198.0, networkGbps: 14.5, ambientTempC: 9.8, powerKwh: 932.4, pueRatio: 1.82 },
  { timestamp: '2025-06-15 02:00', hourOfYear: 3986, dayOfYear: 166, hourOfDay: 2, dcId: 'DC-BOG-01', cpuPct: 24.5, ramGb: 184.2, networkGbps: 12.0, ambientTempC: 9.2, powerKwh: 899.8, pueRatio: 1.81 },
  { timestamp: '2025-06-15 03:00', hourOfYear: 3987, dayOfYear: 166, hourOfDay: 3, dcId: 'DC-BOG-01', cpuPct: 23.8, ramGb: 180.0, networkGbps: 11.2, ambientTempC: 8.8, powerKwh: 888.5, pueRatio: 1.81 },
  { timestamp: '2025-06-15 04:00', hourOfYear: 3988, dayOfYear: 166, hourOfDay: 4, dcId: 'DC-BOG-01', cpuPct: 26.2, ramGb: 190.5, networkGbps: 13.4, ambientTempC: 8.5, powerKwh: 914.0, pueRatio: 1.81 },
  { timestamp: '2025-06-15 05:00', hourOfYear: 3989, dayOfYear: 166, hourOfDay: 5, dcId: 'DC-BOG-01', cpuPct: 34.0, ramGb: 220.4, networkGbps: 20.8, ambientTempC: 8.9, powerKwh: 985.2, pueRatio: 1.82 },
  { timestamp: '2025-06-15 06:00', hourOfYear: 3990, dayOfYear: 166, hourOfDay: 6, dcId: 'DC-BOG-01', cpuPct: 48.6, ramGb: 265.0, networkGbps: 32.5, ambientTempC: 10.2, powerKwh: 1120.4, pueRatio: 1.83 },
  { timestamp: '2025-06-15 07:00', hourOfYear: 3991, dayOfYear: 166, hourOfDay: 7, dcId: 'DC-BOG-01', cpuPct: 62.4, ramGb: 330.2, networkGbps: 48.0, ambientTempC: 12.1, powerKwh: 1285.0, pueRatio: 1.84 },
  { timestamp: '2025-06-15 08:00', hourOfYear: 3992, dayOfYear: 166, hourOfDay: 8, dcId: 'DC-BOG-01', cpuPct: 78.5, ramGb: 410.8, networkGbps: 68.2, ambientTempC: 14.5, powerKwh: 1460.5, pueRatio: 1.85 },
  { timestamp: '2025-06-15 09:00', hourOfYear: 3993, dayOfYear: 166, hourOfDay: 9, dcId: 'DC-BOG-01', cpuPct: 84.2, ramGb: 445.0, networkGbps: 76.5, ambientTempC: 16.8, powerKwh: 1548.0, pueRatio: 1.86 },
  { timestamp: '2025-06-15 10:00', hourOfYear: 3994, dayOfYear: 166, hourOfDay: 10, dcId: 'DC-BOG-01', cpuPct: 88.0, ramGb: 470.5, networkGbps: 82.0, ambientTempC: 18.4, powerKwh: 1612.4, pueRatio: 1.87 },
  { timestamp: '2025-06-15 11:00', hourOfYear: 3995, dayOfYear: 166, hourOfDay: 11, dcId: 'DC-BOG-01', cpuPct: 86.4, ramGb: 462.0, networkGbps: 80.4, ambientTempC: 19.5, powerKwh: 1598.0, pueRatio: 1.87 },
  { timestamp: '2025-06-15 12:00', hourOfYear: 3996, dayOfYear: 166, hourOfDay: 12, dcId: 'DC-BOG-01', cpuPct: 76.0, ramGb: 420.0, networkGbps: 71.0, ambientTempC: 20.2, powerKwh: 1492.2, pueRatio: 1.86 },
  { timestamp: '2025-06-15 13:00', hourOfYear: 3997, dayOfYear: 166, hourOfDay: 13, dcId: 'DC-BOG-01', cpuPct: 74.2, ramGb: 405.0, networkGbps: 69.5, ambientTempC: 20.8, powerKwh: 1475.0, pueRatio: 1.86 },
  { timestamp: '2025-06-15 14:00', hourOfYear: 3998, dayOfYear: 166, hourOfDay: 14, dcId: 'DC-BOG-01', cpuPct: 85.5, ramGb: 458.2, networkGbps: 79.0, ambientTempC: 19.8, powerKwh: 1588.6, pueRatio: 1.87 },
  { timestamp: '2025-06-15 15:00', hourOfYear: 3999, dayOfYear: 166, hourOfDay: 15, dcId: 'DC-BOG-01', cpuPct: 87.1, ramGb: 465.0, networkGbps: 81.2, ambientTempC: 18.6, powerKwh: 1604.0, pueRatio: 1.87 },
  { timestamp: '2025-06-15 16:00', hourOfYear: 4000, dayOfYear: 166, hourOfDay: 16, dcId: 'DC-BOG-01', cpuPct: 83.0, ramGb: 438.0, networkGbps: 75.0, ambientTempC: 17.2, powerKwh: 1532.5, pueRatio: 1.86 },
  { timestamp: '2025-06-15 17:00', hourOfYear: 4001, dayOfYear: 166, hourOfDay: 17, dcId: 'DC-BOG-01', cpuPct: 79.4, ramGb: 418.5, networkGbps: 70.0, ambientTempC: 15.8, powerKwh: 1478.0, pueRatio: 1.85 },
  { timestamp: '2025-06-15 18:00', hourOfYear: 4002, dayOfYear: 166, hourOfDay: 18, dcId: 'DC-BOG-01', cpuPct: 68.2, ramGb: 360.0, networkGbps: 56.4, ambientTempC: 14.1, powerKwh: 1340.2, pueRatio: 1.84 },
  { timestamp: '2025-06-15 19:00', hourOfYear: 4003, dayOfYear: 166, hourOfDay: 19, dcId: 'DC-BOG-01', cpuPct: 58.0, ramGb: 315.0, networkGbps: 44.0, ambientTempC: 13.0, powerKwh: 1225.0, pueRatio: 1.83 },
  { timestamp: '2025-06-15 20:00', hourOfYear: 4004, dayOfYear: 166, hourOfDay: 20, dcId: 'DC-BOG-01', cpuPct: 49.5, ramGb: 280.0, networkGbps: 36.2, ambientTempC: 12.2, powerKwh: 1130.8, pueRatio: 1.83 },
  { timestamp: '2025-06-15 21:00', hourOfYear: 4005, dayOfYear: 166, hourOfDay: 21, dcId: 'DC-BOG-01', cpuPct: 42.0, ramGb: 245.0, networkGbps: 28.5, ambientTempC: 11.6, powerKwh: 1052.0, pueRatio: 1.82 },
  { timestamp: '2025-06-15 22:00', hourOfYear: 4006, dayOfYear: 166, hourOfDay: 22, dcId: 'DC-BOG-01', cpuPct: 36.8, ramGb: 225.0, networkGbps: 22.0, ambientTempC: 11.0, powerKwh: 998.4, pueRatio: 1.82 },
  { timestamp: '2025-06-15 23:00', hourOfYear: 4007, dayOfYear: 166, hourOfDay: 23, dcId: 'DC-BOG-01', cpuPct: 33.5, ramGb: 212.0, networkGbps: 19.4, ambientTempC: 10.6, powerKwh: 972.0, pueRatio: 1.82 },
];
