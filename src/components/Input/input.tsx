import useStyles from './styles';
import { InputProps } from './types';
import { ErrorMessage } from '@hookform/error-message';

const Input = ({
  register,
  label,
  rules = undefined,
  errors = undefined,
  type = "text"
}: InputProps): React.ReactElement => {
  const styles = useStyles({error: errors !== undefined && label.name in errors ? true : false});
  return (
    <div className={styles.formControl}>
      <label
        className={styles.label}
        htmlFor={label.name}
      >{label.label}</label>
      <input
        className={styles.input}
        id={label.name}
        type={type}
        {
          ...register(
            label.name,
            {
              ...rules
            }
          )
        }
      />
      <ErrorMessage
        errors={errors}
        name={label.name}
        render={({ message }) => <p data-testid={`${label.name}-error`} className={styles.error}>{message}</p>}
      />
    </div>
  );
}

export default Input;