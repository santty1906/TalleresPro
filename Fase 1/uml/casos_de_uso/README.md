# TalleresPro — Diagramas individuales de actividad (CU-01 a CU-15)

Este directorio contiene un diagrama de actividad PlantUML **individual** por cada caso de uso documentado en la Fase 1 (ver `Fase 1/README_Fase_1.md`, sección 6.3). Cada diagrama representa el flujo principal, los flujos alternos (A1/A2) y las excepciones (E1–E3) de su caso de uso, con su actor primario, precondiciones y postcondiciones.

Fuente autoritativa: `Fase 1/README_Fase_1.md` (secciones 6.3, 6.4, 6.5), matriz `Fase 1/matriz_trazabilidad.md` y `Fase 1/diagrama_casos_uso.puml` (diagrama general, intacto).

## Índice

| CU | Nombre oficial | Fuente | Vista previa |
|---|---|---|---|
| CU-01 | Iniciar sesión | [CU-01_iniciar_sesion.puml](./CU-01_iniciar_sesion.puml) | ![CU-01 - Iniciar sesión](./CU-01_iniciar_sesion.png) |
| CU-02 | Gestionar usuarios y roles | [CU-02_gestionar_usuarios_y_roles.puml](./CU-02_gestionar_usuarios_y_roles.puml) | ![CU-02 - Gestionar usuarios y roles](./CU-02_gestionar_usuarios_y_roles.png) |
| CU-03 | Gestionar clientes | [CU-03_gestionar_clientes.puml](./CU-03_gestionar_clientes.puml) | ![CU-03 - Gestionar clientes](./CU-03_gestionar_clientes.png) |
| CU-04 | Gestionar vehículos y consultar historial | [CU-04_gestionar_vehiculos_y_historial.puml](./CU-04_gestionar_vehiculos_y_historial.puml) | ![CU-04 - Gestionar vehículos y consultar historial](./CU-04_gestionar_vehiculos_y_historial.png) |
| CU-05 | Gestionar catálogo de servicios | [CU-05_gestionar_catalogo_servicios.puml](./CU-05_gestionar_catalogo_servicios.puml) | ![CU-05 - Gestionar catálogo de servicios](./CU-05_gestionar_catalogo_servicios.png) |
| CU-06 | Gestionar citas | [CU-06_gestionar_citas.puml](./CU-06_gestionar_citas.puml) | ![CU-06 - Gestionar citas](./CU-06_gestionar_citas.png) |
| CU-07 | Crear orden de reparación | [CU-07_crear_orden_reparacion.puml](./CU-07_crear_orden_reparacion.puml) | ![CU-07 - Crear orden de reparación](./CU-07_crear_orden_reparacion.png) |
| CU-08 | Actualizar reparación (diagnóstico, tareas, estados y consulta) | [CU-08_actualizar_reparacion.puml](./CU-08_actualizar_reparacion.puml) | ![CU-08 - Actualizar reparación](./CU-08_actualizar_reparacion.png) |
| CU-09 | Gestionar repuestos | [CU-09_gestionar_repuestos.puml](./CU-09_gestionar_repuestos.puml) | ![CU-09 - Gestionar repuestos](./CU-09_gestionar_repuestos.png) |
| CU-10 | Registrar movimientos y controlar stock | [CU-10_movimientos_y_control_stock.puml](./CU-10_movimientos_y_control_stock.puml) | ![CU-10 - Registrar movimientos y controlar stock](./CU-10_movimientos_y_control_stock.png) |
| CU-11 | Registrar cobro de orden | [CU-11_registrar_cobro_orden.puml](./CU-11_registrar_cobro_orden.puml) | ![CU-11 - Registrar cobro de orden](./CU-11_registrar_cobro_orden.png) |
| CU-12 | Registrar ingresos y gastos | [CU-12_registrar_ingresos_y_gastos.puml](./CU-12_registrar_ingresos_y_gastos.puml) | ![CU-12 - Registrar ingresos y gastos](./CU-12_registrar_ingresos_y_gastos.png) |
| CU-13 | Generar factura interna | [CU-13_generar_factura_interna.puml](./CU-13_generar_factura_interna.puml) | ![CU-13 - Generar factura interna](./CU-13_generar_factura_interna.png) |
| CU-14 | Generar reportes | [CU-14_generar_reportes.puml](./CU-14_generar_reportes.puml) | ![CU-14 - Generar reportes](./CU-14_generar_reportes.png) |
| CU-15 | Consultar dashboard | [CU-15_consultar_dashboard.puml](./CU-15_consultar_dashboard.puml) | ![CU-15 - Consultar dashboard](./CU-15_consultar_dashboard.png) |

## Cómo renderizar

Con PlantUML (versión usada: 1.2024.7):

```bash
java -jar plantuml.jar -checkonly "Fase 1/uml/casos_de_uso/"*.puml
java -jar plantuml.jar -tpng "Fase 1/uml/casos_de_uso/"*.puml
```

También pueden visualizarse con la extensión PlantUML de VS Code o en https://www.plantuml.com/plantuml/uml/.

## Notas

- Estos diagramas **documentan los flujos previstos** de cada caso de uso. Su existencia **no prueba** que la funcionalidad esté implementada ni probada en la aplicación.
- Las reglas de negocio marcadas con **`[P]`** (p. ej. responsable del catálogo de servicios en CU-05, criterio de duplicado de clientes en CU-03, transiciones de estado en CU-08, sobrepago en CU-11, exportación de reportes en CU-14) **siguen pendientes de confirmación** por el equipo (ver secciones 6.5 y 7.8 de `Fase 1/README_Fase_1.md).
