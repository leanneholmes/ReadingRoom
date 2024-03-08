using Domain;
using FluentValidation;
using Persistence;

namespace Application.BookClubs
{
    public class BookClubValidator : AbstractValidator<BookClub>
    {
        private readonly DataContext _context;
        public BookClubValidator(DataContext context)
        {
            _context = context; 

            RuleFor(x => x.Name).NotEmpty().Must(UniqueName).WithMessage("Club Name already taken. Name must be unique");
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.ReadingPace).NotEmpty();
            RuleFor(x => x.NextMeeting).NotEmpty();
            RuleFor(x => x.MeetingLink).NotEmpty();
            RuleFor(x => x.CurrentBook).NotEmpty();
            RuleFor(x => x.CurrentBookAuthor).NotEmpty();
        }

        private bool UniqueName(string name)
        {
            return !_context.BookClubs.Any(b => b.Name == name);
        }
    }
}