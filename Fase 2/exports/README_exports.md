# Fase 2 — Exports (diagramas y capturas para el PDF)

> Generado el 2026-10-12. Fuentes `.puml` y prototipo intactos; nada se
> reescribió para exportar. Pendientes P-01/P-02/P-03 y reglas §§6.5/7.8/8.7
> siguen vigentes (ver matriz de coherencia).

## 1. Diagramas (PNG + SVG) — 6/6 renderizados con éxito

Renderizador: servidor oficial de PlantUML (`https://www.plantuml.com/plantuml/{png,svg}/…`,
el mismo de los pasos manuales de `README_Fase_2.md` §5), invocado con un
script de solo-librería-estándar. Sin instalaciones ni cambios de configuración.
Cada PNG verificado (firma + dimensiones IHDR) y cada SVG validado como XML.

| Archivo | Tamaño PNG | Uso en el PDF |
|---|---|---|
| `sitemap_fase_2.png` / `.svg` | 2768×1570 | D2 Sitemap |
| `modelo_navegacion_fase_2.png` / `.svg` | 2313×2530 | D3 Navegación |
| `flujos_navegacion.png` / `.svg` | 630×709 | D4 FL-01 + índice |
| `flujos_atencion.png` / `.svg` | 587×1801 | D4 FL-02–04 |
| `flujos_operacion.png` / `.svg` | 700×1842 | D4 FL-05–07 |
| `flujos_gestion.png` / `.svg` | 581×2088 | D4 FL-08/09 + secundarios |

Recomendación: usar el SVG (escalable) si la herramienta del PDF lo admite;
si no, el PNG.

## 2. Capturas del prototipo — 13/13 capturadas de verdad

Navegador: Google Chrome headless (perfil temporal desechable, viewport
1360×900, capturas 1344×749). Sin automatismos instalados: CDP con cliente
mínimo de librería estándar. Cada captura se tomó con su pantalla afirmada
como activa. Rol Administrador salvo `pt-rol-tecnico.png` (rol Técnico).
Ninguna captura es fabricada; los bytes y dimensiones constan en el registro
de la prueba (27/28 aserciones PASS, ver §3).

| Archivo | Pantalla (rol) |
|---|---|
| `prototipo/pt01-login.png` | PT-01 Login (V-01) |
| `prototipo/pt02-dashboard.png` | PT-02 Dashboard (V-02) |
| `prototipo/pt03-clientes.png` | PT-03 Clientes (V-04) |
| `prototipo/pt04-vehiculos.png` | PT-04 Vehículos (V-05) |
| `prototipo/pt11-citas.png` | PT-11 Citas (V-07) |
| `prototipo/pt05-ordenes.png` | PT-05 Órdenes (V-08a/b) |
| `prototipo/pt06-detalle-orden.png` | PT-06 Detalle ORD-001 (V-08c) |
| `prototipo/pt07-inventario.png` | PT-07 Inventario (V-09) |
| `prototipo/pt08-finanzas.png` | PT-08 Finanzas (V-10) |
| `prototipo/pt09-reportes.png` | PT-09 Reportes (V-11) |
| `prototipo/pt10-usuarios.png` | PT-10 Usuarios (V-03) |
| `prototipo/pt12-servicios.png` | PT-12 Servicios (V-06, con Descripción) |
| `prototipo/pt-rol-tecnico.png` | Menú filtrado del rol Técnico (solo Órdenes + Login) |

## 3. Pruebas de navegador realmente ejecutadas (headless, 2026-10-12)

- T1: estado inicial en Login, prefill `demo@taller.test`, banner demo. PASS.
- T2: credenciales erróneas → mensaje de error en V-01 (CU-01 E1). PASS.
- T3: login demo → Dashboard activo. PASS.
- T4: navegación a las 12 pantallas (menú + enlaces contextuales). PASS 9/9.
- T5: `[Ver]` en Órdenes → detalle activo (V-08c). PASS; miga muestra el texto
  del botón (“Ver”) porque esos botones no llevan `data-crumb` — cosmético,
  fuera de alcance, no se tocó el prototipo (ver §4).
- T6: rol Técnico → menú solo Órdenes+Login; `[Nueva orden]` oculta;
  Recepcionista ve `[Registrar cliente]`; Administrador no lo ve (solo
  lectura). PASS 4/4.
- T7: Citas tiene `[Agendar cita]`; Servicios muestra columna Descripción. PASS.
- T8: salida con cantidad 99 (> stock 2) → error y sin descuento (CU-10 E2). PASS.
- T9: pago S/ 200 (> saldo S/ 150) → aviso de sobrepago [P] (CU-11 E1). PASS.
- Total: **27/28 PASS**. No se halló ningún defecto bloqueante; no se modificó
  el prototipo.

## 4. Defectos reproducibles

Ninguno bloqueante. Observación menor (no bloquea, no se corrigió por estar
fuera del alcance autorizado): los botones `[Ver]` de la lista de órdenes no
definen `data-crumb`, así que la miga muestra “Ver” en vez de
“Órdenes › ORD-00x › Detalle”. Si el equipo lo desea, añadir `data-crumb` a
esos dos botones (solo HTML, sin lógica).

## 5. Trabajo manual restante (pasos precisos)

1. **Revisión visual** (10 min): abrir cada PNG/SVG y captura; comprobar que
   ningún diagrama quedó recortado (los altos — navegación 2530px, gestión
   2088px — pueden requerir página apaisada o escala 70–80% en el PDF).
2. **Montar el PDF único** según `README_Fase_2.md` §7 (portada + §§D1–D6 +
   coherencia + pendientes + repo URL en el comentario). El PDF sigue pendiente:
   localmente solo hay `pandoc` sin motor LaTeX/HTML→PDF.
3. **Verificación humana en 3 navegadores** (RNF-08: Chrome, Edge, Firefox) +
   móvil <820px (RNF-09): el chequeo automatizado fue solo Chrome headless
   desktop. Abrir `Fase 2/prototipo/index.html` con doble clic y repetir T1–T9.
4. **Confirmación del equipo**: P-01/P-02/P-03 y los 12 pendientes de la matriz
   antes de la defensa individual.
5. **Render manual (si hay que regenerar)**: opción web — pegar cada `.puml`
   en `https://www.plantuml.com/plantuml/uml/` → descargar PNG/SVG; opción
   VS Code — extensión “PlantUML”, abrir el `.puml`, `Alt+D`, “Export Current
   Diagram”. Ningún diagrama quedó omitido: 6/6 exportados aquí.
