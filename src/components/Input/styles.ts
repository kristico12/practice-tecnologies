import { useState, useEffect } from 'react';
import { stylesState, stylesProps } from './types';

const useStyles = ({
  error
}: stylesProps) => {
  const [style, setStyle] = useState<stylesState>({
    formControl: 'mb-4',
    label: 'block w-full font-bold',
    input: 'block w-full border p-1 border-customInputs-50 '+
    'focus:outline-none focus:border-customButton-50',
    error: 'text-red-600',
  });
  useEffect(() => {
    if (error) {
      setStyle({
        ...style,
        input: style.input.replace('border-customInputs-50', 'border-red-600').replace('border-customButton-50', 'border-red-600'),
      });
    } else {
      setStyle({
        ...style,
        input: style.input.replace('border-red-600', 'border-customInputs-50').replace('focus:border-red-600', 'focus:border-customButton-50'),
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return style;
}

export default useStyles;