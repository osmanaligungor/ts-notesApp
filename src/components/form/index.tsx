import { Button, Grid, Stack, styled, TextField } from "@mui/material";
import { useState, type FC, type FormEvent } from "react";
import { addTag } from "../../redux/slices/tagsSlice";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../redux/store";
import TagSelect from "./tagSelect";
import type { NoteData } from "../../types";
import { Link } from "react-router-dom";
import type { Note } from "../../redux/slices/notesSlice";

const Label = styled("label")`
  font-size: 15px;
`;

interface Props {
  note?: Note;
  handleSubmit: (data: NoteData) => void;
}

const Form = ({ note, handleSubmit }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState<string>(note?.title || "");
  const [markdown, setMarkdown] = useState<string>(note?.markdown || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(note?.tags || []);

  // form gönderilince
  const handleForm = () => {
    if (!title || !markdown || selectedTags.length < 1) {
      alert("Lütfen not içeriğini giriniz");
    }

    handleSubmit({ title, markdown, tags: selectedTags });
  };

  // yeni etiket ekleme butonuna tıklanınca
  const handleAddTag = (newTag: string) => {
    if (newTag.trim() === "") return;
    if (newTag.trim().length > 8) return;

    if (selectedTags.length === 5) return;

    if (selectedTags.includes(newTag)) return;

    // etiketi reducer'a ekle
    dispatch(addTag(newTag));
    setSelectedTags([...selectedTags, newTag]);
  };

  // seçilen etiketi kaldır
  const handleDeleteTag = (value: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== value));
  };

  return (
    <form>
      <Stack spacing={7} sx={{ marginTop: "40px" }}>
        <Grid container spacing={5}>
          <Grid size={6}>
            <TextField
              label="Başlık"
              variant="outlined"
              fullWidth
              value={title}
              color="primary"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid size={6}>
            <TagSelect
              selectedTags={selectedTags}
              handleAddTag={handleAddTag}
              handleDeleteTag={handleDeleteTag}
            />
          </Grid>
        </Grid>

        <Stack gap={2}>
          <Label>İçerik (markdown destekler)</Label>
          <TextField
            fullWidth
            multiline
            minRows={15}
            maxRows={100}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </Stack>

        <Stack direction={"row"} justifyContent={"end"} spacing={5}>
          <Button
            component={Link}
            to=".."
            type="button"
            variant="contained"
            color="secondary"
            sx={{ minWidth: "100px" }}
          >
            Geri
          </Button>
          <Button
            onClick={handleForm}
            variant="contained"
            sx={{ minWidth: "100px" }}
          >
            Kaydet
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Form;
