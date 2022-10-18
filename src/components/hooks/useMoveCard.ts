import { useCallback } from "react";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
import { NodeArr, Node } from "../../models";
import { organization } from "../../data.js";

function useMoveCard() {
  const [state, setDepartments] = useLocalStorage("MY_APP_STATE", organization);

  const moveCard = useCallback(
    (dragIndex: number | null, hoverIndex: number | null) => {
      if (!dragIndex || !hoverIndex) return;

      const tree: NodeArr = JSON.parse(JSON.stringify(state));
      let dragNode: Node | undefined;
      let hoverNode: Node | undefined;

      const replaceTree = (arr: NodeArr) => {
        let indexDel;
        arr.forEach((node: Node, i: number) => {
          if (node.key === dragIndex) {
            dragNode = node;
            indexDel = i;
          }

          if (node.key === hoverIndex) {
            hoverNode = node;
          }

          if (node.children) replaceTree(node.children);
        });

        if (indexDel !== undefined) arr.splice(indexDel, 1);
      };

      replaceTree(tree);

      if (!dragNode || !hoverNode) return;

      const checkChildren = dragNode.children
        ?.map((child: Node) => child.key)
        .includes(hoverNode.key);

      if (checkChildren) {
        return;
      }

      const checkHoverNode =
        hoverNode instanceof Object &&
        !hoverNode.children
          ?.map((child: Node) => child.key)
          .includes(dragNode.key);
          
      if (checkHoverNode) {
        if (dragNode.key !== 1) {
          hoverNode["children"] = hoverNode["children"]
            ? [...hoverNode.children, dragNode]
            : [dragNode];
        } else {
          return state;
        }
      }

      setDepartments(tree);
    },
    [state, setDepartments]
  );

  return { state, moveCard };
}

export default useMoveCard;
