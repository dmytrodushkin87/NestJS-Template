import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from './product.model';

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body("title") prodTitle: string,
    @Body("description") prodDesc: string,
    @Body("price") prodPrice: number
  ): Promise<{id: String}> {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get(":id")
  async getProduct(@Param("id") prodId: string): Promise<Product> {
    const product = await this.productsService.getSingleProduct(prodId);
    return product
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") prodId: string,
    @Body("title") prodTitle: string,
    @Body("description") prodDesc: string,
    @Body("price") prodPrice: number
  ) {
    const updatedProduct = await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice
    );
    return updatedProduct;
  }

  @Delete(":id")
  async removeProduct(@Param("id") prodId: string): Promise<Product> {
    const deletedProduct = await this.productsService.deleteProduct(prodId);
    return deletedProduct;
  }
}
