import React from "react";
import { SingleUser } from "../components/SingleUser";
import renderer from "react-test-renderer";
const fetch = require("node-fetch");

//Snapshot test for the single user card:
test("SingleUser is shown", () => {
  const user = {
    id: 68243499,
    name: "Juaneva",
    login: "Juaneva",
    avatar: "https://avatars.githubusercontent.com/u/68243499?v=4",
    url: "https://api.github.com/users/juaneva",
    source: "Github",
  };
  const tree = renderer
    .create(
      <SingleUser
        user={user}
        //Declare empty functions here, as this prop and its type (function)
        //is required by propTypes and therefore the test will fail if not
        //included here
        backToSearch={function backToSearch() {}}
        displayRepo={function displayRepo() {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

//Unit test for the fetch that retrieves the single user info:
test("displayUser fetches data correctly", () => {
  return fetch("http://localhost:3001/api/user?source=Github&user=Juaneva")
    .then((data) => data.json())
    .then((data) => {
      expect(data).toEqual({
        id: 68243499,
        name: "Juaneva",
        login: "Juaneva",
        avatar: "https://avatars.githubusercontent.com/u/68243499?v=4",
        url: "https://api.github.com/users/juaneva",
        source: "Github",
      });
    });
});
