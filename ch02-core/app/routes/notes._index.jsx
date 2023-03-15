import { redirect, json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote></NewNote>
      <NoteList notes={notes}></NoteList>
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "note를 불러오지 못하였습니다,,," },
      {
        status: 404,
      }
    );
  }

  // return json(notes);
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  // const noteData = {
  //   title: formData.get("title"),
  //   content: formData.get("content"),
  // }
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "유효하지 않은 값입니다,,, 5글자 이상 적어주세요!" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
  return {
    title: "Remix_basic-02",
  };
}

export function CatchBoundary() {
  const errorCatch = useCatch();
  const message = errorCatch.data?.message || "Data not found";
  return (
    <main>
      <p>{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>Error가 발생하였습니다!!!</h1>
      <p>{error.message}</p>
      <Link to="/">돌아기기</Link>
    </main>
  );
}
