import ProductModel from '../models';

export default async (ctx, next) => {
  const products = await ProductModel.find();
  const locals = {
    title: 'Buy 10 Diabetic Herbal Patch to Get 10 FREE (120pcs) TODAY for ONLY $137.99!',
    products,
  };
  // console.log(locals);

  await ctx.render('index', locals);
}
