package com.dccsacademy.resources;

import com.dccsacademy.utils.ResponseBuilder;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/v1/certificates")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CertificateResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCertificates() {
        try {
            return ResponseBuilder.buildSuccessResponse("Certificates retrieved successfully", null, Response.Status.OK);
        } catch (Exception e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }
}
