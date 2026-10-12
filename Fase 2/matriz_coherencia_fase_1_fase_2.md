# Matriz de coherencia Fase 1 → Fase 2 — TalleresPro

> Ningún archivo de Fase 1 fue modificado. Los IDs RF/RNF/CU/Esc/V/clases se
> conservan sin renumerar. Estados: **Confirmado** (respaldado por Fase 1),
> **[Propuesta]** (diseño razonable por aprobar), **[Pendiente]** (ambigüedad
> heredada §§6.5/7.8/8.7, matriz §H — no resuelta en silencio).
> "Pantalla" = página V-xx + wireframe WF-xx + prototipo PT-xx.

## 1. RF-01–RF-38 → diseño

| ID Fase 1 | Fuente | Artefacto Fase 2 / pantalla | Decisión | Estado | Notas |
|---|---|---|---|---|---|
| RF-01 Registrar usuarios | CU-02, V-03 | WF-12, PT-10 (V-03a/b) | Lista + formulario con rol; correo único | Confirmado | Sin escenario (matriz §C); sin autorregistro (V-01 no registra) |
| RF-02 Login | CU-01, V-01 | WF-01, PT-01, FL-01 | Correo+contraseña; sesión con rol | Confirmado | Precondición de todo; E1–E3 en V-01 |
| RF-03 Asignar roles | CU-02, V-03 | WF-12, PT-10 | Rol por usuario (un rol, §7.5) | Confirmado | Rol inexistente → pedir válido (E2) |
| RF-04 Acceso por rol | §8.4, RNF-05 | Menú filtrado + 403 + ◐ solo lectura (IA §8, Nav §4) | Sin permiso → 403; ◐ sin botones de edición | Confirmado (requisito) / [Propuesta] (página 403) | Granularidad fina **[Pendiente P]** |
| RF-05 Registrar clientes | CU-03, V-04, Esc-1 | WF-03/04/05, PT-03, FL-02 | Formulario con obligatorios | Confirmado | Trazado con escenario |
| RF-06 Buscar/ver clientes | CU-03, V-04a | WF-03, PT-03 | Buscar + lista; sin coincidencias → ofrece registrar | Confirmado | — |
| RF-07 Editar cliente | CU-03, V-04b | WF-04/05, PT-03 | Editar desde lista/detalle | Confirmado | — |
| RF-08 Desactivar clientes | CU-03 A1, V-04 | WF-05, PT-03 | Diálogo; marca inactivo, no borra | Confirmado | Con órdenes activas **[Pendiente]** (E3) |
| RF-09 Registrar vehículos | CU-04, V-05b, Esc-2 | PT-04, FL-03 | Vinculado a cliente activo | Confirmado | Trazado |
| RF-10 Consultar vehículos | CU-04, V-05a | PT-04 (patrón WF-03) | Lista/buscar | Confirmado | Sin escenario; patrón retenido |
| RF-11 Editar vehículo | CU-04, V-05b | PT-04 | Formulario; placa única propuesta | Confirmado / [Pendiente] (unicidad exacta §7.8 n.º 5) | — |
| RF-12 Historial reparaciones | CU-04, V-05c | PT-04, FL-03 | Pestaña historial = órdenes del vehículo; vacío → mensaje | Confirmado | Técnico ◐ vía orden |
| RF-13 Crear órdenes | CU-07, V-08b, Esc-3 | WF-06, PT-05, FL-04 | Estado inicial Recibido | Confirmado | — |
| RF-14 Vincular orden-cliente-vehículo | CU-07, §7.6 R6 | WF-06, PT-05 | Doble referencia + validación | Confirmado / **[Pendiente R6]** (invariante por confirmar) | — |
| RF-15 Problema reportado | CU-07, V-08b | WF-06, PT-05 | Campo obligatorio | Confirmado | Vacío → E2 |
| RF-16 Diagnóstico y tareas | CU-08, V-08c, Esc-4 | WF-07, PT-06, FL-05 | Diagnóstico + tareas en detalle; Admin ◐ P-03 | Confirmado / **[Pendiente P-03]** (¿Admin edita?) | — |
| RF-17 Cambiar estado | CU-08, V-08c, Esc-4 | WF-07, PT-06 | Selector Recibido/En reparación/Listo (ejemplos RF-17) | Confirmado / **[Pendiente]** (catálogo y transiciones §6.5 n.º 4) | Cierre sin diagnóstico pendiente |
| RF-18 Consultar órdenes | CU-08 A1, V-08a/c | WF-06/07, PT-05/06 | Lista + detalle; ◐ para Recep/Admin/Inventario/Admvo | Confirmado | En Esc-4 como consulta |
| RF-19 Registrar repuestos | CU-09, V-09a/b | WF-08, PT-07 | Catálogo + stock inicial y mínimo | Confirmado | Sin escenario; previo a movimientos |
| RF-20 Entradas | CU-10, V-09c | WF-08, PT-07, FL-06 | Formulario entrada (suma) | Confirmado | Sin escenario (solo salida escenificada) |
| RF-21 Salidas | CU-10, V-09c, Esc-5 | WF-08, PT-07 | Salida general o asociada a orden (A1) | Confirmado | Trazado (salida) |
| RF-22 Stock automático | §7.6 R1, V-09c | WF-08, PT-07 (regla de fondo) | Movimiento actualiza; prohibido editar directo | Confirmado | Sin vista propia; la vista lo muestra |
| RF-23 Aviso stock bajo | §7.6 R3, V-09d+V-02 | WF-08/02, PT-07/02 | `stock ≤ mínimo` → aviso + insignia + indicador | Confirmado | Umbral = mínimo (CU-09); bandeja global **[Pendiente/no incluida]** |
| RF-24 Catálogo servicios | CU-05, V-06a | WF-12, PT-12 | Lista/buscar | Confirmado | Sin escenario; responsable P-02 |
| RF-25 Precio servicios | CU-05, V-06b | WF-12, PT-12 | Precio > 0; descripción opcional; foto en orden **[P]** | Confirmado / **[Pendiente]** (foto, moneda, impuestos) | Recep ◐ P-02 |
| RF-26 Agendar citas | CU-06, V-07b | WF-10, PT-11, FL-08 | Cliente+vehículo+servicio+fecha/hora | Confirmado | Sin escenario |
| RF-27 Editar/cancelar citas | CU-06, V-07b | WF-10, PT-11 | Reprogramar; cancelar con confirmación | Confirmado | Traslapes/duración/estados **[Pendiente]** |
| RF-28 Ver agenda | CU-06, V-07a | WF-10, PT-11 | Por día/filtros | Confirmado | — |
| RF-29 Cobros de órdenes | CU-11, V-10a, Esc-6 | WF-09, PT-08, FL-07 | Monto + método desde V-08c | Confirmado | Trazado |
| RF-30 Saldo pendiente | §7.6 R4, V-10a | WF-09, PT-08 (derivado) | `total − suma(pagos)`; sobrepago validado | Confirmado / **[Pendiente]** (sobrepago; fórmula del total) | La vista lo muestra, no lo edita |
| RF-31 Otros ingresos | CU-12, V-10b | WF-09, PT-08 | Concepto+monto+fecha | Confirmado | Sin escenario; sin vínculo a orden (§7.8 n.º 12) |
| RF-32 Gastos | CU-12, V-10b | WF-09, PT-08 | Análogo a ingresos | Confirmado | Clases separadas retenidas |
| RF-33 Factura interna | CU-13 extend, V-10c | WF-09, PT-08, FL-07 | Exige cobro; consecutivo único; interna simple | Confirmado / **[Pendiente]** (0..1 vs varias; contenido/impuestos) | Sin facturación gubernamental/bancos |
| RF-34 Reporte reparaciones | CU-14, V-11 | WF-11, PT-09, FL-09 | Selector + resultado | Confirmado | Sin escenario; insumos §D1 |
| RF-35 Reporte inventario | CU-14, V-11 | WF-11, PT-09 | Análogo | Confirmado | — |
| RF-36 Reporte financiero | CU-14, V-11 | WF-11, PT-09 | Pagos+ingresos+gastos | Confirmado | — |
| RF-37 Panel resumen | CU-15, V-02, Esc-7 | WF-02, PT-02, FL-09 | 4 indicadores + drill-down | Confirmado | Solo Admin confirmado; resto P-01 |
| RF-38 Contenido del panel | CU-15, V-02 | WF-02, PT-02 | Pendientes, citas día, poco stock, totales | Confirmado | Reglas de fondo mostradas, no formularios |

## 2. RNF-01–RNF-12 → diseño

| ID | Alcance Fase 1 | Dónde se cumple en Fase 2 | Estado |
|---|---|---|---|
| RNF-01 Comprensible | Todas las vistas | Vocabulario Fase 1 retenido; patrones lista/detalle/formulario; prototipo con ayudas | Confirmado |
| RNF-02 Mensajes claros | Formularios | Resumen + error por campo + foco al primero (WF-04, PT-03/05/07/08); textos propuestos | Confirmado (requisito) / [Propuesta] (redacción exacta) |
| RNF-03 Consistencia | V-01–V-11 | Mismo encabezado/menú/migas/botones en WF y PT; chequeado en validación | Confirmado |
| RNF-04 Login protege sensibles | CU-01 precondición | V-01 única entrada; sin sesión → V-01; prototipo lo simula | Confirmado |
| RNF-05 Restricción por rol | §8.4 | Menú filtrado + 403 + ◐ (IA §8, Nav §4, PT con selector de rol) | Confirmado / [Propuesta] (403) |
| RNF-06 Hash contraseñas | Usuario | No hay backend en Fase 2; prototipo no guarda nada (banner). Diseño no pide clave en claro salvo login | Confirmado (nada que implementar en IA) |
| RNF-07 Rendimiento razonable | Transversal | Estados de carga ("Cargando…", esqueleto) en WF-13/PT; sin métrica **[Pendiente]** (heredado) | Pendiente (sin meta, como en Fase 1) |
| RNF-08 Chrome/Edge/Firefox | Transversal | Prototipo solo HTML/CSS/JS estándar, sin dependencias; probar en esos 3 (checklist) | Confirmado (diseño compatible) |
| RNF-09 Responsive | V-01–V-11 | PT responsive (lateral → plegable ≤820px); WF indican `[Menú]` móvil | Confirmado (demo verificable) |
| RNF-10 Integridad referencial | Cliente/Vehículo/Orden/Producto | R6 validada (P), R1 (no editar stock), factura exige cobro, cliente inactivo bloquea vínculo | Confirmado / [Pendiente R6] |
| RNF-11 Validación previa | Formularios | Todos los WF-04/06/08/09 + PT validan de frente y conservan lo válido | Confirmado |
| RNF-12 Código modular | Implementación | PT en 3 archivos (index/styles/app) + .puml por diagrama; sin frameworks (exigido) | Confirmado (prototipo, no producción) |

## 3. Esc-1–Esc-7, CU-01–CU-15, V-01–V-11, roles y clases

| Fase 1 | Fase 2 | Estado |
|---|---|---|
| Esc-1 Registrar cliente → CU-03 | FL-02, WF-03/04/05, PT-03 | Confirmado |
| Esc-2 Registrar vehículo → CU-04 | FL-03, PT-04 | Confirmado |
| Esc-3 Crear orden → CU-07 | FL-04, WF-06, PT-05 | Confirmado |
| Esc-4 Actualizar reparación → CU-08 | FL-05, WF-07, PT-06 | Confirmado |
| Esc-5 Salida inventario → CU-10 | FL-06, WF-08, PT-07 | Confirmado (entradas sin escenario, cubiertas igual) |
| Esc-6 Registrar pago → CU-11 | FL-07, WF-09, PT-08 | Confirmado (+CU-13 factura opcional) |
| Esc-7 Dashboard → CU-15 | FL-09, WF-02, PT-02 | Confirmado |
| CU-01 (RF-02) | FL-01, WF-01, PT-01, V-01 | Confirmado |
| CU-02 (RF-01/03/04) | WF-12, PT-10, V-03 | Confirmado (sin escenario, como en matriz §C) |
| CU-03/CU-04 | FL-02/03, V-04/V-05 | Confirmado |
| CU-05 (RF-24/25) | WF-12, PT-12, V-06 | Confirmado + [Pendiente P-02] |
| CU-06 (RF-26–28) | FL-08, WF-10, PT-11, V-07 | Confirmado (sin escenario) |
| CU-07/CU-08 | FL-04/05, V-08 | Confirmado |
| CU-09/CU-10 | FL-06, V-09 | Confirmado |
| CU-11/CU-12/CU-13 | FL-07, V-10 | Confirmado |
| CU-14 (RF-34–36) | FL-09, WF-11, PT-09, V-11 | Confirmado (exportación pendiente, no prometida) |
| CU-15 (RF-37/38) | FL-09, WF-02, PT-02, V-02 | Confirmado (P-01 para no-admin) |
| V-01–V-11 + subvistas | Sitemap + Nav + WF + PT (mismos IDs, sin renumerar) | Confirmado 38/38 RF con vista (igual que matriz §E) |
| 5 roles (§2, §8.4, B1) | IA §8, Nav §4, PT selector de rol, matriz §1 RF-04 | Confirmado; P-01/P-02/P-03 pendientes señalados |
| 15 clases (§7.3–7.5) | IA §2/§7 (tabla dominio→clase), WF relacionados, Nav §5 | Confirmado; sin clases nuevas (Reportes/Dashboard siguen derivadas §7.7) |
| Navegación Fase 1 (§8.5 F1–F7) | FL-01–09 + Nav §8 bitácora | Retenido + refinado (migas/retornos/403 añadidos como propuesta) |
| Trazabilidad Fase 1 (matriz A–H) | Esta matriz (coherencia F1→F2) | Sin contradicciones introducidas; pendientes H heredados abajo |

## 4. Actualizaciones a modelos existentes (sin tocar originales)

No se modificó ningún archivo de `Fase 1/`. Las evoluciones viven solo en
`Fase 2/` y se justifican aquí:

| Original | Versión Fase 2 | Por qué | Qué cambió |
|---|---|---|---|
| `diagrama_navegacion.puml` (§8) | `Fase 2/modelo_navegacion_fase_2.puml` + `.md` | Añadir cómo se recorre (migas, retornos, 403, P-01) sin cambiar qué existe | +migas/retornos/403/P-01; =módulos, cruzadas, drill-down |
| Sitemap implícito §8.3 | `Fase 2/sitemap_fase_2.puml` | Hacer explícita la jerarquía página→subpágina + leyenda + técnicas 403/404 | Explicitado; sin páginas de negocio nuevas |
| F1–F7 §8.5 (resumen) | `Fase 2/flujos_navegacion.*` (FL-01–09) | Detallar pasos/alternos/errores con RF/CU/Esc para wireframes y prototipo | Detallado; mismos orígenes/destinos |
| V-01–V-11 (definición) | `Fase 2/wireframes.md` (WF-01–13) + `prototipo/` (PT-01–10) | Pasar de "qué vistas" a "cómo se ven y se usan" en baja y alta fidelidad | Instanciado; etiquetas idénticas |
| Matriz A–H Fase 1 | Este archivo (coherencia F1→F2) | Trazar cada RF/RNF/CU/Esc/V/rol/clase a su pantalla y decisión | Extendido, no reescrito |

## 5. Pendientes heredados (no resueltos; dónde aparecen en Fase 2)

1. **P-01 punto de partida no-admin** (§8.7 n.º 1): sitemap (InicioRol), Nav §4/§8, FL-01, WF-02, PT-02 + selector de rol. Propuesta provisional, no definitiva.
2. **P-02 Recepcionista gestiona servicios** (§6.5 n.º 1): IA §8, Nav §4, WF-12, PT-10, matriz RF-24/25. Solo usa hasta confirmación.
3. **P-03 Admin edita orden** (matriz P-03): IA §8, Nav §4, WF-07, PT-06, RF-16/17. Solo lee hasta confirmación.
4. **Factura:** cardinalidad 0..1 (§7.8 n.º 1), fórmula del total (n.º 2), sobrepago (n.º 3): RF-30/33, FL-07, WF-09, PT-08. Validación propuesta, regla pendiente.
5. **Precio foto** (§7.8 n.º 4): WF-06, PT-05. Copiado al momento, pendiente confirmar.
6. **Unicidades** (correo/placa/servicio/producto/consecutivo/documento, §7.8 n.º 5): WF-04/06/12, PT-03/05/10. Mensajes propuestos, reglas por confirmar.
7. **Estados y transiciones** (RF-17, §7.8 n.º 6): WF-07, PT-06, FL-05. Tres ejemplos visibles, resto pendiente.
8. **Citas** (traslapes/duración/servicio/estados, §7.8 n.º 7): WF-10, PT-04, FL-08.
9. **Cliente–vehículo–orden R6 + desactivar con activos** (§7.8 n.º 8, RF-08): IA §7, WF-05/06, FL-02/04. Se valida y advierte, pendiente confirmar.
10. **Permisos finos + RNF-07 + moneda/impuestos + reactivación + exportación** (§§6.5/7.8/8.7, matriz §H): IA §§6/8, Nav §6, WF-11/12/13, PT-09/10, RNF-07/12. Nada prometido.
11. **Creación cruzada desde orden/cita** (§8.7 n.º 5): se respeta CU-07 (preexistir); atajo marcado pendiente, no permiso.
12. **Aviso como bandeja global** (§8.7 n.º 4): no incluida; solo contextual + Dashboard.

## 6. Verificación de cobertura (conteos)

- RF→pantalla: **38/38** (§1). RF-22/23/30 como reglas de fondo mostradas (igual que matriz §E).
- RF→CU: 38/38 (heredado §6.4, sin cambios). RF con escenario: 14/38 (heredado §C).
- RNF: 12/12 (§2). RNF-07 sin métrica (pendiente declarado).
- CU→pantalla: 15/15 (§3). V→CU/RF: 11/11 (§8.6 intacto).
- Roles: 5/5 con ●/◐/— explícitos. Clases: 15/15 mapeadas, 0 nuevas.
- Pendientes: 12 grupos listados arriba, todos etiquetados en sus artefactos.
