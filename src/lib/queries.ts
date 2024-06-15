import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query ($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        prev
        next
        count
      }
      results {
        id
        name
        gender
        image
        status
        species
        location {
          name
        }
      }
    }
  }
`;

export const Get_Character = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      location {
        name
      }
      episode {
        id
        name
        created
        air_date
        episode
      }
    }
  }
`;
