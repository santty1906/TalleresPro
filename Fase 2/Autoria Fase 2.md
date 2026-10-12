# Autoría — Fase 2

| Sección del documento | Integrante(s) | Herramienta y link al prompt utilizado | Aporte de la IA | Aporte intelectual del equipo |
| --------------------- | ------------- | -------------------------------------- | --------------- | ----------------------------- |
| Arquitectura de información | [Por completar por el equipo: nombre(s)] | Muse Spark (Meta) vía OpenCode / [Agregar enlace a la sesión o prompt utilizado] | Apoyo en estructuración por dominios, jerarquías, etiquetas, accesos por rol y estados, a partir de los RF/CU/V de Fase 1 | Dirección del alcance, decisiones de organización y etiquetas, definición de pendientes P-01/P-02/P-03 (por confirmar por el equipo) |
| Sitemap | [Por completar por el equipo: nombre(s)] | Muse Spark (Meta) vía OpenCode / [Agregar enlace a la sesión o prompt utilizado] | Apoyo en la redacción de la fuente PlantUML y la leyenda, a partir de las vistas V-01–V-11 de Fase 1 | Verificación de la jerarquía de páginas y de los accesos por rol (por confirmar por el equipo) |
| Modelo de navegación actualizado | [Por completar por el equipo: nombre(s)] | Muse Spark (Meta) vía OpenCode / [Agregar enlace a la sesión o prompt utilizado] | Apoyo en la actualización del diagrama (migas, retornos, 403/404, punto de partida por rol) y su bitácora de cambios | Aprobación del filtrado por rol y de la propuesta provisional P-01 (por confirmar por el equipo) |
| Flujos principales de navegación | [Por completar por el equipo: nombre(s)] | Muse Spark (Meta) vía OpenCode / [Agregar enlace a la sesión o prompt utilizado] | Apoyo en el detalle paso a paso (FL-01–FL-09), alternos y errores con trazabilidad RF/CU/Esc | Validación de que los flujos reflejan la operación real del taller (por confirmar por el equipo) |
| Wireframes (documento e ilustraciones) | [Por completar por el equipo: nombre(s)] | Muse Spark (Meta) vía OpenCode / [Agregar enlace a la sesión o prompt utilizado] | Apoyo en layouts ASCII, generación programática de las ilustraciones SVG en escala de grises y su exportación a PNG | Revisión de campos, acciones y estados por pantalla (por confirmar por el equipo) |
| Prototipo visual | [Por completar por el equipo: nombre(s)] | Muse Spark (Meta) vía OpenCode / [Agregar enlace a la sesión o prompt utilizado] | Apoyo en código HTML/CSS/JS vainilla con datos ficticios, navegación clicable y filtrado por rol de demostración | Prueba navegable, revisión de textos y defensa individual (por confirmar por el equipo) |
| Matriz de coherencia Fase 1 → Fase 2 | [Por completar por el equipo: nombre(s)] | Muse Spark (Meta) vía OpenCode / [Agregar enlace a la sesión o prompt utilizado] | Apoyo en el cruce RF/RNF/Esc/CU/V/roles/clases contra pantallas y decisiones | Confirmación de que ningún “Confirmado” oculta un pendiente (por confirmar por el equipo) |

## Notas de autoría y transparencia

1. **Nombres y aportes pendientes.** La documentación del repositorio no
   permite atribuir secciones de Fase 2 a integrantes concretos (la tabla de
   Fase 1 corresponde a secciones de Fase 1). Por eso esta tabla usa
   marcadores explícitos en lugar de inventar atribuciones. El equipo debe
   completar cada fila antes de la entrega y la defensa individual.
2. **Uso de IA declarado.** En Fase 2 se usó asistencia de IA (Muse Spark de
   Meta, a través de OpenCode) para estructurar documentos, redactar fuentes
   de diagramas PlantUML, generar las ilustraciones de wireframes y apoyar el
   código del prototipo. Ningún artefacto se presenta como escrito totalmente
   a mano. Las decisiones de diseño, los permisos por rol y las reglas de
   negocio pendientes (P-01/P-02/P-03 y §5 de la matriz de coherencia) son
   propiedad del equipo y requieren su confirmación explícita.
3. **Validación registrada (evidencia en el repositorio).** Se ejecutaron
   comprobaciones locales y quedaron registradas en
   `Fase 2/exports/README_exports.md`: sintaxis JS (`node --check`), parseo
   HTML, 27/28 aserciones de navegación en Chrome headless (12 pantallas,
   login demo, filtrado por rol, validaciones de stock y sobrepago),
   validez de PNG/SVG y de las 13 ilustraciones de wireframes. La revisión
   académica final y la defensa individual quedan a cargo del equipo
   (ver lista de comprobación en `Fase 2/README_Fase_2.md` §8).
4. **Alcance no ampliado.** Fase 2 no crea requisitos, roles, permisos ni
   reglas nuevas; las propuestas van marcadas como tales y los pendientes
   heredados de Fase 1 (§§6.5/7.8/8.7) se mantienen visibles en cada artefacto.
