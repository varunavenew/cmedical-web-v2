import { FC } from "react";
import { TextInputProps } from "sanity";
import {
  Stack,
  Flex,
  Text,
  Button,
  Tooltip,
  Box,
  Container,
  useToast,
} from "@sanity/ui";
import slugify from "@sindresorhus/slugify";
import { CopyIcon } from "@sanity/icons";

export const StringInputWithSlugPreview: FC<TextInputProps> = (props) => {
  const toast = useToast();
  const slug = slugify(props.value ?? "");
  const copySlug = () => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        toast.push({ title: "Slug copied to clipboard", status: "success" });
      })
      .catch(() => {
        toast.push({ title: "Could not copy slug", status: "error" });
      });
  };
  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      <Flex align="center" gap={2}>
        <Text size={2}>{slug}</Text>
        <Tooltip
          content={
            <Box padding={2}>
              <Text>Copy slug to clipboard</Text>
            </Box>
          }
        >
          <Button mode="bleed" paddingY={1} onClick={copySlug}>
            <CopyIcon />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};
