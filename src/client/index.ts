import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_TODOS } from "../hooks/useTasks";
import TO_DO_DATA from "./SampleToDo.json";

const cache = new InMemoryCache({
  typePolicies: {
    todos: {
      keyFields: ["id", "text", "completed", "priority", "repeat", "tags", "timeStamp", "comment"],
    },
  },
  resultCaching: true,
});

const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: {
      toggleTodo: (_root, variables, { cache }) => {
        cache.modify({
          id: cache.identify({
            __typename: "Todo",
            id: variables.id,
          }),
          fields: {
            completed: (value: boolean) => !value,
          },
        });
        return null;
      },
    },
  },
});

client.writeQuery({
  query: GET_ALL_TODOS,
  data: TO_DO_DATA,
});

export { client, cache };
