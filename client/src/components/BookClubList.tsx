import {
  Grid,
  Image,
  Item,
  Button,
  GridRow,
  GridColumn,
  Header,
  Label,
  ItemMeta,
  Icon,
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
                <ItemMeta>
                  {bookclub.members?.length}{" "}
                  {bookclub.members?.length === 1 ? "Member" : "Members"}
                </ItemMeta>
                <Item.Description>
                  <div>{bookclub.description}</div>
                </Item.Description>
                {bookclub.isOwner && (
                  <Item.Description>
                    <Label basic color="green">
                      You are the owner of this club
                    </Label>
                  </Item.Description>
                )}
                {bookclub.isMember && !bookclub.isOwner && (
                  <Item.Description>
                    <Label basic color="orange">
                      You are a member of this club
                    </Label>
                  </Item.Description>
                )}
                <Item.Extra>
                  <Label size="large" color="violet" as="a">
                    <Icon name="book" />
                    {bookclub.category}
                  </Label>
                  <Label size="large" color="teal" as="a">
                    <Icon name="time" />
                    {bookclub.readingPace} Pace
                  </Label>
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
