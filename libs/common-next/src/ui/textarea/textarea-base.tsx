interface TextareaBaseProps {
  label: string;
  rows?: number;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}

export const TextareaBase = ({
  label,
  value,
  rows = 5,
  placeholder,
  onChange,
  error,
}: TextareaBaseProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-1">
        <div className="flex">
          <label>{label}</label>
        </div>
        <textarea
          className="p-2 outline-none border-1 rounded-md border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          rows={rows}
        />
      </div>
      <div className="text-red-500 text-[14px] mt-1">
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};
