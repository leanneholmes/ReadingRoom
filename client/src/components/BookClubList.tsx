import {
  Grid,
  Image,
  Item,
  Button,
  GridRow,
  GridColumn,
  Header,
  Label,
} from "semantic-ui-react";
import { BookClub } from "../models/bookclub";
import { Link } from "react-router-dom";

interface Props {
  bookClubs: BookClub[];
}

export default function BookClubList({ bookClubs }: Props) {
  return (
    <Grid divided="vertically">
      {bookClubs.map((bookclub) => (
        <GridRow key={bookclub.id}>
          <GridColumn width={3}>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/image.png"
              style={{ width: "200px" }}
            />
          </GridColumn>
          <GridColumn width={13}>
            <Item>
              <Item.Content>
                <Item.Header>
                  <Header size="medium">{bookclub.name}</Header>
                </Item.Header>
                <Item.Description>
                  <div>{bookclub.description}</div>
                  <div>
                    Current Book: {bookclub.currentBook} by{" "}
                    {bookclub.currentBookAuthor}
                  </div>
                </Item.Description>
                {bookclub.isOwner && (
                  <Item.Description>
                    <Label basic color="orange">
                      You are the owner of this club
                    </Label>
                  </Item.Description>
                )}
                {bookclub.isMember && !bookclub.isOwner && (
                  <Item.Description>
                    <Label basic color="violet">
                      You are a member of this club
                    </Label>
                  </Item.Description>
                )}
                <Item.Extra>
                  <Button
                    floated="left"
                    content={bookclub.category}
                    color="green"
                  />
                  <Button
                    floated="left"
                    content={bookclub.readingPace}
                    color="purple"
                  />
                  <Button
                    as={Link}
                    to={`/bookclub/${bookclub.id}`}
                    floated="right"
                    content="View Club"
                    color="blue"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </GridColumn>
        </GridRow>
      ))}
    </Grid>
  );
}
