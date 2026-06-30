\# Registro Cloud Innovation Day - API Serverless



API REST serverless para gestionar el registro de estudiantes inscritos en el evento académico Cloud Innovation Day, desarrollada con AWS Lambda, API Gateway y DynamoDB.



\## Arquitectura



Cliente / Postman → Amazon API Gateway → AWS Lambda → Amazon DynamoDB



Los logs de ejecución se envían automáticamente a Amazon CloudWatch.



\## Servicios AWS utilizados



\- \*\*AWS Lambda\*\* (Node.js 24.x) - Lógica de negocio

\- \*\*Amazon API Gateway\*\* (HTTP API) - Exposición de endpoints REST

\- \*\*Amazon DynamoDB\*\* - Almacenamiento NoSQL

\- \*\*AWS IAM\*\* - Permisos y roles

\- \*\*Amazon CloudWatch\*\* - Logs y monitoreo



\## Modelo de datos



| Campo | Tipo | Descripción |

|---|---|---|

| id | String | Identificador único (clave primaria) |

| nombres | String | Nombres del estudiante |

| apellidos | String | Apellidos del estudiante |

| correo | String | Correo institucional |

| carrera | String | Carrera profesional |

| ciclo | String | Ciclo académico |

| fechaRegistro | String | Fecha de inscripción |



\## Endpoints



| Método | Ruta | Descripción |

|---|---|---|

| POST | /estudiantes | Registrar un nuevo estudiante |

| GET | /estudiantes | Listar todos los estudiantes |

| GET | /estudiantes/{id} | Consultar un estudiante por ID |

| DELETE | /estudiantes/{id} | Eliminar un estudiante |



\## URL base desplegada



https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com



\## Ejemplo de uso



Registrar estudiante:



```bash

curl -X POST https://5h2k03fjzk.execute-api.us-east-1.amazonaws.com/estudiantes \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{

&#x20;   "id": "E001",

&#x20;   "nombres": "Luis Ángel",

&#x20;   "apellidos": "Campos Valenzuela",

&#x20;   "correo": "luis.campos@tecsup.edu.pe",

&#x20;   "carrera": "Diseño y Desarrollo de Software",

&#x20;   "ciclo": "5",

&#x20;   "fechaRegistro": "2026-06-30"

&#x20; }'

```



\## Despliegue



1\. Crear tabla DynamoDB `EstudiantesEvento` con clave primaria `id` (String)

2\. Crear rol IAM con permisos `AmazonDynamoDBFullAccess` y `AWSLambdaBasicExecutionRole`

3\. Crear función Lambda con Node.js, asignar el rol creado, pegar el código de `index.mjs`

4\. Crear API HTTP en API Gateway, conectar las 4 rutas a la Lambda

5\. Probar los endpoints con Postman



\## Autor



Mayela Ticona - Tecsup, Desarrollo de Soluciones en la Nube



