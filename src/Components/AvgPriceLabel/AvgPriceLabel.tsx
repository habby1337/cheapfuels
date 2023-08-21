import { useAvgPrice } from "../hooks/useAvgPrice";
import { useEffect, useState } from "react";
import { useStore } from "@/Shared/Store/store";
import { FuelData } from "@/Shared/Interfaces/interfaces";

const AvgPriceLabel = (fuelType: any) => {
  const { avgPrice } = useAvgPrice();
  const [fuel, setFuel] = useState<any>("");
  const [minPrice, setMinPrice] = useState(0);
  const isInterfaceLoading = useStore((state) => state.isInterfaceLoading);

  useEffect(() => {
    const label: string = fuelType.fuelType?.label;
    const value: string = fuelType.fuelType?.value;

    value === "0" && setFuel("");

    if (label !== undefined && value !== "0") {
      setFuel(label.toLowerCase());

      const selectedFuelDataObject: FuelData =
        avgPrice[label.toLowerCase() as keyof typeof avgPrice];

      if (selectedFuelDataObject !== undefined) {
        const sub =
          parseFloat(
            selectedFuelDataObject.variation_amount
              .replace("+", "")
              .replace("-", ""),
          ) / 1000;

        const min = parseFloat(selectedFuelDataObject.avg) - sub;

        setMinPrice(min.toFixed(2) as unknown as number);
      }
    }
    // }
  }, [fuelType]);

  return (
    <div className="flex items-center justify-between px-1 mt-2">
      {isInterfaceLoading ? (
        <span className="w-20 h-3 bg-gray-300 rounded-sm animate-pulse"></span>
      ) : (
        <span className="text-xs text-gray-600 dark:text-gray-400 ">
          Avg:{" "}
          {avgPrice[fuel as keyof typeof avgPrice]
            ? // @ts-ignore
              `${parseFloat(avgPrice[fuel].avg).toFixed(2)} €`
            : `Select fuel type`}
        </span>
      )}
      {isInterfaceLoading ? (
        <span className="w-20 h-3 bg-gray-300 rounded-sm animate-pulse"></span>
      ) : (
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Min:{" "}
          {
            // @ts-ignore
            avgPrice[fuel]
              ? // @ts-ignore
                `${minPrice} €`
              : `Select fuel type`
          }
        </span>
      )}
    </div>
  );
};

export default AvgPriceLabel;
