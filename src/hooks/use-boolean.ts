/**
 * @name useBoolean
 * @description Manages a boolean state value with helper actions for toggling and setting explicit values.
 * @dependencies none
 */
import { useCallback, useState } from "react";

export function useBoolean(
  defaultValue = false,
): [boolean, { toggle: () => void; setTrue: () => void; setFalse: () => void }] {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback(() => {
    setValue((current) => !current);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, { toggle, setTrue, setFalse }];
}
