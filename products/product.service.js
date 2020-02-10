import Product from "./product.model";
import crudRepository from "../core/crudRepository";

const CrudRepository = crudRepository(Product);

export const createProduct = (requestor, product) => {
    try {
        product.createdOn = Date.now();
        product.createdBy = requestor;
        return CrudRepository.create(product);
    } catch (err) {
        console.error(err);
        throw err;
    }
};
