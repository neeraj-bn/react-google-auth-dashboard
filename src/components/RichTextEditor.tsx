import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Box,
  Button,
  ButtonGroup,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBold, FaItalic, FaListUl, FaListOl } from "react-icons/fa";

const RichTextEditor = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUsers([]);
      }
    }

    const handleStorageChange = () => {
      const newUsers = localStorage.getItem("users");
      if (newUsers) {
        try {
          setUsers(JSON.parse(newUsers));
        } catch (error) {
          console.error("Error parsing updated user data:", error);
          setUsers([]);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const initialContent =
    users.length > 0
      ? `<h2>User List</h2>` +
        users
          .map(
            (user) => `
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Address:</strong> ${user.address}</p>
          <hr />
        `
          )
          .join("")
      : "<p>No user data available...</p>";

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(initialContent);
    }
  }, [users, editor]);

  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (!editor) return null;

  return (
    <Box maxW="800px" mx="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Rich Text Editor
        </Text>

        <ButtonGroup spacing={2} mb={4}>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            size="sm"
          >
            <FaBold />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            size="sm"
          >
            <FaItalic />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            size="sm"
          >
            <FaListUl />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            size="sm"
          >
            <FaListOl />
          </Button>
        </ButtonGroup>

        <Box
          border="1px"
          borderColor={borderColor}
          borderRadius="md"
          p={4}
          bg={bgColor}
          minH="300px"
        >
          <EditorContent editor={editor} />
        </Box>
      </VStack>
    </Box>
  );
};

export default RichTextEditor;
