# Fase 2 — Arquitectura de información y diseño de interfaz (TalleresPro)

> Alcance: organizar la información, la navegación y las interfaces a partir de
> Fase 1, sin implementar la aplicación productiva. Fuente de verdad:
> `Fase 1/README_Fase_1.md` + `Fase 1/matriz_trazabilidad.md` + `.puml`.
> Nada de Fase 1 fue modificado (ver §6). Pendientes P-01/P-02/P-03 y reglas
> §§6.5/7.8/8.7 se heredan y se marcan en cada artefacto.

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

## 5. Cómo renderizar los diagramas (.puml → imagen para el PDF)

Los `.puml` son la fuente editable (misma convención que Fase 1: sin imagen
generada en el repo). Para el PDF se necesita exportarlos una vez:

- **Opción A (VS Code, recomendada):** instalar extensión "PlantUML",
  abrir cada `.puml` → `Alt+D` (preview) → clic "Export Current Diagram"
  → PNG/SVG. Archivos: `sitemap_fase_2.puml`, `modelo_navegacion_fase_2.puml`,
  `flujos_navegacion.puml`, `flujos_atencion.puml`, `flujos_operacion.puml`,
  `flujos_gestion.puml` (+ los 3 de Fase 1 si el PDF los reúne).
- **Opción B (web):** pegar cada `.puml` en https://www.plantuml.com/plantuml/uml/
  → descargar PNG/SVG.
- **Opción C (local con Java):** descargar `plantuml.jar` (MIT) y
  `java -jar plantuml.jar -tpng "Fase 2/*.puml"`. Requiere Graphviz para
  algunos layouts (no instalado aquí; por eso no se afirma render validado).
- No se afirma en ningún documento que un diagrama "fue renderizado" salvo que
  el export exista. El estado real: **fuentes .puml presentes y sintaxis
  cuidada; render pendiente de exportación humana** (ver §7 checklist).

## 6. Archivos creados vs preservados (para revisión `git status`)

- **Creados (solo `Fase 2/`):** este README, `arquitectura_informacion.md`,
  `sitemap_fase_2.puml`, `modelo_navegacion_fase_2(.puml/.md)`,
  `flujos_navegacion(.puml/.md)`, `wireframes.md`,
  `prototipo/{index.html,styles.css,app.js}`,
  `matriz_coherencia_fase_1_fase_2.md`. Ninguna dependencia añadida.
- **Preservados (no tocados):** todo `Fase 1/` (6 archivos), `README.md` raíz.
  Verificación: `git status --porcelain` debe mostrar solo `?? Fase 2/`.
- **Git:** rama `main` sincronizada con `origin/main` antes de crear
  (se resolvió la divergencia local/remota por instrucción explícita del
  dueño: se conservó `origin/main`, con respaldo del borrador local en
  `/tmp/matriz_local_198ac8a_backup.md`). Sin commits ni pushes en esta tarea.

## 7. Orden propuesto para el PDF final (único PDF)

1. Portada (nombre, curso, equipo, fecha, repo URL).
2. Introducción y objetivos (resumen de §1 de este README + alcance Fase 1 §1).
3. Arquitectura de información (`arquitectura_informacion.md` íntegro).
4. Sitemap (imagen exportada del `.puml` + leyenda + notas P-01).
5. Modelo de navegación actualizado (imagen + `modelo_navegacion_fase_2.md` §§1–8).
6. Flujos principales (`flujos_navegacion.md` FL-01–09 + diagrama).
7. Wireframes (`wireframes.md`; ASCII tal cual o capturas del prototipo en
   modo baja fidelidad si se prefieren imágenes).
8. Prototipo visual (descripción + capturas de PT-01–10 + URL del repo y
   cómo abrirlo; el PDF no sustituye la demo navegable).
9. Actualizaciones y coherencia (`matriz_coherencia_*.md` §§1–6).
10. Conclusiones, pendientes para el equipo (§5 de la matriz) y referencias
    (Fase 1 + este repo). Incluir enlace del repo en el comentario de entrega.

**No generado aquí:** no había herramienta PDF instalada que garantizara el
documento final de una sola pieza (pandoc existe pero sin LaTeX/wkhtmltopdf
para un PDF fiel con imágenes). Se entrega el **paquete fuente revisable** +
este procedimiento de ensamblaje. El PDF de Fase 1 (OneDrive) no se toca.

## 8. Checklist humano antes de aprobar/entregar

- [ ] Leer `arquitectura_informacion.md` §§8/10/11: ¿el menú por rol y los
      mensajes propuestos representan al equipo? (P-01/P-02/P-03 visibles).
- [ ] Abrir los 3 `.puml` en el visor PlantUML: ¿renderizan sin errores?
      Exportar PNG/SVG para el PDF (ver §5).
- [ ] Recorrer `flujos_navegacion.md` FL-01–09: ¿algún paso contradice cómo
      trabaja el taller? Marcar correcciones como nuevos pendientes.
- [ ] Leer `wireframes.md` WF-01–13: ¿falta algún campo obligatorio real
      (más allá del mínimo §7.4)? Añadir solo si un RF lo exige.
- [ ] Abrir `prototipo/index.html` en Chrome/Edge/Firefox: ¿navega, filtra por
      rol, valida y muestra estados? ¿Responsive <820px? ¿Foco visible?
- [ ] Revisar `matriz_coherencia_*.md` §§1/5: ¿algún "Confirmado" debería ser
      "Pendiente"? No ocultar contradicciones para que el PDF "se vea completo".
- [ ] Confirmar o reformular con el equipo los 12 pendientes (§5 de la matriz),
      mínimo P-01/P-02/P-03 antes de la defensa individual.
- [ ] Comprobar `git status`: solo `Fase 2/` nuevo; `Fase 1/` y autoría intactos.
- [ ] Ensamblar el PDF único en el orden §7, con portada + repo URL en el
      comentario (no commitear/pushear sin orden explícita separada).
- [ ] Ensayar la defensa: cada decisión tiene su RF/CU/Esc en la matriz;
      cada pendiente tiene su etiqueta P-0x en pantalla.
