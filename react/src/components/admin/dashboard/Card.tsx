import type { ForwardRefExoticComponent, SVGProps } from "react";
import { formatCurrency } from "../../../shared/utils/cartFn";

type Props = {
    title: string;
    value: number;
    color: string;
    icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
};

function Card({
    title,
    value,
    color,
    icon: Icon,
}: Props) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm"> {title}</p>
                    <h2 className="text-3xl font-bold mt-2">{title === 'Revenue' ? formatCurrency(value) : value}</h2>
                </div>
                <div className={`${color} p-4 rounded-full`}>
                    <Icon className="w-8 h-8" />
                </div>
            </div>
        </div>
    );
}

export default Card;