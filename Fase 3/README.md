# TalleresPro — Fase 3: Implementación frontend y diseño responsive

Primera versión implementada de la interfaz, basada en los documentos de las Fases 1 y 2
(11 vistas con sus subvistas, menú agrupado, migas, permisos por rol y estados de pantalla).

## Cómo abrirlo
Abre `index.html` (o `login.html`) con doble clic en Chrome, Edge o Firefox. No necesita servidor ni instalar nada.

## Usuarios de prueba
Contraseña de todos: `Taller2026!`

| Rol | Correo | Aterriza en |
|---|---|---|
| Administrador | admin@talleres.test | Dashboard |
| Recepcionista | recepcion@talleres.test | Órdenes |
| Técnico | tecnico@talleres.test (también tecnico2@…) | Órdenes asignadas |
| Encargado de inventario | inventario@talleres.test | Inventario |
| Encargado administrativo | finanzas@talleres.test | Finanzas |
| (cuenta desactivada) | diana.vega@talleres.test | muestra "Cuenta desactivada…" |

## Estructura
```
login.html, index.html
dashboard.html                                   V-02
usuarios.html, usuario-form.html                 V-03
clientes.html, cliente-form.html, cliente-detalle.html          V-04
vehiculos.html, vehiculo-form.html, vehiculo-detalle.html       V-05
servicios.html, servicio-form.html               V-06
citas.html, cita-form.html                       V-07
ordenes.html, orden-nueva.html, orden-detalle.html              V-08
inventario.html, producto-form.html, movimiento.html            V-09
finanzas.html, cobro.html, factura.html          V-10
reportes.html, reporte-resultado.html            V-11
sin-permiso.html (403), no-encontrado.html (404)
css/  base · layout · components · responsive (incluye impresión)
js/   datos · sesion · ui · layout · vistas/<módulo>.js
```

### Cómo está organizado el JavaScript (para explicarlo)
Todo es JavaScript básico: funciones normales, `if`, `for` y `function`. No hay librerías ni frameworks.
- `datos.js`: los datos de ejemplo (clientes, órdenes, etc.) y funciones para buscarlos y sumarlos.
- `sesion.js`: los roles, qué puede ver y gestionar cada uno, e iniciar/cerrar sesión.
- `ui.js`: funciones que se repiten en varias páginas: dar formato a dinero y fechas, mostrar avisos, ventana de confirmación, dibujar tablas y validar formularios.
- `layout.js`: lo común de todas las páginas internas: revisa que haya sesión, arma el menú según el rol y el menú del celular.
- `vistas/*.js`: un archivo por módulo. Cada uno tiene una función por página (por ejemplo `listaClientes`, `formularioCliente`, `detalleCliente`) y al final decide cuál ejecutar según `data-vista` del `<body>`.

## Qué es "de verdad" y qué es temporal
- **Frontend completo:** HTML semántico, CSS responsive (escritorio, tablet y móvil), navegación, formularios con validación y mensajes claros, estados vacíos, confirmaciones y avisos.
- **Temporal hasta la Fase 4:** no hay base de datos. Los datos de ejemplo están en `js/datos.js`; los cambios que haces (crear cliente, cobrar, etc.) se guardan solo mientras la pestaña esté abierta. La sesión y los permisos por rol están en `js/sesion.js`; en la Fase 4 pasan a PHP/servidor.

## Accesibilidad y HTML semántico
- **Semántica:** `header`, `nav` (con `ul/li`), `main`, `section`, `article`, `fieldset/legend`, `hgroup`, `dl`, `table` con `caption` y `th scope`. Los pocos `div` que quedan son funcionales (región de avisos en vivo, capa del menú móvil, contenedor con scroll de tablas, tablist de pestañas).
- **Formularios:** todo campo tiene `<label for>`; ayudas y errores enlazados con `aria-describedby`; resumen de errores con `role="alert"` y foco; `autocomplete` y `inputmode` donde aplica.
- **Teclado y lectores:** enlace "Saltar al contenido", un `h1` por página, foco visible, menú móvil con `aria-expanded`, diálogos nativos `<dialog>`, `prefers-reduced-motion`.
- **Estados:** nunca solo con color (siempre texto/ícono).

### Contraste de colores (verificable en el Contrast Checker de Adobe)
Pega cada par de códigos hex en https://color.adobe.com/es/create/color-contrast-analyzer. Todos pasan AA; casi todo el texto pasa AAA.

| Uso | Texto / elemento | Fondo | Ratio |
|---|---|---|---|
| Texto principal | #1b1f23 | #ffffff | 16.6 |
| Texto principal sobre fondo de página | #1b1f23 | #f3efe8 | 14.5 |
| Texto secundario | #404855 | #ffffff | 9.2 |
| Enlaces / ítem de menú activo | #7c2d12 | #ffffff | 9.4 |
| Botón primario | #ffffff | #9a3412 | 7.3 |
| Botón primario (hover) | #ffffff | #7c2d12 | 9.4 |
| Mensaje de error de campo | #991b1b | #ffffff | 8.3 |
| Aviso de éxito | #0f4a26 | #e3f4e8 | 9.1 |
| Placeholder | #4b5563 | #ffffff | 7.6 |
| Borde de campos (componente UI, mín. 3:1) | #6b6558 | #ffffff | 5.8 |
| Anillo de foco (mín. 3:1) | #1d4ed8 | #ffffff | 6.7 |
| Anillo de foco en cabecera oscura | #ffffff | #17212b | 16.3 |

Los valores se calcularon con la misma fórmula WCAG que usa Adobe. Si cambian colores en `css/base.css`, vuelve a comprobarlos.

## Decisiones tomadas
- **Moneda:** se usa B/. (balboa). El prototipo de la Fase 2 mostraba "S/", pero la decisión es B/.
- **Salida de inventario:** se sigue la matriz rol–vista. La salida se registra desde Inventario y allí se elige la orden asociada (el sitemap dibuja V-08c → V-09c, pero la matriz no da al Encargado de inventario acceso al detalle de la orden).
- **Técnico asignado:** se agregó un campo opcional al crear la orden para que el técnico vea "sus órdenes asignadas" (Esc-4). No estaba en los documentos.
- **Estados de la orden:** Recibido, En reparación, Espera de repuestos, Listo, Entregado y Cancelada. Cambios permitidos: Recibido → En reparación o Cancelada; En reparación → Espera de repuestos, Listo o Cancelada; Espera de repuestos → En reparación o Cancelada; Listo → Entregado o En reparación; Entregado y Cancelada son finales. Una orden solo llega a Listo desde En reparación y con diagnóstico. "Activas" = Recibido, En reparación y Espera de repuestos.
- **Sobrepago:** se rechaza con el mensaje "El monto supera el saldo". Si el saldo es cero, el formulario de cobro no aparece.
- **Reactivar clientes:** un cliente inactivo se reactiva con el botón "Reactivar cliente" en su detalle (mismo permiso que desactivar). Conserva su historial.
- **Exportar reportes:** no se incluye; los reportes se ven solo en pantalla.
