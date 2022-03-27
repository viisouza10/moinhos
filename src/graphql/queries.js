/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      cpf
      values {
        abdomen {
          nivel
          option
        }
        backPain {
          option
        }
        breath {
          option
        }
        chestPain {
          description
          nivel
          option
        }
        headache {
          nivel
          option
        }
        pressure {
          bigger
          minor
        }
        saturation
        temperature
      }
      scoreValidate
      createdAt
      updatedAt
    }
  }
`;

export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cpf
        scoreValidate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
