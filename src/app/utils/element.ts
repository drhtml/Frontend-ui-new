export const getOffsetBetweenChildAndParent = (
  child: Element | null,
  parent: Element | null
): {
  top: number;
  left: number;
} => {
  const offset = {
    top: 0,
    left: 0,
  };
  let childWindow = child;
  while (childWindow != parent && childWindow) {
    offset.left = offset.left + (childWindow as any).offsetLeft;
    offset.top = offset.top + (childWindow as any).offsetTop;
    childWindow = childWindow.parentElement;
  }

  return offset;
};

export const isHidden = (el: any) => {
  return el && el.offsetParent === null;
};
