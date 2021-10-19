import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.model";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>
  ) {}

  async insertProduct(
    title: string,
    desc: string,
    price: number
  ): Promise<String> {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price
    });
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getSingleProduct(prodId: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(prodId);
      return product;
    } catch (error) {
      throw new NotFoundException("Could not find product.");
    }
  }

  async updateProduct(prodId: string, title: string, desc: string, price: number) {
    try {
      const product = await this.productModel.findById(prodId);
      if (title) {
        product.title = title;
      }
      if (desc) {
        product.description = desc;
      }
      if (price) {
        product.price = price;
      }
      product.save();
      return product;
    } catch (error) {
      throw new NotFoundException("Could not find product.");
    }
  }

  async deleteProduct(prodId: string) {
    try {
      const product = await this.productModel.findById(prodId);
      return await product.remove()
      // return product;
    } catch (error) {
      throw new NotFoundException("Could not find product.");
    }
  }

  // private findProduct(id: string): [Product, number] {
  //   const productIndex = this.products.findIndex(prod => prod.id === id);
  //   const product = this.products[productIndex];
  //   if (!product) {
  //     throw new NotFoundException("Could not find product.");
  //   }
  //   return [product, productIndex];
  // }
}
