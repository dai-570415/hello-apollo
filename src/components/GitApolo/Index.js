import React from 'react';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import { GIT_CLIENT, GIT_QUERY, ADD_STAR_REPOSITORY, REMOVE_STAR_REPOSITORY } from './Gql';

const Index = () => {
  return ( 
    <ApolloProvider client={GIT_CLIENT}>
        <Query query={GIT_QUERY}>
          {({ loading, data }) => {
            if(loading) return <p>Loading...</p>;

            const repositories = data.organization.repositories.nodes;

            return (
              <ul>
                {repositories.map(repo => (
                  <li key={repo.id}>
                    <a href={repo.url}>{repo.name}</a>
                    <button>{repo.stargazers.totalCount} Stars</button>

                    {!repo.viewerHasStarred ? (
                      <Mutation
                        mutation={ADD_STAR_REPOSITORY}
                        variables={{ id: repo.id }}
                      >
                        {(addStar, { data, loading, error }) => (
                          <button onClick={addStar}>star</button>
                        )}
                      </Mutation>
                    ) : (
                      <Mutation
                        mutation={REMOVE_STAR_REPOSITORY}
                        variables={{ id: repo.id }}
                      >
                        {(removeStar, { data, loading, error }) => (
                          <button onClick={removeStar}>unstar</button>
                        )}
                      </Mutation>
                    )}
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </ApolloProvider>
  );
}

export default Index;