import {
  Button,
  FormElement,
  Input,
  Modal,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks";
import { Posts } from "../../../models";
import { postsApi } from "../../../store/api";
import { createPostModalSwitcher } from "../../../store/posts.slice";

const { useAddPostMutation } = postsApi;

function Create() {
  const dispatch = useTypedDispatch();

  const isCreatePostModalVisible = useTypedSelector(
    ({ posts }) => posts.isCreatePostModalVisible
  );
  const initialValues = useTypedSelector(({ posts }) => posts.post);

  const [post, setPost] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Posts>>({});

  const [addPost, { isSuccess }] = useAddPostMutation();

  const closeCreatePostModal = () => {
    dispatch(createPostModalSwitcher(false));
    setPost({ id: Math.random().toString(16).slice(2), title: "", body: "" });
    setErrors({});
  };

  const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    let newErrors: Partial<Posts> = {};

    if (!post.title) {
      isValid = false;
      newErrors.title = "Title field is required";
    }

    if (!post.body) {
      isValid = false;
      newErrors.body = "Body field is required";
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      addPost(post);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(createPostModalSwitcher(false));
    }
  }, [isSuccess]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isCreatePostModalVisible}
      onClose={closeCreatePostModal}
    >
      <Modal.Header>
        <Text b id="modal-title" size={18}>
          Add post
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Spacer y={0.2} />
        <Input
          color="primary"
          size="lg"
          labelPlaceholder="Title"
          name="title"
          value={post["title"]}
          onChange={handleOnChange}
        />
        {errors.title && <Text color="error">{errors.title}</Text>}
        <Spacer y={0.2} />
        <Input
          color="primary"
          size="lg"
          labelPlaceholder="Body"
          name="body"
          value={post["body"]}
          onChange={handleOnChange}
        />
        {errors.body && <Text color="error">{errors.body}</Text>}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeCreatePostModal}>
          Close
        </Button>
        <Button animated auto onPress={handleFormSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { Create };
