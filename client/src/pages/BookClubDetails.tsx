import { observer } from "mobx-react-lite";
import {
  Button,
  Container,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Image,
  Item,
  ItemHeader,
  Label,
} from "semantic-ui-react";
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
      <Header as="h1">View Book Club</Header>
      <Grid relaxed>
        <GridRow>
          <GridColumn width={4}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            <BookClubMemberList bookClub={bookClub!} />
          </GridColumn>
          <GridColumn width={10}>
            <Header as="h2" color="blue" style={{ marginBottom: "3px" }}>
              {bookClub.name}
            </Header>
            <div>
              Owned by{" "}
              <Link to={`/profile/${bookClub.owner?.username}`}>
                <strong>{bookClub.owner?.displayName}</strong>
              </Link>
            </div>
            <Header as="h4">Club Description</Header>
            {bookClub.description}
            <Header as="h4">Current Book</Header>
            {bookClub.currentBook} by {bookClub.currentBookAuthor}
            <Header as="h4">Next Meeting Date</Header>
            {format(bookClub.nextMeeting!, "MMMM dd, yyyy - h:mm aa")}
            <Header as="h4">Meeting Link</Header>
            {bookClub.meetingLink}
            <div style={{ height: "22px" }}></div>
            <Label size="large" color="violet">
              {bookClub.category}
            </Label>
            <Label size="large" color="teal">
              {bookClub.readingPace} Pace
            </Label>
          </GridColumn>
          <GridColumn width={2}>
            <Button content="Join Club" color="green"></Button>
          </GridColumn>
        </GridRow>
      </Grid>

      {/* {bookClub.isOwner ? (
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
      )} */}
    </Container>
  );
});
