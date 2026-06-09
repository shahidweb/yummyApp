import React from 'react'

function PromoCode() {
    return (
        <div className="w-full lg:w-1/2">
            <p className="text-gray-600 mb-4">If you have a promo code, Enter it here</p>
            <div className="flex">
                <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-gray-100 border border-gray-200 px-4 py-3 focus:outline-none focus:border-orange-500"
                />
                <button className="bg-black text-white px-8 py-3 hover:bg-gray-900 transition cursor-pointer">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default React.memo(PromoCode)
