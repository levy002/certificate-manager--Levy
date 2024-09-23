package com.dccsacademy.seeds;

import com.dccsacademy.dtos.SupplierDto;
import com.dccsacademy.repositories.SupplierRepository;
import com.dccsacademy.services.SupplierService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@ApplicationScoped
public class SupplierSeed extends BaseSeed<SupplierDto> {

    @Inject
    SupplierRepository supplierRepository;

    @Inject
    SupplierService supplierService;

    private static final String[][] SUPPLIERS = {
            {"Supplier A", "SUP-001", "Berlin"},
            {"Supplier B", "SUP-002", "Munich"},
            {"Supplier C", "SUP-003", "Vienna"},
            {"Supplier D", "SUP-004", "Graz"},
            {"Supplier E", "SUP-005", "Sarajevo"},
            {"Supplier F", "SUP-006", "Graz"},
            {"Supplier G", "SUP-007", "Sarajevo"}
    };

    @Override
    protected boolean isEmpty() {
        return supplierRepository.listAll().isEmpty();
    }

    @Override
    protected List<SupplierDto> getSeedData() {
        return Stream.of(SUPPLIERS)
                .map(supplierData -> new SupplierDto(supplierData[0], supplierData[1]))
                .collect(Collectors.toList());
    }

    @Override
    protected void createEntity(SupplierDto supplierDto) {
        supplierService.createSupplier(supplierDto);
    }
}
