interface InputErrorProps {
  error?: Error | string;
}

const InputError: React.FC<InputErrorProps> = ({ error }) => {
  return (
    <>
      <p className="mt-1 text-red-500">
        {error instanceof Object ? error.message : error}
      </p>
    </>
  );
};

export default InputError;
