# Modelo de navegación actualizado — TalleresPro Fase 2 (Deliverable 3)

> Fuente normativa: `Fase 2/modelo_navegacion_fase_2.puml` (este documento lo
> explica). Base: `Fase 1/diagrama_navegacion.puml` + Sección 8.3–Sección 8.5 + matriz Sección E.
> No se crean páginas fuera de V-01–V-11 salvo las técnicas 403/404
> (propuesta por RNF-05). Pendientes P-01/P-02/P-03 se heredan sin resolver.

## 1. Navegación primaria

Barra lateral en desktop, menú plegable en móvil (RNF-09). **[Propuesta]** el
contenedor; los módulos son confirmados (Fase 1 Sección 8.3):

- Principal: Dashboard (V-02), Órdenes (V-08), Citas (V-07).
- Registros: Clientes (V-04), Vehículos (V-05), Servicios (V-06).
- Recursos: Inventario (V-09), Finanzas (V-10).
- Gestión: Reportes (V-11), Usuarios (V-03).

Filtrado por rol (Sección 4): cada rol solo ve sus módulos ●/◐. El módulo activo se
resalta (RNF-03). El logo/nombre "TalleresPro" vuelve al punto de partida del
rol (V-02 para Admin; módulo principal para el resto — P-01).

## 2. Navegación secundaria

Dentro de cada módulo (confirmada en Sección 8.3):

- Lista ↔ Formulario ↔ Detalle según Sección 8.3 (ej. V-04a ↔ V-04c ↔ V-04b).
- Pestañas o secciones dentro del detalle **[Propuesta de presentación]**:
  - V-05c: Datos | Historial de reparaciones (RF-12).
  - V-08c: Resumen | Diagnóstico y tareas | Pagos y factura | Salidas asociadas.
  - V-04c: Datos | Vehículos del cliente.
  - V-10b: Ingresos | Gastos (mismo RF-31/32, dos pestañas visuales).
  - V-11a: tipo (Reparaciones/Inventario/Financiero) + filtros + fecha.
- Acciones contextuales en cada vista (botones): Nuevo, Ver, Editar,
  Desactivar (con confirmación), Agendar, Crear orden, Cobrar, Facturar,
  Registrar movimiento. Solo aparecen si el rol tiene permiso (no solo
  deshabilitados).

## 3. Migas y navegación contextual

**[Propuesta]** patrón de migas (exigido por RNF-03, formato propuesto):

- `Órdenes › Lista › ORD-001 › Detalle` · `Clientes › Nuevo` ·
  `Inventario › Registrar salida` · `Reportes › Resultado`.
- Cada miga salvo la última es enlace. Además cada vista tiene botón
  Volver (al padre) y cada formulario Cancelar (descarta sin guardar y vuelve
  a la lista/detalle de origen, conservando filtros cuando sea posible).
- Enlaces cruzados confirmados (Sección 8.5): cliente→vehículo, vehículo→orden,
  cita→orden (precarga), orden→cobro→factura, orden→salida asociada,
  dashboard→módulo (drill-down CU-15 A1). Cada destino muestra de dónde vino
  (ej. "Crear orden · desde cita CIT-004" con enlace a la cita).

## 4. Visibilidad por rol y accesos directos

| Vista | Admin | Recep. | Técnico | Inventario | Admvo. |
|---|---|---|---|---|---|
| V-01 | ● | ● | ● | ● | ● |
| V-02 Dashboard | ● | — (P-01) | — (P-01) | — (P-01) | — (P-01) |
| V-03 Usuarios | ● | — | — | — | — |
| V-04 Clientes | ● sec ◐ | ● | — | — | — |
| V-05 Vehículos | ● sec ◐ | ● | — | — | — |
| V-06 Servicios | ● | ◐ P-02 | — | — | — |
| V-07 Citas | ● | ● | — | — | — |
| V-08 Lista/crear | ● | ● | ◐ | ◐ | ◐ |
| V-08 Detalle edición | ◐ P-03 | ◐ lee | ● | — | ◐ lee |
| V-09 Productos | ● sec | — | — | ● | — |
| V-09 Movimientos | ◐ lee | — | — | ● | — |
| V-10 Cobros/IG/Facturas | ◐ lee | — | — | — | ● |
| V-11 Reportes | ● | — | — | — | ● |

Atajos (confirmados): drill-down V-02 → V-08a/V-07a/V-09a/V-10b (CU-15 A1);
V-05c → V-08b; V-07a → V-08b; V-04c → V-05b; V-08c → V-10a → V-10c;
V-08c → V-09c. Los atajos respetan el rol: si el rol no tiene acceso al
destino, el enlace no se muestra (en vez de llevar a un 403).

Nota sobre V-07 y V-08 Lista/crear: el Administrador figura con ● sin
calificador, tal como en Fase 1 Sección 8.4. Es su acceso general (Sección 2); el rol
primario operativo diario es la Recepcionista (CU-06/CU-07). No se inventa
ninguna restricción al Administrador en estas vistas.

## 5. Listas, detalles y formularios (ida y vuelta)

| Origen → Destino | Guardar | Cancelar / Volver | Confirmación |
|---|---|---|---|
| V-03a → V-03b | Valida (correo único, rol válido — CU-02 E1/E2) → V-03a con "Usuario guardado" | Descarta → V-03a | Bloquear rol (A1): aplica al siguiente ingreso, se informa |
| V-04a → V-04b / V-04c → V-04b | Valida (obligatorios, duplicado — CU-03 E1/E2) → detalle o lista con aviso | Descarta → origen | Desactivar (RF-08): diálogo; si tiene órdenes activas **[Pendiente]** se advierte (CU-03 E3) |
| V-05a/V-04c → V-05b | Valida (placa única propuesta — CU-04 E1) → V-05c | Descarta → origen | Sin borrado; cliente inactivo bloquea vínculo (CU-04 E2) |
| V-06a → V-06b | Valida (precio > 0, nombre único — CU-05 E1) → V-06a | Descarta → V-06a | — |
| V-07a → V-07b | Valida (fecha futura, sin traslape propuesto — CU-06 E1) → V-07a | Descarta → V-07a | Cancelar cita: diálogo (RF-27); cita atendida/cancelada no se duplica (E3) |
| V-08a → V-08b | Valida (cliente+vehículo existentes, problema obligatorio — CU-07 E1/E2) → V-08c en "Recibido" | Descarta → V-08a | Sin servicios todavía: permitido (A2), quedan para diagnóstico |
| V-08a → V-08c (editar diag/tareas/estado) | Valida (transición **[Pendiente]** — CU-08 E2) → V-08c actualizado | Descarta → V-08c | Cierre sin diagnóstico: validar e informar, regla pendiente |
| V-09a → V-09b | Valida (stock ≥ 0 — CU-09 E2) → V-09a | Descarta → V-09a | — |
| V-09a/V-08c → V-09c | Valida (cantidad > 0, stock suficiente — CU-10 E1/E2) → lista actualizada + V-09d si aplica | Descarta → origen | Confirmar operación antes de descontar (Esc-5 paso 5) |
| V-08c → V-10a | Valida (monto > 0, método elegido — CU-11 E3; sobrepago **[Pendiente]** E1) → V-08c/V-10a con saldo recalculado | Descarta → V-08c | Pago parcial/total: se informa el saldo restante (A1/A2) |
| V-10a → V-10c | Exige cobro previo (CU-13 E1) → factura con consecutivo → vista de factura | Volver → V-10a | Reimpresión (A1) sin duplicar consecutivo |
| V-11a → V-11b | Valida (rango/fechas — CU-14 E1) → V-11b | Ajustar filtros → V-11a | Sin datos: mensaje + [Ajustar filtros] (E2), no tabla vacía |

Regla transversal (RNF-02/RNF-11): el error indica el campo exacto, el foco
va al primer error y los datos válidos no se pierden al reintentar.

## 6. Sin permiso, acciones inválidas y fallos

- Sin sesión en vista sensible → V-01 con "Inicia sesión para continuar"
  (RNF-04, CU-01 precondición).
- URL directa sin rol → 403 "Sin permiso para ver esta sección.
  [Volver a mi inicio]" (RF-04/RNF-05). **[Propuesta]** la página 403;
  el requisito (restringir por rol) es confirmado.
- Acción ◐ intentando editar (ej. Recepcionista guardando diagnóstico) →
  el botón no existe en su UI; si llega por URL manipulada, 403 + solo
  lectura (CU-08 E3). No se inventa permiso.
- Credenciales inválidas / cuenta desactivada → permanece en V-01 con
  mensaje (CU-01 E1/E2). Campos vacíos → indica qué corregir (E3).
- Stock insuficiente → no descuenta e informa disponible (CU-10 E2).
- Sobrepago → validación propuesta + regla **[Pendiente]** (Sección 7.8 n.º 3).
- Factura sin cobro → bloquea con enlace a cobros (CU-13 E1).
- Indicador del dashboard que falla → señala el error y mantiene los demás
  (CU-15 E2). Reporte sin datos → mensaje, no vacío inexplicado (CU-14 E2).

## 7. Relación Fase 1 → Fase 2

Fase 1 definió *qué vistas existen y qué rol accede* (Sección 8.3–Sección 8.5, diagrama).
Fase 2 conserva esa estructura y añade *cómo se recorre*: migas, retornos,
cancelaciones, confirmaciones, 403/404, solo-lectura explícito, atajos con
contexto ("desde cita/vehículo/orden") y el punto de partida por rol (P-01).
Ningún CU/RF cambió de vista (Sección 8.6 intacto).

## 8. Bitácora de cambios (retenido / refinado / propuesto / pendiente)

| Elemento Fase 1 | Estado Fase 2 | Detalle |
|---|---|---|
| V-01–V-11 + subvistas V-03a…V-11b | Retenido | Sin renombres; mismos RF/CU |
| Flechas principales (dashboard→módulos, internas, cruzadas F2–F5) | Retenido | Mismas que Sección 8.5 |
| Drill-down CU-15 A1 | Retenido | V-02 → V-08a/V-07a/V-09a/V-10b |
| Matriz rol–vista Sección 8.4 (●/◐/—) | Retenida + refinada | Se explicita "solo lectura" y 403; valores ●/◐/— sin cambios |
| F1–F7 flujos Sección 8.5 | Refinados | Ahora FL-01…FL-09 con pasos, alternos y errores (ver flujos_navegacion.md) |
| Punto de partida no-admin ("página inicial según rol") | Pendiente → propuesta provisional | P-01: cada rol a su módulo; marcado P-01 en diagrama y prototipo |
| Gestión V-06 por Recepcionista | Pendiente (P-02) | Solo usa; gestión solo Admin hasta confirmación |
| Edición V-08D por Admin | Pendiente (P-03) | Solo lectura hasta confirmación; edita el Técnico |
| Migas, Volver/Cancelar/Guardar, confirmaciones, 403/404 | Propuesto | Exigidos por RNF-01/02/03/05; formato propuesto, no RF nuevos |
| Aviso stock como bandeja global / campana | No incluido (pendiente Sección 8.7 n.º 4) | Solo insignia contextual V-09a/V-02 + V-09d |
| Exportación de reportes | Pendiente (Sección 6.5 n.º 10) | Solo ver; no se promete PDF/CSV |
| Creación cruzada cliente/vehículo desde orden/cita | Pendiente (Sección 8.7 n.º 5) | Se respeta CU-07 (debe preexistir); atajo marcado pendiente, no implementado como permiso |

## 9. Cómo defender este modelo

1. Cada flecha continua tiene un CU que la exige (ver Sección 5 y flujos).
2. Cada ◐/— tiene una fila en Sección 4 y una justificación en arquitectura Sección 8.
3. Todo P-0x aparece en el diagrama, en este documento, en wireframes, en el
   prototipo (etiqueta visible) y en la matriz de coherencia. Nada se ocultó.
4. Si el equipo confirma P-01/P-02/P-03, solo cambia Sección 4 y el filtrado del
   menú; la estructura V-xx no se renumera.
