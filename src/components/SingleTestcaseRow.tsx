import { Checkbox, Textarea, Tooltip } from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import { removeTestcase } from "../store/ProblemSlice";
import { TestcaseType } from "../utils/type";
import {
  AiFillDelete,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

export default function SingleTestcaseRow({ testcase, index }: PropsType) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTestcase(index));
  };

  return (
    <tr className="h-10 text-lg even:bg-[whitesmoke] odd:bg-slate-50">
      <td>{index}</td>
      <td className="text-blue-500 underline">
        <Tooltip
          content={<TooltipContent data={testcase.input} />}
          color={"invert"}
        >
          <span className="">Input{index}</span>
        </Tooltip>
      </td>
      <td className="text-blue-500 underline">
        <Tooltip
          content={<TooltipContent data={testcase.output} />}
          color={"invert"}
        >
          <span className="">Output{index}</span>
        </Tooltip>
      </td>
      <td>
        <div className="flex justify-center items-center">
          {testcase.sample ? (
            <AiOutlineCheckCircle size={24} color="green" />
          ) : (
            <AiOutlineCloseCircle size={24} color="red" />
          )}
        </div>
      </td>
      <td>
        <AiFillDelete
          size={24}
          color="red"
          className="cursor-pointer hover:scale-125 transition-all"
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
}

const TooltipContent = ({ data }: { data: string }) => {
  return (
    <div className="w-28 h-28">
      <textarea
        className="w-full h-full text-white bg-transparent p-1 text-xs"
        value={data}
        readOnly
      ></textarea>
    </div>
  );
};

interface PropsType {
  testcase: TestcaseType;
  index: number;
}
