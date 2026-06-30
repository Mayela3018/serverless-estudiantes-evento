import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "EstudiantesEvento";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
};

const response = (statusCode, body) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  try {
    const method = event.requestContext?.http?.method || event.httpMethod;
    const pathParams = event.pathParameters || {};
    const id = pathParams.id;

    // OPTIONS para CORS
    if (method === "OPTIONS") {
      return response(200, {});
    }

    // POST /estudiantes -> Registrar estudiante
    if (method === "POST") {
      const body = JSON.parse(event.body);

      if (
        !body.id ||
        !body.nombres ||
        !body.apellidos ||
        !body.correo ||
        !body.carrera ||
        !body.ciclo ||
        !body.fechaRegistro
      ) {
        return response(400, { mensaje: "Faltan campos obligatorios" });
      }

      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: body,
        })
      );

      return response(201, {
        mensaje: "Estudiante registrado correctamente",
        id: body.id,
      });
    }

    // GET /estudiantes -> Listar todos
    if (method === "GET" && !id) {
      const result = await docClient.send(
        new ScanCommand({ TableName: TABLE_NAME })
      );
      return response(200, result.Items);
    }

    // GET /estudiantes/{id} -> Consultar por ID
    if (method === "GET" && id) {
      const result = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { id },
        })
      );

      if (!result.Item) {
        return response(404, { mensaje: "No se encontró el estudiante solicitado" });
      }

      return response(200, result.Item);
    }

    // DELETE /estudiantes/{id} -> Eliminar
    if (method === "DELETE" && id) {
      const existing = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { id },
        })
      );

      if (!existing.Item) {
        return response(404, { mensaje: "No se encontró el estudiante solicitado" });
      }

      await docClient.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { id },
        })
      );

      return response(200, { mensaje: "Estudiante eliminado correctamente", id });
    }

    return response(400, { mensaje: "Método no soportado" });
  } catch (error) {
    console.error("Error:", error);
    return response(500, { mensaje: "Error interno del servidor", error: error.message });
  }
};