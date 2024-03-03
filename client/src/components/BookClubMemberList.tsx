import { observer } from "mobx-react-lite";
import { List, Image, Segment, Item, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BookClub } from "../models/bookclub";

interface Props {
  bookClub: BookClub;
}

export default observer(function BookClubMemberList({
  bookClub: { members, owner },
}: Props) {
  if (!members) return null;
  return (
    <div style={{ width: "30%" }}>
      <Segment style={{ border: "none " }} secondary inverted color="teal">
        {members.length} {members.length === 1 ? "Member" : "Members"}
      </Segment>
      <List relaxed divided>
        {members.map((member) => (
          <Item style={{ position: "relative" }} key={member.username}>
            {member.username === owner?.username && (
              <Label
                style={{ position: "absolute" }}
                color="orange"
                ribbon="right"
              >
                Club Owner
              </Label>
            )}

            <Image
              circular
              size="tiny"
              src={member.image || "/assets/user.png"}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`/profile/${member.username}`}>
                  {member.displayName}
                </Link>
              </Item.Header>
            </Item.Content>
          </Item>
        ))}
      </List>
    </div>
  );
});
