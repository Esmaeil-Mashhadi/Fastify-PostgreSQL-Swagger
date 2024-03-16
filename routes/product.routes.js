import { getOneProductItem, getProductItem } from "../schemas.js";

const productRoutes = (app, options, done) => {

  app.addHook("onRequest"  ,async (request)=>{
    await request.jwtVerify()
  })
  app.get('/'  ,getProductItem) ; // we can use prefix because products is the same word
  app.get('/:id', getOneProductItem);
  done();
};

export default productRoutes;