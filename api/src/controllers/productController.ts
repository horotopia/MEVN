import { Request, Response } from "express";
import { Product } from "../models/product.model";

// Récupérer tous les produits
const getProducts = async (req: Request, res: Response) => {
  const [error, products] = await Product.find()
    .then((products) => [null, products])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  products ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(products);
};

// Récupérer tous les produits en stock
const getProductsInStock = async (req: Request, res: Response) => {
  const [error, products] = await Product.find({ stock: { $gt: 0 } })
    .then((products) => [null, products])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  products ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(products);
};

// Récupérer tous les produit d'une catégorie en stock
const getProductsByCategory = async (req: Request, res: Response) => {
  const [error, products] = await Product.find({
    category: req.params.category,
    stock: { $gt: 0 },
  })
    .then((products) => [null, products])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  products ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(products);
};

// Récupérer tous les produits d'un type en stock
const getProductsByType = async (req: Request, res: Response) => {
  const [error, products] = await Product.find({
    type: req.params.type,
    stock: { $gt: 0 },
  })
    .then((products) => [null, products])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  products ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(products);
};

// Récupérer tous les produits d'un niveau d'évolution en stock
const getProductsByEvolutionLevel = async (req: Request, res: Response) => {
  const [error, products] = await Product.find({
    evolutionLevel: req.params.level,
    stock: { $gt: 0 },
  })
    .then((products) => [null, products])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  products ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(products);
};

// Récupérer un produit par son ID
const getProduct = async (req: Request, res: Response) => {
  const [error, product] = await Product.findById(req.params.id)
    .then((product) => [null, product])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  product ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(product);
};

// Ajouter un produit
const postProduct = async (req: Request, res: Response) => {
  const [error, product] = await Product.create(req.body)
    .then((product) => [null, product])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  product ?? res.status(404).json({ message: "Aucun produit créé." });
  res.status(201).json(product);
};

// Modifier un produit
const putProduct = async (req: Request, res: Response) => {
  const [error, product] = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
    .then((product) => [null, product])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  product ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(product);
};

// Supprimer un produit
const deleteProduct = async (req: Request, res: Response) => {
  const [error, product] = await Product.findByIdAndDelete(req.params.id)
    .then((product) => [null, product])
    .catch((error) => [error, null]);

  error ?? res.status(500).json({ message: error.message });
  product ?? res.status(404).json({ message: "Aucun produit trouvé." });
  res.status(200).json(product);
};

export {
  deleteProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
  getProductsByEvolutionLevel,
  getProductsByType,
  getProductsInStock,
  postProduct,
  putProduct,
};
