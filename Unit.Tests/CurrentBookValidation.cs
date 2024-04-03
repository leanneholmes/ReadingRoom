using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;

namespace Unit.Tests
{
    [TestFixture]
    public class CurrentBookValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidCurrentBook_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                CurrentBook = "The Nightingale"
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.CurrentBook);
        }

        [Test]
        public void Validate_WithInvalidCurrentBook_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                CurrentBook = null
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.CurrentBook);
        }
    }
}
