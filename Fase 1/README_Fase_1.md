# Descripción del proyecto

## 1.1 Nombre

TalleresPro

## 1.2 Problema o necesidad

Muchos talleres de reparación manejan la información de clientes, vehículos, órdenes de trabajo, repuestos, pagos y servicios mediante documentos físicos, hojas de cálculo o herramientas distintas que no están conectadas entre sí.

Esto genera pérdida de información, dificultad para consultar el historial de un vehículo, errores en el inventario, problemas para conocer el estado de una reparación y poca organización de la información financiera.

## 1.3 Propósito

TalleresPro tiene como propósito centralizar en un solo sistema web la información y las operaciones principales de un taller de reparación y mantenimiento, permitiendo gestionar clientes, vehículos, órdenes de reparación, servicios, inventario, pagos y demás información administrativa desde una misma plataforma.

## 1.4 Objetivo general

Desarrollar un sistema web que permita gestionar de manera centralizada las principales operaciones de un taller de reparación y mantenimiento, facilitando el seguimiento de las reparaciones, el control de inventario y la administración de la información financiera.

## 1.5 Alcance

El sistema permitirá:

* Registrar y administrar clientes.
* Registrar vehículos.
* Gestionar servicios.
* Crear órdenes de reparación.
* Dar seguimiento al estado de las reparaciones.
* Registrar tareas de los técnicos.
* Gestionar citas.
* Consultar historial de reparaciones.
* Administrar repuestos y materiales.
* Registrar entradas y salidas de inventario.
* Detectar productos con stock bajo.
* Registrar pagos.
* Administrar ingresos y gastos.
* Generar facturas internas.
* Generar reportes.
* Administrar usuarios y permisos.
* Mostrar estadísticas mediante un dashboard.

**No se contempla inicialmente:**

* Integración con bancos.
* Integración con sistemas gubernamentales de facturación.
* Diagnóstico automático mediante inteligencia artificial.
* Integración con proveedores externos.

## 1.6 Funcionalidades principales

* Gestión de clientes y vehículos.
* Órdenes de reparación con seguimiento de estado.
* Control de inventario (entradas, salidas y stock mínimo).
* Gestión de citas.
* Módulo financiero: pagos, ingresos, gastos y facturación interna.
* Generación de reportes.
* Dashboard con estadísticas generales.
* Administración de usuarios y roles.

---

# 2. Identificación de usuarios

| Usuario                  | Características                          | Necesidades                             | Funciones principales                        |
| ------------------------ | ---------------------------------------- | --------------------------------------- | -------------------------------------------- |
| Administrador            | Tiene control general del sistema        | Gestionar todo el taller                | Usuarios, permisos, reportes, configuración  |
| Recepcionista            | Atiende clientes                         | Registrar información y órdenes         | Clientes, vehículos, citas y órdenes         |
| Técnico                  | Trabaja directamente en las reparaciones | Consultar y actualizar trabajos         | Diagnóstico, tareas y estados                |
| Encargado de inventario  | Controla repuestos                       | Saber existencias y movimientos         | Productos, entradas, salidas y stock         |
| Encargado administrativo | Gestiona información financiera          | Controlar pagos e información económica | Pagos, ingresos, gastos, facturas y reportes |

No se necesita crear un sistema diferente para cada usuario: todos ingresan al mismo software, pero según su rol acceden a distintas funciones.

Por ejemplo:

* Administrador → accede a todo el sistema.
* Recepcionista → accede solo a Clientes / Vehículos / Citas / Órdenes.

---

# 3. Requisitos funcionales

## Usuarios y Acceso

* **RF-01:** Registrar usuarios nuevos.
* **RF-02:** Iniciar sesión con correo y contraseña.
* **RF-03:** Asignar roles a los usuarios.
* **RF-04:** Bloquear o dar acceso a funciones según el rol.

## Clientes

* **RF-05:** Guardar clientes nuevos.
* **RF-06:** Buscar y ver lista de clientes.
* **RF-07:** Editar datos de un cliente.
* **RF-08:** Desactivar clientes.

## Vehículos

* **RF-09:** Registrar autos vinculados a un cliente.
* **RF-10:** Ver los vehículos guardados.
* **RF-11:** Editar información de un vehículo.
* **RF-12:** Ver el historial de arreglos de cada auto.

## Órdenes y Reparaciones

* **RF-13:** Crear órdenes de trabajo.
* **RF-14:** Vincular la orden con su cliente y auto.
* **RF-15:** Anotar el problema que reporta el cliente.
* **RF-16:** Guardar el diagnóstico y las tareas a hacer.
* **RF-17:** Cambiar el estado del trabajo (Recibido, En reparación, Listo, etc.).
* **RF-18:** Consultar las órdenes creadas.

## Inventario y Repuestos

* **RF-19:** Registrar piezas y repuestos.
* **RF-20:** Registrar cuando entra mercancía.
* **RF-21:** Registrar cuando sale mercancía.
* **RF-22:** Descontar o sumar el stock automáticamente.
* **RF-23:** Avisar cuando un repuesto se esté agotando.

## Servicios y Citas

* **RF-24:** Crear catálogo de servicios.
* **RF-25:** Ponerle precio a los servicios.
* **RF-26:** Agendar citas.
* **RF-27:** Editar o cancelar citas.
* **RF-28:** Ver la agenda de citas.

## Caja y Cobros

* **RF-29:** Registrar cobros de órdenes.
* **RF-30:** Calcular cuánto le falta por pagar al cliente.
* **RF-31:** Anotar otros ingresos.
* **RF-32:** Anotar gastos del taller.
* **RF-33:** Generar facturas internas.

## Reportes y Panel

* **RF-34:** Sacar reportes de reparaciones.
* **RF-35:** Sacar reportes de inventario.
* **RF-36:** Sacar reportes de dinero (pagos, entradas y salidas).
* **RF-37:** Mostrar un panel con resumen del taller.
* **RF-38:** Ver en el panel: trabajos pendientes, citas del día, poco stock y totales de dinero.

---

# 4. Requisitos no funcionales

Los requisitos no funcionales especifican cómo debe operar el sistema y qué características debe poseer para ser fácil, seguro y práctico en su uso.

## Usabilidad

* **RNF-01:** La interfaz debe ser comprensible y sencilla para los diversos usuarios del sistema.
* **RNF-02:** Los formularios deben indicar qué datos se deben ingresar y proporcionar mensajes claros en caso de que ocurra un error.
* **RNF-03:** La navegación entre los diferentes módulos debe mantenerse consistente para que el usuario pueda usar el sistema sin confundirse.

## Seguridad

* **RNF-04:** Las funciones que contengan información sensible deben estar protegidas a través de un inicio de sesión.
* **RNF-05:** El sistema debe restringir las funciones accesibles en función del rol y los permisos de cada usuario.
* **RNF-06:** Las contraseñas de los usuarios deben ser almacenadas de manera segura para prevenir que sean fáciles de obtener.

## Rendimiento

* **RNF-07:** El sistema debe tener un tiempo de respuesta razonable cuando se utiliza en condiciones normales.

## Compatibilidad

* **RNF-08:** El sistema debe operar correctamente en los navegadores más utilizados como Google Chrome, Microsoft Edge y Mozilla Firefox.

## Responsive

* **RNF-09:** La interfaz debe ajustarse adecuadamente a distintos tamaños de pantalla, incluyendo computadoras, tablets y teléfonos móviles.

## Integridad de los datos

* **RNF-10:** La base de datos debe mantener correctamente la relación entre la información de clientes, vehículos, órdenes, productos y otros registros.
* **RNF-11:** El sistema debe verificar que los datos ingresados sean válidos antes de almacenarlos.

## Mantenimiento

* **RNF-12:** El código debe estar organizado en módulos para facilitar el proceso de hacer cambios, corregir errores o añadir nuevas funciones en el futuro.

---

# 5. Escenarios de uso

Aquí explicamos situaciones reales en las que alguien utilizaría el sistema.

## Escenario 1 — Registrar un cliente

**Usuario:** Recepcionista

**Objetivo:** Registrar un nuevo cliente.

**Contexto:** Un cliente llega al taller por primera vez.

**Secuencia:**

1. El recepcionista inicia sesión.
2. Ingresa al módulo de clientes.
3. Selecciona "Registrar cliente".
4. Introduce los datos del cliente.
5. Presiona "Guardar".
6. El sistema valida la información.
7. El sistema registra al cliente.

**Resultado esperado:** El nuevo cliente queda registrado y disponible para futuras operaciones.

## Escenario 2 — Registrar un vehículo

**Usuario:** Recepcionista

**Objetivo:** Asociar un vehículo a un cliente.

**Secuencia:**

1. El recepcionista busca al cliente.
2. Selecciona "Agregar vehículo".
3. Introduce marca, modelo, año, placa y demás información.
4. Presiona "Guardar".
5. El sistema valida los datos.
6. El vehículo queda asociado al cliente.

**Resultado esperado:** El vehículo aparece en el perfil del cliente.

## Escenario 3 — Crear una orden de reparación

**Usuario:** Recepcionista

**Objetivo:** Registrar un vehículo que ingresa al taller.

**Secuencia:**

1. Selecciona el cliente.
2. Selecciona el vehículo.
3. Crea una nueva orden.
4. Registra el problema informado por el cliente.
5. Selecciona los servicios correspondientes.
6. Guarda la orden.

**Resultado esperado:** Se crea una orden con estado "Recibido".

## Escenario 4 — Actualizar una reparación

**Usuario:** Técnico

**Objetivo:** Actualizar el avance de una reparación.

**Secuencia:**

1. El técnico inicia sesión.
2. Consulta las órdenes asignadas.
3. Selecciona una orden.
4. Registra el diagnóstico.
5. Agrega o actualiza las tareas.
6. Cambia el estado de la reparación.
7. Guarda los cambios.

**Resultado esperado:** La orden muestra el nuevo estado y la información actualizada.

## Escenario 5 — Registrar salida de inventario

**Usuario:** Encargado de inventario

**Objetivo:** Registrar el uso de un repuesto.

**Secuencia:**

1. Busca el producto.
2. Selecciona "Registrar salida".
3. Introduce la cantidad utilizada.
4. Puede asociarla a una orden de reparación.
5. Confirma la operación.
6. El sistema actualiza el inventario.

**Resultado esperado:** La cantidad disponible disminuye y queda registrada la salida.

## Escenario 6 — Registrar un pago

**Usuario:** Encargado administrativo

**Objetivo:** Registrar el pago de una reparación.

**Secuencia:**

1. Busca la orden de reparación.
2. Consulta el total y saldo pendiente.
3. Introduce el monto recibido.
4. Selecciona el método de pago.
5. Confirma el pago.

**Resultado esperado:** El pago queda registrado y el saldo pendiente se actualiza.

## Escenario 7 — Consultar el dashboard

**Usuario:** Administrador

**Objetivo:** Conocer el estado general del taller.

**Secuencia:**

1. Inicia sesión.
2. Accede al dashboard.
3. Consulta las estadísticas.
4. Revisa órdenes pendientes, citas, inventario y situación financiera.

**Resultado esperado:** El administrador obtiene una visión general del estado del taller.