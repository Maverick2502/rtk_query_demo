import { Fragment } from "react";
import { Create, PostsTable, Update } from ".";

function PostsPage() {
  return (
    <Fragment>
      <Create />
      <Update />
      <PostsTable />
    </Fragment>
  );
}

export default PostsPage;
