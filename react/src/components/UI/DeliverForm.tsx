import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routePaths";

type formInput = {
    fname: string;
    lname: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

function DeliverForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<formInput>();

    const onSubmit = (data: formInput) => {
        console.log(data)
    }

    return (
        <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold mb-2">Delivery Information</h1>
            <div className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 max-w-2xl max-w-2x1 mx-auto p-4 gap-5">
                    <div>
                        <input
                            type="text"
                            placeholder="First name"
                            {...register('fname')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Last name"
                            {...register('lname')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            {...register('email', { required: true })}
                            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 ${errors.email ? 'ring-red-500' : 'focus:ring-blue-500'} text-gray-700`}
                        />
                        {errors.email && <p className="text-red-600 ps-4 mt-1">This is required field</p>}
                    </div>
                    <div className="md:col-span-2">
                        <input
                            type="text"
                            placeholder="Street"
                            {...register('street')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="City"
                            {...register('city')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="State"
                            {...register('state')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Zip code"
                            {...register('zipCode')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Country"
                            {...register('country')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <input
                            type="tel"
                            placeholder="Phone"
                            {...register('phone')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
                        />
                    </div>
                    <button
                        className="mt-2 block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition cursor-pointer">
                        <Link to={ROUTES.MYORDER}> Proceed To Payment </Link>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DeliverForm
