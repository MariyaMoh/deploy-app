function NoteItemForPublic({ note }) {
  return (
    <div className="note">
      <div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
      <h2>{note.text}</h2>
      <p>
        Notes by: <strong>{note.user?.name}</strong>
      </p>
    </div>
  );
}

export default NoteItemForPublic;
