interface InputAuthProps {
  label: string;
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (value: string) => void;
}

export const InputAuth = ({ label, type, value, onChange }: InputAuthProps) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        className="border-[1px] p-2 rounded-[10px] outline-none"
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};
