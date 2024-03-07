import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Header, Loader, Select } from "semantic-ui-react";
import BookClubList from "../components/BookClubList";
import LoadingComponent from "../components/LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { PagingParams } from "../models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import { categoryOptions } from "../options/CategoryOptions";
import { readingPaceOptions } from "../options/ReadingPaceOptions";
import { Navigate } from "react-router-dom";

function BookClubs(this: any) {
  const { bookClubStore } = useStore();
  const {
    bookClubsAsMap,
    loadBookClubs,
    setPagingParams,
    pagination,
    predicate,
    setPredicate,
  } = bookClubStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadBookClubs().then(() => setLoadingNext(false));
  }

  function handleReset() {
    setPredicate("all", "true");
  }

  function handleCategoryChange(
    _event: SyntheticEvent<HTMLSelectElement>,
    data: any
  ) {
    const selectedCategory = data.value;
    setPredicate("Category", selectedCategory);
  }

  function handleReadingPaceChange(
    _event: SyntheticEvent<HTMLSelectElement>,
    data: any
  ) {
    const selectedReadingPace = data.value;
    setPredicate("ReadingPace", selectedReadingPace);
  }

  useEffect(() => {
    loadBookClubs();
  }, [loadBookClubs]);

  if (bookClubStore.loadingInitial && !loadingNext) return <LoadingComponent />;
  return (
    <Container style={{ marginTop: "6em", paddingBottom: "3em" }}>
      <Header as="h1" className="playfair" style={{ marginBottom: "30px" }}>
        All Book Clubs
      </Header>
      <Container style={{ marginBottom: "20px" }}>
        <Select
          options={categoryOptions}
          value={predicate.get("Category") || ""}
          onChange={handleCategoryChange}
          placeholder="Filter by Category"
          name="category"
          style={{ backgroundColor: "#f3f4f6", borderColor: "#f3f4f6" }}
        />
        <Select
          options={readingPaceOptions}
          placeholder="Filter by Pace"
          name="readingPace"
          value={predicate.get("ReadingPace") || ""}
          onChange={handleReadingPaceChange}
          style={{
            backgroundColor: "#f3f4f6",
            borderColor: "#f3f4f6",
            marginLeft: "10px",
          }}
        />
        <Button
          color="black"
          className="btn-dark-blue"
          content="Reset Filters"
          style={{ marginLeft: "10px" }}
          onClick={handleReset}
        />
      </Container>

      <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={
          !loadingNext &&
          !!pagination &&
          pagination.currentPage < pagination.totalPages
        }
        initialLoad={false}
      >
        <BookClubList bookClubs={bookClubsAsMap} />
      </InfiniteScroll>
      <div style={{ textAlign: "center" }}>
        <Loader active={loadingNext} />
      </div>
    </Container>
  );
}

export default observer(BookClubs);
