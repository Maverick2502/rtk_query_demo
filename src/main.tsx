import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import PostsPage from "./pages/Posts/posts.page.tsx";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <NextUIProvider>
      <PostsPage />
    </NextUIProvider>
  </Provider>
);
