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
* **RF-04:** Restringir las funciones accesibles según el rol.

## Clientes

* **RF-05:** Registrar clientes nuevos.
* **RF-06:** Buscar y ver lista de clientes.
* **RF-07:** Editar datos de un cliente.
* **RF-08:** Desactivar clientes.

## Vehículos

* **RF-09:** Registrar vehículos vinculados a un cliente.
* **RF-10:** Consultar los vehículos registrados.
* **RF-11:** Editar información de un vehículo.
* **RF-12:** Consultar el historial de reparaciones de cada vehículo.

## Órdenes y Reparaciones

* **RF-13:** Crear órdenes de trabajo.
* **RF-14:** Vincular la orden con su cliente y su vehículo.
* **RF-15:** Registrar el problema que reporta el cliente.
* **RF-16:** Registrar el diagnóstico y las tareas por realizar.
* **RF-17:** Cambiar el estado del trabajo (Recibido, En reparación, Listo, etc.).
* **RF-18:** Consultar las órdenes creadas.

## Inventario y Repuestos

* **RF-19:** Registrar piezas y repuestos.
* **RF-20:** Registrar las entradas de productos y repuestos.
* **RF-21:** Registrar las salidas de productos y repuestos.
* **RF-22:** Actualizar el stock automáticamente al registrar entradas y salidas.
* **RF-23:** Avisar cuando un repuesto se esté agotando.

## Servicios y Citas

* **RF-24:** Crear catálogo de servicios.
* **RF-25:** Asignar precio a los servicios.
* **RF-26:** Agendar citas.
* **RF-27:** Editar o cancelar citas.
* **RF-28:** Ver la agenda de citas.

## Módulo financiero

* **RF-29:** Registrar cobros de órdenes.
* **RF-30:** Calcular cuánto le falta por pagar al cliente.
* **RF-31:** Registrar otros ingresos.
* **RF-32:** Registrar los gastos del taller.
* **RF-33:** Generar facturas internas.

## Reportes y Panel

* **RF-34:** Generar reportes de reparaciones.
* **RF-35:** Generar reportes de inventario.
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

**Contexto:** Un cliente registrado y activo va a registrar un vehículo; el recepcionista ha iniciado sesión y tiene acceso al módulo de clientes.

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

**Contexto:** El cliente y su vehículo ya están registrados; el vehículo ingresa al taller para una reparación.

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

**Contexto:** Existe una orden de reparación registrada y asignada al técnico.

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

**Contexto:** El repuesto ya está registrado en el inventario; el encargado tiene acceso al módulo de inventario.

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

**Contexto:** Existe una orden de reparación con un total definido y un saldo pendiente por cobrar.

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

**Contexto:** El administrador ha iniciado sesión; el dashboard resume la información registrada de órdenes, citas, inventario y finanzas.

**Secuencia:**

1. Inicia sesión.
2. Accede al dashboard.
3. Consulta las estadísticas.
4. Revisa órdenes pendientes, citas, inventario y situación financiera.

**Resultado esperado:** El administrador obtiene una visión general del estado del taller.

---

# 6. Casos de uso

Esta sección desarrolla el Deliverable 6 a partir de la documentación existente: los cinco roles de la sección 2, los requisitos RF-01 a RF-38 de la sección 3 y los escenarios de la sección 5. No se amplía el alcance ni se introduce una pila tecnológica nueva. El nombre del sistema se mantiene como `TalleresPro`.

## 6.1 Actores

Se utilizan exactamente los cinco roles identificados en la sección 2. No se introduce al cliente como actor externo porque los requisitos lo modelan como registro gestionado (RF-05 a RF-12: guardar, buscar, editar y vincular), no como usuario autenticado que opera el sistema.

| Actor | Rol en los casos de uso | Casos de uso principales |
|---|---|---|
| Administrador | Usuario con control general; gestiona usuarios, configuración y consulta global | CU-01, CU-02, CU-05, CU-14, CU-15 (además tiene acceso a todo el sistema, ver nota) |
| Recepcionista | Atiende clientes; registra clientes, vehículos, citas y órdenes; consulta reparaciones | CU-01, CU-03, CU-04, CU-06, CU-07, CU-08 (solo consulta) |
| Técnico | Ejecuta y actualiza reparaciones: diagnóstico, tareas y estados | CU-01, CU-08 |
| Encargado de inventario | Controla repuestos y movimientos de stock | CU-01, CU-09, CU-10 |
| Encargado administrativo | Gestiona cobros, ingresos, gastos, facturas internas y reportes financieros | CU-01, CU-11, CU-12, CU-13, CU-14 |

Notas:

* El Administrador accede a todo el sistema (sección 2). Por legibilidad, el diagrama solo dibuja sus asociaciones principales; el texto de cada caso de uso indica cuando actúa como actor secundario (por ejemplo, consulta en CU-08).
* El inicio de sesión (CU-01) es precondición de los demás casos de uso, no un `include` repetido (ver 6.2).
* Decisión pendiente para el equipo: el responsable del catálogo de servicios (CU-05) no está asignado explícitamente en los RF; aquí se propone al Administrador como primario (ver 6.5).

## 6.2 Diagrama de casos de uso

Fuente normativa del diagrama: [`diagrama_casos_uso.puml`](./diagrama_casos_uso.puml) (PlantUML, formato texto, mismo directorio que este documento).

Diagramas individuales por caso de uso: un diagrama de actividad por CU (CU-01 a CU-15, con su PNG renderizado) en [`uml/casos_de_uso/`](./uml/casos_de_uso/) (ver su `README.md`). Complementan este diagrama general sin reemplazarlo.

Se eligió PlantUML porque representa correctamente la semántica UML de casos de uso (actor, frontera del sistema, `usecase`, `include`/`extend`), mientras que Mermaid no ofrece un tipo nativo de diagrama de casos de uso. No se incluye imagen generada: este archivo `.puml` es la fuente. Para visualizarlo, abrirlo con la extensión PlantUML de VS Code o pegarlo en un visor PlantUML. No se afirma que exista una imagen cuando solo existe la fuente.

* Frontera del sistema: `TalleresPro`.
* Actores representados: los cinco internos.
* Casos de uso representados: CU-01 a CU-15 (ver 6.3).
* Asociaciones: cada actor se conecta con los casos de uso donde es primario (ver tabla 6.1). CU-08 muestra al Técnico (actualiza) y al Recepcionista (consulta). CU-14 muestra al Administrador y al Encargado administrativo.
* Relaciones estereotipadas: solo una, justificada. `CU-13 Generar factura interna <<extend>> CU-11 Registrar cobro de orden`, porque la factura interna es un comportamiento opcional que solo ocurre a partir de un cobro registrado. No se usa `<<include>>` en ningún caso: no hay un subflujo obligatorio común extraído como caso de uso aparte, e incluir el login en cada caso saturaría el diagrama sin aportar información.

## 6.3 Descripción detallada de los casos de uso

Convención: identificadores únicos `CU-01` a `CU-15`. Cada ficha indica actor primario (y secundario cuando aplica), objetivo, RF relacionados, precondiciones, flujo principal numerado, flujos alternos, excepciones y postcondiciones. Los flujos son concisos pero verificables.

### CU-01 — Iniciar sesión

* **Actor primario:** Todos (Administrador, Recepcionista, Técnico, Encargado de inventario, Encargado administrativo).
* **Objetivo:** Autenticarse para acceder a las funciones permitidas según el rol.
* **RF relacionados:** RF-02.
* **Precondiciones:** El usuario está registrado y activo; el sistema muestra la página de acceso.
* **Flujo principal:**
  1. El usuario accede a la página de inicio de sesión.
  2. Ingresa correo y contraseña.
  3. Solicita ingresar.
  4. El sistema valida las credenciales y el estado de la cuenta.
  5. El sistema crea la sesión con el rol del usuario.
  6. El sistema muestra la página inicial correspondiente a su rol.
* **Flujos alternos:**
  * A1. Ya existe una sesión activa: el sistema redirige a la página inicial sin pedir credenciales.
  * A2. El usuario cancela o abandona: el sistema permanece en la página de acceso sin crear sesión.
* **Excepciones:**
  * E1. Credenciales incorrectas: el sistema muestra un mensaje claro (RNF-02) y no crea la sesión.
  * E2. Cuenta desactivada o sin acceso por rol (RF-04): el sistema deniega el ingreso e informa el motivo.
  * E3. Campos vacíos o con formato inválido: el sistema indica qué dato corregir (RNF-02, RNF-11).
* **Postcondiciones:** Sesión activa con los permisos del rol; las funciones sensibles quedan protegidas (RNF-04, RNF-05).

### CU-02 — Gestionar usuarios y roles

* **Actor primario:** Administrador.
* **Objetivo:** Registrar usuarios, asignarles roles y controlar el acceso por rol.
* **RF relacionados:** RF-01, RF-03, RF-04.
* **Precondiciones:** El administrador autenticado (CU-01) con permiso de administración.
* **Flujo principal:**
  1. El administrador accede al módulo de usuarios.
  2. Consulta la lista de usuarios.
  3. Registra un usuario nuevo o selecciona uno existente.
  4. Ingresa o actualiza sus datos y le asigna un rol.
  5. Guarda; el sistema valida los datos.
  6. El sistema aplica los accesos correspondientes al rol.
* **Flujos alternos:**
  * A1. Bloquear o desbloquear accesos por rol: el sistema actualiza los permisos y los aplica en el siguiente ingreso.
  * A2. Búsqueda o filtrado de usuarios sin resultados: el sistema lo indica y permite limpiar el filtro.
* **Excepciones:**
  * E1. Correo duplicado o datos inválidos: el sistema rechaza el guardado e indica el error.
  * E2. Rol inexistente: el sistema no asigna y pide seleccionar un rol válido.
  * E3. Sin permiso de administración: el sistema deniega la operación.
* **Postcondiciones:** Usuario creado o actualizado con rol y accesos vigentes.

### CU-03 — Gestionar clientes

* **Actor primario:** Recepcionista (secundario: Administrador).
* **Objetivo:** Registrar, consultar, editar y desactivar clientes.
* **RF relacionados:** RF-05, RF-06, RF-07, RF-08.
* **Precondiciones:** Usuario autenticado con acceso al módulo de clientes.
* **Flujo principal:**
  1. El usuario accede al módulo de clientes y consulta la lista o busca por criterio.
  2. Registra un cliente nuevo o selecciona uno existente.
  3. Ingresa o edita los datos.
  4. Guarda; el sistema valida.
  5. El sistema confirma y deja el registro disponible.
* **Flujos alternos:**
  * A1. Desactivar un cliente: el sistema pide confirmación y marca el registro como inactivo (deja de ofrecerse para nuevas operaciones).
  * A2. Búsqueda sin coincidencias: el sistema lo indica y ofrece registrar al cliente.
* **Excepciones:**
  * E1. Datos obligatorios faltantes o inválidos: el sistema indica qué corregir.
  * E2. Registro duplicado (mismo documento o correo, según regla del equipo): el sistema advierte y no duplica.
  * E3. Cliente con órdenes activas al intentar desactivarlo: comportamiento por definir (ver 6.5); el sistema debe advertir antes de confirmar.
* **Postcondiciones:** Cliente registrado, actualizado o desactivado; disponible para vincular vehículos (CU-04).

### CU-04 — Gestionar vehículos y consultar historial

* **Actor primario:** Recepcionista (secundario: Administrador; el Técnico consulta el historial desde CU-08).
* **Objetivo:** Registrar vehículos vinculados a un cliente, mantener sus datos y consultar su historial de reparaciones.
* **RF relacionados:** RF-09, RF-10, RF-11, RF-12.
* **Precondiciones:** El cliente existe y está activo; usuario con acceso al módulo.
* **Flujo principal:**
  1. El usuario busca y selecciona al cliente.
  2. Registra un vehículo nuevo vinculado al cliente, o selecciona uno existente.
  3. Ingresa o edita marca, modelo, año, placa y demás datos.
  4. Guarda; el sistema valida y confirma.
  5. Si lo requiere, consulta el historial de reparaciones del vehículo.
* **Flujos alternos:**
  * A1. Consulta directa: listar o buscar vehículos guardados sin registrar uno nuevo.
  * A2. Historial vacío: el sistema lo indica en lugar de mostrar una lista vacía sin explicación.
* **Excepciones:**
  * E1. Placa duplicada o datos inválidos: el sistema rechaza e indica el error.
  * E2. Cliente inexistente o desactivado: el sistema no permite vincular el vehículo.
* **Postcondiciones:** Vehículo vinculado al cliente; historial consultable para órdenes futuras.

### CU-05 — Gestionar catálogo de servicios

* **Actor primario:** Administrador (pendiente de confirmación, ver 6.5; la Recepcionista usa el catálogo en CU-06 y CU-07).
* **Objetivo:** Mantener el catálogo de servicios con sus precios.
* **RF relacionados:** RF-24, RF-25.
* **Precondiciones:** Administrador autenticado.
* **Flujo principal:**
  1. El administrador accede al catálogo de servicios.
  2. Crea un servicio nuevo o selecciona uno existente.
  3. Define nombre, descripción y precio.
  4. Guarda; el sistema valida.
  5. El sistema deja el servicio disponible para citas y órdenes.
* **Flujos alternos:**
  * A1. Búsqueda o filtrado del catálogo.
* **Excepciones:**
  * E1. Precio faltante, cero o negativo, o nombre duplicado: el sistema rechaza e indica el error.
  * E2. Sin permiso: el sistema deniega la operación.
* **Postcondiciones:** Servicio creado o actualizado con precio vigente.

### CU-06 — Gestionar citas

* **Actor primario:** Recepcionista.
* **Objetivo:** Agendar, editar, cancelar y consultar la agenda de citas.
* **RF relacionados:** RF-26, RF-27, RF-28.
* **Precondiciones:** Cliente, vehículo y (cuando aplique) servicio existentes.
* **Flujo principal:**
  1. El recepcionista accede a la agenda.
  2. Agenda una cita indicando cliente, vehículo, servicio, fecha y hora.
  3. El sistema valida disponibilidad y datos.
  4. Guarda y confirma la cita.
  5. Cuando se requiere, edita o cancela una cita existente.
  6. Consulta la agenda del día o por filtros.
* **Flujos alternos:**
  * A1. Reprogramar: cambiar fecha u hora manteniendo el resto de los datos.
  * A2. Registrar la cita sin orden asociada todavía (la orden se crea en CU-07).
* **Excepciones:**
  * E1. Traslape de horario o fecha/hora inválida o pasada: el sistema rechaza e indica el error.
  * E2. Cliente, vehículo o servicio inexistente: el sistema no agenda.
  * E3. Cancelar una cita ya atendida o ya cancelada: el sistema lo advierte y no duplica la acción.
* **Postcondiciones:** Cita agendada, modificada o cancelada; agenda actualizada.

### CU-07 — Crear orden de reparación

* **Actor primario:** Recepcionista.
* **Objetivo:** Registrar el ingreso de un vehículo al taller como orden de trabajo.
* **RF relacionados:** RF-13, RF-14, RF-15.
* **Precondiciones:** Cliente y vehículo registrados; usuario autenticado; catálogo de servicios disponible si se seleccionan servicios.
* **Flujo principal:**
  1. El recepcionista selecciona al cliente y al vehículo.
  2. Crea una orden nueva.
  3. Registra el problema informado por el cliente.
  4. Selecciona los servicios correspondientes (cuando apliquen).
  5. Guarda; el sistema valida.
  6. El sistema crea la orden con estado inicial "Recibido".
* **Flujos alternos:**
  * A1. Crear la orden a partir de una cita existente (CU-06): el sistema precarga cliente, vehículo y servicio.
  * A2. Crear la orden sin servicios definidos todavía: quedan pendientes para el diagnóstico (CU-08).
* **Excepciones:**
  * E1. Cliente o vehículo no registrado: el sistema no crea la orden.
  * E2. Problema informado vacío u otro dato obligatorio faltante: el sistema indica qué completar.
* **Postcondiciones:** Orden creada en estado "Recibido", vinculada a cliente y vehículo.

### CU-08 — Actualizar reparación (diagnóstico, tareas, estados y consulta)

* **Actor primario:** Técnico. **Actores secundarios (solo consulta):** Recepcionista, Administrador.
* **Objetivo:** Registrar el diagnóstico y las tareas, cambiar el estado de la reparación y permitir la consulta de órdenes.
* **RF relacionados:** RF-16, RF-17, RF-18.
* **Precondiciones:** La orden existe (normalmente en "Recibido" o "En reparación"); el técnico autenticado.
* **Flujo principal:**
  1. El técnico consulta sus órdenes asignadas o busca una orden.
  2. Selecciona la orden.
  3. Registra o actualiza el diagnóstico y las tareas a realizar.
  4. Cambia el estado del trabajo (por ejemplo: Recibido, En reparación, Listo).
  5. Guarda; el sistema valida.
  6. El sistema muestra la orden actualizada.
* **Flujos alternos:**
  * A1. Solo consulta (Recepcionista/Administrador/Técnico): buscar y ver órdenes sin modificarlas.
  * A2. Actualización incremental: agregar tareas o cambiar el estado en varias sesiones.
* **Excepciones:**
  * E1. Orden inexistente: el sistema lo indica.
  * E2. Transición de estado inválida o cierre sin diagnóstico: regla por definir con el equipo (ver 6.5); el sistema debe validar e informar.
  * E3. Modificación sin permiso (rol no técnico): el sistema permite solo lectura.
* **Postcondiciones:** Orden con diagnóstico, tareas y estado actualizados; consultable por los roles autorizados. Corresponde al Escenario 4.

### CU-09 — Gestionar repuestos

* **Actor primario:** Encargado de inventario (secundario: Administrador).
* **Objetivo:** Registrar y mantener el catálogo de piezas y repuestos.
* **RF relacionados:** RF-19.
* **Precondiciones:** Usuario con acceso al módulo de inventario.
* **Flujo principal:**
  1. El encargado accede al módulo de inventario.
  2. Consulta o busca productos.
  3. Registra una pieza nueva (identificación, stock inicial y stock mínimo) o edita una existente.
  4. Guarda; el sistema valida.
  5. El sistema deja el repuesto disponible para movimientos (CU-10).
* **Flujos alternos:**
  * A1. Búsqueda sin coincidencias: el sistema lo indica y ofrece registrar la pieza.
* **Excepciones:**
  * E1. Identificador o nombre duplicado: el sistema advierte y no duplica.
  * E2. Stock inicial o mínimo inválido (negativo): el sistema rechaza e indica el error.
* **Postcondiciones:** Repuesto creado o actualizado con stock mínimo definido (base del aviso de stock bajo en CU-10).

### CU-10 — Registrar movimientos y controlar stock

* **Actor primario:** Encargado de inventario.
* **Objetivo:** Registrar entradas y salidas, actualizar el stock automáticamente y avisar cuando un repuesto se agota.
* **RF relacionados:** RF-20, RF-21, RF-22, RF-23.
* **Precondiciones:** El repuesto existe; usuario con acceso al módulo.
* **Flujo principal:**
  1. El encargado busca y selecciona el producto.
  2. Registra una entrada o una salida indicando la cantidad (en la salida puede asociar la orden de reparación).
  3. Confirma la operación; el sistema valida.
  4. El sistema suma o descuenta el stock automáticamente.
  5. Si el stock queda igual o por debajo del mínimo, el sistema muestra el aviso de stock bajo.
* **Flujos alternos:**
  * A1. Salida asociada a una orden (consumo en reparación) frente a salida general.
  * A2. Entrada por compra o ajuste de inventario.
* **Excepciones:**
  * E1. Cantidad inválida (cero o negativa): el sistema rechaza.
  * E2. Stock insuficiente para la salida: el sistema no descuenta e informa el disponible.
  * E3. Producto inexistente o desactivado: el sistema no registra el movimiento.
* **Postcondiciones:** Movimiento registrado; stock actualizado; aviso emitido cuando aplica. Corresponde al Escenario 5.

### CU-11 — Registrar cobro de orden

* **Actor primario:** Encargado administrativo.
* **Objetivo:** Registrar los cobros de una orden y mantener actualizado el saldo pendiente.
* **RF relacionados:** RF-29, RF-30.
* **Precondiciones:** La orden existe con un total definido.
* **Flujo principal:**
  1. El encargado busca la orden de reparación.
  2. Consulta el total y el saldo pendiente.
  3. Ingresa el monto recibido y el método de pago.
  4. Confirma; el sistema valida.
  5. El sistema registra el pago y recalcula el saldo pendiente.
* **Flujos alternos:**
  * A1. Pago parcial: el saldo restante queda pendiente para futuros cobros.
  * A2. Pago total: el saldo queda en cero y la orden figura como pagada.
* **Excepciones:**
  * E1. Monto inválido o mayor que el saldo (sobrepago): regla por definir (ver 6.5); el sistema debe validar e informar.
  * E2. Orden sin total definido o inexistente: el sistema no registra el cobro.
  * E3. Método de pago no seleccionado: el sistema pide completarlo.
* **Postcondiciones:** Pago registrado; saldo pendiente actualizado. Corresponde al Escenario 6.

### CU-12 — Registrar ingresos y gastos

* **Actor primario:** Encargado administrativo.
* **Objetivo:** Registrar otros ingresos del taller y sus gastos, distintos de los cobros de órdenes.
* **RF relacionados:** RF-31, RF-32.
* **Precondiciones:** Usuario con acceso al módulo financiero.
* **Flujo principal:**
  1. El encargado accede al módulo financiero.
  2. Elige registrar un ingreso o un gasto.
  3. Ingresa concepto, monto y fecha.
  4. Guarda; el sistema valida.
  5. El sistema confirma y deja el movimiento disponible para reportes.
* **Flujos alternos:**
  * A1. Consulta de ingresos y gastos registrados por periodo o concepto.
* **Excepciones:**
  * E1. Monto inválido o concepto vacío: el sistema rechaza e indica el error.
* **Postcondiciones:** Ingreso o gasto registrado y disponible para reportes (CU-14) y dashboard (CU-15).

### CU-13 — Generar factura interna

* **Actor primario:** Encargado administrativo.
* **Objetivo:** Generar la factura interna correspondiente a un cobro de orden.
* **RF relacionados:** RF-33. **Relación UML:** `<<extend>>` de CU-11 (comportamiento opcional posterior al cobro).
* **Precondiciones:** Existe un cobro registrado (CU-11) para la orden; datos básicos de la orden disponibles. No incluye facturación gubernamental ni bancaria (fuera de alcance, sección 1.5).
* **Flujo principal:**
  1. El encargado selecciona la orden o el cobro.
  2. Verifica los datos a facturar.
  3. Solicita generar la factura interna.
  4. El sistema asigna consecutivo, guarda la factura y la muestra.
* **Flujos alternos:**
  * A1. Consulta o reimpresión de una factura ya generada.
* **Excepciones:**
  * E1. Orden sin cobro registrado: el sistema no genera la factura e indica registrar el cobro primero.
  * E2. Datos incompletos para la factura: el sistema indica qué completar.
* **Postcondiciones:** Factura interna generada, guardada y asociada a la orden/cobro.

### CU-14 — Generar reportes

* **Actores primarios:** Administrador, Encargado administrativo.
* **Objetivo:** Generar reportes de reparaciones, inventario y movimientos financieros.
* **RF relacionados:** RF-34, RF-35, RF-36.
* **Precondiciones:** Usuario con permiso de reportes; existen datos y filtros (periodo, tipo).
* **Flujo principal:**
  1. El usuario accede al módulo de reportes.
  2. Elige el tipo: reparaciones, inventario o financiero (pagos, ingresos y gastos).
  3. Define filtros o rango de fechas.
  4. Genera el reporte; el sistema valida los parámetros.
  5. El sistema muestra el reporte.
* **Flujos alternos:**
  * A1. Ajustar filtros y regenerar cuando el resultado es vacío o muy amplio.
* **Excepciones:**
  * E1. Rango o parámetros inválidos: el sistema indica qué corregir.
  * E2. Sin datos para los criterios: el sistema lo informa en lugar de mostrar un reporte vacío sin explicación.
  * E3. Sin permiso de reportes: el sistema deniega la operación.
* **Postcondiciones:** Reporte del tipo solicitado visible con los criterios aplicados. El formato de exportación, si se requiere, está pendiente de definición (ver 6.5).

### CU-15 — Consultar dashboard

* **Actor primario:** Administrador.
* **Objetivo:** Visualizar el resumen del estado general del taller.
* **RF relacionados:** RF-37, RF-38.
* **Precondiciones:** Administrador autenticado.
* **Flujo principal:**
  1. El administrador accede al dashboard.
  2. El sistema presenta el resumen: trabajos pendientes, citas del día, productos con poco stock y totales financieros.
  3. El administrador revisa los indicadores y, si lo requiere, navega al módulo de detalle.
* **Flujos alternos:**
  * A1. Navegar desde un indicador hacia su módulo (órdenes, citas, inventario, finanzas) para ver el detalle.
* **Excepciones:**
  * E1. Sin datos en un indicador: el sistema muestra cero o "sin registros" en lugar de fallar.
  * E2. Error de carga de un indicador: el sistema lo señala y mantiene visibles los demás.
* **Postcondiciones:** Visión general del taller obtenida. Corresponde al Escenario 7.

## 6.4 Cobertura de requisitos funcionales

Todos los RF-01 a RF-38 quedan cubiertos por al menos un caso de uso. Verificación por agrupación:

| Caso de uso | RF cubiertos |
|---|---|
| CU-01 Iniciar sesión | RF-02 |
| CU-02 Gestionar usuarios y roles | RF-01, RF-03, RF-04 |
| CU-03 Gestionar clientes | RF-05, RF-06, RF-07, RF-08 |
| CU-04 Gestionar vehículos y consultar historial | RF-09, RF-10, RF-11, RF-12 |
| CU-05 Gestionar catálogo de servicios | RF-24, RF-25 |
| CU-06 Gestionar citas | RF-26, RF-27, RF-28 |
| CU-07 Crear orden de reparación | RF-13, RF-14, RF-15 |
| CU-08 Actualizar reparación | RF-16, RF-17, RF-18 |
| CU-09 Gestionar repuestos | RF-19 |
| CU-10 Registrar movimientos y controlar stock | RF-20, RF-21, RF-22, RF-23 |
| CU-11 Registrar cobro de orden | RF-29, RF-30 |
| CU-12 Registrar ingresos y gastos | RF-31, RF-32 |
| CU-13 Generar factura interna | RF-33 |
| CU-14 Generar reportes | RF-34, RF-35, RF-36 |
| CU-15 Consultar dashboard | RF-37, RF-38 |

Conteo: 1 + 3 + 4 + 4 + 2 + 3 + 3 + 3 + 1 + 4 + 2 + 2 + 1 + 3 + 2 = 38 RF cubiertos, sin duplicar identificadores de caso de uso (CU-01 a CU-15 únicos) y sin usar RF inexistentes. Los escenarios 1 a 7 corresponden respectivamente a CU-03, CU-04, CU-07, CU-08, CU-10, CU-11 y CU-15.

## 6.5 Decisiones pendientes para revisión del equipo

Lo siguiente no está definido por los RF actuales y no se inventó como requisito; requiere confirmación antes de la defensa y de las fases de diseño:

1. Responsable de CU-05: se propuso al Administrador; confirmar si la Recepcionista también crea servicios o solo los usa.
2. Cliente como actor: se mantiene como entidad gestionada, no autenticada. Confirmar que no existe portal del cliente.
3. RF-04: granularidad real de permisos por rol (qué puede ver cada rol en cada módulo).
4. RF-17: catálogo cerrado de estados y transiciones válidas (por ejemplo, si se puede marcar "Listo" sin diagnóstico).
5. RF-22/RF-23: confirmar que el umbral de aviso es el stock mínimo de CU-09 y cómo se muestra la alerta.
6. RF-30: regla de sobrepago (¿se rechaza el monto mayor al saldo o se registra a favor?).
7. RF-25/RF-33: moneda, impuestos y contenido mínimo de la factura interna (sin facturación gubernamental, según alcance).
8. RF-08: si un cliente desactivado puede reactivarse y qué pasa con sus órdenes activas.
9. CU-06: si se permiten traslapes de citas y duración por defecto.
10. CU-14: si los reportes deben exportarse (PDF/CSV) o solo visualizarse; no está en los RF.

---

# 7. Modelo de clases

## 7.1 Propósito y alcance

Este modelo representa las entidades de dominio necesarias para soportar los requisitos RF-01 a RF-38 y los casos de uso CU-01 a CU-15, sin ampliar el alcance de la sección 1.5 y sin introducir pila tecnológica, páginas de interfaz ni detalles de implementación. Cada clase existe porque al menos un RF o CU la exige; los reportes (CU-14) y el dashboard (CU-15) no son clases sino vistas derivadas (ver 7.7). El nombre del sistema se mantiene como `TalleresPro`.

## 7.2 Diagrama

Fuente normativa: [`diagrama_clases.puml`](./diagrama_clases.puml) (PlantUML, formato texto, mismo directorio que este documento).

Se eligió PlantUML por ser una fuente textual mantenible con sintaxis válida de diagrama de clases UML (clases, atributos, asociaciones, multiplicidades y composición). No se incluye imagen generada: este archivo `.puml` es la fuente. Para visualizarlo, abrirlo con la extensión PlantUML de VS Code o pegarlo en un visor PlantUML. No se afirma que exista una imagen cuando solo existe la fuente. El diagrama muestra las clases con sus atributos esenciales; el diccionario completo y las restricciones están en 7.4–7.6 para no saturar el dibujo. Las clases se agrupan en paquetes por legibilidad (Usuarios, Clientes y vehículos, Taller, Inventario, Finanzas); los paquetes son solo organización visual, no capas de implementación.

## 7.3 Clases principales y responsabilidades

| Clase | Responsabilidad en el dominio | Base en RF / CU |
|---|---|---|
| Rol | Define un rol y sus permisos (p. ej. Administrador, Recepcionista) | RF-03, RF-04 / CU-02 |
| Usuario | Cuenta autenticada del personal; tiene un rol y estado activo/inactivo | RF-01, RF-02, RF-04 / CU-01, CU-02 |
| Cliente | Persona o empresa atendida por el taller; registro gestionado, no actor | RF-05–RF-08 / CU-03 |
| Vehiculo | Vehículo vinculado a un cliente; base del historial de reparaciones | RF-09–RF-12 / CU-04 |
| Servicio | Ítem del catálogo con precio; se usa en citas y órdenes | RF-24, RF-25 / CU-05 |
| OrdenReparacion | Orden de trabajo: problema reportado, diagnóstico, estado y total | RF-13–RF-18 / CU-07, CU-08 |
| DetalleOrden | Línea de la orden que vincula un servicio con cantidad y precio del momento | RF-13 (servicios de la orden) / CU-07 |
| Tarea | Actividad del técnico dentro de una orden | RF-16 / CU-08 |
| Cita | Reserva de atención con fecha y hora para un cliente y vehículo | RF-26–RF-28 / CU-06 |
| Producto | Pieza o repuesto con stock y stock mínimo | RF-19 / CU-09 |
| MovimientoInventario | Entrada o salida de un producto; actualiza el stock | RF-20–RF-23 / CU-10 |
| Pago | Cobro aplicado a una orden; reduce el saldo pendiente | RF-29, RF-30 / CU-11 |
| Ingreso | Otro ingreso del taller distinto de los cobros de órdenes | RF-31 / CU-12 |
| Gasto | Egreso del taller | RF-32 / CU-12 |
| FacturaInterna | Comprobante interno asociado a una orden cobrada (sin alcance gubernamental) | RF-33 / CU-13 |

## 7.4 Diccionario de datos (atributos esenciales)

Convención: `<<PK>>` identificador, `<<UQ>>` valor único propuesto, `<<derivado>>` valor calculado. Los tipos son sugeridos (`int`, `string`, `decimal`, `bool`, `date`, `datetime`) para orientar el diseño, no una decisión de implementación.

### Usuarios

| Clase.Atributo | Tipo | Reglas apoyadas en requisitos |
|---|---|---|
| Rol.id | int <<PK>> | Identificador interno. |
| Rol.nombre | string | Nombre del rol (sección 2). Duplicados no permitidos (propuesto, ver 7.8). |
| Rol.permisos | string | Permisos del rol (RF-04). El detalle por módulo está pendiente (ver 6.5/7.8). |
| Usuario.id | int <<PK>> | Identificador interno. |
| Usuario.nombre | string | Obligatorio (RNF-11). |
| Usuario.correo | string <<UQ>> | Login (RF-02). Formato válido y único (RNF-11; duplicado tratado en CU-02). |
| Usuario.contrasenaHash | string | Nunca en claro (RNF-06); se almacena su hash. |
| Usuario.activo | bool | Permite bloquear el acceso (RF-04/CU-02). |

### Clientes y vehículos

| Clase.Atributo | Tipo | Reglas apoyadas en requisitos |
|---|---|---|
| Cliente.id | int <<PK>> | Identificador interno. |
| Cliente.nombre | string | Obligatorio. |
| Cliente.documento | string | Identificación del cliente; duplicados advertidos en CU-03 (regla exacta por confirmar, ver 7.8). |
| Cliente.telefono, Cliente.correo | string | Contacto; formato válido (RNF-11). |
| Cliente.activo | bool | Desactivar en lugar de borrar (RF-08/CU-03). |
| Vehiculo.id | int <<PK>> | Identificador interno. |
| Vehiculo.placa | string <<UQ>> | Identifica al vehículo; única (propuesto, ver 7.8). |
| Vehiculo.marca, Vehiculo.modelo | string | Obligatorios para identificar el vehículo (CU-04). |
| Vehiculo.anio | int | Año del vehículo; rango válido (RNF-11). |

### Taller

| Clase.Atributo | Tipo | Reglas apoyadas en requisitos |
|---|---|---|
| Servicio.id | int <<PK>> | Identificador interno. |
| Servicio.nombre | string <<UQ>> | Único en el catálogo (propuesto). |
| Servicio.descripcion | string | Descripción del servicio. |
| Servicio.precio | decimal | Precio vigente (RF-25); mayor que cero (CU-05). Moneda e impuestos pendientes (ver 7.8). |
| OrdenReparacion.id | int <<PK>> | Identificador interno. |
| OrdenReparacion.fechaIngreso | date | Fecha de creación (CU-07). |
| OrdenReparacion.problemaReportado | string | Problema informado por el cliente, obligatorio (RF-15/CU-07). |
| OrdenReparacion.diagnostico | string | Diagnóstico del técnico (RF-16/CU-08); puede completarse después de crear la orden. |
| OrdenReparacion.estado | string | P. ej. Recibido, En reparación, Listo (RF-17). Catálogo y transiciones por definir (ver 7.8). |
| OrdenReparacion.total | decimal <<derivado>> | Total de la orden (base del saldo en RF-30). Regla de cálculo por confirmar (ver 7.8). |
| DetalleOrden.id | int <<PK>> | Identificador interno. |
| DetalleOrden.cantidad | int | Cantidad del servicio en la orden; mayor que cero. |
| DetalleOrden.precioUnitario | decimal | Precio copiado del servicio al momento de la orden (foto del precio vigente; si el catálogo cambia, la orden conserva su valor). |
| Tarea.id | int <<PK>> | Identificador interno. |
| Tarea.descripcion | string | Descripción de la actividad (RF-16). |
| Tarea.estado | string | Estado de la tarea (p. ej. Pendiente, En curso, Hecha). Valores por confirmar junto con los estados de la orden. |
| Cita.id | int <<PK>> | Identificador interno. |
| Cita.fechaHora | datetime | Fecha y hora futuras; formato válido. Traslapes por definir (ver 7.8). |
| Cita.estado | string | P. ej. Agendada, Cancelada, Atendida. Valores por confirmar. |

### Inventario

| Clase.Atributo | Tipo | Reglas apoyadas en requisitos |
|---|---|---|
| Producto.id | int <<PK>> | Identificador interno. |
| Producto.nombre | string <<UQ>> | Único (propuesto). |
| Producto.stock | int | Existencia actual; nunca negativa (CU-10). Solo cambia mediante movimientos (RF-22). |
| Producto.stockMinimo | int | Umbral del aviso de stock bajo (RF-23/CU-09); mayor o igual que cero. |
| Producto.activo | bool | Permite retirar del uso sin borrar el histórico. |
| MovimientoInventario.id | int <<PK>> | Identificador interno. |
| MovimientoInventario.tipo | string | `entrada` o `salida` (RF-20/RF-21). |
| MovimientoInventario.cantidad | int | Mayor que cero; en salida no puede superar el stock (CU-10). |
| MovimientoInventario.fecha | datetime | Fecha del movimiento. |

### Finanzas

| Clase.Atributo | Tipo | Reglas apoyadas en requisitos |
|---|---|---|
| Pago.id | int <<PK>> | Identificador interno. |
| Pago.fecha | datetime | Fecha del cobro. |
| Pago.monto | decimal | Mayor que cero (CU-11). Relación con el saldo en 7.6; sobrepago por definir (ver 7.8). |
| Pago.metodoPago | string | Método seleccionado (CU-11, Escenario 6). Catálogo de métodos por confirmar. |
| Ingreso.id | int <<PK>> | Identificador interno. |
| Ingreso.concepto | string | Obligatorio (CU-12). |
| Ingreso.monto | decimal | Mayor que cero. |
| Ingreso.fecha | date | Fecha del ingreso. |
| Gasto.id, Gasto.concepto, Gasto.monto, Gasto.fecha | — | Análogos a Ingreso (RF-32/CU-12). |
| FacturaInterna.id | int <<PK>> | Identificador interno. |
| FacturaInterna.consecutivo | string <<UQ>> | Consecutivo único asignado al generar (CU-13). |
| FacturaInterna.fecha | datetime | Fecha de generación. |
| FacturaInterna.total | decimal | Total facturado, coherente con la orden/cobro (ver 7.6). Factura interna simple, sin facturación gubernamental (alcance 1.5). |

## 7.5 Relaciones y cardinalidades

| Relación | Significado | Mult. origen | Mult. destino | Tipo |
|---|---|---|---|---|
| Rol — Usuario | Un rol se asigna a muchos usuarios; cada usuario tiene exactamente un rol | 1 | * | Asociación |
| Cliente — Vehiculo | Un cliente posee varios vehículos; cada vehículo pertenece a un cliente | 1 | * | Asociación |
| Cliente — OrdenReparacion | Un cliente solicita varias órdenes; cada orden es de un cliente | 1 | 0..* | Asociación |
| Vehiculo — OrdenReparacion | Un vehículo ingresa por varias órdenes; cada orden es de un vehículo | 1 | 0..* | Asociación |
| OrdenReparacion — DetalleOrden | La orden contiene sus líneas de servicio | 1 | * | Composición |
| Servicio — DetalleOrden | Un servicio aparece en muchas líneas; cada línea es de un servicio | 1 | * | Asociación |
| OrdenReparacion — Tarea | La orden se descompone en tareas del técnico | 1 | * | Composición |
| Cliente — Cita | Un cliente agenda varias citas; cada cita es de un cliente | 1 | 0..* | Asociación |
| Vehiculo — Cita | Un vehículo programa varias citas; cada cita es para un vehículo | 1 | 0..* | Asociación |
| Servicio — Cita | Un servicio se agenda en varias citas; cada cita incluye como máximo un servicio | 1 | 0..* | Asociación (lado cita 0..1) |
| Producto — MovimientoInventario | Un producto registra muchos movimientos; cada movimiento es de un producto | 1 | * | Asociación (histórico, no composición) |
| OrdenReparacion — MovimientoInventario | Una orden origina cero o más salidas asociadas; cada salida se asocia como máximo a una orden | 1 | 0..* | Asociación (lado movimiento 0..1) |
| OrdenReparacion — Pago | Una orden recibe varios pagos; cada pago es de una orden | 1 | * | Asociación |
| OrdenReparacion — FacturaInterna | Una orden genera como máximo una factura interna | 1 | 0..1 | Asociación |

Lectura de la tabla: por ejemplo, `OrdenReparacion 1 — * Pago` significa que una orden puede tener muchos pagos y cada pago pertenece a una sola orden. La composición se usa solo en `DetalleOrden` y `Tarea` porque su ciclo de vida depende de la orden (no tienen sentido sin ella). Los movimientos de inventario usan asociación simple porque son histórico y no deben eliminarse con el producto. No se modela herencia ni agregación: ninguna está justificada por los requisitos.

Cómo se representan los flujos clave:

* La orden referencia a su cliente y a su vehículo (RF-14/CU-07) mediante dos asociaciones; la coherencia entre ambas (el vehículo debe pertenecer al cliente) es una invariante documentada en 7.6.
* Los servicios llegan a la orden mediante `DetalleOrden` (no como asociación directa `*..*`), para conservar cantidad y precio del momento.
* Los movimientos afectan al producto según RF-22: cada `MovimientoInventario` suma o descuenta `Producto.stock` (ver 7.6).
* Los pagos se relacionan con el saldo (RF-30): el saldo es `OrdenReparacion.total − suma(Pago.monto)` (ver 7.6).

## 7.6 Restricciones apoyadas en los requisitos

* **R1. Stock automático (RF-22):** `Producto.stock` solo cambia al confirmar un `MovimientoInventario` (entrada suma, salida descuenta). Prohibido editar el stock directamente.
* **R2. Salida con stock suficiente (CU-10):** una salida con `cantidad > Producto.stock` se rechaza e informa el disponible.
* **R3. Aviso de stock bajo (RF-23):** tras cada movimiento, si `Producto.stock <= Producto.stockMinimo`, el sistema muestra el aviso. El umbral es el mínimo del producto (CU-09).
* **R4. Saldo de la orden (RF-30):** `saldo = OrdenReparacion.total − suma(Pago.monto de la orden)`. `Pago.monto > 0`. El caso `monto > saldo` (sobrepago) se valida pero su regla está pendiente (ver 7.8).
* **R5. Factura a partir del cobro (RF-33/CU-13):** `FacturaInterna` exige al menos un `Pago` previo de la orden; su `total` debe ser coherente con la orden/cobro. Es interna y simple (fuera de alcance la facturación gubernamental y bancaria).
* **R6. Coherencia cliente–vehículo–orden (RF-14):** invariante propuesto: `OrdenReparacion.vehiculo.cliente = OrdenReparacion.cliente`. El sistema debe validar al crear la orden (confirmación pendiente, ver 7.8).
* **R7. Trazabilidad de consumos (Escenario 5/CU-10):** la salida asociada a una orden conserva la referencia `MovimientoInventario → OrdenReparacion` para explicar qué reparación consumió el repuesto.
* **R8. Acceso por rol (RF-04/RNF-05):** las operaciones sobre estas clases se restringen según `Usuario.rol`. El detalle de permisos por módulo está pendiente.

## 7.7 Lo que el modelo no incluye (y por qué)

* **Reporte y Dashboard:** CU-14 y CU-15 son consultas y vistas derivadas de las clases existentes (órdenes, productos, pagos, ingresos, gastos, citas), no entidades con identidad propia. Crear clases `Reporte` o `Dashboard` persistentes inventaría alcance.
* **Actores externos:** los cinco roles son usuarios (`Usuario`), no clases adicionales; el cliente es entidad `Cliente`, no actor autenticado (ver 6.1).
* **Páginas UI, controladores e infraestructura:** no son dominio; el modelo es de análisis, no de implementación.
* **Ítems de factura (`DetalleFactura`):** no se crea como clase porque RF-33/CU-13 no describen líneas de factura; el detalle se deriva de `DetalleOrden` y `Pago`. Si el equipo requiere líneas persistentes, es una decisión pendiente (ver 7.8).
* **Pagos con banco, facturación gubernamental, proveedores externos, IA de diagnóstico:** fuera de alcance (1.5); no generan clases.

## 7.8 Decisiones pendientes para revisión del equipo

Nada de lo siguiente se resolvió en silencio; requiere confirmación antes del diseño:

1. **Cardinalidad de factura:** se modeló `Orden 1 — 0..1 Factura`; confirmar si una orden puede tener varias facturas (p. ej. una por pago parcial) o si se mantiene una sola.
2. **Cálculo del total de la orden:** confirmar si `total = suma(DetalleOrden.cantidad × precioUnitario)` más ajustes manuales, o si el total se ingresa libremente. Afecta a R4/R5.
3. **Sobrepago (RF-30):** ¿rechazar `monto > saldo` o registrar a favor? (viene de 6.5).
4. **Precio del servicio en el tiempo:** se propone foto (`precioUnitario` copiado); confirmar que cambios del catálogo no recalculan órdenes existentes.
5. **Unicidades propuestas:** `Usuario.correo`, `Vehiculo.placa`, `Servicio.nombre`, `Producto.nombre`, `FacturaInterna.consecutivo`, `Cliente.documento` (regla exacta). Confirmar cuáles son únicas y mensajes de duplicado.
6. **Estados y transiciones (RF-17/CU-08):** catálogo cerrado de estados de `OrdenReparacion` y `Tarea`/`Cita`, y transiciones válidas (p. ej. cerrar sin diagnóstico).
7. **Citas (CU-06):** traslapes permitidos, duración por defecto, servicio obligatorio u opcional, y estados de la cita.
8. **Cliente–vehículo–orden (R6):** confirmar la invariante y qué hacer al desactivar un cliente o vehículo con órdenes/citas activas (viene de 6.5/RF-08).
9. **Eliminación y cascada:** desactivar en lugar de borrar (clientes, productos, usuarios). Confirmar que `DetalleOrden`/`Tarea` se eliminan con su orden (composición propuesta) y que movimientos, pagos y facturas nunca se borran.
10. **Permisos por rol (RF-04):** matriz real de qué rol opera cada clase.
11. **Catálogos pendientes:** métodos de pago, moneda e impuestos de `Servicio`/`FacturaInterna`, contenido mínimo de la factura interna.
12. **Ingresos/gastos:** confirmar que siguen como dos clases separadas y si deben vincularse al `Usuario` que los registra (actualmente sin asociación por falta de RF).

---

# 8. Modelo de navegación inicial

## 8.1 Propósito y alcance

Este modelo describe la estructura inicial de navegación de `TalleresPro`: qué vistas existen, cómo se agrupan, cómo se conectan y qué rol accede a cada una. Es un modelo de navegación, no un prototipo de interfaz: no define botones, campos ni estilos. Cada vista existe porque al menos un RF o CU la exige; no se crean vistas por conveniencia. La base son los RF-01 a RF-38, los CU-01 a CU-15 y las clases de la sección 7.

## 8.2 Diagrama

Fuente normativa: [`diagrama_navegacion.puml`](./diagrama_navegacion.puml) (PlantUML, formato texto, mismo directorio que este documento).

Convención del diagrama: la flecha continua (`-->`) es navegación entre vistas; la flecha punteada (`..>`) es acceso de un rol a un área; `[*]` es el punto de partida no autenticado. No se incluye imagen generada: este archivo `.puml` es la fuente. Para visualizarlo, abrirlo con la extensión PlantUML de VS Code o pegarlo en un visor PlantUML. No se afirma que exista una imagen cuando solo existe la fuente. El diagrama muestra la estructura principal; el detalle de vistas, matriz y flujos está en 8.3–8.5.

## 8.3 Jerarquía de navegación

Punto de entrada: **V-01 Login** (CU-01). Tras autenticarse, el usuario llega a su punto de partida según el rol: el Administrador al **V-02 Dashboard** completo (CU-15); el resto a sus módulos de trabajo (ver 8.4 y decisión P-01 en 8.7). El Dashboard ofrece además atajos de detalle hacia Órdenes, Citas, Inventario y Finanzas (CU-15 A1).

Vistas principales y subvistas (el identificador `V-xx` es de trazabilidad interna de esta sección):

* **V-01 Login** — página de acceso (correo + contraseña). Sin subvistas.
* **V-02 Dashboard** — resumen: trabajos pendientes, citas del día, poco stock y totales (RF-37/RF-38). Solo Administrador en este modelo.
* **V-03 Usuarios** — V-03a Lista de usuarios (buscar, RF-06 análogo/CU-02) → V-03b Formulario usuario + rol (crear/editar, asignar/bloquear, RF-01/RF-03/RF-04).
* **V-04 Clientes** — V-04a Lista/buscar (RF-06/CU-03) → V-04b Formulario (crear/editar, RF-05/RF-07) con acción Desactivar (RF-08) → V-04c Detalle (datos + vehículos del cliente, puerta a V-05b).
* **V-05 Vehículos** — V-05a Lista/buscar (RF-10/CU-04) → V-05b Formulario vinculado a un cliente (crear/editar, RF-09/RF-11) → V-05c Detalle + historial de reparaciones (RF-12) con acción Crear orden (CU-07).
* **V-06 Servicios** — V-06a Catálogo (lista/buscar, RF-24) → V-06b Formulario (crear/editar con precio, RF-25).
* **V-07 Citas** — V-07a Agenda (ver por día/filtros, RF-28) → V-07b Formulario (agendar/editar/cancelar con cliente, vehículo, servicio opcional y fecha/hora, RF-26/RF-27), con salida a Crear orden (CU-07 A1).
* **V-08 Órdenes** — V-08a Lista/buscar (RF-18) → V-08b Crear orden (cliente + vehículo + problema + servicios, estado inicial Recibido; RF-13–RF-15) → V-08c Detalle de orden (diagnóstico, tareas y estados, RF-16/RF-17; consulta RF-18). Acciones dentro del detalle: cambiar estado, agregar tareas, cobrar (→ V-10a), facturar (→ V-10c), registrar salida asociada (→ V-09c).
* **V-09 Inventario** — V-09a Lista de productos (buscar, CU-09) → V-09b Formulario producto (crear/editar con stock y mínimo, RF-19) → V-09c Registrar movimiento (entrada/salida con cantidad y orden opcional, RF-20/RF-21) → V-09d Aviso de stock bajo, vista derivada (no formulario): se muestra tras el movimiento y en el Dashboard cuando `stock <= stockMinimo` (RF-22/RF-23).
* **V-10 Finanzas** — V-10a Cobrar orden (total + saldo + monto + método, RF-29/RF-30; se alcanza desde el detalle de la orden) → V-10c Factura interna (generar/ver con consecutivo, RF-33, `<<extend>>` de CU-11); V-10b Ingresos y gastos (lista/consulta + registrar concepto, monto y fecha, RF-31/RF-32).
* **V-11 Reportes** — V-11a Selector (tipo: reparaciones/inventario/financiero + filtros, RF-34–RF-36) → V-11b Resultado (visualización; exportación pendiente, ver 6.5).

## 8.4 Matriz rol–vista

Leyenda: **●** gestiona (crea/edita/ejecuta) · **◐** consulta o uso parcial · **—** sin acceso en este modelo · **P** pendiente de confirmación (ver 8.7). "Admin (sec)" = acceso secundario por su control general (sección 2), limitado a consulta donde el CU asigna otro primario.

| Vista | Administrador | Recepcionista | Técnico | Enc. inventario | Enc. administrativo |
|---|---|---|---|---|---|
| V-01 Login (CU-01) | ● | ● | ● | ● | ● |
| V-02 Dashboard (CU-15) | ● | — (P-01) | — (P-01) | — (P-01) | — (P-01) |
| V-03 Usuarios (CU-02) | ● | — | — | — | — |
| V-04 Clientes (CU-03) | ● (sec) | ● | — | — | — |
| V-05 Vehículos + historial (CU-04) | ● (sec) | ● | — | — | — |
| V-06 Servicios (CU-05) | ● | ◐ (P-02) | — | — | — |
| V-07 Citas (CU-06) | ● | ● | — | — | — |
| V-08L Lista/crear órdenes (CU-07 + consulta) | ● | ● | ◐ | ◐ | ◐ |
| V-08D Detalle: diagnóstico/tareas/estados (CU-08) | ◐ (P-03) | ◐ | ● | — | ◐ |
| V-09P Productos (CU-09) | ● (sec) | — | — | ● | — |
| V-09M Movimientos + alerta (CU-10) | ◐ | — | — | ● | — |
| V-10C Cobros (CU-11) | ◐ | — | — | — | ● |
| V-10IG Ingresos/gastos (CU-12) | ◐ | — | — | — | ● |
| V-10F Facturas (CU-13) | ◐ | — | — | — | ● |
| V-11 Reportes (CU-14) | ● | — | — | — | ● |

Justificación de las consultas secundarias (no inventan permisos, derivan de los flujos): V-08L para el Técnico (sus asignadas, CU-08 paso 1), el Encargado de inventario (asociar salida a una orden, CU-10 A1) y el Encargado administrativo (buscar la orden a cobrar, CU-11 pasos 1–2); V-08D para Recepcionista/Administrador/Administrativo solo lectura (CU-08 A1); V-09M y V-10* para el Administrador solo lectura vía Dashboard/reportes. El Técnico no registra salidas (CU-10 asigna al inventario; el consumo llega vía la orden). Nadie salvo los indicados genera reportes (CU-14).

## 8.5 Flujos de navegación importantes

* **F1. Autenticación (CU-01):** `[*]` → V-01 → (punto de partida según rol). Credenciales inválidas o cuenta bloqueada permanecen en V-01 con mensaje (RNF-02).
* **F2. Atención al cliente (CU-03 → CU-04 → CU-06 → CU-07):** V-04a → V-04b → V-04c → V-05b → V-05c → (V-07b) → V-08b. La cita precarga cliente/vehículo/servicio en la orden.
* **F3. Reparación (CU-08):** V-08a → V-08c → editar diagnóstico/tareas/estado → guardar. Incluye la consulta de órdenes (RF-18) por los roles autorizados.
* **F4. Consumo de repuesto (CU-10):** V-08c → V-09c (salida con orden precargada) → V-09d si aplica → Página actualizada. La entrada no pasa por la orden.
* **F5. Cobro y factura (CU-11 → CU-13):** V-08c → V-10a (ver saldo, registrar pago) → V-10c (factura opcional). Sin cobro no hay factura (E1 de CU-13).
* **F6. Finanzas generales (CU-12):** V-10b registra ingresos/gastos, disponibles luego en V-11/V-02.
* **F7. Seguimiento gerencial (CU-14/CU-15):** V-02 → drill-down a V-08a/V-07a/V-09a/V-10b; V-11a → V-11b por tipo y filtros.

## 8.6 Relación con casos de uso y requisitos

| Vistas | CU | RF |
|---|---|---|
| V-01 | CU-01 | RF-02 |
| V-02 | CU-15 | RF-37, RF-38 |
| V-03 | CU-02 | RF-01, RF-03, RF-04 |
| V-04 | CU-03 | RF-05–RF-08 |
| V-05 | CU-04 | RF-09–RF-12 |
| V-06 | CU-05 | RF-24, RF-25 |
| V-07 | CU-06 | RF-26–RF-28 |
| V-08 (L + D) | CU-07, CU-08 | RF-13–RF-18 |
| V-09 (P + M) | CU-09, CU-10 | RF-19–RF-23 |
| V-10 (C + IG + F) | CU-11, CU-12, CU-13 | RF-29–RF-33 |
| V-11 | CU-14 | RF-34–RF-36 |

Toda vista está justificada por al menos un CU/RF; ningún CU queda sin vistas (CU-01→V-01, CU-02→V-03, CU-03→V-04, CU-04→V-05, CU-05→V-06, CU-06→V-07, CU-07/CU-08→V-08, CU-09/CU-10→V-09, CU-11/CU-12/CU-13→V-10, CU-14→V-11, CU-15→V-02). Clases de la sección 7 visibles por vista: V-04→Cliente, V-05→Vehiculo, V-06→Servicio, V-08→OrdenReparacion/DetalleOrden/Tarea (+Cliente/Vehiculo/Servicio de referencia), V-09→Producto/MovimientoInventario, V-10→Pago/Ingreso/Gasto/FacturaInterna, V-03→Usuario/Rol, V-07→Cita.

## 8.7 Decisiones y permisos pendientes para revisión del equipo

Nada se resolvió en silencio; lo siguiente requiere confirmación (además de lo ya listado en 6.5 y 7.8, que sigue vigente):

1. **P-01 Punto de partida no administrador:** ¿aterrizan en un Dashboard filtrado o directamente en su módulo (Clientes, Órdenes, Inventario, Finanzas)? CU-01 dice "página inicial según el rol" sin detallarla.
2. **P-02 V-06 Recepcionista:** ¿solo usa el catálogo en citas/órdenes o también lo gestiona? (viene de 6.5 n.º 1).
3. **P-03 V-08D Administrador:** ¿puede editar diagnóstico/estado o solo consulta? CU-08 asigna la edición al Técnico aunque el Administrador tenga acceso general.
4. **Alertas:** ¿el aviso de stock bajo es solo insignia en V-09a/V-02 o una bandeja propia? RF-23 no lo detalla (ver 7.8 n.º 5).
5. **Creación cruzada:** ¿puede crearse un cliente/vehículo desde V-08b o V-07b, o debe existir antes? CU-07 lo exige preexistente; confirmar si se permite el atajo.
6. **Permisos finos (RF-04):** la matriz 8.4 es la política mínima derivada de los CU; la granularidad por acción sigue pendiente (ver 6.5 n.º 3 y 7.8 n.º 10).

---

# 9. Matriz de trazabilidad

## 9.1 Propósito

Esta sección demuestra la consistencia entre objetivos, roles, requisitos (RF-01–RF-38, RNF-01–RNF-12), escenarios, casos de uso (CU-01–CU-15), clases (Sección 7) y vistas (Sección 8). La trazabilidad describe relaciones en la documentación; no prueba que el software esté implementado o probado.

## 9.2 Notación e interpretación

**●** primario · **◐** secundario / solo lectura · **—** sin relación documentada · **P** pendiente de confirmación. Estados: **Trazado** (cadena completa), **Parcial** (falta un eslabón, normalmente el escenario), **Pendiente** (decisión del equipo). El detalle está en [`matriz_trazabilidad.md`](./matriz_trazabilidad.md) (secciones A–H); aquí solo el resumen para mantener legible el documento principal.

## 9.3 Cobertura (conteos validados)

* **RF → CU: 38/38.** Ningún RF sin caso de uso (Sección C, base Sección 6.4 verificada).
* **RF → clase: 38/38.** RF-37/38 solo lectura de insumos (vista derivada, Sección D1).
* **RF → vista: 38/38.** RF-22/RF-23/RF-30 son reglas de fondo que la vista muestra (Sección E).
* **RF con escenario: 14/38** (RF-05, 09, 13–18, 21, 22, 29, 30, 37, 38). Los 24 restantes tienen CU + clase + vista pero sin escenario dedicado (Sección C).
* **RNF: 12/12** con alcance en Sección B2; los de calidad/compatibilidad son transversales sin clase directa única (Sección D2).

## 9.4 Huecos y trazabilidad débil

1. 24 RF sin escenario dedicado (listados en Sección C y Sección G de la matriz); el hueco es de escenificación, no de cobertura.
2. Reglas de fondo RF-22/RF-23/RF-30 trazadas a la vista que las muestra.
3. Lecturas secundarias ◐ (RF-12/RF-18 y consultas de inventario/finanzas) explícitas en Sección B1; no se presentan como gestión.
4. RNF-07 sin métrica y RNF transversales sin clase directa (reportado en Sección D2).

## 9.5 Decisiones pendientes que afectan la trazabilidad

P-01 (punto de partida no administrador), P-02 (gestión de servicios por Recepcionista), P-03 (edición de V-08D por Admin), cardinalidad de factura, fórmula del total, sobrepago, transiciones de estado, citas, unicidades y permisos finos (detalle en Sección H de la matriz y Sección 6.5/7.8/8.7). Las celdas P permanecen pendientes; nada se resolvió artificialmente.