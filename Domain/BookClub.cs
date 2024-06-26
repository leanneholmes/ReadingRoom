namespace Domain
{
    public class BookClub
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string ReadingPace { get; set; }

        public DateTime NextMeeting { get; set; }

        public string MeetingLink { get; set; }

        public string CurrentBook { get; set; }

        public string CurrentBookAuthor { get; set; }

        public ICollection<BookClubMember> Members { get; set; } = new List<BookClubMember>();

        public string Image { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}