interface AdminTableProps {
  heads: string[];
  bodys: object[];
}

export const AdminTable = ({ heads, bodys }: AdminTableProps) => {
  return (
    <div className="rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-violet-50 font-medium">
          <tr className="text-[15px] text-center">
            {heads.map((head, index) => (
              <td className="py-2 px-5" key={index}>
                {head}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodys.map((b, index) => (
            <tr className="border-b-1 text-[14px] text-center" key={index}>
              {Object.values(b).map((value, vIndex) => (
                <td className="py-3 px-5" key={vIndex}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
