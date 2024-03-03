import { observer } from "mobx-react-lite";
import { Button, Container } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoadingComponent from "../components/LoadingComponent";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import BookClubMemberList from "../components/BookClubMemberList";

export default observer(function BookClubDetails() {
  const { bookClubStore } = useStore();
  const navigate = useNavigate();
  const {
    selectedBookClub: bookClub,
    loadBookClub,
    loadingInitial,
    deleteBookClub,
  } = bookClubStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadBookClub(id);
  }, [id, loadBookClub]);

  function handleDelete() {
    deleteBookClub(bookClub!.id);
    navigate("/bookclubs");
  }

  if (loadingInitial || !bookClub) return <LoadingComponent />;

  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>View Book Club</h1>

      <h3>{bookClub.name}</h3>
      <div>
        Owned by{" "}
        <Link to={`/profile/${bookClub.owner?.username}`}>
          <strong>{bookClub.owner?.displayName}</strong>
        </Link>
      </div>
      <div>Description: {bookClub.description}</div>
      <div>Category: {bookClub.category}</div>
      <div>Reading Pace: {bookClub.readingPace}</div>
      <div>
        Current Book: {bookClub.currentBook} by {bookClub.currentBookAuthor}{" "}
      </div>
      <div>
        Next Meeting Date:{" "}
        {format(bookClub.nextMeeting!, "MMMM dd, yyyy - h:mm aa")}
      </div>
      <div>Meeting Link: {bookClub.meetingLink}</div>
      <BookClubMemberList bookClub={bookClub!} />
      {bookClub.isOwner ? (
        <>
          <Button
            as={Link}
            to={`/edit/${bookClub.id}`}
            basic
            color="teal"
            content="Edit"
          />
          <Button onClick={handleDelete} color="red" content="Delete" />
        </>
      ) : null}
      {bookClub.isMember ? (
        <>
          <Button onClick={handleDelete} color="red" content="Leave Club" />
        </>
      ) : (
        <>
          <Button onClick={handleDelete} color="olive" content="Join Club" />
        </>
      )}
    </Container>
  );
});
