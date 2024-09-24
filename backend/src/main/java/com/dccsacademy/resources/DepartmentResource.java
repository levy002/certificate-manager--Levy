package com.dccsacademy.resources;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.services.DepartmentService;
import com.dccsacademy.utils.ResponseBuilder;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/v1/departments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DepartmentResource {

    @Inject
    DepartmentService departmentService;

    @GET
    public Response getDepartments() {
        try{
            List<DepartmentDto> departments = departmentService.getDepartments();
            return ResponseBuilder.buildSuccessResponse("Departments retrieved successfully", departments, Response.Status.OK);
        } catch(Exception e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }
}
