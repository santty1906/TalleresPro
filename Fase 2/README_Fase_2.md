# Fase 2 — Arquitectura de información y diseño de interfaz (TalleresPro)

## 1. Objetivos

1. Proponer la arquitectura de información (dominios, jerarquía, etiquetas,
   accesos, roles, estados) trazable a RF-01–38, RNF-01–12, CU-01–15, Esc-1–7.
2. Fijar el sitemap (V-01–V-11 + subvistas) y el modelo de navegación
   actualizado (migas, retornos, 403, drill-down, cruzadas).
3. Detallar los flujos principales FL-01–09 con pasos, alternos y errores.
4. Mostrar wireframes WF-01–13 (baja fidelidad) y prototipo PT-01–12
   (PT-11 Citas y PT-12 Servicios son vistas propias; alta fidelidad
   navegable, datos ficticios, sin backend).
5. Demostrar coherencia F1→F2 y dejar pendientes explícitos para el equipo.

## 2. Índice de deliverables y archivos

| Deliverable Fase 2 | Archivo(s) | Qué contiene |
|---|---|---|
| D1 Arquitectura de información | `Fase 2/arquitectura_informacion.md` | Dominios, jerarquía, etiquetas, accesos, relaciones, roles, globales, estados, trazabilidad §11 |
| D2 Sitemap | `Fase 2/sitemap_fase_2.puml` | Jerarquía V-01–V-11, cruzadas, drill-down, leyenda, P-01 |
| D3 Navegación actualizada | `Fase 2/modelo_navegacion_fase_2.puml` + `Fase 2/modelo_navegacion_fase_2.md` (§§1–9, bitácora §8) | Primaria/secundaria, migas, retornos, roles, 403, F1→FL |
| D4 Flujos principales | `Fase 2/flujos_navegacion.puml` (FL-01 + índice) + `flujos_atencion.puml` (FL-02–04) + `flujos_operacion.puml` (FL-05–07) + `flujos_gestion.puml` (FL-08/09) + `flujos_navegacion.md` (FL-01–09 + secundarios) | Actor, inicio, pasos, A/E, fin, RF/CU/Esc |
| D5 Wireframes | `Fase 2/wireframes.md` (WF-01–13) | ID, propósito, roles, RF/CU/Esc, ASCII, interacciones, estados |
| D6 Prototipo visual | `Fase 2/prototipo/index.html` + `styles.css` + `app.js` (PT-01–12; PT-11 Citas y PT-12 Servicios son vistas propias) | Sistema visual, datos ficticios, navegación clicable, estados demo, responsive, accesible |
| Trazabilidad y modelos | `Fase 2/matriz_coherencia_fase_1_fase_2.md` (§§1–6) | RF/RNF/Esc/CU/V/roles/clases → pantalla; actualizaciones sin tocar originales; 12 pendientes |
| Este índice | `Fase 2/README_Fase_2.md` | Alcance, archivos, preview, render, orden PDF, checklist |

Correspondencia pantallas: `V-xx` (Fase 1) ↔ `WF-xx` (wireframes) ↔ `PT-xx`
(prototipo). Ver tablas de cobertura en `wireframes.md` y `matriz_*.md §6`.

## 3. Relación con Fase 1

- Se conserva todo: 38 RF, 12 RNF, 7 escenarios, 15 CU, 11 vistas, 15 clases,
  5 roles, IDs y vocabulario. Sin renumerar ni redefinir.
- Se retiene la estructura §8.3–§8.5 (módulos, cruzadas F2–F5, drill-down A1,
  matriz §8.4 ●/◐/—). Solo se añade *cómo se recorre* (migas, Guardar/Cancelar/
  Volver, confirmaciones, 403, solo-lectura, P-01 provisional).
- `Fase 1/` intacto: este trabajo solo crea `Fase 2/`. La independencia del PDF
  de Fase 1 (enlace OneDrive del README raíz) y `Fase 1/Autoria Fase 1.md` se
  respeta: no se tocan, no se renombran, no se sustituyen.

## 4. Cómo previsualizar el prototipo (local, sin instalar nada)

1. Abrir el explorador (idealmente Chrome, Edge o Firefox — RNF-08).
2. Abrir el archivo `Fase 2/prototipo/index.html` con doble clic
   (o arrastrarlo al navegador). No requiere servidor ni dependencias.
3. Usar el selector **"Rol (demo)"** para ver el filtrado por rol (RF-04):
   el menú muestra solo los módulos ●/◐ del rol y las acciones de gestión
   (guardar, editar, desactivar, cobrar, movimientos) solo aparecen para el
   rol ● confirmado; los roles ◐ ven solo lectura.
4. Navegar por el menú (Dashboard, Órdenes, Citas, Clientes,
   Vehículos, Servicios, Inventario, Finanzas, Reportes, Usuarios, Login).
   El detalle de orden (V-08c) se abre con [Ver] desde la lista de órdenes.
5. Probar: login `demo@taller.test / demo1234` (otro valor muestra el error);
   formularios con validación demo; botones "Estados (demo)" (vacío/error/403);
   movimiento con cantidad > stock (rechaza); pago > saldo (advierte [P]);
   factura exige cobro. Todo avisa **"demo, no persiste"**.
6. Probar responsive: estrechar la ventana (<820px) → el menú se pliega en ☰.
7. Accesibilidad: Tab recorre con foco visible; lector lee etiquetas y tablas.



