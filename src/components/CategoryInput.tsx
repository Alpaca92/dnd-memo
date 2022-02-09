import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atoms";

interface Category {
  category: string;
}

const Form = styled.form`
  width: 40%;
  max-width: 25rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  position: relative;

  & > input {
    all: unset;
    width: 100%;
    height: 2rem;
    border: 1px solid #707c83;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      border-color: #fff;
    }
  }

  & > button {
    all: unset;
    position: absolute;
    top: 1rem;
    right: 0.5rem;
  }
`;

function CategoryInput() {
  const setTodos = useSetRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<Category>();
  const onSubmit = ({ category }: Category) => {
    setTodos((allCategories) => {
      const newAllCategories = [{ [category]: [] }, ...allCategories];

      localStorage.setItem("memo", JSON.stringify(newAllCategories));

      return newAllCategories;
    });

    setValue("category", "");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("category", { required: true })}
        type="text"
        placeholder="write your custom category"
      />
      <button>
        <IoIosAdd />
      </button>
    </Form>
  );
}

export default CategoryInput;
