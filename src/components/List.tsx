import ProductContext from "@/context/Product.tsx";
import axios from "axios";
import { useContext, useEffect } from "react";

const List = () => {
  const { state, dispatch } = useContext(ProductContext) as any;
  console.log("state", state);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/products");
        dispatch({ type: "FETCH_PRODUCTS", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product: any) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        product
      );

      //rerender
      dispatch({ type: "ADD_PRODUCT", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async (product: any) => {
    try {
      const { data } = await axios.put(
        "http://localhost:3000/products/"+product.id, product
      );

      //rerender
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id: any) => {
    try {
        await axios.delete("http://localhost:3000/products/" + id);

      //rerender
         dispatch({ type: "REMOVE_PRODUCT", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      {state?.products.map((item: any) => {
        return <div key={item.id}>{item.name} </div>;
      })}

      <button onClick={() => addProduct({ name: "test" })}>Add Product</button>
      <button
                className="border bg-blue-500 p-2"
                onClick={() => updateProduct({ name: "concac updated", id: 4 })}
            >
                Update Product
            </button>

            <button className="border bg-blue-500 p-2" onClick={() => deleteProduct(4)}>
                Delete Product
            </button>
    </div>
  );
};
export default List;
