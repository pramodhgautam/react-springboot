package com.codechimp.controller;

import com.codechimp.model.Product;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend from localhost:3000 to access this API
public class ProductController {
    
    private final List<Product> productList = new ArrayList<>();

    // Endpoint to add a new product
    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product) {
        productList.add(product);
        return product;
    }

    // Endpoint to get all products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productList;
    }

    // Endpoint to update a product by id
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable long id, @RequestBody Product product) {
        Product existingProduct = productList.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
        
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setPrice(product.getPrice());
            return existingProduct;
        }
        
        return null;  // Or return some error if product is not found
    }

    // Endpoint to delete a product by id
    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable long id) {
        boolean removed = productList.removeIf(product -> product.getId() == id);
        return removed ? "Product deleted successfully" : "Product not found";
    }
}
