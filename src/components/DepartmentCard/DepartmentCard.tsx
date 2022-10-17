import { FC, useRef } from "react";
import "../../styles.css";
import Department from "../Department/Department";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier} from 'dnd-core'
import { DragSourceMonitor } from 'react-dnd'
import { Node } from "../../models"

interface DragItem {
  key: number
  id: string
  type: string
}

interface DepartmentCardProps {
  department: Node,
  moveCard: (hoverIndex: number | null, dragIndex: number | null)=> void
}

const DepartmentCard: FC<DepartmentCardProps> = ({ department, moveCard }) => {
  const { name, key } = department;

  const ref = useRef<HTMLDivElement>(null)

  const [{handlerId},drop] = useDrop<DragItem,void,{ handlerId: Identifier | null }>({
    accept: "department",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DragItem, monitor) {
      if(!ref.current) return;
      const dragIndex = item.key
      const hoverIndex = key
      
      if(dragIndex === hoverIndex) {
        return
      }
      
      moveCard(dragIndex, hoverIndex)
    }

  })

  const [{ isDragging }, drag] = useDrag({
    type: "department",
    item: () => {
      return { key, name }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

 
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
      <li className="card" >
        <div ref={ref} data-handler-id={handlerId} style={{opacity}}>
          <div className="card-body" >
            <h4>{department.name}</h4>
          </div>
        </div>
        { (department.children?.length) ? ( <Department organization={department.children} moveCard={moveCard}/> ): <div></div>
        }
      </li>
  );
};

export default DepartmentCard;
