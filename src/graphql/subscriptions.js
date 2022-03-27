/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($cpf: String) {
    onCreateTodo(cpf: $cpf) {
      id
      cpf
      values {
        saturation
        temperature
      }
      scoreValidate
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($cpf: String) {
    onUpdateTodo(cpf: $cpf) {
      id
      cpf
      values {
        saturation
        temperature
      }
      scoreValidate
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($cpf: String) {
    onDeleteTodo(cpf: $cpf) {
      id
      cpf
      values {
        saturation
        temperature
      }
      scoreValidate
      createdAt
      updatedAt
    }
  }
`;
