import { InputsForms, NewTodoProps } from './types';
import { useForm, SubmitHandler } from "react-hook-form";
import Input from '../../../../components/Input/input';
import styles from './styles';

const NewTodo = ({
  todoAddHandler
}: NewTodoProps): React.ReactElement => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InputsForms>();
  const onSubmit: SubmitHandler<InputsForms> = data => {
    todoAddHandler(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        register={register}
        label={{
          label: 'Todo Text',
          name: 'todoText'
        }}
        errors={errors}
        rules={{
          required: { message: 'This is Required!', value: true },
          minLength: { message: 'Minimum 3 characteres', value: 3 }
        }}
      />
      <Input
        register={register}
        label={{
          label: 'Todo Number',
          name: 'todoNumber'
        }}
        errors={errors}
        rules={{
          required: { message: 'This is Required!', value: true },
          min: { message: 'Minimum values is 1', value: 1},
          max: { message: 'Maximum values is 5', value: 5},
        }}
        type="number"
      />
      <button
        type="submit"
        className={styles.Button}
        data-testid="button-add-todo"
      >
        ADD TODO
      </button>
    </form>
  );
};
export default NewTodo;