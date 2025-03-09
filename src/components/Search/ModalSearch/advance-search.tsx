import Checkbox from "@/components/Input/checkbox";
import Select from "@/components/Input/select";
import { DualRangeSlider } from "@/components/Input/slider";
import React, { useState } from "react";

export default function AdvanceSearch() {
  const [price, setPrice] = useState([1, 20]);
  const [area, setArea] = useState([10, 100]);
  const [rooms, setRooms] = useState<string | number>("1");
  const [contactsDuration, setContractsDuration] = useState<string | number>(
    "3_months"
  );
  const [litmitPeople, setLimitPeople] = useState(1);
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <p className="text-center text-3xl font-bold text-primary">
        Tìn phòng theo sở thích của bạn!
      </p>
      <div className="sm:py-8 lg:p-8 lg:py-0">
        <div className="grid gap-4 sm:grid-rows-2 lg:grid-cols-2">
          <div className="mx-auto w-full">
            <DualRangeSlider
              label={() => <>Triệu</>}
              title="Giá"
              value={price}
              onValueChange={setPrice}
              min={1}
              max={20}
              step={1}
            />
          </div>
          <div className="mx-auto w-full">
            <DualRangeSlider
              label={() => <>m2</>}
              title="Diện tích"
              value={area}
              onValueChange={setArea}
              min={10}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4 pb-8 sm:grid-cols-1 lg:grid-cols-3 lg:px-8">
        <Select
          label="Phòng"
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
          ]}
          value={1}
          onChange={(value) => setRooms(value)}
          className="border border-accent"
          width={72}
        />
        <Select
          label="Số lượng người"
          options={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
          ]}
          value={1}
          onChange={(value) => setRooms(value)}
          className="border border-accent"
          width={48}
        />
        <Select
          label="Loại hợp đồng"
          options={[
            { value: "3_months", label: "3 tháng" },
            { value: "6_months", label: "6 tháng" },
            { value: "1_year", label: "1 năm" },
            { value: "2_years", label: "2 năm" },
          ]}
          value={"3_months"}
          onChange={(value) => setContractsDuration(value)}
          className="border border-accent"
          width={72}
        />
      </div>
      <div className="lg:p-8">
        <p className="font-sm pb-2 font-semibold">Nội thất: </p>
        <div className="grid grid-flow-col gap-2 sm:grid-rows-5 lg:grid-rows-3">
          {[...Array(9).keys()].map((i) => (
            <Checkbox
              key={i}
              label="Tủ lạnh"
              value="accept_terms"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          ))}
        </div>
      </div>
      <div className="lg:p-8">
        <p className="font-sm pb-2 font-semibold">Tiện nghi: </p>
        <div className="grid grid-flow-col gap-2 sm:grid-rows-5 lg:grid-rows-3">
          {[...Array(9).keys()].map((i) => (
            <Checkbox
              key={i}
              label="Ra vào vân tay"
              value="accept_terms"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
