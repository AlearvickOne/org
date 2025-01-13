interface CheckboxBaseProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const CheckboxBase = ({ label, value, onChange }: CheckboxBaseProps) => {
  return (
    <div className="flex gap-x-2 items-center">
      <input
        className="py-2 outline-none border-b-[1px] border-stone-200 bg-transparent focus:border-blue-500 transition-colors duration-200"
        type={'checkbox'}
        checked={value}
        onClick={() => onChange(!value)}
      />
      <label>{label}</label>
    </div>
  );
};
