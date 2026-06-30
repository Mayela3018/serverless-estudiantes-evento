# Pruebas realizadas - API Registro Cloud Innovation Day

URL base: `https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com`

Herramienta utilizada: Postman

---

## 1. POST /estudiantes - Registrar estudiante

**Request:**
```
POST https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com/estudiantes
Content-Type: application/json

{
  "id": "E001",
  "nombres": "Luis Ángel",
  "apellidos": "Campos Valenzuela",
  "correo": "luis.campos@tecsup.edu.pe",
  "carrera": "Diseño y Desarrollo de Software",
  "ciclo": "5",
  "fechaRegistro": "2026-06-30"
}
```

**Response:** `200 OK`
```json
{
  "mensaje": "Estudiante registrado correctamente",
  "id": "E001"
}
```

Se repitió el mismo registro para los estudiantes E002, E003 y E004 con datos distintos, confirmando que el endpoint funciona correctamente con múltiples registros.

---

## 2. GET /estudiantes - Listar todos los estudiantes

**Request:**
```
GET https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com/estudiantes
```

**Response:** `200 OK`
```json
[
  {
    "correo": "jaime.farfan@tecsup.edu.pe",
    "ciclo": "5",
    "apellidos": "Farfán Rojas",
    "fechaRegistro": "2026-06-30",
    "id": "E003",
    "carrera": "Diseño y Desarrollo de Software",
    "nombres": "Jaime"
  },
  {
    "correo": "milagros.ramos@tecsup.edu.pe",
    "ciclo": "5",
    "apellidos": "Ramos Quispe",
    "fechaRegistro": "2026-06-30",
    "id": "E002",
    "carrera": "Diseño y Desarrollo de Software",
    "nombres": "Milagros"
  },
  {
    "correo": "david.mendoza@tecsup.edu.pe",
    "ciclo": "5",
    "apellidos": "Mendoza Silva",
    "fechaRegistro": "2026-06-30",
    "id": "E004",
    "carrera": "Administración de Redes y Comunicaciones",
    "nombres": "David"
  }
]
```

---

## 3. GET /estudiantes/{id} - Consultar estudiante por ID

**Request:**
```
GET https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com/estudiantes/E001
```

**Response:** `200 OK`
```json
{
  "correo": "luis.campos@tecsup.edu.pe",
  "ciclo": "5",
  "apellidos": "Campos Valenzuela",
  "fechaRegistro": "2026-06-30",
  "id": "E001",
  "carrera": "Diseño y Desarrollo de Software",
  "nombres": "Luis Ángel"
}
```

---

## 4. GET /estudiantes/{id} - Caso de error (estudiante no encontrado)

**Request:**
```
GET https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com/estudiantes/E999
```

**Response:** `404 Not Found`
```json
{
  "mensaje": "No se encontró el estudiante solicitado"
}
```

---

## 5. DELETE /estudiantes/{id} - Eliminar estudiante

**Request:**
```
DELETE https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com/estudiantes/E001
```

**Response:** `200 OK`
```json
{
  "mensaje": "Estudiante eliminado correctamente",
  "id": "E001"
}
```

**Verificación posterior (GET /estudiantes):** se confirmó que el estudiante E001 ya no aparece en el listado, validando la correcta eliminación del registro en DynamoDB.

---

## Resumen de resultados

| Endpoint | Método | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| /estudiantes | POST | 200 - mensaje de registro exitoso | OK | ✅ |
| /estudiantes | GET | 200 - listado de estudiantes | OK | ✅ |
| /estudiantes/{id} | GET | 200 - datos del estudiante | OK | ✅ |
| /estudiantes/{id} | GET (id inexistente) | 404 - estudiante no encontrado | OK | ✅ |
| /estudiantes/{id} | DELETE | 200 - mensaje de eliminación exitosa | OK | ✅ |

Todos los endpoints fueron probados exitosamente desde Postman contra la API desplegada en AWS (HTTP API Gateway + Lambda + DynamoDB). Las ejecuciones quedaron registradas en Amazon CloudWatch.
