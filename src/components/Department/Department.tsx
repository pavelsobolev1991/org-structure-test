import { FC, useCallback } from "react";
import DepartmentCard from "../DepartmentCard/DepartmentCard";
import { NodeArr, Node } from "../../models";
import "../../styles.css";

interface DepartmentProps {
  organization: NodeArr;
  moveCard: (hoverIndex: number | null, dragIndex: number | null) => void;
}

const Department: FC<DepartmentProps> = ({ organization, moveCard }) => {
  const renderCard = useCallback(
    (department: Node) => {
      return (
        <DepartmentCard
          key={department.key}
          department={department}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  return <ul>{organization.map((department) => renderCard(department))}</ul>;
};

export default Department;
