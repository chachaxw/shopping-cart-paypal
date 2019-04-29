import ProductModel from '../models';

export default async (ctx, next) => {
  const products = await ProductModel.find();
  const locals = {
    title: 'A nodeJS framework starter template with Koa',
    products: products,
  };
  console.log(locals);

  await ctx.render('index', locals);
}
