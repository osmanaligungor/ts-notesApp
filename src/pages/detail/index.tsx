import type { FC } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deleteNote, type Note } from "../../redux/slices/notesSlice";
import { PageContainer } from "../../components/container";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Markdown from "react-markdown";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../redux/store";

const Detail: FC = () => {
  const note = useOutletContext<Note>();
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;

    dispatch(deleteNote(note.id));
  };

  return (
    <PageContainer>
      <Stack direction="column" justifyContent="space-between">
        <Box>
          <Stack gap={1}>
            <Typography variant="h4">{note.title}</Typography>

            <Stack direction="row" gap={1} flexWrap="wrap" marginTop={2}>
              {note.tags.map((tag, key) => (
                <Chip key={key} label={tag} />
              ))}
            </Stack>
          </Stack>

          <Box marginY={5}>
            <Markdown>{note.markdown}</Markdown>
          </Box>
        </Box>

        <Stack direction="row" gap={2} justifyContent="end" paddingY={4}>
          <Button
            component={Link}
            to=".."
            variant="contained"
            color="secondary"
          >
            Geri
          </Button>

          <Button component={Link} to="edit" variant="contained" color="info">
            Düzenle
          </Button>

          <Button onClick={handleDelete} variant="contained" color="error">
            Sil
          </Button>
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default Detail;
