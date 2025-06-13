import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import CompareButton from "./CompareButton";


const ComparedTable = ({ data, onItemRemove }) => {
  const navigate = useNavigate();

  // 定義比較欄位清單
  const fields = [
    { key: "image", label: "照片" },
    { key: "id", label: "ID" },
    { key: "kind", label: "種類" },
    { key: "variety", label: "品種" },
    { key: "sex", label: "性別" },
    { key: "age", label: "年齡" },
    { key: "bodytype", label: "體型" },
    { key: "colour", label: "毛色" },
    { key: "shelter_name", label: "收容所" },
    { key: "shelter_address", label: "地址" },
    { key: "shelter_tel", label: "電話" },
  ];

  const handleAdoptClick = (id) => {
    navigate(`/adoption-form/${id}`);
  };

  console.log(data);

  return (
    <div className="table-container">
      <Table className="table">
        <TableCaption className="table-caption">待領養動物比較表</TableCaption>
        <TableBody className="table-body">
          {fields.map((field) => (
            <TableRow key={field.key} className="table-row">
              <TableHead className="table-head font-medium">
                {field.label}
              </TableHead>
              {data.map((item, index) => {
                const imageRes = item.resources?.find((res) => res.type === 1);
                return (
                  <TableCell
                    key={`${field.key}-${index}`}
                    className="table-cell"
                  >
                    {field.key === "image" ? (
                      <img
                        src={imageRes?.url}
                        alt="animal image"
                        className="circle-image"
                      />
                    ) : (
                      item[field.key] || "-"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          {/* 我要領養按鈕 */}
          <TableRow>
            <TableHead className="table-head font-medium"></TableHead>
            {data?.map((item) => (
              <TableCell key={item.id}>
                <button
                  onClick={() => handleAdoptClick(item.id)}
                  className="main-btn"
                >
                  我要領養
                </button>
                {/* 移除考慮清單按鈕 */}
                <CompareButton
                  id={item.id}
                  isHoverState={true}
                  onRemove={onItemRemove}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparedTable;
