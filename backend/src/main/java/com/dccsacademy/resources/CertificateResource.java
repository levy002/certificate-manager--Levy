package com.dccsacademy.resources;

import com.dccsacademy.dtos.CertificateDto;
import com.dccsacademy.services.CertificateService;
import com.dccsacademy.utils.ResponseBuilder;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("api/v1/certificates")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CertificateResource {

    @Inject
    CertificateService certificateService;

    @POST
    public Response createCertificate(CertificateDto certificate) {
        try {
            certificateService.createCertificate(certificate);
            return ResponseBuilder.buildSuccessResponse("Certificate created successfully", null, Response.Status.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @GET
    public Response getAllCertificates() {
        try {
            List<CertificateDto> allCertificates = certificateService.getAllCertificates();
            return ResponseBuilder.buildSuccessResponse("Certificate retrieved successfully", allCertificates, Response.Status.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @GET
    @Path("/{id}")
    public Response getCertificateById(@PathParam("id") Long id) {
        try {
            CertificateDto certificateDto = certificateService.getCertificateById(id);
            return ResponseBuilder.buildSuccessResponse("Certificate retrieved successfully", certificateDto, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.NOT_FOUND);
        }  catch (Exception e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateCertificate(@PathParam("id") Long id, CertificateDto certificateDto) {
        try {
            CertificateDto updatedCertificate = certificateService.updateCertificate(id, certificateDto);
            return ResponseBuilder.buildSuccessResponse("Certificate updated successfully", updatedCertificate, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }


    @DELETE
    @Path("/{id}")
    public Response deleteCertificateById(@PathParam("id") Long id) {
        try {
            certificateService.deleteCertificate(id);
            return ResponseBuilder.buildSuccessResponse("Certificate deleted successfully", null, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseBuilder.buildErrorResponse( e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

}
