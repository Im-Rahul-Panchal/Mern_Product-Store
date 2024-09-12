import { create } from 'zustand';

// this is a global state can be used anywhere in any components
export const useProductStore = create((set) => ({

    products: [],

    setProducts : (products) => set({ products }),
    

    createProduct : async(newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return ({success : false , message: "Please fill all the fields"})
        }
        const result = await fetch("/api/products/" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
        const data = await result.json()

        set((state) => ({ products : [...state.products, data.data] }))
        return ({success : true , message: "Product created successfully"})        
    },


    
    fetchProducts : async() => { 
        const result = await fetch("/api/products");
        const data = await result.json();
        set({ products: data.data });
    },



    deleteProduct : async (pid) =>{
        const result =  await fetch(`/api/products/${pid}` ,{
            method: "DELETE"
        })
        const data = await result.json();
        if(!data.success) {
            return { success : false , message : data.message }   ;         
        }

        // update page immediately
        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
        return { success : true , message: data.message}
    },



    updateProduct : async (pid , updatedProduct) => {
        const result  = await fetch(`/api/products/${pid}` , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await result.json();
        if(!data.success) {
            return { success : false , message : data.message };
        }
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }))
        return { success : true , message: data.message };
    }

}));


