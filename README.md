# 📚 Registro Cloud Innovation Day — API Serverless

![AWS](https://img.shields.io/badge/AWS-Serverless-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=node.js&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-NoSQL-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

API REST **serverless** para gestionar el registro de estudiantes inscritos en el evento académico **Cloud Innovation Day**, desarrollada con AWS Lambda, API Gateway y DynamoDB.

---

## 📑 Tabla de contenidos

- [Arquitectura](#-arquitectura)
- [Servicios AWS utilizados](#-servicios-aws-utilizados)
- [Modelo de datos](#-modelo-de-datos)
- [Endpoints](#-endpoints)
- [URL base desplegada](#-url-base-desplegada)
- [Ejemplo de uso](#-ejemplo-de-uso)
- [Despliegue](#-despliegue)
- [Autor](#-autor)

---

## 🏗️ Arquitectura

```
Cliente / Postman
       │
       ▼
Amazon API Gateway
       │
       ▼
    AWS Lambda
       │
       ▼
  Amazon DynamoDB
```

Los logs de cada ejecución se envían automáticamente a **Amazon CloudWatch** para monitoreo y depuración.

---

## ☁️ Servicios AWS utilizados

| Servicio | Uso |
|---|---|
| **AWS Lambda** (Node.js 24.x) | Lógica de negocio del backend |
| **Amazon API Gateway** (HTTP API) | Exposición de endpoints REST |
| **Amazon DynamoDB** | Almacenamiento NoSQL |
| **AWS IAM** | Permisos y control de acceso |
| **Amazon CloudWatch** | Logs y monitoreo |

---

## 🗂️ Modelo de datos

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | String | Identificador único *(clave primaria)* |
| `nombres` | String | Nombres del estudiante |
| `apellidos` | String | Apellidos del estudiante |
| `correo` | String | Correo institucional |
| `carrera` | String | Carrera profesional |
| `ciclo` | String | Ciclo académico |
| `fechaRegistro` | String | Fecha de inscripción |

---

## 🔌 Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/estudiantes` | Registrar un nuevo estudiante |
| `GET` | `/estudiantes` | Listar todos los estudiantes |
| `GET` | `/estudiantes/{id}` | Consultar un estudiante por ID |
| `DELETE` | `/estudiantes/{id}` | Eliminar un estudiante |

---

## 🌐 URL base desplegada

```
https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com
```

---

## 🧪 Ejemplo de uso

**Registrar estudiante:**

```bash
curl -X POST https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "id": "E001",
    "nombres": "Luis Ángel",
    "apellidos": "Campos Valenzuela",
    "correo": "luis.campos@tecsup.edu.pe",
    "carrera": "Diseño y Desarrollo de Software",
    "ciclo": "5",
    "fechaRegistro": "2026-06-30"
  }'
```

**Respuesta esperada:**

```json
{
  "mensaje": "Estudiante registrado correctamente",
  "id": "E001"
}
```

---

## 🚀 Despliegue

1. Crear tabla DynamoDB `EstudiantesEvento` con clave primaria `id` *(String)*
2. Crear rol IAM con permisos `AmazonDynamoDBFullAccess` y `AWSLambdaBasicExecutionRole`
3. Crear función Lambda con Node.js, asignar el rol creado, pegar el código de `index.mjs`
4. Crear API HTTP en API Gateway y conectar las 4 rutas a la Lambda
5. Probar los endpoints con Postman

---

## 👩‍💻 Autor

**Mayela Ticona** — Tecsup, Desarrollo de Soluciones en la Nube
