using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;

namespace Unit.Tests
{
    [TestFixture]
    public class CurrentBookAuthorValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidCurrentBookAuthor_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                CurrentBookAuthor = "Kristin Hannah"
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.CurrentBookAuthor);
        }

        [Test]
        public void Validate_WithInvalidCurrentBookAuthor_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                CurrentBookAuthor = null
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.CurrentBookAuthor);
        }
    }
}
