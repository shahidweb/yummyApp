import uploadImage from '../../assets/upload-icon.png'

function AddProduct() {
    const category = ['Salad', "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"]

    return (
        <div className="max-w-7xl py-10 px-5">
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-5">All Product List</h1>
                <div className="space-y-4 w-3xl">
                    <form className="space-y-6">
                        {/* Upload Image */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Image
                            </label>
                            <label htmlFor="image" className="inline-block cursor-pointer">
                                <img src={uploadImage} alt="Upload" className="w-28 h-28 object-contain border border-dashed border-gray-300 rounded-lg p-2 hover:border-orange-500 transition" />
                            </label>
                            <input id="image" type="file" className="hidden" />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2"> Product Name</label>
                            <input id="name" type="text" placeholder="Type here" className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Product Description
                            </label>
                            <textarea id="description" rows={5} placeholder="Write content here"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Category
                                </label>

                                <select id="category"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                >
                                    {category.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Price
                                </label>
                                <input id="price" type="number" placeholder="$20"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                />
                            </div>
                        </div>
                        <button type="submit"
                            className="bg-black text-white px-10 py-3 rounded-md hover:bg-gray-800 transition">
                            ADD
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
