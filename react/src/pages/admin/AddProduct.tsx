import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import uploadImage from "../../assets/upload-icon.png";
import { apiService, type APIResponse } from "../../services/genericService";
import { ENDPOINT } from "../../shared/constants/api_urls";
import { PRODUCT_CATEGORIES } from "../../shared/constants/order";
import { ROUTES } from "../../shared/constants/routePaths";
import { notify } from "../../shared/utils/toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectProducts } from "../../store/selectors/productSelectors";
import { addProduct, updateProduct, type ProductType } from "../../store/slices/productSlice";

type Inputs = {
    name: string;
    description: string;
    category: string;
    price: number;
    image: FileList;
};

const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200";

function AddProduct() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { id } = useParams();

    const products = useAppSelector(selectProducts);
    const [preview, setPreview] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [selectProduct, setSelecteProduct] = useState<ProductType | null>(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

    useEffect(() => {
        if (!id) return;
        const findProduct = products.find(product => product._id === id);
        if (findProduct?._id) {
            reset({
                name: findProduct.name,
                category: findProduct.category,
                description: findProduct.description,
                price: findProduct.price,
            });
            setSelecteProduct(findProduct)
            setPreview(findProduct.image)
        }
    }, [id, reset])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => { setPreview(reader.result as string) };
        reader.readAsDataURL(file);
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setLoading(true);

            const payload = {
                ...data,
                image: preview,
                price: Number(data.price),
            };

            const isEditMode = Boolean(selectProduct?._id);

            const response = isEditMode
                ? await apiService.put<APIResponse<ProductType>, typeof payload>(ENDPOINT.PRODUCTS, selectProduct!._id, payload)
                : await apiService.post<APIResponse<ProductType>, typeof payload>(ENDPOINT.PRODUCTS, payload);

            if (!response.success || !response.data) return;
            isEditMode ? dispatch(updateProduct(response.data)) : dispatch(addProduct(response.data));
            setSelecteProduct(null)
            setPreview("");
            reset();
            notify.success(response.message);
            navigate(ROUTES.ADMIN.VIEW_PRODUCT);

        } catch (error: any) {
            notify.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl py-10 px-5">
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-5"> Add Product</h1>
                <div className="space-y-4 w-3xl">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                            <label htmlFor="image" className="cursor-pointer inline-block">
                                <img src={preview || uploadImage} alt="Upload"
                                    className="w-28 h-28 rounded-lg border border-dashed border-gray-300 object-contain p-2 hover:border-orange-500 transition" />
                            </label>
                            <input id="image" type="file" accept="image/*" className="hidden"
                                {...register("image", {
                                    required: !preview ? "Please select an image" : false,
                                    validate: {
                                        fileSize: (files) => !files[0] || files[0].size <= 10 * 1024 * 1024 || "Maximum size is 10MB",
                                        fileType: (files) => !files[0] || ["image/jpeg", "image/png", "image/webp"].includes(files[0].type) || "Only JPG, PNG & WebP allowed",
                                    },
                                })}
                                onChange={(e) => {
                                    register("image").onChange(e);
                                    handleFileChange(e);
                                }}
                            />
                            {errors.image && (<p className="text-red-500 text-sm mt-1"> {errors.image.message} </p>)}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium"> Product Name</label>
                            <input className={inputClass} {...register("name", { required: "Product name is required" })} placeholder="Type here" />
                            {errors.name && (<p className="text-red-500 text-sm mt-1"> {errors.name.message} </p>)}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium"> Product Description</label>
                            <textarea className={inputClass} {...register("description", { required: "Description is required" })} rows={5} placeholder="Write content here..." />
                            {errors.description && (<p className="text-red-500 text-sm mt-1"> {errors.description.message}</p>)}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium"> Category</label>
                                <select className={inputClass} {...register("category", { required: "Category is required" })}>
                                    <option value="">Select Category</option>
                                    {PRODUCT_CATEGORIES.map((item) => (<option key={item}> {item} </option>))}
                                </select>
                                {errors.category && (<p className="text-red-500 text-sm mt-1">{errors.category.message}</p>)}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Price</label>
                                <input className={inputClass} type="number" placeholder="20"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: {
                                            value: 1,
                                            message: "Price should be greater than zero"
                                        },
                                    })}
                                />
                                {errors.price && (<p className="text-red-500 text-sm mt-1">{errors.price.message}</p>)}
                            </div>
                        </div>
                        <button disabled={loading} type="submit"
                            className="bg-black text-white px-10 py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
                        >
                            {loading ? (id ? "Updating..." : "Adding...") : (id ? "Update" : "ADD")}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default AddProduct;