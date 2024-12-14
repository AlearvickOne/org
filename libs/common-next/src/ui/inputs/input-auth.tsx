interface InputAuthProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}

export const InputAuth = ({
  label,
  type,
  value,
  onChange,
  error,
}: InputAuthProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-1">
        <label>{label}</label>
        <input
          className="p-2 outline-none border-b-[1px] border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200"
          type={type}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
      <div className="text-red-500 text-[14px]">
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};
