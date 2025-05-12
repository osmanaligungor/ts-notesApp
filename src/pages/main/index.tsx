import { useState, type FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Alert, Button, Grid, Stack, Typography } from "@mui/material";
import { PageContainer } from "../../components/container";
import { Link } from "react-router-dom";
import Filter from "./filter";
import NoteCard from "./noteCard";

const Main: FC = () => {
  const { notes } = useSelector((store: RootState) => store.notes);

  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  /*
   * 1) Not başlığı 1.inputta aratılan metni içermelidir.
  
   * 2) 2. inputta seçilen etiketlerin herbiri note'un etiketlerinin en az biriyle eşleşmeli
   */

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(title.toLowerCase()) &&
      selectedTags.every((sTag) => note.tags.some((nTag) => nTag === sTag))
  );

  return (
    <PageContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={1}>
          <img src="/logo.png" alt="red note logo" width={50} />
          <Typography variant="h4">Notlar</Typography>
        </Stack>

        <Button component={Link} to="/new" variant="contained" color="warning">
          Oluştur
        </Button>
      </Stack>

      <Filter setTitle={setTitle} setSelectedTags={setSelectedTags} />

      <Grid container spacing={2} marginTop={5}>
        {filteredNotes.length < 1 ? (
          <Grid size={12}>
            <Alert color="warning">Not Bulunamadı</Alert>
          </Grid>
        ) : (
          filteredNotes.map((note) => (
            <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <NoteCard note={note} />
            </Grid>
          ))
        )}
      </Grid>
    </PageContainer>
  );
};

export default Main;
