import { forwardRef, useEffect, useRef, MutableRefObject } from "react";
import { CheckBoxTableProps } from "./types";

const useCombinedRefs = (...refs: any[]): MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const CheckBoxTable = forwardRef<HTMLInputElement, CheckBoxTableProps>((
  {
    props
  }: CheckBoxTableProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const { indeterminate, ...rest } = props;
  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = useCombinedRefs(ref, defaultRef);

  useEffect(() => {
    if (resolvedRef?.current?.indeterminate) {
      resolvedRef.current.indeterminate = indeterminate ?? false;
    }
  }, [resolvedRef, indeterminate])
  return (
    <input
      data-testid="checkTable"
      className='h-5 w-5'
      type="checkbox"
      ref={resolvedRef}
      {...rest}
    />
  )
});

export default CheckBoxTable;
