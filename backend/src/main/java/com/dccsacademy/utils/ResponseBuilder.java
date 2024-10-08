package com.dccsacademy.utils;

import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

public class ResponseBuilder {

  public static Response buildSuccessResponse(
      String message, Object entity, Response.Status status) {
    Map<String, Object> response = new HashMap<>();
    response.put("message", message);
    if (entity != null) {
      response.put("data", entity);
    }
    return Response.status(status).entity(response).build();
  }

  public static Response buildErrorResponse(String errorMessage, Response.Status status) {
    Map<String, String> errorResponse = new HashMap<>();
    errorResponse.put("error", errorMessage);
    return Response.status(status).entity(errorResponse).build();
  }
}
