interface InputAuthProps {
  label: string;
  type: 'text' | 'password' | 'email';
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
    <div>
      <div className="flex flex-col">
        <label>{label}</label>
        <input
          className="border-[1px] p-2 rounded-[10px] outline-none max-w-[300px]"
          type={type}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
      <div className="text-red-500">{error ? <div>{error}</div> : null}</div>
    </div>
  );
};
