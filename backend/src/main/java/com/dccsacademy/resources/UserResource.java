package com.dccsacademy.resources;

import com.dccsacademy.dtos.UserDto;
import com.dccsacademy.services.UserService;
import com.dccsacademy.utils.ResponseBuilder;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/v1/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @GET
    public Response searchUsers(
            @QueryParam("id") String id,
            @QueryParam("firstName") String firstName,
            @QueryParam("lastName") String lastName,
            @QueryParam("departmentId") String departmentId,
            @QueryParam("plant") String plant) {
        try {
            List<UserDto> users = userService.searchUsers(id, firstName, lastName, departmentId, plant);
            return ResponseBuilder.buildSuccessResponse("Users retrieved successfully", users, Response.Status.OK);
        } catch (EntityNotFoundException e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.NOT_FOUND);
        } catch (Exception e) {
            return ResponseBuilder.buildErrorResponse(e.getMessage(), Response.Status.BAD_REQUEST);
        }
    }

}
