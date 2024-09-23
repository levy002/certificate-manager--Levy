package com.dccsacademy.resources;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.dtos.SupplierDto;
import com.dccsacademy.services.SupplierService;
import com.dccsacademy.utils.ResponseBuilder;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("api/v1/suppliers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierResource {

    @Inject
    SupplierService supplierService;

    @GET
    public Response searchSuppliers(
            @QueryParam("id") String id,
            @QueryParam("name") String name,
            @QueryParam("city") String city) {
        try{
            List<SupplierDto> suppliers = supplierService.searchSuppliers(id, name, city);
            return ResponseBuilder.buildSuccessResponse("Suppliers retrieved successfully", suppliers, Response.Status.OK);
        } catch(Exception e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }
}
