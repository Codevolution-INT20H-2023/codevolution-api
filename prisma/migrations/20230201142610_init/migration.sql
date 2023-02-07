-- CreateEnum
CREATE TYPE "Measure" AS ENUM ('KILOGRAMMS', 'LITERS', 'GRAMMS', 'MILLILITERS', 'PIECES', 'BUNCH', 'TABLE_SPOON', 'TEA_SPOON', 'CUP', 'PINCH', 'CLOVE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_products" (
    "user_id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,

    CONSTRAINT "user_products_pkey" PRIMARY KEY ("user_id","ingredient_id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "measure" "Measure" NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingredient_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "recipe_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_products" (
    "ingredient_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "recipe_products_pkey" PRIMARY KEY ("ingredient_id","recipe_id")
);

-- AddForeignKey
ALTER TABLE "user_products" ADD CONSTRAINT "user_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_products" ADD CONSTRAINT "user_products_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ingredient_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "recipe_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_products" ADD CONSTRAINT "recipe_products_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_products" ADD CONSTRAINT "recipe_products_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
